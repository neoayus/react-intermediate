export default function Question({question}){
  // console.log(question);
  return(
    <div>
      <h4>{question.question}</h4>
      <Options question={question}/> 
    </div>
  )
}

function Options({question}){
  return(
    <div className="options">
      {question.options.map(option => <button className="btn btn" key={option}>{option}</button>)} 
    </div>
  )
}