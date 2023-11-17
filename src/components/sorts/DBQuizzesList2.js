// QuizzesList.js
import React,{useState,useEffect} from 'react';
import Quiz from './Quiz';
import { Link } from 'react-router-dom';
import './QuizzesList.css';
import { getFirestore, collection, getDocs, or } from 'firebase/firestore';
import { query, where,orderBy } from 'firebase/firestore';
import Header from '../header/Header';
//Fetch data from firebase
const DBQuizzesList = ({onStartQuiz}) => {

  const [quizzes, setQuizzes] = useState([]);
    useEffect(()=>{
      const fetchData=async()=>{
        const db=getFirestore();
        const quizzesCol=collection(db,'Quizzes');
        //const user=firebase.auth().currentUser;

          try{
            const q=query(quizzesCol,where('Sort Type','==','Bubble'),orderBy('Quiz ID','asc'));
            const querySnapshot=await getDocs(q);
            //const data=querySnapshot.docs.map(doc=>doc.data());
            const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setQuizzes(data);
          }
          catch(error){
            console.log("Error getting quizzes: ",error);
          }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ color: 'white' }}>Bubble Quizzes:</h1>
    <table style={{ color: 'white' }} className="styled-table">
      <thead>
        <tr>
          <th>Quiz ID</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {quizzes.map(quiz => (
          <Quiz key={quiz.id} quiz={quiz} onStartQuiz={onStartQuiz} />
        ))}
        
      </tbody>
    </table>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
  <Link to="/practice/bubble" style={{ textDecoration: 'none' }}>
    <button style={{ backgroundColor: '#CD366C', color: 'white', borderRadius: '0.5rem', fontSize: '1rem', border: 'none', cursor: 'pointer', padding: '1rem 1rem', margin: '1rem' }}>
      Back
    </button>
  </Link>
      </div>
    </div>
  );
};

export default DBQuizzesList;
