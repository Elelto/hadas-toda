import { load } from 'js-yaml';

// YAML loader utility using js-yaml library
export const loadYamlContent = async (path) => {
  try {
    console.log('🔍 Loading YAML from:', path);
    const response = await fetch(path);
    const yamlText = await response.text();
    console.log('📄 Raw YAML text:', yamlText);
    const parsed = load(yamlText);
    console.log('✅ Parsed YAML result:', parsed);
    return parsed;
  } catch (error) {
    console.error('❌ Error loading YAML:', error);
    return null;
  }
};
