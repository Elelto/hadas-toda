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
      const value = trimmed.substring(colonIndex + 1).trim();
      
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
      const value = trimmed.substring(colonIndex + 1).trim();
      
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
      const itemContent = trimmed.substring(2).trim();
      if (itemContent.includes(':')) {
        // Object in list
        const colonIndex = itemContent.indexOf(':');
        const key = itemContent.substring(0, colonIndex).trim();
        const value = itemContent.substring(colonIndex + 1).trim();
        
        currentListItem = {};
        currentListItem[key] = value;
        currentList.push(currentListItem);
      } else {
        // Simple list item
        currentList.push({ name: itemContent });
        currentListItem = null;
      }
    } else if (indent === 6 && currentListItem && trimmed.includes(':')) {
      // Additional properties for list item
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
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
