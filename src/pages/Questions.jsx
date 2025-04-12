import QuestionCard from '../components/QuestionCard'

export default function Questions() {
  const questions = [
    { id: 1, question: "What is Raspberry Pi?" },
    { id: 2, question: "What is React used for?" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Questions</h1>
      <div className="space-y-4">
        {questions.map(q => <QuestionCard key={q.id} question={q.question} />)}
      </div>
    </div>
  )
}

