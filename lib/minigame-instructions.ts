export interface GameInstruction {
  title: string
  subtitle: string
  objective: string
  reward: string
  desktopControls: string[]
  mobileControls: string[]
  proTip: string
}

export const MINIGAME_INSTRUCTIONS: Record<number, GameInstruction> = {
  1: {
    title: "Temple Runner: ETN Gathering",
    subtitle: "Stage 1 Quest • Electroneum Foundations",
    objective: "Sprint down the ancient corridor, dodge the rotating spike hazards, and gather 20 golden ETN energy balls to power the portal.",
    reward: "5 ETN + 100 XP + Foundation Rune",
    desktopControls: ["A / D or Left / Right Arrows to switch lanes", "Space to Jump over low obstacles"],
    mobileControls: ["Tap Left / Right arrows to switch lanes", "Tap Jump button to leap over obstacles"],
    proTip: "Timing is everything! Stay in the middle lane when approaching split hazards.",
  },
  2: {
    title: "Validator Defense: Anomaly Purge",
    subtitle: "Stage 2 Quest • IBFT 2.0 Consensus",
    objective: "Protect the central validator sanctuary crystals from 12 corrupted network anomalies by aiming and blasting laser bolts.",
    reward: "5 ETN + 100 XP + Consensus Rune",
    desktopControls: ["Click anywhere on screen to fire laser bolts in that direction"],
    mobileControls: ["Tap anywhere on the arena to fire directly at incoming anomalies"],
    proTip: "Prioritize anomalies that are closest to the central crystal ring.",
  },
  3: {
    title: "Dungeon Labyrinth: Relic Recovery",
    subtitle: "Stage 3 Quest • AnyTask Ecosystem",
    objective: "Navigate the winding stone maze, recover all 3 ancient Electroneum Relics, dodge the patrolling sentinel drone, and reach the golden exit portal.",
    reward: "5 ETN + 100 XP + AnyTask Seal",
    desktopControls: ["W A S D or Arrow Keys to walk through the labyrinth"],
    mobileControls: ["Use on-screen Directional D-Pad to move through the corridors"],
    proTip: "Watch the red sentinel's patrol light from around corners before moving.",
  },
  4: {
    title: "Sky Platformer: Finality Leap",
    subtitle: "Stage 4 Quest • 5-Second Deterministic Finality",
    objective: "Leap across 4 floating cosmic stone islands, collect the 4 Finality Runes, and reach the glowing Finality Apex without falling into the void.",
    reward: "5 ETN + 100 XP + Finality Rune",
    desktopControls: ["A / D to move sideways, W / S for depth", "Space to Jump across island gaps"],
    mobileControls: ["Use Touch D-Pad to walk", "Tap the big JUMP button to leap across islands"],
    proTip: "Wait for moving islands to reach their closest point before jumping.",
  },
  5: {
    title: "EVM Opcode Stack: Smart Contract Forge",
    subtitle: "Stage 5 Quest • EVM & Solidity Compatibility",
    objective: "Time your drops from the swinging crane to stack 5 Solidity opcode blocks (PUSH32, MSTORE, CALL, RETURN) into a stable tower.",
    reward: "5 ETN + 100 XP + EVM Spire",
    desktopControls: ["Press Spacebar or Click anywhere to release the swinging block"],
    mobileControls: ["Tap the DROP BLOCK button when the crane aligns over the base"],
    proTip: "Release the block just as the crane passes directly over the center of the tower.",
  },
  6: {
    title: "Orbital Enterprise Shield",
    subtitle: "Stage 6 Quest • Academic & NGO Validators",
    objective: "Rotate your orbital energy shield around the central node to deflect 12 incoming cyber-attacks away from Cambridge & Oxford validator nodes.",
    reward: "5 ETN + 100 XP + Enterprise Aegis",
    desktopControls: ["Move your mouse cursor or use A / D keys to spin the orbital shield"],
    mobileControls: ["Touch and drag around the circle or tap Left / Right rotation buttons"],
    proTip: "Position the center of your shield facing the incoming red particle trajectories.",
  },
  7: {
    title: "Micro-Warp Tunnel Flight",
    subtitle: "Stage 7 Quest • Near-Zero Gas & Instant Routing",
    objective: "Fly your energy probe down the high-speed cyber warp tunnel. Steer through 8 golden Gas Boost rings while dodging firewall obstacles.",
    reward: "5 ETN + 100 XP + Warp Conduit",
    desktopControls: ["W A S D or Arrow Keys to steer up, down, left, right in the tunnel"],
    mobileControls: ["Use the on-screen Flight D-Pad to navigate through the tunnel"],
    proTip: "Follow the golden ring trail — rings usually indicate the safest flight path.",
  },
  8: {
    title: "Global Utility Grid: 160+ Country Mesh",
    subtitle: "Stage 8 Quest • Real-World Mobile Utility",
    objective: "Connect the global real-world utility mesh by tapping 5 key telecommunication hubs around the 3D Earth (London, Lagos, Nairobi, Sao Paulo, Manila).",
    reward: "5 ETN + 100 XP + Global Mesh Rune",
    desktopControls: ["Click directly on pulsing country hubs to link them to the Electroneum grid"],
    mobileControls: ["Tap on glowing country hubs on the 3D globe to establish connections"],
    proTip: "The globe gently rotates — watch for the bright yellow beacons to appear.",
  },
  9: {
    title: "Eco-Validator Solar Prism",
    subtitle: "Stage 9 Quest • Green & Zero-Carbon Network",
    objective: "Rotate 3 crystal prisms to direct solar photon light rays into the zero-carbon consensus crystal until it reaches 100% clean power.",
    reward: "5 ETN + 100 XP + Solar Core",
    desktopControls: ["Click on each prism to rotate it by 45 degrees until the beam connects"],
    mobileControls: ["Tap on each prism to rotate its reflective angle into alignment"],
    proTip: "Prism 1 reflects to Prism 2, Prism 2 reflects to Prism 3, and Prism 3 charges the core.",
  },
  10: {
    title: "The Aurelius Grand Arena: Boss Battle",
    subtitle: "Stage 10 • Final Boss of Electroneum",
    objective: "Conquer the ancient Aurelius Guardian! Jump over expanding shockwave energy rings, collect all 4 Grand Relics (IBFT, EVM, AnyTask, ETN), and crown the altar.",
    reward: "5 ETN + 100 XP + Grand Master Aurelius Trophy",
    desktopControls: ["W A S D to move around the arena", "Space to Jump over expanding shockwave rings"],
    mobileControls: ["Use on-screen D-Pad to move", "Tap JUMP when the golden shockwave approaches"],
    proTip: "Keep your eyes on the central colossus — jump right before the wave reaches your feet!",
  },
}
