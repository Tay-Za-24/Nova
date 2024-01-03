import { getDoc, addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, getDocs, query, where} from "firebase/firestore";
import { firebaseDb } from "../../firebaseConfig";

export const postReasons = async (data) => {
    try {
        const reasonRef = collection(firebaseDb, 'reasons')
        const newDocRef = await addDoc(reasonRef, data)
        console.log('Document written with ID: ', newDocRef.id);
    }catch (error) {
        throw error
    }
}

export const getReasons = (userID, updateCallback) => {
  const reasonRef = collection(firebaseDb, 'reasons');
  const userReasonsRef = query(reasonRef, where('userID', '==', userID));

  return onSnapshot(userReasonsRef, (snapshot) => {
    const reasons = [];
    snapshot.forEach((doc) => {
      const reasonData = { id: doc.id, ...doc.data() };
      reasons.push(reasonData);
    });
    updateCallback(reasons);
  });
};