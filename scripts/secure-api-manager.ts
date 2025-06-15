#!/usr/bin/env tsx

import crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

interface SecureConfig {
  encryptedApiKey?: string;
  model: string;
  lastUsed?: Date;
  usageCount: number;
  rateLimit: {
    maxRequestsPerHour: number;
    maxBatchSize: number;
    cooldownMs: number;
  };
}

interface TranslationAudit {
  id: string;
  action: 'ai_translate' | 'manual_edit' | 'bulk_update';
  keys: string[];
  locale: string;
  userId?: string;
  timestamp: Date;
  source: 'ai' | 'manual' | 'import';
  success: boolean;
  error?: string;
}

class SecureAPIKeyManager {
  private configPath: string;
  private auditPath: string;
  private encryptionKey: string;

  constructor() {
    this.configPath = path.join(process.cwd(), '.translation-config.json');
    this.auditPath = path.join(process.cwd(), '.translation-audit.json');
    this.encryptionKey = process.env.TRANSLATION_ENCRYPTION_KEY || this.generateEncryptionKey();
  }

  private generateEncryptionKey(): string {
    // Generate a random encryption key if none exists
    const key = crypto.randomBytes(32).toString('hex');
    console.warn('⚠️  Generated new encryption key. Set TRANSLATION_ENCRYPTION_KEY in production!');
    console.log(`TRANSLATION_ENCRYPTION_KEY=${key}`);
    return key;
  }

  private encrypt(text: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(this.encryptionKey, 'salt', 32);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return iv.toString('hex') + ':' + encrypted;
  }

  private decrypt(encryptedText: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(this.encryptionKey, 'salt', 32);
    
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  private loadConfig(): SecureConfig {
    const defaultConfig: SecureConfig = {
      model: 'gpt-3.5-turbo',
      usageCount: 0,
      rateLimit: {
        maxRequestsPerHour: 100,
        maxBatchSize: 10,
        cooldownMs: 1000,
      },
    };

    if (!fs.existsSync(this.configPath)) {
      this.saveConfig(defaultConfig);
      return defaultConfig;
    }

    try {
      const content = fs.readFileSync(this.configPath, 'utf-8');
      return { ...defaultConfig, ...JSON.parse(content) };
    } catch (error) {
      console.error('Error loading config:', error);
      return defaultConfig;
    }
  }

  private saveConfig(config: SecureConfig): void {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
    } catch (error) {
      console.error('Error saving config:', error);
    }
  }

  private loadAudit(): TranslationAudit[] {
    if (!fs.existsSync(this.auditPath)) {
      return [];
    }

    try {
      const content = fs.readFileSync(this.auditPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('Error loading audit log:', error);
      return [];
    }
  }

  private saveAudit(audits: TranslationAudit[]): void {
    try {
      // Keep only last 1000 entries
      const recentAudits = audits.slice(-1000);
      fs.writeFileSync(this.auditPath, JSON.stringify(recentAudits, null, 2));
    } catch (error) {
      console.error('Error saving audit log:', error);
    }
  }

  public setAPIKey(apiKey: string): void {
    if (!apiKey || !apiKey.startsWith('sk-')) {
      throw new Error('Invalid OpenAI API key format');
    }

    const config = this.loadConfig();
    config.encryptedApiKey = this.encrypt(apiKey);
    this.saveConfig(config);
    
    console.log('✅ API key encrypted and saved securely');
  }

  public getAPIKey(): string | null {
    const config = this.loadConfig();
    
    if (!config.encryptedApiKey) {
      return null;
    }

    try {
      return this.decrypt(config.encryptedApiKey);
    } catch (error) {
      console.error('Error decrypting API key:', error);
      return null;
    }
  }

  public testConnection(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const apiKey = this.getAPIKey();
      
      if (!apiKey) {
        console.error('❌ No API key configured');
        resolve(false);
        return;
      }

      try {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        if (response.ok) {
          console.log('✅ API connection successful');
          resolve(true);
        } else {
          console.error('❌ API connection failed:', response.status);
          resolve(false);
        }
      } catch (error) {
        console.error('❌ API connection error:', error);
        resolve(false);
      }
    });
  }

  public checkRateLimit(): { allowed: boolean; reason?: string } {
    const config = this.loadConfig();
    const audits = this.loadAudit();
    
    // Check hourly rate limit
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentRequests = audits.filter(audit => 
      new Date(audit.timestamp) > oneHourAgo && 
      audit.action === 'ai_translate'
    );

    if (recentRequests.length >= config.rateLimit.maxRequestsPerHour) {
      return {
        allowed: false,
        reason: `Rate limit exceeded: ${recentRequests.length}/${config.rateLimit.maxRequestsPerHour} requests in the last hour`
      };
    }

    // Check cooldown period
    const lastRequest = audits
      .filter(audit => audit.action === 'ai_translate')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

    if (lastRequest) {
      const timeSinceLastRequest = Date.now() - new Date(lastRequest.timestamp).getTime();
      if (timeSinceLastRequest < config.rateLimit.cooldownMs) {
        return {
          allowed: false,
          reason: `Cooldown period: wait ${Math.ceil((config.rateLimit.cooldownMs - timeSinceLastRequest) / 1000)}s`
        };
      }
    }

    return { allowed: true };
  }

  public logTranslation(
    keys: string[], 
    locale: string, 
    success: boolean, 
    userId?: string, 
    error?: string
  ): void {
    const audit: TranslationAudit = {
      id: crypto.randomUUID(),
      action: 'ai_translate',
      keys,
      locale,
      userId,
      timestamp: new Date(),
      source: 'ai',
      success,
      error,
    };

    const audits = this.loadAudit();
    audits.push(audit);
    this.saveAudit(audits);

    // Update usage count
    const config = this.loadConfig();
    config.usageCount += 1;
    config.lastUsed = new Date();
    this.saveConfig(config);
  }

  public getUsageStats(): {
    totalTranslations: number;
    lastUsed?: Date;
    hourlyUsage: number;
    recentErrors: TranslationAudit[];
  } {
    const config = this.loadConfig();
    const audits = this.loadAudit();
    
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const hourlyUsage = audits.filter(audit => 
      new Date(audit.timestamp) > oneHourAgo && 
      audit.action === 'ai_translate'
    ).length;

    const recentErrors = audits
      .filter(audit => !audit.success)
      .slice(-5);

    return {
      totalTranslations: config.usageCount,
      lastUsed: config.lastUsed,
      hourlyUsage,
      recentErrors,
    };
  }

  public getAuditLog(limit = 50): TranslationAudit[] {
    const audits = this.loadAudit();
    return audits
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  public updateSettings(settings: Partial<SecureConfig>): void {
    const config = this.loadConfig();
    Object.assign(config, settings);
    this.saveConfig(config);
    console.log('✅ Settings updated');
  }

  public getSettings(): SecureConfig {
    return this.loadConfig();
  }
}

// CLI interface
async function main() {
  const manager = new SecureAPIKeyManager();
  const command = process.argv[2];

  switch (command) {
    case 'set-key':
      const apiKey = process.argv[3];
      if (!apiKey) {
        console.error('Usage: tsx secure-api-manager.ts set-key <api-key>');
        process.exit(1);
      }
      manager.setAPIKey(apiKey);
      break;

    case 'test':
      const isConnected = await manager.testConnection();
      process.exit(isConnected ? 0 : 1);
      break;

    case 'stats':
      const stats = manager.getUsageStats();
      console.log('📊 Usage Statistics:');
      console.log(`  Total translations: ${stats.totalTranslations}`);
      console.log(`  Last used: ${stats.lastUsed || 'Never'}`);
      console.log(`  Hourly usage: ${stats.hourlyUsage}`);
      if (stats.recentErrors.length > 0) {
        console.log(`  Recent errors: ${stats.recentErrors.length}`);
      }
      break;

    case 'audit':
      const audits = manager.getAuditLog(20);
      console.log('📋 Recent Translation Activity:');
      audits.forEach(audit => {
        const status = audit.success ? '✅' : '❌';
        console.log(`  ${status} ${audit.timestamp} - ${audit.action} (${audit.keys.length} keys, ${audit.locale})`);
        if (audit.error) {
          console.log(`    Error: ${audit.error}`);
        }
      });
      break;

    default:
      console.log('Usage:');
      console.log('  tsx secure-api-manager.ts set-key <api-key>');
      console.log('  tsx secure-api-manager.ts test');
      console.log('  tsx secure-api-manager.ts stats');
      console.log('  tsx secure-api-manager.ts audit');
      break;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { SecureAPIKeyManager }; 