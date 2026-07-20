import { QuizRoom } from "@/components/quiz-room"
import { celoQuizData } from "@/lib/electro-quest-data"
import { notFound } from "next/navigation"

interface CeloQuizPageProps {
  params: Promise<{ id: string }>
}

export default async function CeloQuizPage({ params }: CeloQuizPageProps) {
  const { id } = await params
  const quiz = celoQuizData[id]

  if (!quiz) {
    notFound()
  }

  return <QuizRoom questions={quiz} questId={id} questType="celo" />
}

export async function generateStaticParams() {
  return Object.keys(celoQuizData).map((id) => ({ id }))
}
