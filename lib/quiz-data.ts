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
    description: "Master the origins, mission, and foundational architecture of the Electroneum network.",
    nextUrl: "/electro-quests/2",
    questions: [
      {
        id: "q1",
        question: "What is the primary mission of the Electroneum network?",
        answers: [
          { id: "a1", text: "To create a high-frequency speculative trading platform", isCorrect: false },
          { id: "a2", text: "To empower the unbanked and provide global financial inclusion", isCorrect: true },
          { id: "a3", text: "To replace enterprise supply chain databases", isCorrect: false },
          { id: "a4", text: "To build a closed-source centralized payment processor", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What major hard fork transformed Electroneum into an EVM-compatible Smart Chain?",
        answers: [
          { id: "a1", text: "The Aurelius Smart Chain upgrade", isCorrect: true },
          { id: "a2", text: "The London Hardfork", isCorrect: false },
          { id: "a3", text: "The Merge", isCorrect: false },
          { id: "a4", text: "The SegWit update", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Which consensus mechanism powers the modern Electroneum Smart Chain?",
        answers: [
          { id: "a1", text: "Proof of Work (PoW)", isCorrect: false },
          { id: "a2", text: "Delegated Proof of Stake (DPoS)", isCorrect: false },
          { id: "a3", text: "Istanbul Byzantine Fault Tolerance (IBFT 2.0)", isCorrect: true },
          { id: "a4", text: "Proof of Authority with a single admin", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What type of transactions was Electroneum specifically engineered to excel at?",
        answers: [
          { id: "a1", text: "Slow, expensive multi-million dollar bank settlements", isCorrect: false },
          { id: "a2", text: "High-speed, near-zero-cost micro-transactions for everyday commerce", isCorrect: true },
          { id: "a3", text: "Batch monthly payroll settlements only", isCorrect: false },
          { id: "a4", text: "Purely simulated paper transactions", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "How does Electroneum provide real-world financial access in developing economies?",
        answers: [
          { id: "a1", text: "Mobile-first digital tools, airtime/utility top-ups, and freelance earnings", isCorrect: true },
          { id: "a2", text: "By requiring users to hold $5,000 in credit history", isCorrect: false },
          { id: "a3", text: "By opening physical bank branches in major Western capitals", isCorrect: false },
          { id: "a4", text: "Through government-issued plastic debit cards only", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "What standard smart contract programming language can developers use on Electroneum?",
        answers: [
          { id: "a1", text: "Solidity", isCorrect: true },
          { id: "a2", text: "Fortran", isCorrect: false },
          { id: "a3", text: "COBOL", isCorrect: false },
          { id: "a4", text: "Custom unverified bytecode only", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "What is the approximate block time and finality speed on Electroneum?",
        answers: [
          { id: "a1", text: "10 minutes", isCorrect: false },
          { id: "a2", text: "Approximately 5 seconds", isCorrect: true },
          { id: "a3", text: "1 hour", isCorrect: false },
          { id: "a4", text: "24 hours", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "Which official ecosystem application allows everyday users to manage funds on mobile?",
        answers: [
          { id: "a1", text: "The Electroneum Mobile App", isCorrect: true },
          { id: "a2", text: "iTunes", isCorrect: false },
          { id: "a3", text: "Windows Media Player", isCorrect: false },
          { id: "a4", text: "Steam", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "Why is financial inclusion so critical globally?",
        answers: [
          { id: "a1", text: "Over one billion adults lack traditional bank accounts but possess mobile phones", isCorrect: true },
          { id: "a2", text: "Traditional banks have zero transfer fees", isCorrect: false },
          { id: "a3", text: "Physical cash is completely illegal everywhere", isCorrect: false },
          { id: "a4", text: "Everyone already has easy access to Wall Street accounts", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "What does EVM compatibility allow Ethereum developers to do on Electroneum?",
        answers: [
          { id: "a1", text: "Deploy existing Solidity contracts with little to no code changes", isCorrect: true },
          { id: "a2", text: "They must rewrite every smart contract in C++", isCorrect: false },
          { id: "a3", text: "Contracts cannot be deployed on Electroneum", isCorrect: false },
          { id: "a4", text: "They can only deploy Bitcoin scripts", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a1",
      q3: "a3",
      q4: "a2",
      q5: "a1",
      q6: "a1",
      q7: "a2",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "2": {
    title: "The ETN Token",
    description: "Deep dive into the native ETN token, tokenomics, utility, and everyday applications.",
    nextUrl: "/electro-quests/3",
    questions: [
      {
        id: "q1",
        question: "What is the native cryptocurrency token of the Electroneum network?",
        answers: [
          { id: "a1", text: "ETH", isCorrect: false },
          { id: "a2", text: "ETN", isCorrect: true },
          { id: "a3", text: "CELO", isCorrect: false },
          { id: "a4", text: "USDT", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What is the primary utility of ETN within the blockchain protocol?",
        answers: [
          { id: "a1", text: "Paying for network gas fees and value transfers", isCorrect: true },
          { id: "a2", text: "Only decorative art", isCorrect: false },
          { id: "a3", text: "Paying credit card interest to commercial banks", isCorrect: false },
          { id: "a4", text: "Purchasing physical mining hardware directly from government", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "In how many countries can ETN be spent on mobile airtime and utility bills?",
        answers: [
          { id: "a1", text: "In 160+ countries globally", isCorrect: true },
          { id: "a2", text: "Only in the UK", isCorrect: false },
          { id: "a3", text: "2 countries", isCorrect: false },
          { id: "a4", text: "Zero countries", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What is the typical cost of an ETN transaction gas fee?",
        answers: [
          { id: "a1", text: "Sub-cent (fractions of a penny)", isCorrect: true },
          { id: "a2", text: "$50 per transaction", isCorrect: false },
          { id: "a3", text: "10% of the total amount sent", isCorrect: false },
          { id: "a4", text: "A flat $5 charge", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "Why does ETN's unit denomination make it user-friendly for everyday purchases?",
        answers: [
          { id: "a1", text: "It allows natural whole-number pricing (e.g. 50 ETN for coffee) instead of confusing 0.00002 decimals", isCorrect: true },
          { id: "a2", text: "Because numbers cannot have decimals on blockchain", isCorrect: false },
          { id: "a3", text: "It requires mental calculus to calculate", isCorrect: false },
          { id: "a4", text: "Prices change only once every leap year", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "Can ETN be stored and managed in EVM-compatible wallets like MetaMask?",
        answers: [
          { id: "a1", text: "Yes, by adding the Electroneum RPC network details", isCorrect: true },
          { id: "a2", text: "No, MetaMask only supports Ethereum mainnet", isCorrect: false },
          { id: "a3", text: "Only through third-party custodial banks", isCorrect: false },
          { id: "a4", text: "ETN cannot be stored in any digital wallet", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "What is the maximum supply hard-cap of ETN?",
        answers: [
          { id: "a1", text: "21 Billion ETN", isCorrect: true },
          { id: "a2", text: "Infinite with 10% inflation per year", isCorrect: false },
          { id: "a3", text: "21 Million ETN", isCorrect: false },
          { id: "a4", text: "100 Trillion ETN", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "How does ETN empower cross-border workers receiving remittances?",
        answers: [
          { id: "a1", text: "Funds arrive in seconds without losing 10-15% to traditional wire transfer fees", isCorrect: true },
          { id: "a2", text: "They must travel across borders to cash paper checks", isCorrect: false },
          { id: "a3", text: "Recipients must pay high foreign exchange penalties", isCorrect: false },
          { id: "a4", text: "Transfers take 14 business days", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "How do retail merchants benefit from accepting ETN payments?",
        answers: [
          { id: "a1", text: "Instant 5-second deterministic settlement with zero chargeback fraud", isCorrect: true },
          { id: "a2", text: "Merchants must wait 30 days for payment clearance", isCorrect: false },
          { id: "a3", text: "They are charged 5% card swipe fees", isCorrect: false },
          { id: "a4", text: "Customers can reverse payments after leaving the store", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "Is ETN subject to endless unconstrained printing by a single entity?",
        answers: [
          { id: "a1", text: "No, it is governed by a transparent, fixed cryptographic protocol", isCorrect: true },
          { id: "a2", text: "Yes, anyone can print billions whenever they wish", isCorrect: false },
          { id: "a3", text: "Central banks print new ETN daily", isCorrect: false },
          { id: "a4", text: "Supply doubles every Monday", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a2",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "3": {
    title: "AnyTask Freelance Platform",
    description: "Explore the AnyTask ecosystem, zero seller fees, and global freelance inclusion.",
    nextUrl: "/electro-quests/4",
    questions: [
      {
        id: "q1",
        question: "What is AnyTask.com?",
        answers: [
          { id: "a1", text: "A global freelance marketplace powered by the Electroneum ecosystem", isCorrect: true },
          { id: "a2", text: "A decentralized exchange for meme tokens", isCorrect: false },
          { id: "a3", text: "A cloud mining farm", isCorrect: false },
          { id: "a4", text: "A social media video platform", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "How much seller commission fee do freelancers pay on AnyTask?",
        answers: [
          { id: "a1", text: "0% (freelancers keep 100% of their earnings)", isCorrect: true },
          { id: "a2", text: "20% (like Upwork or Fiverr)", isCorrect: false },
          { id: "a3", text: "15%", isCorrect: false },
          { id: "a4", text: "30%", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Do buyers on AnyTask need to own or understand cryptocurrency to order gigs?",
        answers: [
          { id: "a1", text: "No, buyers pay in standard fiat currency (credit/debit card) seamlessly", isCorrect: true },
          { id: "a2", text: "Yes, buyers can only pay with Bitcoin", isCorrect: false },
          { id: "a3", text: "They must wire gold certificates", isCorrect: false },
          { id: "a4", text: "They must run an Ethereum mining rig", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Why is AnyTask life-changing for digital creators in developing nations?",
        answers: [
          { id: "a1", text: "They can monetize digital skills globally without requiring a local bank account or credit history", isCorrect: true },
          { id: "a2", text: "It gives them free physical offices", isCorrect: false },
          { id: "a3", text: "It guarantees government jobs", isCorrect: false },
          { id: "a4", text: "It pays them in paper stock certificates", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What digital skills can creators sell on AnyTask?",
        answers: [
          { id: "a1", text: "Graphic design, software coding, voiceover, copywriting, video editing, and more", isCorrect: true },
          { id: "a2", text: "Only physical mail delivery", isCorrect: false },
          { id: "a3", text: "Only plumbing services", isCorrect: false },
          { id: "a4", text: "None, only automated bot tasks", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "What happens to the traditional 20% platform cut on AnyTask?",
        answers: [
          { id: "a1", text: "It is completely eliminated for sellers, maximizing creator income", isCorrect: true },
          { id: "a2", text: "It is sent to Wall Street bankers", isCorrect: false },
          { id: "a3", text: "It is converted into government debt", isCorrect: false },
          { id: "a4", text: "It is burned forever", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "How does AnyTask protect buyers from incomplete or poor-quality work?",
        answers: [
          { id: "a1", text: "Through an escrow protection system where funds are held until work is approved", isCorrect: true },
          { id: "a2", text: "By banning all buyers from complaining", isCorrect: false },
          { id: "a3", text: "Work is never checked", isCorrect: false },
          { id: "a4", text: "Sellers receive funds before starting", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "How quickly do sellers receive their ETN once an order is delivered and approved?",
        answers: [
          { id: "a1", text: "Instantly into their Electroneum wallet without multi-week bank clearing delays", isCorrect: true },
          { id: "a2", text: "After a 30-day mandatory waiting period", isCorrect: false },
          { id: "a3", text: "At the end of the calendar year", isCorrect: false },
          { id: "a4", text: "Only upon mailing paper invoices", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "What economic barrier does AnyTask break down globally?",
        answers: [
          { id: "a1", text: "The barrier of traditional banking exclusion and predatory remittance costs", isCorrect: true },
          { id: "a2", text: "The use of computers", isCorrect: false },
          { id: "a3", text: "Language translation software", isCorrect: false },
          { id: "a4", text: "Internet connectivity", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "What can AnyTask freelancers immediately spend their earned ETN on?",
        answers: [
          { id: "a1", text: "Mobile phone airtime, electricity vouchers, or utility top-ups in their local country", isCorrect: true },
          { id: "a2", text: "Nothing, ETN is locked forever", isCorrect: false },
          { id: "a3", text: "Only luxury yachts", isCorrect: false },
          { id: "a4", text: "They must travel to the UK to exchange it", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "4": {
    title: "IBFT 2.0 Consensus & Fast Finality",
    description: "Understand the mechanics, speed, and mathematical certainty of IBFT 2.0 consensus.",
    nextUrl: "/electro-quests/5",
    questions: [
      {
        id: "q1",
        question: "What does IBFT 2.0 stand for?",
        answers: [
          { id: "a1", text: "Istanbul Byzantine Fault Tolerance version 2.0", isCorrect: true },
          { id: "a2", text: "International Bitcoin Fund Transfer", isCorrect: false },
          { id: "a3", text: "Integrated Blockchain Format Technology", isCorrect: false },
          { id: "a4", text: "Internet Base Fault Tolerance", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What is the key advantage of deterministic finality in IBFT 2.0?",
        answers: [
          { id: "a1", text: "Once a block is signed by validators, it is permanent and cannot be reorged or rolled back", isCorrect: true },
          { id: "a2", text: "Transactions are probabilistic and might vanish tomorrow", isCorrect: false },
          { id: "a3", text: "You must wait for 100 confirmations to be sure", isCorrect: false },
          { id: "a4", text: "Miners can reverse blocks whenever they wish", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "What is the block time on the Electroneum Aurelius network?",
        answers: [
          { id: "a1", text: "Approximately 5 seconds", isCorrect: true },
          { id: "a2", text: "10 minutes like Bitcoin", isCorrect: false },
          { id: "a3", text: "15 minutes", isCorrect: false },
          { id: "a4", text: "2 hours", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What proportion of validators must agree to commit each block in IBFT 2.0?",
        answers: [
          { id: "a1", text: "At least two-thirds (66.7% + 1) quorum agreement", isCorrect: true },
          { id: "a2", text: "10% of nodes", isCorrect: false },
          { id: "a3", text: "Only a single leader node", isCorrect: false },
          { id: "a4", text: "100% unanimous agreement with zero tolerance for offline nodes", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "Can the Electroneum Smart Chain experience accidental chain splits or forks under IBFT 2.0?",
        answers: [
          { id: "a1", text: "No, the protocol mathematically prevents forks through strict quorum rounds", isCorrect: true },
          { id: "a2", text: "Yes, forks occur every hour", isCorrect: false },
          { id: "a3", text: "Only during weekends", isCorrect: false },
          { id: "a4", text: "Forks happen whenever traffic exceeds 10 transactions", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "How does IBFT 2.0 energy efficiency compare to traditional Proof of Work mining?",
        answers: [
          { id: "a1", text: "Consumes 99.9% less energy by replacing brute-force hashing with message rounds", isCorrect: true },
          { id: "a2", text: "Uses 10 times more electricity", isCorrect: false },
          { id: "a3", text: "Requires dedicated coal power plants", isCorrect: false },
          { id: "a4", text: "There is no difference in energy use", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "What role does the proposer play in an IBFT 2.0 round?",
        answers: [
          { id: "a1", text: "Gathers pending transactions and proposes a new block candidate to validators", isCorrect: true },
          { id: "a2", text: "Decides which accounts to ban permanently", isCorrect: false },
          { id: "a3", text: "Sets the price of the ETN token", isCorrect: false },
          { id: "a4", text: "Prints new coins arbitrarily", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "What happens in IBFT 2.0 if the active proposer node fails or goes offline?",
        answers: [
          { id: "a1", text: "A round-change timeout triggers, electing the next validator in sequence without stalling", isCorrect: true },
          { id: "a2", text: "The entire blockchain stops forever", isCorrect: false },
          { id: "a3", text: "All user balances are reset", isCorrect: false },
          { id: "a4", text: "Transactions are deleted", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "Why is 5-second deterministic finality vital for point-of-sale retail adoption?",
        answers: [
          { id: "a1", text: "Shoppers and merchants can complete purchases at checkout counters without awkward delays", isCorrect: true },
          { id: "a2", text: "Because merchants like waiting 30 minutes per customer", isCorrect: false },
          { id: "a3", text: "It prevents receipts from printing", isCorrect: false },
          { id: "a4", text: "It requires customers to leave their phones in the store", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "What are the three cryptographic voting phases in an IBFT 2.0 consensus round?",
        answers: [
          { id: "a1", text: "Pre-prepare, Prepare, and Commit", isCorrect: true },
          { id: "a2", text: "Start, Run, Stop", isCorrect: false },
          { id: "a3", text: "Hash, Mine, Cashout", isCorrect: false },
          { id: "a4", text: "Buy, Sell, Hold", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "5": {
    title: "EVM Compatibility",
    description: "Explore EVM architecture, developer tooling, smart contracts, and network parameters.",
    nextUrl: "/electro-quests/6",
    questions: [
      {
        id: "q1",
        question: "What does EVM compatibility mean for the Electroneum blockchain?",
        answers: [
          { id: "a1", text: "It can execute standard Solidity smart contracts, Ethereum tooling, and dApps effortlessly", isCorrect: true },
          { id: "a2", text: "It can only run JavaScript files on a central server", isCorrect: false },
          { id: "a3", text: "It requires developers to build their own hardware", isCorrect: false },
          { id: "a4", text: "It means the network is an ERC-20 token on Ethereum Layer 1", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Which developer framework can deploy contracts to Electroneum out of the box?",
        answers: [
          { id: "a1", text: "Foundry, Hardhat, Remix, and Truffle", isCorrect: true },
          { id: "a2", text: "Only Microsoft Excel macros", isCorrect: false },
          { id: "a3", text: "Adobe Premiere", isCorrect: false },
          { id: "a4", text: "Google Sheets", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "What is the official Chain ID for Electroneum Mainnet?",
        answers: [
          { id: "a1", text: "52014", isCorrect: true },
          { id: "a2", text: "1", isCorrect: false },
          { id: "a3", text: "137", isCorrect: false },
          { id: "a4", text: "42220", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What is the official Chain ID for the Electroneum Testnet?",
        answers: [
          { id: "a1", text: "5201420", isCorrect: true },
          { id: "a2", text: "11155111", isCorrect: false },
          { id: "a3", text: "80001", isCorrect: false },
          { id: "a4", text: "5", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What is the official JSON-RPC endpoint URL for Electroneum Mainnet?",
        answers: [
          { id: "a1", text: "https://rpc.electroneum.com", isCorrect: true },
          { id: "a2", text: "https://mainnet.infura.io/v3/fake", isCorrect: false },
          { id: "a3", text: "https://bitcoin.org/rpc", isCorrect: false },
          { id: "a4", text: "http://localhost:8545", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "Which popular Web3 wallets can connect to Electroneum?",
        answers: [
          { id: "a1", text: "MetaMask, Rabby, Coinbase Wallet, Rainbow, and any Web3 wallet", isCorrect: true },
          { id: "a2", text: "Only hardware dongles purchased from Electroneum headquarters", isCorrect: false },
          { id: "a3", text: "Steam Wallet", isCorrect: false },
          { id: "a4", text: "PayPal only", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "Which token standard represents fungible tokens (like stablecoins) on Electroneum?",
        answers: [
          { id: "a1", text: "ERC-20", isCorrect: true },
          { id: "a2", text: "ERC-721", isCorrect: false },
          { id: "a3", text: "ERC-1155", isCorrect: false },
          { id: "a4", text: "MP3", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "Which token standard represents unique non-fungible collectibles (NFTs) on Electroneum?",
        answers: [
          { id: "a1", text: "ERC-721", isCorrect: true },
          { id: "a2", text: "ERC-20", isCorrect: false },
          { id: "a3", text: "ERC-404", isCorrect: false },
          { id: "a4", text: "JPEG", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "Can developers use OpenZeppelin audited contract libraries on Electroneum?",
        answers: [
          { id: "a1", text: "Yes, standard OpenZeppelin contracts compile and deploy natively", isCorrect: true },
          { id: "a2", text: "No, OpenZeppelin is prohibited", isCorrect: false },
          { id: "a3", text: "Only if rewritten in Python", isCorrect: false },
          { id: "a4", text: "Only for testnet use", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "How do dApp developers listen to on-chain smart contract events on Electroneum?",
        answers: [
          { id: "a1", text: "Using standard Web3 libraries (ethers.js, viem, wagmi) over JSON-RPC websockets or HTTP", isCorrect: true },
          { id: "a2", text: "By monitoring paper postal mail", isCorrect: false },
          { id: "a3", text: "Through text messages sent by validators", isCorrect: false },
          { id: "a4", text: "Events cannot be emitted on Electroneum", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "6": {
    title: "Enterprise & Academic Validators",
    description: "Learn how universities, NGOs, and reputable institutions secure the Electroneum network.",
    nextUrl: "/electro-quests/7",
    questions: [
      {
        id: "q1",
        question: "Who operates the validator nodes that secure the Electroneum Smart Chain?",
        answers: [
          { id: "a1", text: "Known, trusted institutions including universities, NGOs, and enterprise partners", isCorrect: true },
          { id: "a2", text: "Anonymous individual miners hiding their identities", isCorrect: false },
          { id: "a3", text: "A single central server at Electroneum headquarters", isCorrect: false },
          { id: "a4", text: "Randomly selected smartphones in a botnet", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Why is Electroneum's validator system described as a 'Proof of Responsibility' model?",
        answers: [
          { id: "a1", text: "Trusted organizations validate blocks and channel block rewards into charitable and educational causes", isCorrect: true },
          { id: "a2", text: "Because nodes must pass a physical driving test", isCorrect: false },
          { id: "a3", text: "Validators are legally responsible for all token price changes", isCorrect: false },
          { id: "a4", text: "Validators must pay all user taxes", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Which reputable institutions have hosted Electroneum validator nodes?",
        answers: [
          { id: "a1", text: "Universities and non-governmental organizations (NGOs)", isCorrect: true },
          { id: "a2", text: "Anonymous offshore gambling sites", isCorrect: false },
          { id: "a3", text: "Pirate torrent servers", isCorrect: false },
          { id: "a4", text: "None, there are no validators", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "How does having identified academic and NGO validators prevent 51% attacks?",
        answers: [
          { id: "a1", text: "Validators have legal accountability, public reputations, and no economic incentive to collude", isCorrect: true },
          { id: "a2", text: "They hire private military guards", isCorrect: false },
          { id: "a3", text: "They disconnect from the internet during attacks", isCorrect: false },
          { id: "a4", text: "Transactions are verified by fax machine", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What do NGO and academic validators do with their earned block rewards?",
        answers: [
          { id: "a1", text: "Fund humanitarian aid, research grants, and digital skills education in developing nations", isCorrect: true },
          { id: "a2", text: "Deposit funds into secret private accounts", isCorrect: false },
          { id: "a3", text: "Burn the funds immediately", isCorrect: false },
          { id: "a4", text: "Distribute them only to stock shareholders", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "Is the Electroneum transaction ledger open for public verification?",
        answers: [
          { id: "a1", text: "Yes, all transactions and smart contracts are publicly verifiable on the block explorer", isCorrect: true },
          { id: "a2", text: "No, transactions are completely hidden from the public", isCorrect: false },
          { id: "a3", text: "Only verified lawyers can view blocks", isCorrect: false },
          { id: "a4", text: "Ledger is deleted every 24 hours", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "How does the validator model protect against Sybil attacks (fake identity flooding)?",
        answers: [
          { id: "a1", text: "Validators are vetted, authenticated organizations rather than anonymous clone nodes", isCorrect: true },
          { id: "a2", text: "By charging $1,000,000 to view the website", isCorrect: false },
          { id: "a3", text: "By requiring fingerprint scans for every transaction", isCorrect: false },
          { id: "a4", text: "By disabling internet traffic", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "What hardware infrastructure is needed to operate an Electroneum validator node?",
        answers: [
          { id: "a1", text: "Standard enterprise cloud servers or dedicated server hardware with high uptime", isCorrect: true },
          { id: "a2", text: "Warehouses full of roaring GPU mining rigs", isCorrect: false },
          { id: "a3", text: "Quantum supercomputers only", isCorrect: false },
          { id: "a4", text: "An old dial-up telephone", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "Can an individual validator arbitrarily alter transaction balances or state on their own?",
        answers: [
          { id: "a1", text: "No, protocol rules require a multi-party 2/3 Byzantine quorum agreement to commit any state", isCorrect: true },
          { id: "a2", text: "Yes, any node can rewrite history at will", isCorrect: false },
          { id: "a3", text: "Only on alternate Thursdays", isCorrect: false },
          { id: "a4", text: "The first validator to click approves everything", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "How does institutional validation build confidence for enterprise companies building on Electroneum?",
        answers: [
          { id: "a1", text: "Guarantees network stability, clear compliance standards, ESG alignment, and predictable governance", isCorrect: true },
          { id: "a2", text: "By promising 10,000% token yields", isCorrect: false },
          { id: "a3", text: "By giving away free enterprise software licenses", isCorrect: false },
          { id: "a4", text: "Enterprises do not care about validator reliability", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "7": {
    title: "Micro-transactions & Near-Zero Gas",
    description: "Explore the mechanics of micro-gas fees, rapid payment routing, and GameFi infrastructure.",
    nextUrl: "/electro-quests/8",
    questions: [
      {
        id: "q1",
        question: "What is a micro-transaction in cryptocurrency?",
        answers: [
          { id: "a1", text: "A small-value payment, typically ranging from fractions of a cent to a few dollars", isCorrect: true },
          { id: "a2", text: "A billion-dollar corporate bond issuance", isCorrect: false },
          { id: "a3", text: "A transaction made with microscope lenses", isCorrect: false },
          { id: "a4", text: "Any transaction that takes longer than 24 hours", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Why do legacy blockchains like Bitcoin and Ethereum Layer 1 struggle with micro-payments?",
        answers: [
          { id: "a1", text: "Network gas fees often cost more than the item being purchased", isCorrect: true },
          { id: "a2", text: "Because micro-transactions are illegal on those chains", isCorrect: false },
          { id: "a3", text: "Because computers cannot process small numbers", isCorrect: false },
          { id: "a4", text: "Because blocks only hold one transaction at a time", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "What makes micro-transactions economically viable on Electroneum?",
        answers: [
          { id: "a1", text: "Consistent sub-cent gas fees that cost fractions of a penny", isCorrect: true },
          { id: "a2", text: "Transactions are processed on paper", isCorrect: false },
          { id: "a3", text: "Users can only send money once per year", isCorrect: false },
          { id: "a4", text: "Central banks pay all transaction fees", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "How do near-zero gas fees empower GameFi and Web3 game developers?",
        answers: [
          { id: "a1", text: "Games can log frequent on-chain moves, crafting, and item trades without draining player wallets", isCorrect: true },
          { id: "a2", text: "Games must charge players $10 per button press", isCorrect: false },
          { id: "a3", text: "Players can only play games once a month", isCorrect: false },
          { id: "a4", text: "Games cannot use smart contracts", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What is the standard unit of measurement for gas pricing on EVM chains including Electroneum?",
        answers: [
          { id: "a1", text: "Gwei", isCorrect: true },
          { id: "a2", text: "Kilowatt", isCorrect: false },
          { id: "a3", text: "Gallon", isCorrect: false },
          { id: "a4", text: "Byte", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "How does Electroneum prevent spam attacks despite near-zero gas fees?",
        answers: [
          { id: "a1", text: "Through protocol minimum base fees and block gas limits that throttle abusive flooding", isCorrect: true },
          { id: "a2", text: "By shutting down the network during rush hour", isCorrect: false },
          { id: "a3", text: "By requiring users to submit government IDs for every transfer", isCorrect: false },
          { id: "a4", text: "Spam is encouraged on Electroneum", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "In developing economies, what is a primary real-world micro-transaction use case?",
        answers: [
          { id: "a1", text: "Paying for prepaid electricity units, mobile phone minutes, and roadside vendor food", isCorrect: true },
          { id: "a2", text: "Buying space satellites", isCorrect: false },
          { id: "a3", text: "Funding international airport construction", isCorrect: false },
          { id: "a4", text: "Buying luxury Swiss watches", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "How does instant micro-gas routing empower online content creator tipping?",
        answers: [
          { id: "a1", text: "Fans can tip 10 or 25 cents directly to artists without credit card merchant fees eating the payment", isCorrect: true },
          { id: "a2", text: "Creators lose 50% to intermediary banks", isCorrect: false },
          { id: "a3", text: "Tips take 3 business days to arrive", isCorrect: false },
          { id: "a4", text: "Tipping is forbidden on Web3", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "What happens to unused gas when a smart contract executes on Electroneum?",
        answers: [
          { id: "a1", text: "The unused gas is automatically refunded to the sender's wallet", isCorrect: true },
          { id: "a2", text: "The validator keeps all unused gas", isCorrect: false },
          { id: "a3", text: "Unused gas is permanently locked", isCorrect: false },
          { id: "a4", text: "The transaction is reverted", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "Can dApps sponsor transactions on behalf of their users on Electroneum?",
        answers: [
          { id: "a1", text: "Yes, through meta-transactions, account abstraction, and gas paymaster contracts", isCorrect: true },
          { id: "a2", text: "No, users must always pay their own gas directly", isCorrect: false },
          { id: "a3", text: "Only with permission from the central government", isCorrect: false },
          { id: "a4", text: "Sponsorship is blocked by the EVM", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "8": {
    title: "Real-World Utility in 160+ Countries",
    description: "Discover Electroneum's global footprint, mobile carrier partnerships, and utility payments.",
    nextUrl: "/electro-quests/9",
    questions: [
      {
        id: "q1",
        question: "In how many countries can users directly spend ETN for mobile airtime and utilities?",
        answers: [
          { id: "a1", text: "In over 160 countries worldwide", isCorrect: true },
          { id: "a2", text: "Only in 1 country", isCorrect: false },
          { id: "a3", text: "5 countries", isCorrect: false },
          { id: "a4", text: "Zero countries", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Which essential everyday service can an Electroneum user top up directly using ETN?",
        answers: [
          { id: "a1", text: "Mobile phone airtime and data bundles across hundreds of telecom carriers", isCorrect: true },
          { id: "a2", text: "Private jet leases", isCorrect: false },
          { id: "a3", text: "Central bank reserves", isCorrect: false },
          { id: "a4", text: "Government tax penalties", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Why is mobile telecom integration so pivotal for emerging markets?",
        answers: [
          { id: "a1", text: "Mobile phones serve as the primary bank, internet portal, and business tool for billions of people", isCorrect: true },
          { id: "a2", text: "Because landline phones are compulsory", isCorrect: false },
          { id: "a3", text: "Because computers are completely banned", isCorrect: false },
          { id: "a4", text: "It allows telecom companies to print paper cash", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Can an AnyTask freelancer in Nigeria or Brazil spend earned ETN on local utilities immediately?",
        answers: [
          { id: "a1", text: "Yes, directly through the Electroneum mobile application's utility integrations", isCorrect: true },
          { id: "a2", text: "No, they must travel to London to cash out", isCorrect: false },
          { id: "a3", text: "They must wait 5 years before spending", isCorrect: false },
          { id: "a4", text: "Only with special presidential authorization", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What fundamentally separates Electroneum from speculative meme tokens?",
        answers: [
          { id: "a1", text: "Tangible real-world utility, commercial partnerships, and everyday financial empowerment products", isCorrect: true },
          { id: "a2", text: "Having an animal mascot", isCorrect: false },
          { id: "a3", text: "Hyping promises on social media with zero working software", isCorrect: false },
          { id: "a4", text: "Promising overnight riches", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "How does Electroneum connect its blockchain with telecommunications operators?",
        answers: [
          { id: "a1", text: "Through direct API integrations with leading global airtime and utility distribution networks", isCorrect: true },
          { id: "a2", text: "By using carrier pigeons", isCorrect: false },
          { id: "a3", text: "By buying all phone towers", isCorrect: false },
          { id: "a4", text: "Through physical cash deposits at post offices", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "Why is mobile airtime often treated like an alternate currency in parts of Africa?",
        answers: [
          { id: "a1", text: "People frequently trade airtime minutes as a liquid, reliable store of value and exchange medium", isCorrect: true },
          { id: "a2", text: "Because traditional money has vanished completely", isCorrect: false },
          { id: "a3", text: "Because banks only accept phone calls", isCorrect: false },
          { id: "a4", text: "Because government currency is printed on SIM cards", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "How does cross-border utility top-up revolutionize migrant family support?",
        answers: [
          { id: "a1", text: "Workers abroad can top up their families' lights, electricity, and phones back home with zero wire transfer fees", isCorrect: true },
          { id: "a2", text: "They must mail prepaid cards in envelopes", isCorrect: false },
          { id: "a3", text: "It requires Western Union office visits with high fees", isCorrect: false },
          { id: "a4", text: "It doubles the cost of the utility bill", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "Why does real-world utility generate sustainable long-term network value?",
        answers: [
          { id: "a1", text: "It generates consistent real transaction volume and velocity, independent of crypto market hype cycles", isCorrect: true },
          { id: "a2", text: "Because utilities are always free", isCorrect: false },
          { id: "a3", text: "It requires users to gamble on tokens", isCorrect: false },
          { id: "a4", text: "Because speculative traders prefer real bills", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "What is Electroneum's overarching vision for the next billion crypto users?",
        answers: [
          { id: "a1", text: "To make digital currency intuitive, useful, accessible, and integrated into everyday life on any smartphone", isCorrect: true },
          { id: "a2", text: "To make crypto only for elite financial institutions", isCorrect: false },
          { id: "a3", text: "To replace all mobile phones with mainframe terminals", isCorrect: false },
          { id: "a4", text: "To ban international commerce", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "9": {
    title: "Eco-Friendly & Zero-Carbon Network",
    description: "Learn how Electroneum delivers green blockchain technology compliant with ESG standards.",
    nextUrl: "/electro-quests/10",
    questions: [
      {
        id: "q1",
        question: "How does Electroneum achieve near-zero carbon emissions?",
        answers: [
          { id: "a1", text: "By replacing energy-intensive PoW mining with lightweight, green IBFT 2.0 consensus", isCorrect: true },
          { id: "a2", text: "By shutting down the blockchain during the night", isCorrect: false },
          { id: "a3", text: "By requiring users to ride bicycles while transacting", isCorrect: false },
          { id: "a4", text: "By using solar-powered paper receipts", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Approximately how much electricity does an IBFT 2.0 validator node consume?",
        answers: [
          { id: "a1", text: "About the same as running a regular office computer or cloud server", isCorrect: true },
          { id: "a2", text: "As much electricity as the entire country of Argentina", isCorrect: false },
          { id: "a3", text: "1 gigawatt per transaction", isCorrect: false },
          { id: "a4", text: "Zero electricity altogether", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "What does ESG stand for in corporate and institutional adoption?",
        answers: [
          { id: "a1", text: "Environmental, Social, and Governance criteria", isCorrect: true },
          { id: "a2", text: "Ethereum Smart Gas", isCorrect: false },
          { id: "a3", text: "Electronic Standard Gold", isCorrect: false },
          { id: "a4", text: "Enterprise Security Gateway", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Do users or validators need specialized ASIC mining hardware on Electroneum?",
        answers: [
          { id: "a1", text: "No, the network uses zero mining rigs, operating on standard secure cloud servers", isCorrect: true },
          { id: "a2", text: "Yes, warehouses of ASIC rigs are mandatory", isCorrect: false },
          { id: "a3", text: "Only nuclear-powered computers can participate", isCorrect: false },
          { id: "a4", text: "Every user must own 10 graphics cards", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "How does an ultra-low carbon footprint insulate Electroneum from regulatory threats?",
        answers: [
          { id: "a1", text: "Complies with global climate mandates and avoids bans targeting energy-guzzling Proof of Work mining", isCorrect: true },
          { id: "a2", text: "Regulators only inspect green blockchains", isCorrect: false },
          { id: "a3", text: "It allows Electroneum to ignore all laws", isCorrect: false },
          { id: "a4", text: "By paying carbon fines to foreign governments", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "How does Electroneum combine environmental efficiency with philanthropic social impact?",
        answers: [
          { id: "a1", text: "By pairing green validator nodes with block rewards that fund NGO education and poverty relief", isCorrect: true },
          { id: "a2", text: "By taxing users 50% for environmental cleanup", isCorrect: false },
          { id: "a3", text: "By requiring proof of tree planting before sending ETN", isCorrect: false },
          { id: "a4", text: "By banning transactions outside national parks", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "Can enterprise corporations with strict carbon neutrality commitments build on Electroneum?",
        answers: [
          { id: "a1", text: "Yes, because transaction execution produces virtually zero carbon emissions", isCorrect: true },
          { id: "a2", text: "No, blockchain is banned by all corporations", isCorrect: false },
          { id: "a3", text: "Only if they purchase carbon offsets from competitors", isCorrect: false },
          { id: "a4", text: "Enterprises can only use private spreadsheets", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "What is the environmental footprint of minting an NFT on Electroneum compared to old PoW networks?",
        answers: [
          { id: "a1", text: "Negligible, comparable to sending an ordinary email", isCorrect: true },
          { id: "a2", text: "Produces 500 kilograms of CO2 per NFT", isCorrect: false },
          { id: "a3", text: "Consumes a barrel of oil per mint", isCorrect: false },
          { id: "a4", text: "Requires cutting down 10 trees", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "Why did Electroneum deliberately retire its original Proof of Work codebase?",
        answers: [
          { id: "a1", text: "To achieve 5-second deterministic finality, EVM compatibility, and clean green sustainability", isCorrect: true },
          { id: "a2", text: "Because computers stopped supporting mining", isCorrect: false },
          { id: "a3", text: "To make the blockchain slower", isCorrect: false },
          { id: "a4", text: "To prevent developers from building smart contracts", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "What is the core message of the Electroneum green architecture?",
        answers: [
          { id: "a1", text: "Decentralized finance can empower humanity without harming the planet", isCorrect: true },
          { id: "a2", text: "Crypto must always consume huge amounts of power", isCorrect: false },
          { id: "a3", text: "Only expensive blockchains are secure", isCorrect: false },
          { id: "a4", text: "Climate change cannot be addressed by technology", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
  "10": {
    title: "The Aurelius Smart Chain Master",
    description: "The ultimate trial to prove your comprehensive mastery of the Electroneum ecosystem.",
    nextUrl: "/electro-quests/10",
    questions: [
      {
        id: "q1",
        question: "What is the hallmark architectural achievement of the Aurelius upgrade?",
        answers: [
          { id: "a1", text: "Full EVM compatibility unified with IBFT 2.0 deterministic 5-second finality", isCorrect: true },
          { id: "a2", text: "A transition to a centralized MySQL database", isCorrect: false },
          { id: "a3", text: "The removal of all smart contract functionality", isCorrect: false },
          { id: "a4", text: "Reverting back to Proof of Work mining", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What four pillars define the complete Electroneum ecosystem?",
        answers: [
          { id: "a1", text: "IBFT 2.0 Consensus, EVM Compatibility, AnyTask Freelance, and Real-World Mobile Utility", isCorrect: true },
          { id: "a2", text: "Mining, Speculation, Day Trading, and Memes", isCorrect: false },
          { id: "a3", text: "Gold, Silver, Copper, and Oil", isCorrect: false },
          { id: "a4", text: "Bridges, Oracles, Yield Farms, and Liquidations", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "How does Electroquest verify your quest mastery on the blockchain?",
        answers: [
          { id: "a1", text: "Via EIP-712 cryptographic signature vouchers verified by the GameCore smart contract", isCorrect: true },
          { id: "a2", text: "By sending an email to customer support", isCorrect: false },
          { id: "a3", text: "Through manual database edits by a moderator", isCorrect: false },
          { id: "a4", text: "Relying purely on temporary browser cookies", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What rewards do players earn upon claiming an Electroquest stage on-chain?",
        answers: [
          { id: "a1", text: "5 ETN, 100 XP tokens, and an immutable Chapter NFT Rune", isCorrect: true },
          { id: "a2", text: "Nothing, it is purely simulated in local storage", isCorrect: false },
          { id: "a3", text: "A paper certificate sent through postal mail", isCorrect: false },
          { id: "a4", text: "1 Bitcoin", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What prestigious title is unlocked upon conquering all 10 stages of Electroquest?",
        answers: [
          { id: "a1", text: "Grand Master of the Aurelius Smart Chain", isCorrect: true },
          { id: "a2", text: "Novice Explorer", isCorrect: false },
          { id: "a3", text: "Unverified Guest", isCorrect: false },
          { id: "a4", text: "Inactive Node", isCorrect: false },
        ],
      },
      {
        id: "q6",
        question: "What is the official block explorer for inspecting transactions on Electroneum?",
        answers: [
          { id: "a1", text: "Electroneum Block Explorer (blockexplorer.electroneum.com)", isCorrect: true },
          { id: "a2", text: "Etherscan mainnet only", isCorrect: false },
          { id: "a3", text: "Blockchain.info", isCorrect: false },
          { id: "a4", text: "BscScan only", isCorrect: false },
        ],
      },
      {
        id: "q7",
        question: "What smart contract powers the competitive player ranking system on Electroquest?",
        answers: [
          { id: "a1", text: "Leaderboard.sol", isCorrect: true },
          { id: "a2", text: "RandomPicker.sol", isCorrect: false },
          { id: "a3", text: "BankVault.sol", isCorrect: false },
          { id: "a4", text: "ERC20Burner.sol", isCorrect: false },
        ],
      },
      {
        id: "q8",
        question: "How does deterministic finality prevent double-spending in retail point-of-sale?",
        answers: [
          { id: "a1", text: "Transactions are cryptographically locked in 5 seconds without risk of alternate fork overrides", isCorrect: true },
          { id: "a2", text: "It requires buyers to leave their wallets with the cashier", isCorrect: false },
          { id: "a3", text: "It charges double if a double-spend is attempted", isCorrect: false },
          { id: "a4", text: "Cashiers manually inspect code logs", isCorrect: false },
        ],
      },
      {
        id: "q9",
        question: "How does Electroquest ensure gas-efficient learning for Web3 newcomers on Electroneum?",
        answers: [
          { id: "a1", text: "Sub-cent network gas, interactive 3D simulations, and direct smart contract integration", isCorrect: true },
          { id: "a2", text: "By charging $50 per quiz attempt", isCorrect: false },
          { id: "a3", text: "By disabling all blockchain connectivity", isCorrect: false },
          { id: "a4", text: "By forcing users to buy expensive textbooks", isCorrect: false },
        ],
      },
      {
        id: "q10",
        question: "What is the ultimate takeaway of mastering the Electroneum ecosystem?",
        answers: [
          { id: "a1", text: "Electroneum provides a fast, green, EVM-compatible Layer 1 engineered for real-world global utility and inclusion", isCorrect: true },
          { id: "a2", text: "That cryptocurrency is only useful for trading memes", isCorrect: false },
          { id: "a3", text: "That smart contracts are too complex for human use", isCorrect: false },
          { id: "a4", text: "That blockchains must consume massive electricity to work", isCorrect: false },
        ],
      },
    ],
    correctAnswers: {
      q1: "a1",
      q2: "a1",
      q3: "a1",
      q4: "a1",
      q5: "a1",
      q6: "a1",
      q7: "a1",
      q8: "a1",
      q9: "a1",
      q10: "a1",
    },
  },
};
