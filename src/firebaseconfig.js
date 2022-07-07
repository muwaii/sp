import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDuV_Fj4fM9rWzhOHtGDVdXLicgU3AJ-3U",
  authDomain: "loginnp-6fd57.firebaseapp.com",
  projectId: "loginnp-6fd57",
  storageBucket: "loginnp-6fd57.appspot.com",
  messagingSenderId: "342513261239",
  appId: "1:342513261239:web:c2e8b7cbb64f61b0a00b32"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);



// // init services
// const db = getFirestore();

// // collection ref
// const colRef = collection(db, 'mybook');

// // get collection data
// getDocs(colRef)
// .then((snapshot) => {
//   const books = [];
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(books);
// })
// .catch((err) => {
//   console.log(err.message);
// });


// const colRef2 = collection(db, 'developer');
// const devv = [];
// getDocs(colRef2)
// .then((snapshot) => {
//   snapshot.docs.forEach((doc) => {
//     devv.push({ ...doc.data(), id: doc.id });
//   });
// })
// .catch((err) => {
//   console.log(err.message);
// });
// console.log('dev :', devv);
