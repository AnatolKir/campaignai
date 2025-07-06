# Post-Cursor Update Recovery Guide

## IMMEDIATE ACTION PLAN

### Step 1: Aggressive Process Cleanup
```bash
# Kill all Node.js processes more aggressively
sudo pkill -f node
sudo pkill -f next
sudo pkill -f npm
sudo pkill -f yarn

# Wait for processes to die
sleep 5

# Check if any processes remain
lsof -i :3000-3010
ps aux | grep -E "(next|node|npm)" | grep -v grep
```

### Step 2: Remove Problematic Scripts
```bash
# Delete the problematic scripts
rm -f scripts/fix-port-assignments.sh
rm -f scripts/start-all.sh

# Remove port management documentation
rm -f PORTS.md
```

### Step 3: Reset Next.js Configurations
Check and reset these files to default configurations:
- `next.config.ts` - Remove any port management code
- `package.json` - Remove custom port scripts
- Any environment files with port configurations

### Step 4: Test Clean Start
```bash
# Start with just the main project
cd /Users/ricklatona/Desktop/campaignainew
npm run dev

# If successful, start coming soon site in separate terminal
cd /Users/ricklatona/Desktop/campaignainew/coming-soon-site
npm run dev
```

### Step 5: If Problems Persist
Try these more aggressive approaches:

#### Option A: Restart Development Environment
```bash
# Restart terminal completely
# Or restart computer if processes are truly stuck
```

#### Option B: Use Different Ports Manually
```bash
# Start projects on completely different ports
PORT=4000 npm run dev  # For main project
PORT=4001 npm run dev  # For coming soon site
```

#### Option C: Check for System-Level Issues
```bash
# Check what's using the ports
sudo lsof -i :3000
sudo lsof -i :3001
sudo lsof -i :3002
# etc.

# Kill specific processes by PID if needed
sudo kill -9 [PID]
```

## FILES TO VERIFY ARE CLEAN

### next.config.ts
Should be simple, without port management:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration only
  // NO port management code
}

module.exports = nextConfig
```

### package.json scripts
Should be standard:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## PREVENTION STRATEGY

### Going Forward:
1. **Never implement port management** - Let Next.js handle it automatically
2. **Use separate terminals** for each project
3. **Keep projects simple** - Avoid complex startup scripts
4. **Kill processes properly** when switching between projects

### If Port Conflicts Occur:
1. Simply use `Ctrl+C` to stop the current process
2. Start the new process - Next.js will find available ports
3. Don't try to manage ports manually

## SUCCESS CRITERIA
- ✅ Main Campaign AI starts on default port (3000 or auto-assigned)
- ✅ Coming Soon site starts on available port
- ✅ No zombie processes consuming ports
- ✅ Clean, simple configurations

## CONTACT FOR HELP
If this recovery doesn't work, start a new Cursor chat focused specifically on:
1. "Help me kill zombie Node.js processes on ports 3000-3010"
2. "Clean up port management code from my Next.js projects"
3. "Reset my development environment to default state"

The key is to SIMPLIFY, not add more complexity. 