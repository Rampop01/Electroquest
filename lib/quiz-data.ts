export const celoQuizData: Record<string, {
  questions: Array<{
    id: string;
    question: string;
    answers: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  }>;
  correctAnswers: Record<string, string>;
  title: string;
  description: string;
  nextUrl: string;
}> = {
  "1": {
    title: "Celo Network Foundations",
    description: "Test your knowledge about Celo's mobile-first blockchain mission",
    nextUrl: "/electro-quests/2",
    questions: [
      {
        id: "q1",
        question: "What is the primary mission of the Celo network?",
        answers: [
          { id: "a1", text: "Gaming and metaverse applications", isCorrect: false },
          { id: "a2", text: "Creating conditions for prosperity by connecting people globally through mobile-first finance", isCorrect: true },
          { id: "a3", text: "Enterprise blockchain solutions", isCorrect: false },
          { id: "a4", text: "Privacy-focused transactions", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What makes Celo unique compared to other blockchains?",
        answers: [
          { id: "a1", text: "It uses Proof of Work consensus", isCorrect: false },
          { id: "a2", text: "It cannot process smart contracts", isCorrect: false },
          { id: "a3", text: "It's mobile-first, allowing users to send crypto using phone numbers", isCorrect: true },
          { id: "a4", text: "It only works on desktop browsers", isCorrect: false }
        ]
      },
      {
        id: "q3",
        question: "What is the native token of the Celo network?",
        answers: [
          { id: "a1", text: "CELO", isCorrect: true },
          { id: "a2", text: "cUSD", isCorrect: false },
          { id: "a3", text: "CEL", isCorrect: false },
          { id: "a4", text: "CLO", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a3",
      q3: "a1"
    }
  },
  "2": {
    title: "Stablecoins & Mento Protocol",
    description: "Test your knowledge about Celo's stablecoin ecosystem and the Mento exchange",
    nextUrl: "/electro-quests/3",
    questions: [
      {
        id: "q1",
        question: "Which protocol enables decentralized stablecoin minting and exchange on Celo?",
        answers: [
          { id: "a1", text: "Uniswap", isCorrect: false },
          { id: "a2", text: "Mento Protocol", isCorrect: true },
          { id: "a3", text: "Aave", isCorrect: false },
          { id: "a4", text: "Compound", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What is cUSD on the Celo network?",
        answers: [
          { id: "a1", text: "A governance token", isCorrect: false },
          { id: "a2", text: "A wrapped version of USD Coin", isCorrect: false },
          { id: "a3", text: "Celo's native dollar-pegged stablecoin", isCorrect: true },
          { id: "a4", text: "A liquidity pool token", isCorrect: false }
        ]
      },
      {
        id: "q3",
        question: "Which of these is NOT a Celo stablecoin?",
        answers: [
          { id: "a1", text: "cUSD (Celo Dollar)", isCorrect: false },
          { id: "a2", text: "cEUR (Celo Euro)", isCorrect: false },
          { id: "a3", text: "cREAL (Celo Real)", isCorrect: false },
          { id: "a4", text: "cYEN (Celo Yen)", isCorrect: true }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a3",
      q3: "a4"
    }
  },
  "3": {
    title: "CELO Token & Governance",
    description: "Test your knowledge of Celo's governance model and tokenomics",
    nextUrl: "/electro-quests/4",
    questions: [
      {
        id: "q1",
        question: "How does CELO token governance work?",
        answers: [
          { id: "a1", text: "Only miners can vote", isCorrect: false },
          { id: "a2", text: "CELO holders can lock tokens to vote on governance proposals", isCorrect: true },
          { id: "a3", text: "There is no on-chain governance", isCorrect: false },
          { id: "a4", text: "Only the Celo Foundation can make decisions", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What can you earn by locking CELO tokens?",
        answers: [
          { id: "a1", text: "NFT rewards", isCorrect: false },
          { id: "a2", text: "Epoch rewards and voting rights", isCorrect: true },
          { id: "a3", text: "Free stablecoins", isCorrect: false },
          { id: "a4", text: "Airdrop eligibility only", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "4": {
    title: "Mobile-First Accessibility",
    description: "Explore Celo's Social Connect and phone-number identity system",
    nextUrl: "/electro-quests/5",
    questions: [
      {
        id: "q1",
        question: "What is Celo Social Connect?",
        answers: [
          { id: "a1", text: "A social media platform", isCorrect: false },
          { id: "a2", text: "A protocol that maps phone numbers to wallet addresses", isCorrect: true },
          { id: "a3", text: "A chat application", isCorrect: false },
          { id: "a4", text: "A DeFi lending protocol", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "Why is lightweight identity important on Celo?",
        answers: [
          { id: "a1", text: "It makes the blockchain slower", isCorrect: false },
          { id: "a2", text: "It enables sending crypto to anyone with just a phone number", isCorrect: true },
          { id: "a3", text: "It is only needed for compliance", isCorrect: false },
          { id: "a4", text: "It replaces smart contracts", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "5": {
    title: "Celo Ecosystem",
    description: "Discover Valora, MiniPay, and the wider Celo ecosystem",
    nextUrl: "/electro-quests/6",
    questions: [
      {
        id: "q1",
        question: "What is Valora?",
        answers: [
          { id: "a1", text: "A desktop trading platform", isCorrect: false },
          { id: "a2", text: "A mobile wallet built for the Celo ecosystem", isCorrect: true },
          { id: "a3", text: "A centralized exchange", isCorrect: false },
          { id: "a4", text: "A hardware wallet", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What is Opera MiniPay?",
        answers: [
          { id: "a1", text: "A Celo-integrated mobile payment feature in the Opera browser", isCorrect: true },
          { id: "a2", text: "A standalone crypto wallet", isCorrect: false },
          { id: "a3", text: "A DeFi lending platform", isCorrect: false },
          { id: "a4", text: "An NFT marketplace", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a1"
    }
  },
  "6": {
    title: "Ethereum L2 Transition",
    description: "Learn about Celo's transition to an Ethereum Layer 2",
    nextUrl: "/electro-quests/7",
    questions: [
      {
        id: "q1",
        question: "Why is Celo transitioning to an Ethereum L2?",
        answers: [
          { id: "a1", text: "To become incompatible with Ethereum", isCorrect: false },
          { id: "a2", text: "To leverage Ethereum's security while maintaining Celo's features", isCorrect: true },
          { id: "a3", text: "To abandon its mobile-first approach", isCorrect: false },
          { id: "a4", text: "To remove stablecoin support", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What benefit does L2 status bring to Celo users?",
        answers: [
          { id: "a1", text: "Higher gas fees", isCorrect: false },
          { id: "a2", text: "Access to Ethereum's vast liquidity and security guarantees", isCorrect: true },
          { id: "a3", text: "Slower transaction times", isCorrect: false },
          { id: "a4", text: "Fewer supported tokens", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "7": {
    title: "Celo Reserve & Stability",
    description: "Understand how Celo maintains stablecoin peg and reserve management",
    nextUrl: "/electro-quests/8",
    questions: [
      {
        id: "q1",
        question: "What backs the value of Celo stablecoins?",
        answers: [
          { id: "a1", text: "Nothing, they are purely algorithmic", isCorrect: false },
          { id: "a2", text: "The Celo Reserve, a diversified portfolio of crypto assets", isCorrect: true },
          { id: "a3", text: "USD held in bank accounts only", isCorrect: false },
          { id: "a4", text: "Gold reserves", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "How can users expand or contract the stablecoin supply?",
        answers: [
          { id: "a1", text: "By mining new stablecoins", isCorrect: false },
          { id: "a2", text: "Through the Mento exchange, trading CELO for stablecoins and vice versa", isCorrect: true },
          { id: "a3", text: "Only the Foundation can do this", isCorrect: false },
          { id: "a4", text: "Stablecoins have a fixed supply", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "8": {
    title: "Regenerative Finance (ReFi)",
    description: "Explore Celo's commitment to sustainability and positive environmental impact",
    nextUrl: "/electro-quests/9",
    questions: [
      {
        id: "q1",
        question: "What is Regenerative Finance (ReFi) on Celo?",
        answers: [
          { id: "a1", text: "A type of high-frequency trading", isCorrect: false },
          { id: "a2", text: "Financial systems that create positive social and environmental outcomes", isCorrect: true },
          { id: "a3", text: "A lending protocol", isCorrect: false },
          { id: "a4", text: "A token launchpad", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What role does the Celo Climate Collective play?",
        answers: [
          { id: "a1", text: "It tracks weather data on-chain", isCorrect: false },
          { id: "a2", text: "It brings organizations together to fight climate change using blockchain technology", isCorrect: true },
          { id: "a3", text: "It sells carbon credits exclusively", isCorrect: false },
          { id: "a4", text: "It mines Bitcoin using renewable energy", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "9": {
    title: "Developer Experience",
    description: "Learn about building dApps and smart contracts on Celo",
    nextUrl: "/electro-quests/10",
    questions: [
      {
        id: "q1",
        question: "What smart contract language does Celo support?",
        answers: [
          { id: "a1", text: "Only Rust", isCorrect: false },
          { id: "a2", text: "Solidity and all EVM-compatible languages", isCorrect: true },
          { id: "a3", text: "Only Move", isCorrect: false },
          { id: "a4", text: "Only JavaScript", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What unique feature does Celo offer for gas fees?",
        answers: [
          { id: "a1", text: "Gas fees are always free", isCorrect: false },
          { id: "a2", text: "Users can pay gas fees using stablecoins like cUSD", isCorrect: true },
          { id: "a3", text: "Gas fees can only be paid in ETH", isCorrect: false },
          { id: "a4", text: "There are no gas fees on Celo", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "10": {
    title: "Global Inclusion",
    description: "Discover how Celo enables financial access in emerging markets",
    nextUrl: "/electro-victory",
    questions: [
      {
        id: "q1",
        question: "How does Celo aim to serve the unbanked population?",
        answers: [
          { id: "a1", text: "By building physical bank branches", isCorrect: false },
          { id: "a2", text: "Through mobile-accessible financial tools that only require a smartphone", isCorrect: true },
          { id: "a3", text: "By issuing credit cards", isCorrect: false },
          { id: "a4", text: "Through ATM networks", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "Which region has seen significant Celo adoption for mobile payments?",
        answers: [
          { id: "a1", text: "North America only", isCorrect: false },
          { id: "a2", text: "Africa and Latin America", isCorrect: true },
          { id: "a3", text: "Antarctica", isCorrect: false },
          { id: "a4", text: "Celo has no real-world adoption", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  }
};
