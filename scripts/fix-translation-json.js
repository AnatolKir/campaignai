const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const languages = ['pt', 'ko', 'ar', 'hi', 'ru', 'zh', 'ja'];

function fixTranslationFile(filePath) {
  try {
    console.log(`Fixing ${filePath}...`);
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(content);
    } catch (error) {
      console.log(`JSON parse error in ${filePath}, attempting to fix...`);
      
      // Try to fix common issues
      let fixedContent = content
        .replace(/,\s*}/g, '}')  // Remove trailing commas
        .replace(/{\s*""\s*:/g, '{"placeholder":')  // Fix empty keys
        .replace(/"\s*:\s*{\s*""\s*:/g, '": {"placeholder":')  // Fix nested empty keys
        .replace(/"\s*:\s*{\s*}/g, '": "placeholder"')  // Fix empty objects
        .replace(/"\s*:\s*"\s*"/g, '": "placeholder"')  // Fix empty values
        .replace(/"\s*"\s*:/g, '"placeholder":');  // Fix empty keys at start
      
      try {
        data = JSON.parse(fixedContent);
      } catch (secondError) {
        console.error(`Could not fix ${filePath}:`, secondError.message);
        return false;
      }
    }
    
    // Clean up the data
    function cleanObject(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      
      const cleaned = {};
      for (const [key, value] of Object.entries(obj)) {
        // Skip empty keys or placeholder keys
        if (key === '' || key === 'placeholder') {
          continue;
        }
        
        if (typeof value === 'object' && value !== null) {
          const cleanedValue = cleanObject(value);
          // Only add if the cleaned object has content
          if (Object.keys(cleanedValue).length > 0) {
            cleaned[key] = cleanedValue;
          }
        } else if (typeof value === 'string' && value !== '' && value !== 'placeholder') {
          cleaned[key] = value;
        }
      }
      return cleaned;
    }
    
    const cleanedData = cleanObject(data);
    
    // Write back the cleaned JSON
    fs.writeFileSync(filePath, JSON.stringify(cleanedData, null, 2), 'utf8');
    console.log(`✅ Fixed ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Fix all language files
console.log('🔧 Fixing translation JSON files...\n');

let fixedCount = 0;
let totalCount = 0;

for (const lang of languages) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  
  if (fs.existsSync(filePath)) {
    totalCount++;
    if (fixTranslationFile(filePath)) {
      fixedCount++;
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
}

console.log(`\n✨ Fixed ${fixedCount}/${totalCount} translation files`); 