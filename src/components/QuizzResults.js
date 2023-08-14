import React from 'react'
import questions from './QuizzData'

function QuizzResults(props) {
  return (
    <div className="w-[650px] h-[550px] background bg-purple-600 rounded-lg  absolute">

        <h2 className=' background bg-purple-400 rounded-lg px-3 py-3 ml-[235px] top-[80px] justify-center font-bold text-3xl absolute'>
          Completed!</h2>
        <h4 className=' background bg-purple-400 rounded-lg px-3 py-3 ml-[190px] top-[170px] justify-center font-bold text-3xl absolute'>
          Total Score {props.score}/75</h4>
        <h4 className=' background bg-purple-400 rounded-lg px-3 py-3 ml-[130px] top-[260px] justify-center font-bold text-2xl absolute'>
          Your corrrect question is {props.correctAns} out of {questions.length}</h4>
        <button   className="w-[140px] h-12 top-[340px] left-[260px] text-2xl font-semibold background bg-purple-400 font-sans border-2 border-solid rounded hover:bg-purple-600 absolute"
        onClick={props.handlePlayAgain}>Play Again</button>
    </div>
  )
}

export default QuizzResults