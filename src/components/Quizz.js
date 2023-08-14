import React, { useState } from "react";
import questions from "./QuizzData";
import QuizzResults from "./QuizzResults";

function Quizz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleNextOption = () => {
    setClicked(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      console.log("questions are completed");
    }
  };
  // let timerRef = useRef(null);

  // // Create a function to move to the next question automatically
  // const moveToNextQuestion = () => {
  //   if (currentQuestion < questions.length) {
  //     const nextQuestion = currentQuestion + 1;
  //     setCurrentQuestion(nextQuestion);

  //   } else {
  //     // If all questions are answered, show results or perform any other action

  //     setShowResult(true);
  //   }
  // };
  // // start the timer when new questionis displayed
  // useEffect(() => {
  //   if (!showResult & !clicked) {
  //     timerRef.current = setTimeout(moveToNextQuestion, 3000);
  //     console.log(timerRef.current)
  //   }
  //   return () => {
  //     // Clear the timer when the component unmounts or when the question changes
  //     clearTimeout(timerRef);
  //   };
  // }, [currentQuestion, showResult, clicked]);
  const handleAnswerOption = (isCorrect) => {
    if (isCorrect === "true") {
      setScore(score + 5);
      setCorrectAns(correctAns + 1);
    }
    setClicked(true);
  };
  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAns(0);
    setShowResult(false);
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
            <div className="w-[250px] h-[250px] top-5 left-[30px] absolute backdrop-blur">
              <h1 className=" top-5 text-neutral-800 font-bold ml-4 text-3xl absolute">
                Score:{score}
              </h1>
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
              {questions[currentQuestion].answerOptions.map((ans, i) => {
                return (
                  <button
                    className="my-2 font-serif px-2 py-2 bg-gray-200 rounded hover:bg-purple-400  $`{
                      ans.isCorrect ? 'bg-green-400' : 'bg-gray-200'
                    }`  }"
                    disabled={clicked}
                    key={i}
                    onClick={() => handleAnswerOption(ans.isCorrect)}
                  >
                    {ans.answerText}
                  </button>
                );
              })}
            </div>
            <div className="font-extralight top-[480px] ml-[50px] gap-8 flex flex-row text-lg absolute">
              <button
                onClick={handlePlayAgain}
                className="w-[100px] h-12  font-semibold background bg-purple-600 font-sans border-2 border-solid rounded hover:bg-purple-400"
              >
                Quit
              </button>
              <button
                className="w-[100px] h-12  font-semibold background bg-purple-600 font-sans border-2 border-solid rounded hover:bg-purple-400"
                onClick={handleNextOption}
                disabled={!clicked}
              >
                Next
              </button>
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
