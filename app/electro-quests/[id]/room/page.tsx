import { StageMiniGame } from "@/components/minigames/StageMiniGame"
import { electroScrollContent } from "@/lib/electro-quest-data"
import { notFound } from "next/navigation"

interface ElectroquestRoomPageProps {
  params: Promise<{ id: string }>
}

export default async function ElectroquestRoomPage({ params }: ElectroquestRoomPageProps) {
  const { id } = await params
  const questData = electroScrollContent[id]

  if (!questData) {
    notFound()
  }

  return <StageMiniGame questId={id} questType="electroneum" />
}

export async function generateStaticParams() {
  return Object.keys(electroScrollContent).map((id) => ({ id }))
}