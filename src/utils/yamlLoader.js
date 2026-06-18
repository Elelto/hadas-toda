import { loadLocalYamlContent } from './localYamlLoader';
import { loadFirebaseContent } from './firebaseLoader';

/**
 * Smart loader utility that tries to fetch from Firebase Firestore first.
 * If Firebase doesn't have the document, it automatically falls back to local YAML.
 * This acts as a drop-in transparent replacement for the entire website!
 * 
 * @param {string} path - e.g. '/content/pages/home.yml'
 */
export const loadYamlContent = async (path) => {
  try {
    // Translate paths like '/content/pages/home.yml' to collection & document
    if (path && path.startsWith('/content/')) {
      const parts = path.split('/'); // ["", "content", "pages", "home.yml"]
      if (parts.length === 4) {
        const collectionName = parts[2]; // e.g. 'pages' or 'components'
        const docId = parts[3].replace('.yml', ''); // e.g. 'home' or 'header'
        
        console.log(`🤖 [Smart Loader] Rerouting YAML request to Firebase: ${collectionName}/${docId}`);
        const data = await loadFirebaseContent(collectionName, docId);
        if (data) return data;
      }
    }
  } catch (error) {
    console.error('❌ [Smart Loader] Error fetching from Firebase, falling back to local YAML:', error);
  }

  // Fallback to local file fetch
  return await loadLocalYamlContent(path);
};
