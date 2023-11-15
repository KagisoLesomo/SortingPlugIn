import React, { useState, useEffect } from 'react';
import './MergeQuizzesPage.css'; 
import { getFirestore, collectionGroup, collection, getDocs, query, where } from 'firebase/firestore';
import Header from '../header/Header';
import DBQuizzesList from './DBQuizzesList';
const MergeQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const db = getFirestore();
      const quizzesCol = collection(db, 'Quizzes');
      const q = query(quizzesCol, where('Sort Type', '==', 'Merge'));

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

    fetchQuizzes();
  }, []);
  useEffect(() => {
    console.log('Updated quiz questions:', quizQuestions);
    // You can perform any additional actions here after quizQuestions is updated
  }, [quizQuestions]);

  const fetchQuizQuestions = async (quizTitle, filter) => {
    const db = getFirestore();
    const quizQuestionsQuery = query(
      collectionGroup(db, quizTitle),
      where('Title', '==', filter)
    );

    try {
      const querySnapshot = await getDocs(quizQuestionsQuery);
      const data = querySnapshot.docs.map((doc) => ({
        questionId: doc.id,
        question: doc.data()['Question'],
        answer: doc.data()['Answer'],
        explanation: doc.data()['Explanation'],
        options: [
          doc.data()['Option A'],
          doc.data()['Option B'],
          doc.data()['Option C'],
          doc.data()['Option D'],
        ],
      }));
      setQuizQuestions(data);
      console.log('quiz questions inside fetch:', data);
    } catch (error) {
      console.error("Error getting quiz questions: ", error);
    }
  };

  const onStartQuiz = async (quizId) => {
    console.log('Starting quiz', quizId);
    window.alert('Starting quiz: ' + quizId);
    const selected = quizzes.find((quiz) => quiz.quizId === quizId);

    if (selected && selected.quizId === 0) {
      const { sortType, title } = selected;
      await fetchQuizQuestions(title, 'MergeSortDemo');
      console.log('Sort Type:', sortType);
      console.log('Title:', title);
      setSelectedQuiz(selected);
      setQuizStarted(true);
    } else {
      console.log('Quiz not found or has a different quizId:', quizId);
    }
  };
  const handleStart = () => {
    setQuizStarted(true);
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleAnswerSelection = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  /*return (
    <div>
      <Header/>
      <h1>Practice Quizzes: </h1>
      {selectedQuiz ? (
        <div>
          <h2>Quiz: {selectedQuiz.title}</h2>
          <button onClick={handleStart}>Start</button>
          <div>
            <a href='/practice/merge/quizzes'>Back to Quiz List</a>
          </div>
        </div>
      ) : (
        // Render the list of quizzes
        <DBQuizzesList onStartQuiz={onStartQuiz} />
      )}
      <div>
        <a href='/practice/merge'>Back to Merge-Sort main page</a>
      </div>
    
    </div>
  );*/

  return (
    <div className="container">
      <Header className="header" />
      <h1 className="header">Practice Quizzes</h1>
      {selectedQuiz ? (
        <div className="quiz-container">
          <h2 className="header">Quiz: {selectedQuiz.title}</h2>
          {quizStarted ? (
            quizQuestions.length > 0 && currentQuestionIndex < quizQuestions.length ? (
              <div className="question-container">
                <h3>Question {currentQuestionIndex + 1}</h3>
                <p>{quizQuestions[currentQuestionIndex]?.question}</p>
                <form className="options-container">
                  {quizQuestions[currentQuestionIndex]?.options.filter((option) => option).map((option, index) => (
                    <div className="option" key={index}>
                      <input
                        type="radio"
                        id={`option${index}`}
                        value={option}
                        checked={userAnswers[quizQuestions[currentQuestionIndex]?.questionId] === option}
                        onChange={() =>
                          handleAnswerSelection(quizQuestions[currentQuestionIndex]?.questionId, option)
                        }
                      />
                      <label htmlFor={`option${index}`}>{option}</label>
                    </div>
                  ))}
                </form>
                <button className="button" onClick={handleNextQuestion}>Next Question</button>
              </div>
            ) : (
              <div className="question-container">
                <h3>Quiz Completed!</h3>
                <button className="button">Submit</button>
              </div>
            )
          ) : (
            <button className="button" onClick={() => onStartQuiz(selectedQuiz.quizId)}>Start Quiz</button>
          )}
          <div>
            <a className="link" href='/practice/merge/quizzes'>Back to Quiz List</a>
          </div>
        </div>
      ) : (
        <DBQuizzesList onStartQuiz={onStartQuiz} />
      )}
      <div>
        <a className="link" href='/practice/merge'>Back to Merge-Sort main page</a>
      </div>
    </div>
  );
};

export default MergeQuizzesPage;





