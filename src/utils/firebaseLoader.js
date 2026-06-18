import { db } from '../services/firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { loadLocalYamlContent } from './localYamlLoader';

/**
 * Loads a single document from Firestore. Falls back to YAML if not found.
 * @param {string} collectionName - 'pages' or 'components'
 * @param {string} docId - e.g. 'home', 'about', 'header'
 */
export const loadFirebaseContent = async (collectionName, docId) => {
  try {
    console.log(`🔍 Loading Firebase content from: ${collectionName}/${docId}`);
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(`✅ Loaded Firebase content:`, data);
      return data;
    } else {
      console.warn(`⚠️ Document ${collectionName}/${docId} not found in Firebase. Falling back to YAML...`);
      const yamlPath = `/content/${collectionName}/${docId}.yml`;
      return await loadLocalYamlContent(yamlPath);
    }
  } catch (error) {
    console.error(`❌ Error loading from Firebase (${collectionName}/${docId}). Falling back to YAML:`, error);
    const yamlPath = `/content/${collectionName}/${docId}.yml`;
    return await loadLocalYamlContent(yamlPath);
  }
};

/**
 * Loads all documents from a Firestore collection, optionally ordered.
 * @param {string} collectionName - e.g. 'blog'
 * @param {string} orderByField - field to order by
 * @param {string} orderDirection - 'asc' or 'desc'
 */
export const loadFirebaseCollection = async (collectionName, orderByField = null, orderDirection = 'desc') => {
  try {
    console.log(`🔍 Loading Firebase collection: ${collectionName}`);
    const colRef = collection(db, collectionName);
    let q = colRef;
    
    if (orderByField) {
      q = query(colRef, orderBy(orderByField, orderDirection));
    }
    
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(`✅ Loaded ${items.length} items from ${collectionName}`);
    return items;
  } catch (error) {
    console.error(`❌ Error loading collection ${collectionName} from Firebase:`, error);
    return [];
  }
};
