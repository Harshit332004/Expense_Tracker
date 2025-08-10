import { admin, db } from "./firestore.js";

// CREATE or UPDATE document
const bucket = admin.storage().bucket()

const createOrUpdateDocument = async (collectionName, docName, data) => {
  try {
    console.log(data)
    const docRef = db.collection(collectionName).doc(docName);
    console.log("writting data")
    await docRef.set(data); // merge: true to update only specific fields
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

// READ document
const readDocument = async (collectionName, docName) => {
  try {
    const docRef = db.collection(collectionName).doc(docName);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      console.log("Document data:", docSnap.data());
      return docSnap.data(); // return document data
    } else {
      console.log("No such document!");
      return null; // document doesn't exist
    }
  } catch (error) {
    console.error("Error reading document: ", error);
  }
};

async function fetchAllDocuments(collectionName) {
  try {
    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const documents = [];
    snapshot.forEach(doc => {
      documents.push({
        id: doc.id,          // Document ID
        ...doc.data()        // Document Data
      });
    });

    console.log("Fetched Documents:", documents);
    return documents;

  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error('Unable to fetch documents');
  }
}


// UPDATE document
const updateDocument = async (collectionName, docName, data) => {
  try {
    const docRef = db.collection(collectionName).doc(docName);
    await docRef.update(data);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// DELETE document
const deleteDocument = async (collectionName, docName) => {
  try {
    const docRef = db.collection(collectionName).doc(docName);
    await docRef.delete();
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

const uploadImage = async (pid, files) => {
  const images = []
  console.log(files)
  for (var i = 0; i < files.length; i++) {
    const blob = bucket.file(`products/${pid}/${i}`);

    await new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: i.mimetype
        }
      });

      blobStream.on("error", (err) => {
        console.error("upload error", err);
        reject(new Error("Upload error"));
      });

      blobStream.on("finish", async () => {
        await blob.makePublic();
        const img_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        images.push(img_url);
        resolve();
      });

      blobStream.end(i.buffer);
    });
  }
  return images

}

const searchProductsByExactName = async (searchString) => {
  try {
    // Reference to products collection
    const productsRef = db.collection('product');

    // Create a query to find products where name exactly matches the search string
    const querySnapshot = await productsRef.where('name', '==', searchString).get()

    // Execute the query
    // const querySnapshot = await getDocs(searchQuery);

    // Extract and return products
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return products;
  } catch (error) {
    console.error('Error searching for products:', error);
    throw error;
  }
};

export { createOrUpdateDocument, readDocument, deleteDocument, updateDocument, uploadImage, fetchAllDocuments, searchProductsByExactName }
