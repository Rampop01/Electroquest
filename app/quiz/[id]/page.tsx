import { QuizRoom } from "@/components/quiz-room"
import { quizData } from "@/lib/quest-data"
import { notFound } from "next/navigation"

interface QuizPageProps {
  params: Promise<{ id: string }>
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params
  const quiz = quizData[id]

  if (!quiz) {
    notFound()
  }

  return <QuizRoom questions={quiz} questId={id} questType="ethereum" />
}

export async function generateStaticParams() {
  return Object.keys(quizData).map((id) => ({ id }))
}
