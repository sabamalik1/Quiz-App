import React, { useEffect, useReducer, useState } from "react";
import questions from "./QuizzData";
import QuizzResults from "./QuizzResults";

// DEFINE ACTION TYPE
const NEXT_QUESTION = "NEXT_QUESTION";
const ANSWER_OPTION = "ANSWER_OPTION";
const PLAY_AGAIN = "PLAY_AGAIN";
const SUBMIT_QUIZ = "SUBMIT_QUIZ";

const reducer = (state, action) => {
  switch (action.type) {
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        clicked: false,
      };
    case ANSWER_OPTION:
      const { isCorrect } = action.payload;
      return {
        ...state,
        score: isCorrect ? state.score + 5 : state.score,
        correctAns: isCorrect ? state.correctAns + 1 : state.correctAns,
        clicked: true,
      };
    case PLAY_AGAIN:
      return {
        ...initialState,
        // currentQuestion: 0,
        // score: 0,
        // correctAns: 0,
        // showResult: true,
      };
    case SUBMIT_QUIZ:
      return {
        ...state,
        showResult: true,
      };

    default:
      return state;
  }
};
const initialState = {
  currentQuestion: 0,
  score: 0,
  correctAns: 0,
  showResult: false,
  clicked: false,
};
let timerRef = null;

function Quizz() {
  const [timer, setTimer] = useState(30);
  // const [startTimer,setStartTimer] = useState(0)
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentQuestion, score, correctAns, showResult, clicked } = state;

  // Function to start the timer
  const startTimer = () => {
    setTimer(30);
  };

  // Create a function to move to the next question automatically
  // const moveToNextQuestion = () => {
  //   if (currentQuestion < questions.length - 1) {
  //     // Update the condition here
  //     dispatch({ type: NEXT_QUESTION });
  //     startTimer(); // Start the timer for the next question
  //   } else {
  //     // If all questions are answered, show results or perform any other action
  //     dispatch({ type: PLAY_AGAIN });
  //   }
  // };

  const handleNextQuestion = () => {
    // if (currentQuestion === questions.length - 1) {
    //   dispatch({ type: ANSWER_OPTION });
    // }
    // else {}
    dispatch({ type: NEXT_QUESTION });
    setTimer(30); // Reset the timer to 30 seconds for the next question
    // }
  };

  // start the timer when new questionis displayed
  useEffect(() => {
    if (!showResult && timer > 0) {
      timerRef = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion(); // Move to the next question if timer expires
    }
    return () => {
      clearTimeout(timerRef);
    };
  }, [currentQuestion, showResult, timer]);

  const handleAnswerOption = (isCorrect) => {
    if (!clicked) {
      if (isCorrect) {
        dispatch({ type: ANSWER_OPTION, payload: { isCorrect } });
      }
      // moveToNextQuestion(); // Move to the next question when an option is clicked
      // startTimer(); // Start the timer for the next question
    }
  };
  // const handleNextOption = () => {
  //   if (clicked) {
  //     if (currentQuestion < questions.length - 1) {
  //       handleSkipQuestion(); // Skip one question and move to the question after the next one
  //     } else {
  //       handleNextQuestion(); // Move to the next question if the current question is the last one
  //     }
  //   }
  // };
  const handleSkipQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      dispatch({ type: NEXT_QUESTION });
      startTimer(); // Start the timer for the next question
    }
    //  else {
    //   handleNextQuestion(); // Move to the next question if there are only two questions left
    // }
  };
  const SubmitQuiz = () => {
    if (!showResult) {
      dispatch({ type: SUBMIT_QUIZ });
      if (timer <= 0 || currentQuestion === questions.length - 1) {
        setTimer(0);
      }
    }
  };

  const handlePlayAgain = () => {
    dispatch({ type: PLAY_AGAIN });
    setTimer(30)
  };

  return (
    <>
      <div className="w-[650px] h-[550px] background bg-purple-400 rounded-lg ml-[480px] top-[100px] absolute">
        {showResult ? (
          <QuizzResults
            score={score}
            correctAns={correctAns}
            handlePlayAgain={handlePlayAgain}
          />
        ) : (
          <>
            <div className=" top-5 left-[30px] absolute ">
              <h1 className=" top-5 text-neutral-800 font-bold ml-4 text-3xl absolute">
                Score:{score}
              </h1>
              <div className="w-[250px] h-[120px] left-[370px] top-5 font-bold absolute">
                Time remaining: {timer} seconds
              </div>
              <span className="top-16 font-semibold left-[0px] text-black text-3xl relative">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="font-extralight top-[150px] ml-[40px] text-lg text-black font-sans absolute">
              {currentQuestion < questions.length && (
                <div>{questions[currentQuestion].questionText}</div>
              )}
            </div>

            <div className="top-[200px] ml-[50px] w-[400px] h-auto border-2 font-serif rounded flex flex-col absolute py-4 px-4 background bg-purple-500 ">
              {currentQuestion < questions.length &&
                questions[currentQuestion].answerOptions.map((ans, i) => (
                  <button
                    className={`my-2 font-serif px-2 py-2 bg-gray-200 rounded hover:bg-purple-400 ${
                      clicked && ans.isCorrect
                        ? "bg-green-400"
                        : clicked && !ans.isCorrect
                        ? "bg-red-400"
                        : ""
                    }`}
                    disabled={clicked}
                    key={i}
                    onClick={() => handleAnswerOption(ans.isCorrect)}
                  >
                    {ans.answerText}
                  </button>
                ))}
            </div>
            <div className="font-extralight top-[480px] ml-[50px] gap-8 flex flex-row text-lg absolute">
              <button
                onClick={handleSkipQuestion}
                className="w-[100px] h-12  font-semibold background bg-purple-600 font-sans border-2 border-solid rounded hover:bg-purple-400"
              >
                Skip
              </button>

              {currentQuestion < questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="w-[100px] h-12 ml-[200px] font-semibold background bg-purple-600 font-sans border-2 border-solid rounded hover:bg-purple-400"
                >
                  Next
                </button>
              )}

              {currentQuestion === questions.length - 1 && (
                <button
                  className={`w-[100px] h-12  font-semibold background bg-purple-600 font-sans border-2 border-solid rounded hover:bg-purple-400
                clicked && ans.isCorrect
                        ? "bg-green-400"
                        : clicked && !ans.isCorrect
                        ? "bg-red-400"
                        : ""
                    }`}
                  onClick={SubmitQuiz}
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Quizz;

//practice of useReducer

// const NEXT_QUESTION = "NEXT_QUESTION";
// const ANSWER_OPTION = "ANSWER_OPTION";
// const PLAY_AGAIN = "PLAY_AGAIN";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case NEXT_QUESTION:
//       return {
//         ...state,
//         currentQuestion: state.currentQuestion + 1,
//         clicked: false,
//       };
//     case ANSWER_OPTION:
//       const { isCorrect } = action.payload;
//       return {
//         ...state,
//         score: isCorrect ? state.score + 5 : state.score,
//         correctAns: isCorrect ? state.correctAns + 1 : state.correctAns,
//         clicked: true,
//       };
//     case PLAY_AGAIN:
//       return {
//         ...state,
//         currentQuestion: 0,
//         score: 0,
//         correctAns: 0,
//         showResult: false,
//       };
//     default:
//       return state;
//   }
// };
// const initialState = {
//   currentQuestion: 0,
//   score: 0,
//   correctAns: 0,
//   showResult: false,
//   clicked: false,
// };

// function Quizz() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { currentQuestion, score, correctAns, showResult, clicked } = state;

//   let timerRef = null;

//   // Create a function to move to the next question automatically
//   const moveToNextQuestion=()=>{
//     if(currentQuestion<questions.length){
//       dispatch({type : NEXT_QUESTION})
//     }
//     else{
//       // If all questions are answered, show results or perform any other action
//       dispatch({type : PLAY_AGAIN})
//     }
//   }
//   // start the timer when new questionis displayed
//   useEffect(()=>{
//     if(!showResult & !clicked){
//       timerRef = setTimeout(moveToNextQuestion, 3000)
//     }
//     return ()=>{
//       // Clear the timer when the component unmounts or when the question changes
//       clearTimeout(timerRef)
//     }
//   },[currentQuestion,showResult,clicked])

//   const handleNextOption = () => {
//     if (currentQuestion === questions.length - 1) {
//       dispatch({ type: NEXT_QUESTION });
//       dispatch({ type: PLAY_AGAIN });
//     } else {
//       dispatch({ type: NEXT_QUESTION });
//     }
//   };
//   const handleAnswerOption = (isCorrect) => {
//     if (!clicked) {
//       dispatch({ type: ANSWER_OPTION, payload: { isCorrect } });
//     }
//   };

//   const handlePlayAgain = () => {
//     dispatch({ type: PLAY_AGAIN });
//   };
