import React, { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  addDoc,
} from 'firebase/firestore';
import './AdminComponent.css';
const AdminComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const [sortsData, setSortsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // If login is successful, set loggedIn state to true
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const fetchSortsData = async () => {
    const db = getFirestore();
    const sortsCollection = collection(db, 'Sorts');
    const sortsQuery = query(sortsCollection);

    try {
      const querySnapshot = await getDocs(sortsQuery);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collectionId: 'Sorts',
        documentData: doc.data(),
      }));

      setSortsData(data);
      setLoading(false);
      console.log('Fetched Sorts data:', data);
    } catch (error) {
      console.error('Error getting Sorts data:', error);
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    Question: '',
    OptionA: '',
    OptionB: '',
    Answer: '',
    Explanation: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [subcollectionId, setSubcollectionId] = useState('');
  const handleAddQuiz = async () => {
    if (selectedSort && subcollectionId) {
      const db = getFirestore();
      const sortDocumentRef = doc(db, 'Sorts', selectedSort);
  
      // Check if any required field is empty
      if (Object.values(formData).some((value) => !value)) {
        window.alert('Please fill in all required fields.');
        return;
      }
  
      // Set title based on the selected sort type and subcollection ID
      const title = `${selectedSort} Quiz: ${subcollectionId}`;
  
      try {
        // Set loading to true before adding the quiz
        setLoading(true);
  
        // Add a document to the subcollection with the specified ID (user-input subcollectionId)
        await addDoc(collection(sortDocumentRef, subcollectionId), {
          title,
          ...formData,
        });
  
        // Prompt user with alert
        window.alert('Quiz added to the collection.');

      // Clear the form fields
      setFormData({
        Question: '',
        OptionA: '',
        OptionB: '',
        Answer: '',
        Explanation: '',
      });

      // Clear the subcollection ID field
    // Clear the subcollection ID field
      // Clear the subcollection ID field
      setSubcollectionId('');

      // After adding the quiz, re-fetch the data
      await fetchSortsData();
    } catch (error) {
      console.error('Error adding quiz:', error);
    } finally {
      // Set loading back to false after adding the quiz
      setLoading(false);
    }
  }
};

  useEffect(() => {
    if (loggedIn) {
      fetchSortsData();
    }
  }, [loggedIn]);

  return (
    <div>
      <h1>Admin Login</h1>
      {!loggedIn ? (
        <>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h2>Fetched Sorts Data Table</h2>
          <label>Select a sort type:</label>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="">Select</option>
            {sortsData.map((sort) => (
              <option key={sort.id} value={sort.id}>
                {sort.id}
              </option>
            ))}
          </select>

          <label>Subcollection ID:</label>
          <input
            type="text"
            value={subcollectionId}
            onChange={(e) => setSubcollectionId(e.target.value)}
          />

          <h2>Enter Quiz Details:</h2>
          <label>Question:</label>
          <input
            type="text"
            name="Question"
            value={formData.Question}
            onChange={handleInputChange}
          />
          <br />
          <label>Option A:</label>
          <input
            type="text"
            name="OptionA"
            value={formData.OptionA}
            onChange={handleInputChange}
          />
          <br />
          <label>Option B:</label>
          <input
            type="text"
            name="OptionB"
            value={formData.OptionB}
            onChange={handleInputChange}
          />
          <br />
          <label>Answer:</label>
          <input
            type="text"
            name="Answer"
            value={formData.Answer}
            onChange={handleInputChange}
          />
          <br />
          <label>Explanation:</label>
          <input
            type="text"
            name="Explanation"
            value={formData.Explanation}
            onChange={handleInputChange}
          />
          <br />
          <button onClick={handleAddQuiz}>Add Quiz</button>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>Quiz added successfully</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminComponent;
