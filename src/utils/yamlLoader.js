// Simple YAML loader utility
export const loadYamlContent = async (path) => {
  try {
    const response = await fetch(path);
    const yamlText = await response.text();
    const parsed = parseSimpleYaml(yamlText);
    return parsed;
  } catch (error) {
    console.warn('Error loading YAML:', error);
    return null;
  }
};

// Simple YAML parser for our basic structure
const parseSimpleYaml = (yamlText) => {
  const lines = yamlText.split('\n');
  const result = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const indent = line.length - line.trimStart().length;
    
    if (indent === 0 && trimmed.includes(':')) {
      // Top level property
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      if (value) {
        result[key] = value;
      } else {
        // Check if next lines are list items
        let j = i + 1;
        let isListNext = false;
        while (j < lines.length) {
          const nextLine = lines[j];
          const nextTrimmed = nextLine.trim();
          if (!nextTrimmed) {
            j++;
            continue;
          }
          const nextIndent = nextLine.length - nextLine.trimStart().length;
          if (nextIndent === 2 && nextTrimmed.startsWith('- ')) {
            isListNext = true;
          }
          break;
        }
        
        if (isListNext) {
          result[key] = [];
        } else {
          result[key] = {};
        }
      }
    } else if (indent === 2 && trimmed.startsWith('- ')) {
      // List item - find the parent key
      let parentKey = null;
      for (let j = i - 1; j >= 0; j--) {
        const prevLine = lines[j];
        const prevTrimmed = prevLine.trim();
        if (!prevTrimmed) continue;
        
        const prevIndent = prevLine.length - prevLine.trimStart().length;
        if (prevIndent === 0 && prevTrimmed.includes(':')) {
          const colonIndex = prevTrimmed.indexOf(':');
          const key = prevTrimmed.substring(0, colonIndex).trim();
          let value = prevTrimmed.substring(colonIndex + 1).trim();
          if (!value) {
            parentKey = key;
          }
          break;
        }
      }
      
      if (parentKey && Array.isArray(result[parentKey])) {
        let itemContent = trimmed.substring(2).trim();
        
        // Remove quotes if present
        if ((itemContent.startsWith('"') && itemContent.endsWith('"')) || (itemContent.startsWith("'") && itemContent.endsWith("'"))) {
          itemContent = itemContent.slice(1, -1);
        }
        
        if (itemContent.includes(':')) {
          // Object in list
          const colonIndex = itemContent.indexOf(':');
          const key = itemContent.substring(0, colonIndex).trim();
          let value = itemContent.substring(colonIndex + 1).trim();
          
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          
          const listItem = { [key]: value };
          
          // Check for additional properties on following lines
          let k = i + 1;
          while (k < lines.length) {
            const nextLine = lines[k];
            const nextTrimmed = nextLine.trim();
            if (!nextTrimmed) {
              k++;
              continue;
            }
            
            const nextIndent = nextLine.length - nextLine.trimStart().length;
            if (nextIndent === 4 && nextTrimmed.includes(':')) {
              const nextColonIndex = nextTrimmed.indexOf(':');
              const nextKey = nextTrimmed.substring(0, nextColonIndex).trim();
              let nextValue = nextTrimmed.substring(nextColonIndex + 1).trim();
              
              // Remove quotes if present
              if ((nextValue.startsWith('"') && nextValue.endsWith('"')) || (nextValue.startsWith("'") && nextValue.endsWith("'"))) {
                nextValue = nextValue.slice(1, -1);
              }
              
              listItem[nextKey] = nextValue;
              i = k; // Skip this line in main loop
              k++;
            } else {
              break;
            }
          }
          
          result[parentKey].push(listItem);
        } else {
          // Simple list item
          result[parentKey].push(itemContent);
        }
      }
    }
  }
  
  return result;
};
