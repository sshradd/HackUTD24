// src/app/firebase/firestore.js
import firebase from './config';

// Add expense data
export const addExpense = async (expenseData) => {
  const user = firebase.auth().currentUser;
  if (user) {
    const uid = user.uid;
    await firebase.firestore().collection('expenses').add({
      userId: uid,
      ...expenseData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    console.error('User is not authenticated');
  }
};

// Add budget data
export const addBudget = async (budgetData) => {
  const user = firebase.auth().currentUser;
  if (user) {
    const uid = user.uid;
    await firebase.firestore().collection('budgets').add({
      userId: uid,
      ...budgetData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    console.error('User is not authenticated');
  }
};

// Get user expenses
export const getUserExpenses = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const uid = user.uid;
    const snapshot = await firebase.firestore()
      .collection('expenses')
      .where('userId', '==', uid)
      .get();
    const expenses = snapshot.docs.map(doc => doc.data());
    return expenses;
  } else {
    console.error('User is not authenticated');
  }
};

// Get user budget
export const getUserBudget = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const uid = user.uid;
    const snapshot = await firebase.firestore()
      .collection('budgets')
      .where('userId', '==', uid)
      .get();
    const budgets = snapshot.docs.map(doc => doc.data());
    return budgets;
  } else {
    console.error('User is not authenticated');
  }
};
