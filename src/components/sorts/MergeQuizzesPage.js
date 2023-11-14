import React, { useState,useEffect } from 'react';
import QuizzesList from './QuizzesList';
import DBQuizzesList from './DBQuizzesList';
import { getFirestore,collectionGroup, collection, getDocs, or } from 'firebase/firestore';
import { query, where,orderBy } from 'firebase/firestore';
import Header from '../header/Header';

const  MergeQuizzesPage= () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [sorts, setSorts] = useState([]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      const db = getFirestore();
      const quizzesCol = collection(db, 'Quizzes');
      //const sortsCol = collection(db, 'Sorts');

      // Create a query to get documents from the "Quizzes" collection
      const q = query(quizzesCol, where('Sort Type', '==', 'Merge'), orderBy('Quiz ID', 'asc'));

      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          quizId: doc.data()['Quiz ID'],
          sortType: doc.data()['Sort Type'],
          title: doc.data()['Title'],
        }));
        setQuizzes(data);
      } catch (error) {
        console.error('Error getting quizzes: ', error);
      }
    };
    
    // Call the function with a specific quiz ID, for example '0'
    
    fetchQuizzes(); // Call the function to fetch quizzes when the component mounts
    

  }, []);
  

    // Function to fetch quiz questions based on quizId
    const fetchQuizQuestions = async (quizTitle) => {
      const db = getFirestore();
      const quizQuestionsQuery = query(collectionGroup(db, quizTitle));
  
      try {
        const querySnapshot = await getDocs(quizQuestionsQuery);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setQuizQuestions(data);
      } catch (error) {
        console.error("Error getting quiz questions: ", error);
      }
    };
  console.log(quizzes);
  console.log(quizQuestions);

  //Fetch quiz data (questions and answers) from sorts collection:

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const onStartQuiz = (quizId) => {
    console.log('Starting quiz', quizId);
    window.alert('Starting quiz: ' + quizId);
    const selected = quizzes.find(quiz => quiz.quizId=== quizId);
    // Perform if statements based on the selected quiz
  // Check if the selected quiz has a quizId of 0
  if (selected && selected.quizId === 0) {
    // If the selected quiz has a quizId of 0, get sortType and title
    const { sortType, title } = selected;
    // Log the sortType and title
    console.log('Sort Type:', sortType);
    console.log('Title:', title);
    fetchQuizQuestions(title);


    // Set the selected quiz in the state
    setSelectedQuiz(selected);
  } else {
    // If the selected quiz doesn't exist or has a different quizId, handle the case
    console.log('Quiz not found or has a different quizId:', quizId);
  }
  };

  return (
    <div>
      <Header/>
      <h1>Practice Quizzes: </h1>
      {selectedQuiz ? (
        <div>
          <h2>Quiz: {selectedQuiz.Question}</h2>
          {/* Render the quiz content here */}
          
          <button>Start</button>
          <div>
            <a href='/practice/merge/quizzes'>Back to Quiz List</a>
          </div>
        </div>
      ) : (
        // Render the list of quizzes
        // <QuizzesList quizzes={quizzes} onStartQuiz={onStartQuiz} />
        <DBQuizzesList onStartQuiz={onStartQuiz} />
      )}
      <div>
        <a href='/practice/merge'>Back to Merge-Sort main page</a>
      </div>
    
    </div>
  );
};

export default MergeQuizzesPage;
