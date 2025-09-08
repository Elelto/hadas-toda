// Simple YAML loader utility
export const loadYamlContent = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.warn(`Could not load ${filePath}, using fallback content`);
      return null;
    }
    
    const yamlText = await response.text();
    return parseSimpleYaml(yamlText);
  } catch (error) {
    console.warn('Error loading YAML:', error);
    return null;
  }
};

// Simple YAML parser for our basic structure
const parseSimpleYaml = (yamlText) => {
  const lines = yamlText.split('\n');
  const result = {};
  let currentSection = null;
  let currentObject = result;
  let currentList = null;
  let currentListItem = null;
  let lastKey = null;
  
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const indent = line.length - line.trimStart().length;
    
    if (indent === 0 && trimmed.includes(':')) {
      // Top level section
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      currentSection = key;
      if (value) {
        result[currentSection] = value;
      } else {
        result[currentSection] = {};
        currentObject = result[currentSection];
      }
      currentList = null;
      currentListItem = null;
      lastKey = null;
    } else if (indent === 2 && trimmed.includes(':')) {
      // Second level property
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      lastKey = key;
      if (value) {
        currentObject[key] = value;
      } else {
        currentObject[key] = [];
        currentList = currentObject[key];
      }
      currentListItem = null;
    } else if (indent === 4 && trimmed.startsWith('- ')) {
      // List item
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
        
        currentListItem = {};
        currentListItem[key] = value;
        currentList.push(currentListItem);
      } else {
        // Simple list item - for about page qualifications
        currentList.push(itemContent);
        currentListItem = null;
      }
    } else if (indent === 6 && currentListItem && trimmed.includes(':')) {
      // Additional properties for list item
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      currentListItem[key] = value;
    } else if (indent > 2 && !trimmed.includes(':') && !trimmed.startsWith('-')) {
      // Multi-line value continuation
      if (currentListItem) {
        const keys = Object.keys(currentListItem);
        const lastItemKey = keys[keys.length - 1];
        if (lastItemKey) {
          currentListItem[lastItemKey] += ' ' + trimmed;
        }
      } else if (lastKey && currentObject[lastKey]) {
        currentObject[lastKey] += ' ' + trimmed;
      }
    }
  }
  
  return result;
};
