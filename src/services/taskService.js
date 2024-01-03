import { getDoc, addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, getDocs, query, where, documentId} from "firebase/firestore";
import { firebaseDb } from "../../firebaseConfig";

export const getTasks = (userID, updateCallback) => {
  console.log(userID);
  const taskRef = collection(firebaseDb, 'tasks');
  const userTasksRef = query(taskRef, where('userID', '==', userID));

  return onSnapshot(userTasksRef, (snapshot) => {
    const tasks = [];
    snapshot.forEach((doc) => {
      const taskData = { id: doc.id, ...doc.data() };
      tasks.push(taskData);
    });
    updateCallback(tasks);
  });
};

export const postTask = async (taskData) => {
      try {
        const tasksRef = collection(firebaseDb, 'tasks');
        const newDocRef = await addDoc(tasksRef, taskData);
        console.log('Task added to Firestore with ID: ', newDocRef.id);
      } catch (error) {
        console.error('Error posting task data to Firestore:', error);
        throw error; 
      }
}

export const updateTaskStatus = async (taskID) => {
  const taskRef = doc(collection(firebaseDb, 'tasks'), taskID);

  const updateData = {
    status: 'done',
  };

  try {
    await updateDoc(taskRef, updateData);
  } catch (error) {
    console.error('Error updating task status: ', error);
  }
};

export const postCompletedTask = async (completedTaskData) => {
  try {
    const tasksRef = collection(firebaseDb, 'completed tasks');
    const completedDocRef = await addDoc(tasksRef, completedTaskData);
  } catch (error) {
    console.error('Error posting task data to Firestore:', error);
    throw error; 
  }
}


export const getCompletedTasks = (userID, updateCallback) => {
  const completedTasksRef = collection(firebaseDb, 'completed tasks');
  const userCompletedTasksRef = query(completedTasksRef, where('userID', '==', userID));

  return onSnapshot(userCompletedTasksRef, (snapshot) => {
    const completedTasks = [];
    snapshot.forEach((doc) => {
      const completedTaskData = { id: doc.id, ...doc.data() };
      completedTasks.push(completedTaskData);
    });
    updateCallback(completedTasks);
  });
};

export const deleteCompletedTasks = async () => {
  const completedTaskRef = collection(firebaseDb, 'completed tasks');

  try {
    const snapshot = await getDocs(completedTaskRef);
    
    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log('Document deleted from "completed tasks" collection with ID: ', doc.id);
    });

    console.log('All documents deleted from "completed tasks" collection.');
  } catch (error) {
    console.error('Error deleting documents from "completed tasks" collection:', error);
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  const taskRef = doc(collection(firebaseDb, 'tasks'), taskId);

  try {
    const taskDoc = await getDoc(taskRef);

    if (taskDoc.exists()) {
      return { id: taskDoc.id, ...taskDoc.data() };
    } else {
      console.error('Task document not found in Firestore.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching task from Firestore:', error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  const taskRef = doc(collection(firebaseDb, 'tasks'), taskId);

  try {
    await deleteDoc(taskRef);
    console.log('Task deleted from the original tasks collection with ID: ', taskId);
  } catch (error) {
    console.error('Error deleting task from Firestore:', error);
    throw error;
  }
}

export const getPendingTaskCount = (userID, updateCallback) => {
  const tasksRef = collection(firebaseDb, 'tasks');
  const userTasksRef = query(tasksRef, where('userID', '==', userID));

  return onSnapshot(userTasksRef, (snapshot) => {
    const numberOfTasks = snapshot.size;
    updateCallback(numberOfTasks);
  });
};

export const getCompletedTaskCount = (userID, updateCallback) => {
  const completedTasksRef = collection(firebaseDb, 'completed tasks');
  const userCompletedTasksRef = query(completedTasksRef, where('userID', '==', userID));

  return onSnapshot(userCompletedTasksRef, (snapshot) => {
    const numberOfCompletedTasks = snapshot.size;
    updateCallback(numberOfCompletedTasks);
  });
};

export const getCompletedTaskDates = (userID, updateCallback) => {
  const completedTaskRef = collection(firebaseDb, 'completed tasks');
  const userCompletedTaskRef = query(completedTaskRef, where('userID', '==', userID));

  return onSnapshot(userCompletedTaskRef, (snapshot) => {
    const completedTaskDates = [];
    snapshot.forEach((doc) => {
      const taskDate = doc.data().date;
      completedTaskDates.push(taskDate);
    });
    updateCallback(completedTaskDates);
  });
};

// export const getCompletedTaskCountByDate = (dates, updateCallback) => {
//   const completedTaskRef = collection(firebaseDb, 'completed tasks');

//   return onSnapshot(completedTaskRef, (snapshot) => {
//     const countsArray = [];
//     dates.forEach((date) => {
//       // Check if snapshot exists before accessing its properties
//       if (snapshot) {
//         const count = snapshot.docs.filter((doc) => doc.data().date === date).length;
//         countsArray.push({ date, count });
//       }
//     });

//     // Call the updateCallback with the countsArray
//     if (typeof updateCallback === 'function') {
//       updateCallback(countsArray);
//     }
//   });
// };

export const getCompletedTaskCountByDate = async (dates) => {
  const completedTaskRef = collection(firebaseDb, 'completed tasks');

  try {
    const countsArray = [];
    for (const date of dates) {
      const existingIndex = countsArray.findIndex(item => item.date === date);

      if (existingIndex !== -1) {
        continue;
      }

      let count = 0;

      try {
        const snapshot = await getDocs(
          query(completedTaskRef, where('date', '==', date))
        );

        count = snapshot.size;
      } catch (error) {
        console.error(`Error getting completed tasks for date ${date}: `, error);
        throw error;
      }

      countsArray.push({ date, count });
    }

    return countsArray;
  } catch (error) {
    console.error('Error getting completed task counts by date: ', error);
    throw error;
  }
};

export const getDataToCompare = (taskId) => {
  return new Promise((resolve, reject) => {
    const TaskRef = doc(collection(firebaseDb, 'tasks'), taskId);

    const unsubscribe = onSnapshot(TaskRef, (snapshot) => {
      if (snapshot.exists()) {
        const { date: Date, end: endTime, taskData: taskData } = snapshot.data();
        const completedTaskData = {
          Date,
          endTime,
          taskData,
        };
        resolve(completedTaskData);
      } else {
        console.log(`No document found with ID ${taskId}`);
        resolve({});
      }
      unsubscribe();
    });
  });
};
