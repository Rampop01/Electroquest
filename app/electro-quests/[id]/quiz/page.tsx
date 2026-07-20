import { QuizRoom } from "@/components/quiz-room"
import { electroQuizData } from "@/lib/quiz-data"
import { notFound } from "next/navigation"

interface CeloQuizPageProps {
  params: Promise<{ id: string }>
}

export default async function CeloQuizPage({ params }: CeloQuizPageProps) {
  const { id } = await params
  const quiz = electroQuizData[id]

  if (!quiz) {
    notFound()
  }

  return <QuizRoom questions={quiz} questId={id} questType="celo" />
}

export async function generateStaticParams() {
  return Object.keys(electroQuizData).map((id) => ({ id }))
}
