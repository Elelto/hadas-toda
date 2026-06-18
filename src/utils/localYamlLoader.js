import { load } from 'js-yaml';

/**
 * Raw YAML loader that fetches local files from the public folder.
 * @param {string} path - path to the yaml file
 */
export const loadLocalYamlContent = async (path) => {
  try {
    console.log('🔍 Loading Local YAML from:', path);
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const yamlText = await response.text();
    const parsed = load(yamlText);
    console.log('✅ Parsed Local YAML result:', parsed);
    return parsed;
  } catch (error) {
    console.error('❌ Error loading local YAML:', error);
    return null;
  }
};
