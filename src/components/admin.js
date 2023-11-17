import React, { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  addDoc,
} from 'firebase/firestore';
import './AdminComponent.css';
import { signOut } from 'firebase/auth'; 
import { ClipLoader } from 'react-spinners';
import { FaCheckCircle } from 'react-icons/fa'; // Import the checkmark icon

const AdminComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortsData, setSortsData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [quizAdded, setQuizAdded] = useState(false); // New state to track quiz added state

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      setIsLoading(true);
      console.log('Logging in with email:', email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
  
      // If login is successful, set loggedIn state to true
      setLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      if ( error.message==="Firebase: Error (auth/network-request-failed)."){
        window.alert("No internet Connection");
      }
      else{
        console.error('Error logging in:', error.message);
      }
    }
  };   
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setLoggedIn(false); // Set loggedIn state to false after successful logout
    } catch (error) {
      window.alert('Error logging out:', error.message);
    }
  };
  const handle = async () => {
    try {
      navigate("/");
    } catch (error) {
      window.alert('Error logging out:', error.message);
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
    Options: [],
    Answer: '',
    Explanation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Options') {
      const optionsCount = Math.min(parseInt(value, 10), 10);
      const newOptions = Array.from({ length: optionsCount }, (_, index) => {
        return formData.Options[index] || '';
      });

      setFormData({
        ...formData,
        Options: newOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      const Title = `${subcollectionId}`;

      try {
        // Set loading to true before adding the quiz
        setLoading(true);

        // Add a document to the subcollection with the specified ID (user-input subcollectionId)
        await addDoc(collection(sortDocumentRef, subcollectionId), {
          Title,
          ...formData,
        });

        // Set quizAdded to true to show success message
        setQuizAdded(true);

        // Clear the form fields
        setFormData({
          Question: '',
          Options: [],
          Answer: '',
          Explanation: '',
        });

        // Clear the subcollection ID field
        setSubcollectionId('');

        // After adding the quiz, re-fetch the data
        await fetchSortsData();
      } catch (error) {
        window.alert('Error adding quiz:', error);
      } finally {
        // Set loading back to false after adding the quiz
      // Start loading
    setLoading(true);

    // Simulate a delay before setting quizAdded to true (e.g., 2000 milliseconds)
    setTimeout(() => {
      // Set quizAdded to true to display the success message
      setQuizAdded(true);

      // Hide the success message after 3000 milliseconds (3 seconds)
      setTimeout(() => {
        setQuizAdded(false);

        // End loading after hiding the success message
        setLoading(false);
      }, 2000);
    }, 100);
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchSortsData();
    }
  }, [loggedIn]);

  return (
    <div className="admin-component-container" >
      {!loggedIn ? (
        <div className="login-container">
           <h1 className='h1'>Admin Login:</h1>
         <div className='form'>
           <div>
            <label htmlFor="email-address"><b>Email address: </b></label>
            <input className='input' type="email" value={email} placeholder='me@gmail.com' onChange={(e) => setEmail(e.target.value)} onFocus={handleInputChange} />
           </div>
           <div>
            <label htmlFor="password"><b>Password: </b></label>
            <input className='input' type="password" value={password} placeholder='mypassword' onChange={(e) => setPassword(e.target.value)} onFocus={handleInputChange} />
          </div>
        </div>

        {isLoading && (
          <div className="loader-overlay">
            <div className="loader">
              <ClipLoader size={50} color="#36D7B7" />
              <div>Logging in...</div>
            </div>
          </div>
        )}

        <button className='button' onClick={handleLogin} >
          LOGIN
        </button>

        
        <button className="logout-button" onClick={handle}>
          Back
        </button>
        </div>
        
      ) : (
        <div className="admin-page-container">
        <h2>Add Practice Quiz questions to the Database</h2>
        <label>Select a Sort Algorithm:</label>
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

        <label>Quiz ID:</label>
        <input
          type="text"
          value={subcollectionId}
          placeholder="Enter quiz ID"
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

        <label>Number of Options:</label>
        <input
          type="number"
          name="Options"
          min="1"
          max="10"
          onChange={handleInputChange}
        />
        <br />

        <label>Insert Answer Options:</label>
        {Array.from({ length: formData.Options.length }, (_, index) => (
          <div key={index}>
            <label>{`Option ${String.fromCharCode(65 + index)}:`}</label>
            <input
              type="text"
              name={`Options[${index}]`}
              placeholder={`Enter Option ${String.fromCharCode(65 + index)}`}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
          </div>
        ))}

        <label>Insert Answer:</label>
        <input
          type="text"
          name="Answer"
          value={formData.Answer}
          placeholder="Enter Answer"
          onChange={handleInputChange}
        />
        <br />

        <label>Explanation:</label>
        <input
          type="text"
          name="Explanation"
          placeholder="Explain the answer for clarification"
          value={formData.Explanation}
          onChange={handleInputChange}
        />
        <br />

        <button onClick={handleAddQuiz} disabled={loading}>
          Add Quiz
        </button>

        {loading && (
          <div className="loader-overlay">
            <div className="loader">
              <ClipLoader size={60} color="#36D7B7" />
              <div>Loading...</div>
            </div>
          </div>
        )}

        {quizAdded && (
          <div className="success-message">
            <FaCheckCircle size={50} color="green" />
          </div>
        )}
      {loggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
      </div>
    )}
  </div>
);
};

export default AdminComponent;