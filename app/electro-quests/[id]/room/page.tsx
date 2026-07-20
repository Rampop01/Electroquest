import QuestRoom from "@/components/quest-room"
import { electroQuestRooms } from "@/lib/electro-quest-data"
import { notFound } from "next/navigation"

interface ElectroquestRoomPageProps {
  params: Promise<{ id: string }>
}

export default async function ElectroquestRoomPage({ params }: ElectroquestRoomPageProps) {
  const { id } = await params
  const questData = electroQuestRooms[id as keyof typeof electroQuestRooms]

  if (!questData) {
    notFound()
  }

  return <QuestRoom questId={id} questType="celo" />
}

export async function generateStaticParams() {
  return Object.keys(electroQuestRooms).map((id) => ({ id }))
}