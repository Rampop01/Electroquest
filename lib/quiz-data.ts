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
    description: "Test your knowledge about Electroneum's mission and core philosophy.",
    nextUrl: "/electro-quests/2",
    questions: [
      {
        id: "q1",
        question: "What is the primary mission of the Electroneum network?",
        answers: [
          { id: "a1", text: "To create a high-frequency trading platform", isCorrect: false },
          { id: "a2", text: "To empower the unbanked and provide global financial inclusion", isCorrect: true },
          { id: "a3", text: "To build enterprise supply chain solutions", isCorrect: false },
          { id: "a4", text: "To focus exclusively on metaverse gaming", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What type of transactions is Electroneum specifically optimized for?",
        answers: [
          { id: "a1", text: "Large multi-million dollar institutional settlements", isCorrect: false },
          { id: "a2", text: "High-speed, near-zero-cost micro-transactions for everyday payments", isCorrect: true },
          { id: "a3", text: "Slow monthly batch transactions", isCorrect: false },
          { id: "a4", text: "Only NFT minting", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "What major network upgrade brought EVM smart contracts to Electroneum?",
        answers: [
          { id: "a1", text: "The Aurelius Smart Chain upgrade", isCorrect: true },
          { id: "a2", text: "The London Hardfork", isCorrect: false },
          { id: "a3", text: "The Merge", isCorrect: false },
          { id: "a4", text: "The SegWit update", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Who does Electroneum primarily target with its mobile-first financial ecosystem?",
        answers: [
          { id: "a1", text: "Only institutional crypto hedge funds", isCorrect: false },
          { id: "a2", text: "Developing markets and unbanked populations needing access to digital economy", isCorrect: true },
          { id: "a3", text: "Supercomputer research facilities", isCorrect: false },
          { id: "a4", text: "Central banks exclusively", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What familiar programming environment can developers use on Electroneum today?",
        answers: [
          { id: "a1", text: "Solidity & the Ethereum Virtual Machine (EVM)", isCorrect: true },
          { id: "a2", text: "Assembly only", isCorrect: false },
          { id: "a3", text: "Fortran", isCorrect: false },
          { id: "a4", text: "Custom unverified scripting language", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2",
      q3: "a1",
      q4: "a2",
      q5: "a1",
    },
  },
  "2": {
    title: "The ETN Token",
    description: "Test your knowledge about the native ETN token and its tokenomics.",
    nextUrl: "/electro-quests/3",
    questions: [
      {
        id: "q1",
        question: "What is the native cryptocurrency of the Electroneum network?",
        answers: [
          { id: "a1", text: "ETH", isCorrect: false },
          { id: "a2", text: "ETN", isCorrect: true },
          { id: "a3", text: "CELO", isCorrect: false },
          { id: "a4", text: "USDT", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "How can ETN be used directly in the real world?",
        answers: [
          { id: "a1", text: "It cannot be used in the real world", isCorrect: false },
          { id: "a2", text: "Only to pay for smart contract deployments", isCorrect: false },
          { id: "a3", text: "For mobile airtime top-ups, data bundles, and utility payments in 160+ countries", isCorrect: true },
          { id: "a4", text: "Only as a governance voting mechanism", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "What makes ETN ideal for small everyday retail transactions?",
        answers: [
          { id: "a1", text: "High unit denomination and microscopic transfer fees", isCorrect: true },
          { id: "a2", text: "High volatility and 1-hour confirmation times", isCorrect: false },
          { id: "a3", text: "Manual bank approval required for every send", isCorrect: false },
          { id: "a4", text: "Mandatory 20% network burn on every purchase", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "On Electroneum, what asset is used to pay for transaction gas fees?",
        answers: [
          { id: "a1", text: "ETN", isCorrect: true },
          { id: "a2", text: "Bitcoin", isCorrect: false },
          { id: "a3", text: "Ether", isCorrect: false },
          { id: "a4", text: "US Dollars", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "How are ETN transaction fees compared to legacy blockchains like Bitcoin or Ethereum Layer 1?",
        answers: [
          { id: "a1", text: "Sub-cent (fractions of a penny), near-zero gas", isCorrect: true },
          { id: "a2", text: "Significantly more expensive", isCorrect: false },
          { id: "a3", text: "Exactly $10 per transaction", isCorrect: false },
          { id: "a4", text: "Randomly calculated based on stock market prices", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a3",
      q3: "a1",
      q4: "a1",
      q5: "a1",
    },
  },
  "3": {
    title: "AnyTask Platform",
    description: "Learn about Electroneum's groundbreaking freelance ecosystem.",
    nextUrl: "/electro-quests/4",
    questions: [
      {
        id: "q1",
        question: "What is AnyTask?",
        answers: [
          { id: "a1", text: "A decentralized exchange (DEX)", isCorrect: false },
          { id: "a2", text: "A global freelance platform allowing digital workers to earn ETN without a bank account", isCorrect: true },
          { id: "a3", text: "A tool for mining cryptocurrency", isCorrect: false },
          { id: "a4", text: "A hardware wallet manufacturer", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "How much seller commission fee do freelancers pay on AnyTask?",
        answers: [
          { id: "a1", text: "20% (like traditional platforms)", isCorrect: false },
          { id: "a2", text: "10%", isCorrect: false },
          { id: "a3", text: "Zero seller fees (freelancers keep 100% of their earnings)", isCorrect: true },
          { id: "a4", text: "5% plus gas fees", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Do buyers on AnyTask need to own cryptocurrency to purchase services?",
        answers: [
          { id: "a1", text: "Yes, they can only pay with Bitcoin", isCorrect: false },
          { id: "a2", text: "No, buyers can pay with credit/debit cards, and sellers receive ETN automatically", isCorrect: true },
          { id: "a3", text: "They must wire physical gold", isCorrect: false },
          { id: "a4", text: "They must run a full node to transact", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Why is AnyTask especially revolutionary for workers in developing countries?",
        answers: [
          { id: "a1", text: "They can monetize digital skills globally without requiring a local bank account or credit history", isCorrect: true },
          { id: "a2", text: "It gives away free mining equipment", isCorrect: false },
          { id: "a3", text: "It requires citizenship in the EU", isCorrect: false },
          { id: "a4", text: "It locks their earnings for 5 years", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What can AnyTask freelancers do immediately with their earned ETN?",
        answers: [
          { id: "a1", text: "Top up their mobile phones, pay for local utilities, or trade it", isCorrect: true },
          { id: "a2", text: "Nothing, it cannot be spent anywhere", isCorrect: false },
          { id: "a3", text: "They must wait 90 days for central clearance", isCorrect: false },
          { id: "a4", text: "Only burn it", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a3",
      q3: "a2",
      q4: "a1",
      q5: "a1",
    },
  },
  "4": {
    title: "IBFT 2.0 Consensus & Fast Finality",
    description: "Test your knowledge of Electroneum's consensus mechanism.",
    nextUrl: "/electro-quests/5",
    questions: [
      {
        id: "q1",
        question: "What consensus mechanism powers the Electroneum Smart Chain?",
        answers: [
          { id: "a1", text: "Proof of Work (PoW)", isCorrect: false },
          { id: "a2", text: "Delegated Proof of Stake (DPoS)", isCorrect: false },
          { id: "a3", text: "Istanbul Byzantine Fault Tolerance (IBFT 2.0)", isCorrect: true },
          { id: "a4", text: "Proof of Authority with a single admin", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "How fast is block time and transaction finality on Electroneum?",
        answers: [
          { id: "a1", text: "10 minutes", isCorrect: false },
          { id: "a2", text: "Approximately 5 seconds with deterministic immediate finality", isCorrect: true },
          { id: "a3", text: "1 hour", isCorrect: false },
          { id: "a4", text: "24 hours", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "What does 'deterministic finality' mean for merchants and users?",
        answers: [
          { id: "a1", text: "Once a block is signed, it is final and cannot be rolled back or reorganized", isCorrect: true },
          { id: "a2", text: "You must wait for 30 confirmations before accepting a payment", isCorrect: false },
          { id: "a3", text: "Transactions are probabilistic and might vanish", isCorrect: false },
          { id: "a4", text: "Merchants cannot verify payments until midnight", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Can an IBFT 2.0 blockchain experience network forks under normal conditions?",
        answers: [
          { id: "a1", text: "Yes, forks happen on every block", isCorrect: false },
          { id: "a2", text: "No, IBFT guarantees no forks through 2/3 validator quorum agreement", isCorrect: true },
          { id: "a3", text: "Only if miners turn off their power", isCorrect: false },
          { id: "a4", text: "Forks are encouraged weekly", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "How does IBFT 2.0 compare to Proof of Work regarding electricity consumption?",
        answers: [
          { id: "a1", text: "It uses virtually zero carbon emissions compared to energy-hungry PoW mining", isCorrect: true },
          { id: "a2", text: "It uses 10x more electricity", isCorrect: false },
          { id: "a3", text: "It requires massive coal power plants", isCorrect: false },
          { id: "a4", text: "There is no difference", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a3",
      q2: "a2",
      q3: "a1",
      q4: "a2",
      q5: "a1",
    },
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
          { id: "a1", text: "It can run Ethereum smart contracts, tools, and dApps with little to no code changes", isCorrect: true },
          { id: "a2", text: "It is simply an ERC-20 token on Ethereum Layer 1", isCorrect: false },
          { id: "a3", text: "Developers must invent a new programming language", isCorrect: false },
          { id: "a4", text: "It only works with Bitcoin scripts", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Which popular Web3 developer frameworks work seamlessly with Electroneum?",
        answers: [
          { id: "a1", text: "Hardhat, Foundry, Remix, and Truffle", isCorrect: true },
          { id: "a2", text: "Only Microsoft Word", isCorrect: false },
          { id: "a3", text: "Adobe Photoshop", isCorrect: false },
          { id: "a4", text: "None of the above", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Which wallet can users connect to interact with Electroneum dApps?",
        answers: [
          { id: "a1", text: "MetaMask, Rabby, Rainbow, and any EVM-compatible wallet", isCorrect: true },
          { id: "a2", text: "Only specialized proprietary offline devices", isCorrect: false },
          { id: "a3", text: "Steam wallet only", isCorrect: false },
          { id: "a4", text: "PayPal account only", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What is the Chain ID for Electroneum Mainnet?",
        answers: [
          { id: "a1", text: "52014", isCorrect: true },
          { id: "a2", text: "1", isCorrect: false },
          { id: "a3", text: "137", isCorrect: false },
          { id: "a4", text: "42220", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What standard contract templates (e.g. OpenZeppelin) can be deployed on Electroneum?",
        answers: [
          { id: "a1", text: "ERC-20, ERC-721 (NFTs), ERC-1155, and custom Solidity dApps", isCorrect: true },
          { id: "a2", text: "Only ERC-20 with restricted transfers", isCorrect: false },
          { id: "a3", text: "None, contracts cannot be deployed", isCorrect: false },
          { id: "a4", text: "Only Bitcoin Taproot scripts", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
    },
  },
  "6": {
    title: "Enterprise & Academic Validators",
    description: "Learn about network security on Electroneum.",
    nextUrl: "/electro-quests/7",
    questions: [
      {
        id: "q1",
        question: "Who acts as validators to secure the Electroneum network?",
        answers: [
          { id: "a1", text: "Anonymous individual miners", isCorrect: false },
          { id: "a2", text: "Known, trusted institutions including universities, NGOs, and enterprise partners", isCorrect: true },
          { id: "a3", text: "A single central company server", isCorrect: false },
          { id: "a4", text: "Randomly selected unverified smartphones", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What makes Electroneum's validator model unique in the crypto industry?",
        answers: [
          { id: "a1", text: "Validators direct block rewards towards philanthropic, educational, and charitable programs", isCorrect: true },
          { id: "a2", text: "Validators keep 100% of transaction fees for secret offshore accounts", isCorrect: false },
          { id: "a3", text: "Validators must burn their servers every month", isCorrect: false },
          { id: "a4", text: "Validators do not sign blocks", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Which reputable institutions have hosted Electroneum validator nodes?",
        answers: [
          { id: "a1", text: "Universities and NGOs in the UK and internationally", isCorrect: true },
          { id: "a2", text: "Only anonymous pirate servers", isCorrect: false },
          { id: "a3", text: "Gambling syndicates", isCorrect: false },
          { id: "a4", text: "None, there are no validators", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "How does having known academic & NGO validators prevent malicious 51% attacks?",
        answers: [
          { id: "a1", text: "Validators have legal accountability, public reputation, and no economic incentive to collude", isCorrect: true },
          { id: "a2", text: "They hire private military security", isCorrect: false },
          { id: "a3", text: "They shut down the internet when attacked", isCorrect: false },
          { id: "a4", text: "Transactions are verified manually by postal mail", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "Does the validator structure compromise decentralized execution on Electroneum?",
        answers: [
          { id: "a1", text: "No, consensus requires a distributed multi-party 2/3 Byzantine quorum agreement", isCorrect: true },
          { id: "a2", text: "Yes, one person decides everything", isCorrect: false },
          { id: "a3", text: "All code must be manually approved by a committee", isCorrect: false },
          { id: "a4", text: "Smart contracts cannot execute autonomously", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
    },
  },
  "7": {
    title: "Micro-transactions & Near-Zero Gas",
    description: "Test your knowledge on ETN's transaction structure.",
    nextUrl: "/electro-quests/8",
    questions: [
      {
        id: "q1",
        question: "Why are micro-transactions feasible on Electroneum when they fail on Ethereum L1?",
        answers: [
          { id: "a1", text: "Transactions are processed off-chain by banks", isCorrect: false },
          { id: "a2", text: "Electroneum maintains near-zero gas fees, costing fractions of a cent per transaction", isCorrect: true },
          { id: "a3", text: "Because Electroneum only allows transactions once per week", isCorrect: false },
          { id: "a4", text: "Transactions do not use smart contracts", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What real-world use case benefits most from near-zero micro-transactions?",
        answers: [
          { id: "a1", text: "Buying real estate skyscrapers", isCorrect: false },
          { id: "a2", text: "Tipping creators, in-game item micro-purchases, and instant gig economy pay", isCorrect: true },
          { id: "a3", text: "Executing billion-dollar sovereign bond trades", isCorrect: false },
          { id: "a4", text: "Staking 10,000 ETH for 2 years", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "If a user transfers 10 ETN to a friend, approximately how much gas is paid?",
        answers: [
          { id: "a1", text: "Less than $0.001 (a fraction of a penny)", isCorrect: true },
          { id: "a2", text: "Around $25.00", isCorrect: false },
          { id: "a3", text: "Half of the transferred amount", isCorrect: false },
          { id: "a4", text: "A flat $5 fee", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "How does near-zero gas enable innovative GameFi and dApp business models?",
        answers: [
          { id: "a1", text: "Games can record frequent player moves, inventory changes, and rewards on-chain without draining player wallets", isCorrect: true },
          { id: "a2", text: "Games must charge players $5 per click", isCorrect: false },
          { id: "a3", text: "Players can only play once per month", isCorrect: false },
          { id: "a4", text: "Smart contracts are disabled inside games", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "Does Electroneum suffer from unpredictable fee spikes when network activity surges?",
        answers: [
          { id: "a1", text: "No, the IBFT 2.0 architecture and block gas limits keep fees consistently predictable and low", isCorrect: true },
          { id: "a2", text: "Yes, fees rise to $200 during busy hours", isCorrect: false },
          { id: "a3", text: "The network pauses until traffic drops", isCorrect: false },
          { id: "a4", text: "Users must bid in auction for each block", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a2",
      q3: "a1",
      q4: "a1",
      q5: "a1",
    },
  },
  "8": {
    title: "Real-World Utility in 160+ Countries",
    description: "Explore the practical uses of the Electroneum ecosystem.",
    nextUrl: "/electro-quests/9",
    questions: [
      {
        id: "q1",
        question: "In how many countries can users directly spend ETN for mobile top-ups and utility bills?",
        answers: [
          { id: "a1", text: "Only in the United Kingdom", isCorrect: false },
          { id: "a2", text: "In over 160 countries worldwide", isCorrect: true },
          { id: "a3", text: "3 countries", isCorrect: false },
          { id: "a4", text: "Zero countries", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Which everyday service can an Electroneum user top up directly using ETN?",
        answers: [
          { id: "a1", text: "Mobile phone airtime and data bundles with hundreds of carriers", isCorrect: true },
          { id: "a2", text: "Rocket fuel for SpaceX", isCorrect: false },
          { id: "a3", text: "Bank bailout loans", isCorrect: false },
          { id: "a4", text: "Stock exchange membership fees", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Why is mobile utility integration so vital for financial inclusion?",
        answers: [
          { id: "a1", text: "Smartphones are the primary portal to the internet and economy for billions in emerging markets", isCorrect: true },
          { id: "a2", text: "Because desktop computers are illegal", isCorrect: false },
          { id: "a3", text: "It allows telecom companies to own all cryptocurrency", isCorrect: false },
          { id: "a4", text: "It prevents users from using paper cash", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Can an AnyTask worker in Nigeria or Uganda spend earned ETN on local phone minutes immediately?",
        answers: [
          { id: "a1", text: "Yes, through the Electroneum app's integrated mobile top-up partnerships", isCorrect: true },
          { id: "a2", text: "No, they must travel to London to convert it", isCorrect: false },
          { id: "a3", text: "They must wait until they reach 65 years of age", isCorrect: false },
          { id: "a4", text: "Only with government permission", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What differentiates Electroneum from purely speculative meme coins?",
        answers: [
          { id: "a1", text: "A proven track record of real-world utility, tangible products, and financial empowerment", isCorrect: true },
          { id: "a2", text: "Having a cartoon mascot", isCorrect: false },
          { id: "a3", text: "Promising 1000x returns overnight", isCorrect: false },
          { id: "a4", text: "Anonymous developers with no working code", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
    },
  },
  "9": {
    title: "Eco-Friendly & Zero-Carbon Network",
    description: "Learn how Electroneum delivers green blockchain technology.",
    nextUrl: "/electro-quests/10",
    questions: [
      {
        id: "q1",
        question: "How does Electroneum achieve near-zero carbon emissions?",
        answers: [
          { id: "a1", text: "By replacing energy-intensive PoW mining with lightweight IBFT 2.0 consensus", isCorrect: true },
          { id: "a2", text: "By shutting down the blockchain during nighttime", isCorrect: false },
          { id: "a3", text: "By planting trees every time a transaction fails", isCorrect: false },
          { id: "a4", text: "By using solar-powered paper ledgers", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Approximately how much energy does an IBFT 2.0 validator node consume?",
        answers: [
          { id: "a1", text: "About the same as running a regular office computer or cloud server", isCorrect: true },
          { id: "a2", text: "As much as the entire country of Switzerland", isCorrect: false },
          { id: "a3", text: "1 gigawatt per transaction", isCorrect: false },
          { id: "a4", text: "Zero electricity altogether", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Why is environmental sustainability important for enterprise and institutional adoption?",
        answers: [
          { id: "a1", text: "Enterprises have strict ESG (Environmental, Social, Governance) mandates and cannot build on dirty PoW networks", isCorrect: true },
          { id: "a2", text: "Governments ban all digital technology", isCorrect: false },
          { id: "a3", text: "Investors only care about power plants", isCorrect: false },
          { id: "a4", text: "Green blockchains produce more coins automatically", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Are specialized mining rigs (ASICs or GPUs) required to validate on Electroneum?",
        answers: [
          { id: "a1", text: "No, standard secure cloud servers operated by validators are used", isCorrect: true },
          { id: "a2", text: "Yes, warehouses full of GPUs are required", isCorrect: false },
          { id: "a3", text: "Only nuclear-powered computers can validate", isCorrect: false },
          { id: "a4", text: "Only smartphones can validate", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "How does Electroneum combine environmental efficiency with real-world impact?",
        answers: [
          { id: "a1", text: "By marrying a green smart chain with block rewards that fund NGO education and poverty relief", isCorrect: true },
          { id: "a2", text: "By charging high environmental taxes to users", isCorrect: false },
          { id: "a3", text: "By banning foreign transactions", isCorrect: false },
          { id: "a4", text: "By requiring users to submit proof of solar panels", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
    },
  },
  "10": {
    title: "The Aurelius Smart Chain Master",
    description: "The ultimate trial to prove your mastery of the Electroneum ecosystem.",
    nextUrl: "/electro-quests/10",
    questions: [
      {
        id: "q1",
        question: "What is the hallmark architectural foundation of the Aurelius upgrade?",
        answers: [
          { id: "a1", text: "Full EVM compatibility combined with IBFT 2.0 deterministic 5-second finality", isCorrect: true },
          { id: "a2", text: "A transition to a centralized SQL database", isCorrect: false },
          { id: "a3", text: "Removal of all smart contract functionality", isCorrect: false },
          { id: "a4", text: "Reverting back to Proof of Work mining", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What four pillars define the complete Electroneum ecosystem?",
        answers: [
          { id: "a1", text: "IBFT Consensus, EVM Compatibility, AnyTask Freelance, and Real-World Utility (ETN)", isCorrect: true },
          { id: "a2", text: "Mining, Speculation, Day Trading, and Memes", isCorrect: false },
          { id: "a3", text: "Gold, Silver, Copper, and Oil", isCorrect: false },
          { id: "a4", text: "Bridges, Oracles, Yield Farms, and Ponzi Schemes", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "How does Electroquest verify your quest mastery on the blockchain?",
        answers: [
          { id: "a1", text: "Via EIP-712 cryptographic signature vouchers verified by the GameCore smart contract", isCorrect: true },
          { id: "a2", text: "By sending an email to support", isCorrect: false },
          { id: "a3", text: "Manual database edits by an administrator", isCorrect: false },
          { id: "a4", text: "Relying purely on client-side cookies", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What rewards do players earn upon completing an Electroquest stage on-chain?",
        answers: [
          { id: "a1", text: "5 ETN, 100 XP tokens, and an immutable Chapter NFT Rune", isCorrect: true },
          { id: "a2", text: "Nothing, it is purely simulated", isCorrect: false },
          { id: "a3", text: "A physical plastic medal sent by mail", isCorrect: false },
          { id: "a4", text: "1 Bitcoin", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What is your status upon conquering all 10 stages of Electroquest?",
        answers: [
          { id: "a1", text: "Grand Master of the Aurelius Smart Chain", isCorrect: true },
          { id: "a2", text: "Novice Explorer", isCorrect: false },
          { id: "a3", text: "Unverified Guest", isCorrect: false },
          { id: "a4", text: "Inactive Node", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
    },
  },
};
