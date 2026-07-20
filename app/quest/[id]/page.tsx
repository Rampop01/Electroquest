import QuestRoom from "@/components/quest-room"
import { questRooms } from "@/lib/quest-data"
import { notFound } from "next/navigation"

interface QuestPageProps {
  params: Promise<{ id: string }>
}

export default async function QuestPage({ params }: QuestPageProps) {
  const { id } = await params
  const questData = questRooms[id]

  if (!questData) {
    notFound()
  }

  return <QuestRoom questId={id} questType="ethereum" />
}

export async function generateStaticParams() {
  return Object.keys(questRooms).map((id) => ({ id }))
}
