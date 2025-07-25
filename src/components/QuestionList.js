import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // Fetch questions on mount
  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setQuestions(data);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    return () => {
      isMounted = false;
    };
  }, []);

  // Delete handler
  function handleDelete(event) {
    const id= event.target.id
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        // No need to parse JSON on DELETE if no body returned
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== parseInt(id))
        );
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            deleteQuestion={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

