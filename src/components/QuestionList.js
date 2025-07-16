import React,{useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
 const [questions,setQuestions]= useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(res=>res.json())
    .then((questions)=>setQuestions(questions))
  },[questions])

   function handleDelete(event){
    const id = event.target.id
    fetch(`http://localhost:4000/questions/${id}`,
      {
      method: "DELETE",
    }).then(res=>res.json()).then(()=>{
      setQuestions((questions)=>questions.filter((q)=>q.id !== id))
    })
  }
    
 

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question)=>{
       return <QuestionItem question={question} deleteQuestion={handleDelete}/>
      })}</ul>
    </section>
  );
}

export default QuestionList;
