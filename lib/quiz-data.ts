export const electroQuizData: Record<string, {
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
    title: "Electroneum Foundations",
    description: "Test your knowledge about Electroneum's mission and goals.",
    nextUrl: "/electro-quests/2",
    questions: [
      {
        id: "q1",
        question: "What is the primary mission of the Electroneum network?",
        answers: [
          { id: "a1", text: "To create a high-frequency trading platform", isCorrect: false },
          { id: "a2", text: "To empower the unbanked and provide global financial inclusion", isCorrect: true },
          { id: "a3", text: "To build enterprise supply chain solutions", isCorrect: false },
          { id: "a4", text: "To focus exclusively on metaverse gaming", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What type of transactions is Electroneum specifically designed for?",
        answers: [
          { id: "a1", text: "Large institutional transfers", isCorrect: false },
          { id: "a2", text: "High-speed, low-cost micro-transactions", isCorrect: true },
          { id: "a3", text: "Slow, highly encrypted cross-border settlements", isCorrect: false },
          { id: "a4", text: "Only NFT minting", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "2": {
    title: "The ETN Token",
    description: "Test your knowledge about the native ETN token.",
    nextUrl: "/electro-quests/3",
    questions: [
      {
        id: "q1",
        question: "What is the native cryptocurrency of the Electroneum network?",
        answers: [
          { id: "a1", text: "ETH", isCorrect: false },
          { id: "a2", text: "ETN", isCorrect: true },
          { id: "a3", text: "CELO", isCorrect: false },
          { id: "a4", text: "USDT", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "How can ETN be used in the real world?",
        answers: [
          { id: "a1", text: "It cannot be used in the real world", isCorrect: false },
          { id: "a2", text: "Only to pay for smart contract deployments", isCorrect: false },
          { id: "a3", text: "For mobile airtime top-ups and utility payments in many countries", isCorrect: true },
          { id: "a4", text: "Only as a governance voting mechanism", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a3"
    }
  },
  "3": {
    title: "AnyTask Platform",
    description: "Learn about Electroneum's freelance platform.",
    nextUrl: "/electro-quests/4",
    questions: [
      {
        id: "q1",
        question: "What is AnyTask?",
        answers: [
          { id: "a1", text: "A decentralized exchange (DEX)", isCorrect: false },
          { id: "a2", text: "A global freelance platform where users earn ETN without needing a bank account", isCorrect: true },
          { id: "a3", text: "A tool for deploying smart contracts", isCorrect: false },
          { id: "a4", text: "A mobile wallet application", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "How much seller fees do freelancers pay on AnyTask?",
        answers: [
          { id: "a1", text: "20%", isCorrect: false },
          { id: "a2", text: "10%", isCorrect: false },
          { id: "a3", text: "Zero seller fees (they keep 100% of what they earn)", isCorrect: true },
          { id: "a4", text: "5% plus gas fees", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a3"
    }
  },
  "4": {
    title: "IBFT Smart Chain",
    description: "Test your knowledge of Electroneum's consensus mechanism.",
    nextUrl: "/electro-quests/5",
    questions: [
      {
        id: "q1",
        question: "What consensus mechanism does Electroneum currently use?",
        answers: [
          { id: "a1", text: "Proof of Work (PoW)", isCorrect: false },
          { id: "a2", text: "Delegated Proof of Stake (DPoS)", isCorrect: false },
          { id: "a3", text: "Istanbul Byzantine Fault Tolerance (IBFT)", isCorrect: true },
          { id: "a4", text: "Proof of History (PoH)", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What is a major benefit of the IBFT consensus?",
        answers: [
          { id: "a1", text: "It allows mining with standard GPUs", isCorrect: false },
          { id: "a2", text: "Fast transaction finality without the risk of chain reorgs", isCorrect: true },
          { id: "a3", text: "It requires no validators", isCorrect: false },
          { id: "a4", text: "It consumes massive amounts of electricity", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a3",
      q2: "a2"
    }
  },
  "5": {
    title: "EVM Compatibility",
    description: "Understand Electroneum's integration with Ethereum tooling.",
    nextUrl: "/electro-quests/6",
    questions: [
      {
        id: "q1",
        question: "What does EVM compatibility mean for Electroneum?",
        answers: [
          { id: "a1", text: "It can run Ethereum smart contracts with little to no modifications", isCorrect: true },
          { id: "a2", text: "It is a token built on the Ethereum mainnet", isCorrect: false },
          { id: "a3", text: "It requires developers to learn a brand new programming language", isCorrect: false },
          { id: "a4", text: "It shares gas fees directly with Ethereum miners", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "Which popular wallet can be used with Electroneum due to EVM compatibility?",
        answers: [
          { id: "a1", text: "MetaMask", isCorrect: true },
          { id: "a2", text: "Phantom", isCorrect: false },
          { id: "a3", text: "Daedalus", isCorrect: false },
          { id: "a4", text: "Electrum", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1"
    }
  },
  "6": {
    title: "Enterprise Validators",
    description: "Learn about network security on Electroneum.",
    nextUrl: "/electro-quests/7",
    questions: [
      {
        id: "q1",
        question: "Who secures the Electroneum network?",
        answers: [
          { id: "a1", text: "Anonymous individual miners", isCorrect: false },
          { id: "a2", text: "Known, trusted Enterprise Validators like NGOs and universities", isCorrect: true },
          { id: "a3", text: "A single central server run by the Electroneum team", isCorrect: false },
          { id: "a4", text: "Delegated nodes chosen by random lottery", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What is a unique aspect of Electroneum's validators?",
        answers: [
          { id: "a1", text: "They can rewrite transaction history", isCorrect: false },
          { id: "a2", text: "Many use their block rewards to fund charitable and educational initiatives", isCorrect: true },
          { id: "a3", text: "They require specialized ASIC hardware to participate", isCorrect: false },
          { id: "a4", text: "They are completely hidden from the public", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "7": {
    title: "Micro-transactions",
    description: "Test your knowledge on ETN's transaction structure.",
    nextUrl: "/electro-quests/8",
    questions: [
      {
        id: "q1",
        question: "Why are micro-transactions feasible on Electroneum?",
        answers: [
          { id: "a1", text: "Because transactions are processed off-chain", isCorrect: false },
          { id: "a2", text: "Because the network has near-zero gas fees", isCorrect: true },
          { id: "a3", text: "Because it uses a centralized database for small transfers", isCorrect: false },
          { id: "a4", text: "Because users bundle transactions once a month", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What use case benefits most from micro-transactions?",
        answers: [
          { id: "a1", text: "Buying real estate", isCorrect: false },
          { id: "a2", text: "Daily wage payouts and tipping content creators", isCorrect: true },
          { id: "a3", text: "Executing large institutional trades", isCorrect: false },
          { id: "a4", text: "Staking large amounts of capital for long-term yield", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "8": {
    title: "Real-World Utility",
    description: "Explore the practical uses of the Electroneum ecosystem.",
    nextUrl: "/electro-quests/9",
    questions: [
      {
        id: "q1",
        question: "Which of the following is a common real-world use for ETN?",
        answers: [
          { id: "a1", text: "Paying for Ethereum gas fees", isCorrect: false },
          { id: "a2", text: "Purchasing mobile airtime and data top-ups", isCorrect: true },
          { id: "a3", text: "Minting Bitcoin Ordinals", isCorrect: false },
          { id: "a4", text: "Paying for traditional bank transfers", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "Why does Electroneum prioritize real-world utility over speculation?",
        answers: [
          { id: "a1", text: "Because speculators are banned from holding the token", isCorrect: false },
          { id: "a2", text: "Because its mission is to solve everyday problems for people in emerging markets", isCorrect: true },
          { id: "a3", text: "Because it lacks a decentralized exchange", isCorrect: false },
          { id: "a4", text: "Because the token value is strictly pegged to the US Dollar", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2"
    }
  },
  "9": {
    title: "Sustainability",
    description: "Learn about the environmental impact of Electroneum.",
    nextUrl: "/electro-quests/10",
    questions: [
      {
        id: "q1",
        question: "How does Electroneum's consensus mechanism impact its energy usage?",
        answers: [
          { id: "a1", text: "It requires massive server farms to run", isCorrect: false },
          { id: "a2", text: "It is incredibly energy-efficient compared to Proof of Work networks", isCorrect: true },
          { id: "a3", text: "It uses exactly the same energy as Bitcoin", isCorrect: false },
          { id: "a4", text: "It requires validators to use diesel generators", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "Why is sustainability important for a global blockchain?",
        answers: [
          { id: "a1", text: "It aligns with global efforts to reduce carbon footprints and combat climate change", isCorrect: true },
          { id: "a2", text: "It makes transactions slower and more secure", isCorrect: false },
          { id: "a3", text: "It is a requirement for all smart contracts", isCorrect: false },
          { id: "a4", text: "It increases the token price artificially", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a1"
    }
  },
  "10": {
    title: "Global Ecosystem",
    description: "Discover the worldwide reach of Electroneum.",
    nextUrl: "/electro-victory",
    questions: [
      {
        id: "q1",
        question: "In which regions has Electroneum seen significant adoption?",
        answers: [
          { id: "a1", text: "Only in North America", isCorrect: false },
          { id: "a2", text: "Africa, Latin America, and Asia", isCorrect: true },
          { id: "a3", text: "Only in Europe", isCorrect: false },
          { id: "a4", text: "Only in Antarctica", isCorrect: false }
        ]
      },
      {
        id: "q2",
        question: "What role does Electroneum play in the broader Web3 ecosystem?",
        answers: [
          { id: "a1", text: "It acts as a bridge bringing real-world utility and unbanked users into the digital economy", isCorrect: true },
          { id: "a2", text: "It serves exclusively as a privacy coin for anonymous transactions", isCorrect: false },
          { id: "a3", text: "It competes directly with Bitcoin as a store of value", isCorrect: false },
          { id: "a4", text: "It is a centralized database controlled by a single government", isCorrect: false }
        ]
      }
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a1"
    }
  }
};
