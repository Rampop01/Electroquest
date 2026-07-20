import { QuizRoom } from "@/components/quiz-room"
import { electroQuizData } from "@/lib/quiz-data"
import { notFound } from "next/navigation"

interface CeloQuizPageProps {
  params: Promise<{ id: string }>
}

export default async function ElectroQuizPage({ params }: CeloQuizPageProps) {
  const { id } = await params
  const quiz = electroQuizData[id]

  if (!quiz) {
    notFound()
  }

  const formattedQuestions = quiz.questions.map((q) => {
    const correctAnswerIndex = q.answers.findIndex((a) => a.isCorrect);
    return {
      question: q.question,
      options: q.answers.map((a) => a.text),
      correctAnswer: correctAnswerIndex,
    };
  });

  return <QuizRoom questions={formattedQuestions} questId={id} questType="electroneum" />
}

export async function generateStaticParams() {
  return Object.keys(electroQuizData).map((id) => ({ id }))
}
