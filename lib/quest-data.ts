// Scroll content for each quest
export const scrollContent: Record<
  string,
  { title: string; content: string[]; analogy: { title: string; text: string } }
> = {
  "1": {
    title: "The Ancient Knowledge of Nodes",
    content: [
      "In the realm of Ethereum, there exist mystical sentinels known as Nodes. These powerful entities are the guardians of the network, maintaining the sacred ledger of all transactions.",
      "A Node is a computer that runs Ethereum software, connecting to other Nodes across the world. Together, they form an unbreakable chain of trust, validating every action within the network.",
      "There are different types of Nodes, each serving a unique purpose. Full Nodes store the complete history of the blockchain, while Light Nodes keep only essential information. Archive Nodes preserve every detail since the beginning of time.",
      "By running a Node, one becomes a keeper of truth in the Ethereum realm. The Node validates transactions, executes smart contracts, and helps secure the network against dark forces.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Imagine a library where every book contains the complete history of every transaction ever made. Nodes are the librarians who verify that each new page added to the books is accurate and matches everyone else's records. If someone tries to write fake history, all the librarians (nodes) compare notes and reject the false entry. The more librarians (nodes) there are, the harder it is for anyone to tamper with the records.",
    },
  },
  "2": {
    title: "The Enchantment of Gas",
    content: [
      "Within the Ethereum realm, every action requires mystical energy known as Gas. This is not the gas of the physical world, but rather a measure of computational effort.",
      "Gas prevents the network from being overwhelmed by infinite loops or wasteful operations. Each operation in a smart contract requires a specific amount of Gas, ensuring efficiency and fairness.",
      "Miners and validators are rewarded with Gas fees for their service to the network. The more complex your transaction, the more Gas it consumes. During times of great activity, Gas prices rise as users compete for space in the next block.",
      "Understanding Gas is essential for any who wish to master Ethereum. It determines the speed and cost of your transactions, and wise management of Gas can save considerable resources.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Gas is like paying for stamps to mail a letter. A simple postcard needs one stamp (low gas), but a heavy package needs many stamps (high gas). When the post office is very busy, you might need to pay extra for priority delivery. If you don't put enough stamps on your mail, it won't get delivered. Gas works the same way - it's the fee you pay for the network to process your transaction, and complex operations cost more than simple ones.",
    },
  },
  "3": {
    title: "The Sacred Smart Contracts",
    content: [
      "Behold the most powerful magic in the Ethereum realm: Smart Contracts. These are self-executing agreements written in code, living forever on the blockchain.",
      "Once deployed, a Smart Contract cannot be altered or stopped. It executes exactly as programmed, with no possibility of censorship, downtime, or third-party interference.",
      "Smart Contracts enable decentralized applications, from simple token transfers to complex financial instruments. They are the foundation upon which the future of trustless systems is built.",
      "Written primarily in the ancient language of Solidity, these contracts contain functions, variables, and logic that execute when called upon. They can hold value, make decisions, and interact with other contracts.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "A smart contract is like a vending machine. You put money in (send Ether), press a button (call a function), and automatically get your snack (receive tokens or services). No cashier needed, no one can steal your money, and the machine can't suddenly decide to change the price. Once the vending machine is installed, it follows its rules perfectly every single time. Smart contracts are vending machines for any kind of agreement you can imagine.",
    },
  },
  "4": {
    title: "The Mystery of Wallets",
    content: [
      "Every traveler in the Ethereum realm requires a Wallet - a mystical vault that holds your keys to the kingdom. But unlike physical wallets, these hold no coins directly.",
      "A Wallet stores your private keys, which are secret codes that prove ownership of your assets on the blockchain. With these keys, you can sign transactions and access your funds.",
      "There are many types of Wallets: hot wallets connected to the internet for convenience, and cold wallets stored offline for maximum security. Each has its place in a wise traveler's arsenal.",
      "Remember this sacred truth: Not your keys, not your coins. If another holds your private keys, they hold your destiny. Guard them as you would guard your very soul.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Your wallet is like your email account. Your public address is like your email address (you can share it with anyone), and your private key is like your password (keep it secret!). Just as you need your password to send emails, you need your private key to send cryptocurrency. If someone gets your password, they can pretend to be you. If someone gets your private key, they can steal everything you own. The blockchain is like the email server - it stores all the messages (transactions), but you need your credentials to access your account.",
    },
  },
  "5": {
    title: "The Power of Decentralization",
    content: [
      "In the old world, power was concentrated in the hands of few - banks, governments, and corporations controlled the flow of value and information. But Ethereum brings a new paradigm.",
      "Decentralization means no single entity controls the network. Thousands of nodes across the globe work together, making it impossible for any one party to manipulate or shut down the system.",
      "This distribution of power creates resilience. Even if entire countries ban Ethereum, the network continues to operate. Even if major companies withdraw support, the protocol survives.",
      "Decentralization is not just technical architecture - it is philosophy made manifest. It represents freedom from central authority and trust in mathematics rather than institutions.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Imagine if the internet was controlled by one company that could decide who gets to use websites. Decentralization is like BitTorrent file sharing - even if some computers go offline, the file is stored on thousands of other computers and can still be downloaded. No single authority can shut it down because there's no central server to turn off. Ethereum works the same way: it's not run by one company or server but by thousands of independent computers worldwide, making it nearly impossible to censor or destroy.",
    },
  },
  "6": {
    title: "The Wisdom of Consensus",
    content: [
      "How do thousands of strangers agree on truth without a central authority? Through the ancient art of Consensus - the mechanism by which the network achieves agreement.",
      "Ethereum has evolved through different consensus mechanisms. It began with Proof of Work, where miners solved complex puzzles to add blocks. Now it uses Proof of Stake, where validators lock up ETH to secure the network.",
      "Proof of Stake is more energy efficient and secure. Validators who act maliciously lose their staked ETH, creating economic incentive for honest behavior. This is cryptoeconomics in action.",
      "Consensus mechanisms are the heartbeat of blockchain. They ensure that everyone agrees on the state of the ledger without needing to trust each other or rely on a central authority.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Imagine a classroom where students vote on the answer to a math problem. In Proof of Work, students race to solve the problem first (mining). In Proof of Stake, students who have good grades (staked ETH) get to propose answers, and other good students verify them. If someone proposes a wrong answer intentionally, they lose grade points (their stake gets slashed). This system encourages honest participation because lying costs more than telling the truth. The whole class reaches consensus when the majority agrees on the correct answer.",
    },
  },
  "7": {
    title: "The Essence of Tokens",
    content: [
      "Beyond Ether itself, the Ethereum realm is filled with countless Tokens - digital assets representing ownership, utility, or governance rights within decentralized applications.",
      "Tokens are created through smart contracts that follow specific standards. ERC-20 tokens are fungible (like currency), while ERC-721 tokens are non-fungible (like unique collectibles).",
      "Tokens can represent anything: shares in a company, voting rights in a DAO, ownership of digital art, points in a game, or access to services. They are the building blocks of the decentralized economy.",
      "Creating tokens requires no permission or approval. Anyone can launch a token in minutes, though building actual value and utility takes vision, effort, and community trust.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Tokens are like tickets or vouchers in different theme parks. Each park (project) has its own tickets (tokens) that work inside that park. Some tickets are identical and interchangeable, like arcade tokens (ERC-20). Others are unique, like a VIP backstage pass with your name on it (ERC-721 NFTs). You can trade tickets with other people, and some tickets might become valuable if the park becomes very popular. Ethereum is the land where all these parks exist, and ETH is the money you use to enter and move between them.",
    },
  },
  "8": {
    title: "The Architecture of DeFi",
    content: [
      "Decentralized Finance, known as DeFi, represents the reconstruction of traditional finance without intermediaries. Banks, brokers, and exchanges are replaced by code.",
      "Through DeFi protocols, anyone can lend, borrow, trade, earn interest, and access complex financial instruments. No account required, no credit check, no approval process.",
      "DeFi is composable - protocols can be stacked like building blocks. You can use one protocol to deposit funds, another to borrow against them, and another to trade, all in a single transaction.",
      "This financial revolution is still young, with both tremendous promise and significant risks. Smart contract bugs, economic exploits, and regulatory uncertainty create challenges alongside opportunity.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "DeFi is like replacing a traditional bank building with a network of ATMs that run themselves. Instead of asking a banker for a loan, you interact with a smart contract that automatically lends you money if you put up collateral. Instead of calling a broker to trade stocks, you swap directly from your wallet through automated systems. It's like having a bank that's open 24/7, serves anyone in the world, charges lower fees because there's no building or staff, and operates on transparent rules that can't be changed arbitrarily.",
    },
  },
  "9": {
    title: "The Protocol of EVM",
    content: [
      "At the heart of Ethereum lies the Ethereum Virtual Machine (EVM) - a computational engine that executes smart contract code across the entire network.",
      "The EVM is like a world computer that anyone can use. It processes instructions deterministically, meaning the same input always produces the same output, regardless of which node runs it.",
      "Every operation in the EVM costs gas, preventing abuse and ensuring finite execution. The EVM's instruction set is Turing-complete, meaning it can theoretically compute anything that can be computed.",
      "The EVM has become a standard beyond Ethereum itself. Many other blockchains implement EVM compatibility, creating a vast ecosystem of interoperable applications.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "The EVM is like a video game console that everyone in the world shares. Developers write games (smart contracts) that run exactly the same way on everyone's console, no matter where they are. You can't cheat or modify the game because everyone is playing the same verified version. Just like how you pay for electricity to power your console, you pay gas to run programs on the EVM. And just like how some consoles can play games from other consoles (backwards compatibility), many blockchains can run Ethereum programs because they support the EVM standard.",
    },
  },
  "10": {
    title: "The Vision of DAOs",
    content: [
      "Decentralized Autonomous Organizations (DAOs) are communities governed by code and collective decision-making, with no central leadership or hierarchy.",
      "In a DAO, token holders vote on proposals that automatically execute through smart contracts. Want to allocate treasury funds? Propose it, vote on it, and if passed, it happens automatically.",
      "DAOs coordinate humans at scale without traditional management structures. They enable global collaboration between strangers who share common goals but may never meet in person.",
      "From investment clubs to protocol governance to digital nations, DAOs are experimenting with new forms of human organization. They face challenges in coordination, security, and legal recognition, but represent a profound shift in how humans can work together.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "A DAO is like a club where every member has voting shares, and the club's rulebook is an unbreakable smart contract. Imagine a company where every decision - from hiring to spending money to changing company policy - is voted on by shareholders, and the votes automatically execute without a CEO or board of directors. If 51% vote to spend $10,000 on a project, the money is automatically transferred. No one person can veto it, steal it, or change the rules. It's democracy powered by code instead of trust, allowing thousands of strangers to work together on shared goals without anyone being in charge.",
    },
  },
}

// Quest room data with  hidden letters
export const questRooms: Record<
  string,
  {
    word: string
    letters: Array<{ id: string; letter: string; roomId: number; position: { x: string; y: string }; hint: string }>
  }
> = {
  "1": {
    word: "NODE",
    letters: [
      {
        id: "n",
        letter: "N",
        roomId: 0,
        position: { x: "25%", y: "35%" },
        hint: "Carved into the armory wall behind a shield",
      },
      {
        id: "o",
        letter: "O",
        roomId: 1,
        position: { x: "60%", y: "45%" },
        hint: "Hidden on the war council map table",
      },
      {
        id: "d",
        letter: "D",
        roomId: 2,
        position: { x: "35%", y: "50%" },
        hint: "Etched into a training dummy in the arena",
      },
      { id: "e", letter: "E", roomId: 3, position: { x: "70%", y: "40%" }, hint: "Glowing on a trophy in the chamber" },
    ],
  },
  "2": {
    word: "GAS",
    letters: [
      { id: "g", letter: "G", roomId: 0, position: { x: "30%", y: "50%" }, hint: "Hidden among the ancient weapons" },
      { id: "a", letter: "A", roomId: 1, position: { x: "55%", y: "38%" }, hint: "Marked on a strategic banner" },
      { id: "s", letter: "S", roomId: 3, position: { x: "45%", y: "55%" }, hint: "Inscribed on a battle relic" },
    ],
  },
  "3": {
    word: "CONTRACT",
    letters: [
      { id: "c1", letter: "C", roomId: 0, position: { x: "20%", y: "40%" }, hint: "Near a rusted sword" },
      { id: "o", letter: "O", roomId: 0, position: { x: "75%", y: "60%" }, hint: "Behind the armory pillar" },
      { id: "n", letter: "N", roomId: 1, position: { x: "40%", y: "35%" }, hint: "On the war council scroll" },
      { id: "t1", letter: "T", roomId: 1, position: { x: "65%", y: "65%" }, hint: "Under the strategy table" },
      { id: "r", letter: "R", roomId: 2, position: { x: "30%", y: "45%" }, hint: "Carved on training equipment" },
      { id: "a", letter: "A", roomId: 2, position: { x: "70%", y: "50%" }, hint: "Behind arena target practice" },
      { id: "c2", letter: "C", roomId: 3, position: { x: "35%", y: "38%" }, hint: "On an ancient trophy shield" },
      { id: "t2", letter: "T", roomId: 3, position: { x: "68%", y: "62%" }, hint: "Among the conquered relics" },
    ],
  },
  "4": {
    word: "WALLET",
    letters: [
      { id: "w", letter: "W", roomId: 0, position: { x: "28%", y: "42%" }, hint: "Etched on a battle axe handle" },
      { id: "a", letter: "A", roomId: 1, position: { x: "50%", y: "36%" }, hint: "Hidden in the council chamber" },
      { id: "l1", letter: "L", roomId: 1, position: { x: "72%", y: "58%" }, hint: "On a war banner" },
      { id: "l2", letter: "L", roomId: 2, position: { x: "42%", y: "48%" }, hint: "Marked on the arena floor" },
      { id: "e", letter: "E", roomId: 3, position: { x: "55%", y: "43%" }, hint: "Glowing on a trophy skull" },
      { id: "t", letter: "T", roomId: 3, position: { x: "38%", y: "65%" }, hint: "Behind the relic display" },
    ],
  },
  "5": {
    word: "DECENTRALIZATION",
    letters: [
      { id: "d", letter: "D", roomId: 0, position: { x: "22%", y: "38%" }, hint: "On the armory gate" },
      { id: "e1", letter: "E", roomId: 0, position: { x: "65%", y: "52%" }, hint: "Behind a shield rack" },
      { id: "c", letter: "C", roomId: 0, position: { x: "45%", y: "68%" }, hint: "Near weapon storage" },
      { id: "e2", letter: "E", roomId: 0, position: { x: "78%", y: "35%" }, hint: "Above the doorway" },
      { id: "n", letter: "N", roomId: 1, position: { x: "32%", y: "45%" }, hint: "On the war table" },
      { id: "t", letter: "T", roomId: 1, position: { x: "58%", y: "58%" }, hint: "Behind the banner" },
      { id: "r", letter: "R", roomId: 1, position: { x: "72%", y: "38%" }, hint: "On strategic maps" },
      { id: "a", letter: "A", roomId: 1, position: { x: "42%", y: "72%" }, hint: "Under the council seat" },
      { id: "l", letter: "L", roomId: 2, position: { x: "35%", y: "42%" }, hint: "On training equipment" },
      { id: "i", letter: "I", roomId: 2, position: { x: "68%", y: "55%" }, hint: "Behind arena pillar" },
      { id: "z", letter: "Z", roomId: 2, position: { x: "50%", y: "68%" }, hint: "Carved in floor" },
      { id: "a2", letter: "A", roomId: 2, position: { x: "25%", y: "58%" }, hint: "Near target practice" },
      { id: "t2", letter: "T", roomId: 3, position: { x: "45%", y: "48%" }, hint: "On trophy pedestal" },
      { id: "i2", letter: "I", roomId: 3, position: { x: "65%", y: "38%" }, hint: "Among relics" },
      { id: "o", letter: "O", roomId: 3, position: { x: "38%", y: "62%" }, hint: "Behind skull display" },
      { id: "n2", letter: "N", roomId: 3, position: { x: "72%", y: "52%" }, hint: "On conquered banner" },
    ],
  },
  "6": {
    word: "CONSENSUS",
    letters: [
      { id: "c", letter: "C", roomId: 0, position: { x: "30%", y: "45%" }, hint: "In the weapon arsenal" },
      { id: "o", letter: "O", roomId: 0, position: { x: "68%", y: "55%" }, hint: "Behind armory door" },
      { id: "n", letter: "N", roomId: 1, position: { x: "42%", y: "40%" }, hint: "On strategy scroll" },
      { id: "s1", letter: "S", roomId: 1, position: { x: "62%", y: "62%" }, hint: "Under war table" },
      { id: "e", letter: "E", roomId: 2, position: { x: "38%", y: "48%" }, hint: "In the training yard" },
      { id: "n2", letter: "N", roomId: 2, position: { x: "72%", y: "42%" }, hint: "On arena wall" },
      { id: "s2", letter: "S", roomId: 3, position: { x: "48%", y: "55%" }, hint: "Among trophies" },
      { id: "u", letter: "U", roomId: 3, position: { x: "58%", y: "38%" }, hint: "On relic shelf" },
      { id: "s3", letter: "S", roomId: 3, position: { x: "35%", y: "68%" }, hint: "Behind skull chamber" },
    ],
  },
  "7": {
    word: "TOKEN",
    letters: [
      { id: "t", letter: "T", roomId: 0, position: { x: "35%", y: "48%" }, hint: "Carved on blade" },
      { id: "o", letter: "O", roomId: 1, position: { x: "52%", y: "42%" }, hint: "On council seal" },
      { id: "k", letter: "K", roomId: 1, position: { x: "70%", y: "58%" }, hint: "Behind war banner" },
      { id: "e", letter: "E", roomId: 2, position: { x: "45%", y: "52%" }, hint: "On training shield" },
      { id: "n", letter: "N", roomId: 3, position: { x: "40%", y: "45%" }, hint: "Among relics" },
    ],
  },
  "8": {
    word: "DEFI",
    letters: [
      { id: "d", letter: "D", roomId: 0, position: { x: "40%", y: "50%" }, hint: "In armory shadows" },
      { id: "e", letter: "E", roomId: 1, position: { x: "55%", y: "45%" }, hint: "On war plans" },
      { id: "f", letter: "F", roomId: 2, position: { x: "48%", y: "55%" }, hint: "In arena corner" },
      { id: "i", letter: "I", roomId: 3, position: { x: "60%", y: "48%" }, hint: "Near trophy case" },
    ],
  },
  "9": {
    word: "EVM",
    letters: [
      { id: "e", letter: "E", roomId: 0, position: { x: "45%", y: "46%" }, hint: "Among weapons" },
      { id: "v", letter: "V", roomId: 2, position: { x: "50%", y: "50%" }, hint: "Center of arena" },
      { id: "m", letter: "M", roomId: 3, position: { x: "55%", y: "52%" }, hint: "On ancient relic" },
    ],
  },
  "10": {
    word: "DAO",
    letters: [
      { id: "d", letter: "D", roomId: 1, position: { x: "48%", y: "48%" }, hint: "On council table" },
      { id: "a", letter: "A", roomId: 2, position: { x: "52%", y: "52%" }, hint: "In training ground" },
      { id: "o", letter: "O", roomId: 3, position: { x: "58%", y: "50%" }, hint: "Among treasures" },
    ],
  },
}

// Quiz questions for each quest
export const quizData: Record<string, Array<{ question: string; options: string[]; correctAnswer: number }>> = {
  "1": [
    {
      question: "What is the primary purpose of an Ethereum node?",
      options: [
        "To mine cryptocurrency exclusively",
        "To validate transactions and maintain the blockchain",
        "To create new tokens",
        "To store user passwords",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which type of node stores the complete history of the Ethereum blockchain?",
      options: ["Light Node", "Archive Node", "Full Node", "Validator Node"],
      correctAnswer: 2,
    },
    {
      question: "What happens when you run an Ethereum node?",
      options: [
        "You automatically become a miner",
        "You help secure and validate the network",
        "You gain control over the blockchain",
        "You can reverse transactions",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which node type requires the least storage space?",
      options: ["Full Node", "Archive Node", "Light Node", "Super Node"],
      correctAnswer: 2,
    },
    {
      question: "Can a node operator censor transactions?",
      options: [
        "Yes, they have full control",
        "Only if they have special permissions",
        "No, nodes follow consensus rules",
        "Only large nodes can do this",
      ],
      correctAnswer: 2,
    },
    {
      question: "What software must you run to operate an Ethereum node?",
      options: [
        "Bitcoin Core",
        "Ethereum client software (like Geth or Nethermind)",
        "Microsoft Office",
        "A web browser",
      ],
      correctAnswer: 1,
    },
    {
      question: "Do you need permission to run an Ethereum node?",
      options: [
        "Yes, from the Ethereum Foundation",
        "Yes, from your government",
        "No, anyone can run a node",
        "Yes, from existing node operators",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the benefit of running your own node?",
      options: [
        "Free Ethereum tokens",
        "Increased privacy and trustlessness",
        "Ability to change blockchain rules",
        "Automatic mining rewards",
      ],
      correctAnswer: 1,
    },
    {
      question: "How do nodes communicate with each other?",
      options: ["Through email", "Via peer-to-peer networking", "Through a central server", "They don't communicate"],
      correctAnswer: 1,
    },
    {
      question: "What happens if a node goes offline?",
      options: [
        "The entire network stops",
        "The blockchain is deleted",
        "The network continues without it",
        "All transactions are reversed",
      ],
      correctAnswer: 2,
    },
  ],
  "2": [
    {
      question: 'What does "Gas" measure in Ethereum?',
      options: [
        "The size of a transaction in bytes",
        "The computational effort required",
        "The amount of Ether sent",
        "The number of transactions",
      ],
      correctAnswer: 1,
    },
    {
      question: "Who receives the Gas fees?",
      options: [
        "The Ethereum Foundation",
        "The sender of the transaction",
        "Miners and validators",
        "Smart contract developers",
      ],
      correctAnswer: 2,
    },
    {
      question: "What happens if you set Gas too low?",
      options: [
        "Your transaction gets priority",
        "Your transaction may not be processed",
        "You get a refund",
        "Nothing changes",
      ],
      correctAnswer: 1,
    },
    {
      question: "When do Gas prices typically increase?",
      options: [
        "During low network activity",
        "When the blockchain is empty",
        "During high network congestion",
        "On weekends only",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the unit used to measure Gas prices?",
      options: ["Ether", "Gwei", "Bitcoin", "Dollars"],
      correctAnswer: 1,
    },
    {
      question: "Can unused Gas be refunded?",
      options: ["Never", "Always", "Yes, unused Gas is returned", "Only on Tuesdays"],
      correctAnswer: 2,
    },
    {
      question: "What determines the Gas limit?",
      options: ["The Ethereum Foundation", "The user sending the transaction", "The block size", "Random selection"],
      correctAnswer: 1,
    },
    {
      question: "Why was Gas introduced in Ethereum?",
      options: [
        "To make transactions expensive",
        "To prevent spam and infinite loops",
        "To generate revenue",
        "To slow down the network",
      ],
      correctAnswer: 1,
    },
    {
      question: 'What is "Gas Price"?',
      options: [
        "The total cost of Gas",
        "How much you're willing to pay per unit of Gas",
        "A fixed fee",
        "The amount of Ether in your wallet",
      ],
      correctAnswer: 1,
    },
    {
      question: "Do simple transfers require less Gas than complex smart contracts?",
      options: [
        "No, all transactions use the same Gas",
        "Yes, simple operations use less Gas",
        "No, transfers use more Gas",
        "It depends on the day",
      ],
      correctAnswer: 1,
    },
  ],
  "3": [
    {
      question: "What is a Smart Contract?",
      options: [
        "A legal document",
        "Self-executing code on the blockchain",
        "A type of cryptocurrency",
        "An Ethereum wallet",
      ],
      correctAnswer: 1,
    },
    {
      question: "Can a deployed Smart Contract be modified?",
      options: ["Yes, anytime", "Only by the creator", "No, it is immutable", "Only with community vote"],
      correctAnswer: 2,
    },
    {
      question: "What language are most Ethereum Smart Contracts written in?",
      options: ["JavaScript", "Python", "Solidity", "C++"],
      correctAnswer: 2,
    },
    {
      question: "Can Smart Contracts hold value (Ether)?",
      options: [
        "No, never",
        "Yes, they can hold and transfer value",
        "Only test Ether",
        "Only with special permission",
      ],
      correctAnswer: 1,
    },
    {
      question: "What triggers a Smart Contract to execute?",
      options: [
        "They execute randomly",
        "Manual approval from miners",
        "A transaction calling its functions",
        "Automatic daily execution",
      ],
      correctAnswer: 2,
    },
    {
      question: "Can Smart Contracts interact with other Smart Contracts?",
      options: [
        "No, they work in isolation",
        "Yes, they can call other contracts",
        "Only if they're on the same block",
        "Only with permission",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a key advantage of Smart Contracts?",
      options: [
        "They can be easily changed",
        "They eliminate the need for trust",
        "They're cheaper than regular contracts",
        "They work offline",
      ],
      correctAnswer: 1,
    },
    {
      question: "Where are Smart Contracts stored?",
      options: ["On a central server", "On the blockchain", "In the cloud", "On your computer"],
      correctAnswer: 1,
    },
    {
      question: "Can a Smart Contract be censored or stopped?",
      options: [
        "Yes, by the creator",
        "Yes, by the government",
        "No, once deployed it runs autonomously",
        "Yes, by miners",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is a potential use case for Smart Contracts?",
      options: ["Sending emails", "Browsing the web", "Decentralized finance (DeFi)", "Playing video games"],
      correctAnswer: 2,
    },
  ],
  "4": [
    {
      question: "What is a Wallet in Ethereum?",
      options: [
        "A physical coin purse",
        "A software program for managing cryptocurrency",
        "A bank account",
        "A type of transaction",
      ],
      correctAnswer: 1,
    },
    {
      question: "What does a Wallet store?",
      options: [
        "Physical Ether coins",
        "Private keys for accessing your assets",
        "Public addresses for sending Ether",
        "All of the above",
      ],
      correctAnswer: 2,
    },
    {
      question: "What are the two main types of Wallets?",
      options: [
        "Hot Wallets and Cold Wallets",
        "Software Wallets and Hardware Wallets",
        "Online Wallets and Offline Wallets",
        "Public Wallets and Private Wallets",
      ],
      correctAnswer: 1,
    },
    {
      question: "Why is it important to keep your private keys safe?",
      options: [
        "To prevent unauthorized access to your funds",
        "To ensure faster transaction processing",
        "To increase the value of your Ether",
        "To comply with regulations",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the risk of using a hot Wallet?",
      options: [
        "It can hold more Ether",
        "It's more secure than a cold Wallet",
        "It can be hacked if connected to the internet",
        "It requires physical storage",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is a cold Wallet?",
      options: [
        "A Wallet connected to the internet",
        "A Wallet stored offline",
        "A Wallet that generates Ether",
        "A Wallet that can change the blockchain rules",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the benefit of using a cold Wallet?",
      options: [
        "It allows for instant transactions",
        "It provides higher transaction speeds",
        "It protects your funds from online threats",
        "It requires regular maintenance",
      ],
      correctAnswer: 2,
    },
    {
      question: "Can you access your funds without your private keys?",
      options: [
        "Yes, through a public key",
        "Yes, through a password",
        "No, private keys are essential for access",
        "No, once your Ether is sent, it's lost",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the relationship between your public address and private key?",
      options: [
        "They are the same thing",
        "Your public address is derived from your private key",
        "Your private key is derived from your public address",
        "They are unrelated",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a mnemonic phrase?",
      options: [
        "A password for your Wallet",
        "A backup of your private keys",
        "A type of Ethereum token",
        "A way to generate public addresses",
      ],
      correctAnswer: 2,
    },
  ],
  "5": [
    {
      question: "What is Decentralization?",
      options: [
        "A system where power is concentrated in one entity",
        "A system where power is distributed across many entities",
        "A system where power is given to governments",
        "A system where power is given to corporations",
      ],
      correctAnswer: 1,
    },
    {
      question: "How does Decentralization prevent censorship?",
      options: [
        "By having a single point of control",
        "By distributing control across many nodes",
        "By relying on central authorities",
        "By using traditional financial systems",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is a node in the context of Ethereum?",
      options: [
        "A type of cryptocurrency",
        "A computer running Ethereum software",
        "A bank branch",
        "A government office",
      ],
      correctAnswer: 1,
    },
    {
      question: "How many nodes are required for Ethereum to function?",
      options: ["Just one powerful node", "A few key nodes", "Thousands of nodes worldwide", "A hundred nodes"],
      correctAnswer: 2,
    },
    {
      question: "What is the advantage of having many nodes in the network?",
      options: [
        "It makes the network more vulnerable to attacks",
        "It allows for easier censorship",
        "It increases the network's security and resilience",
        "It reduces the speed of transactions",
      ],
      correctAnswer: 2,
    },
    {
      question: "Can a country ban Ethereum if it's decentralized?",
      options: [
        "Yes, easily",
        "No, because it's run by a single entity",
        "No, because it's run by thousands of entities",
        "Yes, but only temporarily",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the role of nodes in Ethereum?",
      options: [
        "To control the flow of Ether",
        "To store all transactions",
        "To validate transactions and maintain the blockchain",
        "To create new tokens",
      ],
      correctAnswer: 2,
    },
    {
      question: "How does Ethereum ensure trust without a central authority?",
      options: [
        "Through a single trusted entity",
        "Through mathematical algorithms and consensus mechanisms",
        "Through traditional financial regulations",
        "Through community voting",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the impact of decentralization on the Ethereum network?",
      options: [
        "It makes the network more susceptible to hacking",
        "It increases the network's efficiency and security",
        "It decreases the network's functionality",
        "It centralizes control in a few hands",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the main challenge of decentralization?",
      options: [
        "Ensuring high transaction speeds",
        "Maintaining a single point of control",
        "Achieving consensus among many nodes",
        "Increasing the network's storage capacity",
      ],
      correctAnswer: 2,
    },
  ],
  "6": [
    {
      question: "What is Consensus in Ethereum?",
      options: [
        "A system where a single entity decides the truth",
        "A system where many nodes agree on the truth",
        "A system where users vote on the truth",
        "A system where miners control the truth",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is Proof of Work (PoW)?",
      options: [
        "A consensus mechanism where miners solve complex puzzles",
        "A consensus mechanism where validators lock up ETH",
        "A consensus mechanism where nodes vote on transactions",
        "A consensus mechanism where miners control the network",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is Proof of Stake (PoS)?",
      options: [
        "A consensus mechanism where miners solve complex puzzles",
        "A consensus mechanism where validators lock up ETH",
        "A consensus mechanism where nodes vote on transactions",
        "A consensus mechanism where miners control the network",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the benefit of Proof of Stake over Proof of Work?",
      options: [
        "It's more expensive",
        "It's less energy-intensive and more secure",
        "It requires more nodes",
        "It's slower",
      ],
      correctAnswer: 2,
    },
    {
      question: "What happens if a validator acts maliciously in Proof of Stake?",
      options: [
        "They are rewarded with more ETH",
        "They are punished by losing their staked ETH",
        "They are ignored by the network",
        "They are given special permissions",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the role of validators in Ethereum?",
      options: [
        "To create new Ether",
        "To validate transactions and secure the network",
        "To store the complete blockchain history",
        "To manage user accounts",
      ],
      correctAnswer: 2,
    },
    {
      question: "How does Ethereum achieve consensus?",
      options: [
        "Through a single trusted entity",
        "Through mathematical algorithms and decentralized nodes",
        "Through traditional voting systems",
        "Through community discussions",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the main challenge of consensus mechanisms?",
      options: [
        "Ensuring high transaction speeds",
        "Maintaining a single point of control",
        "Achieving agreement among many nodes",
        "Increasing the network's storage capacity",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the impact of consensus mechanisms on the Ethereum network?",
      options: [
        "It makes the network more susceptible to hacking",
        "It increases the network's efficiency and security",
        "It decreases the network's functionality",
        "It centralizes control in a few hands",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the future of consensus mechanisms in Ethereum?",
      options: [
        "They will become less important",
        "They will evolve to be more energy-efficient and secure",
        "They will remain unchanged",
        "They will be replaced by traditional voting systems",
      ],
      correctAnswer: 1,
    },
  ],
  "7": [
    {
      question: "What is a Token in Ethereum?",
      options: [
        "A type of cryptocurrency",
        "A piece of digital art",
        "A unit of measurement",
        "A self-executing contract",
      ],
      correctAnswer: 1,
    },
    {
      question: "What are the two main types of Tokens?",
      options: ["ERC-20 and ERC-721", "Fungible and Non-fungible", "Utility and Governance", "Private and Public"],
      correctAnswer: 2,
    },
    {
      question: "What is ERC-20?",
      options: [
        "A type of Ethereum node",
        "A standard for fungible tokens",
        "A consensus mechanism",
        "A decentralized application",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is ERC-721?",
      options: [
        "A type of Ethereum node",
        "A standard for non-fungible tokens",
        "A consensus mechanism",
        "A decentralized application",
      ],
      correctAnswer: 2,
    },
    {
      question: "What can tokens represent?",
      options: [
        "Only shares in a company",
        "Only voting rights in a DAO",
        "Ownership, utility, or governance rights",
        "Nothing",
      ],
      correctAnswer: 2,
    },
    {
      question: "How are tokens created?",
      options: [
        "Through a central authority",
        "Through smart contracts",
        "Through traditional financial systems",
        "Through mining",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the benefit of creating your own token?",
      options: [
        "You can create infinite tokens",
        "You can build actual value and utility",
        "You can control the entire network",
        "You can earn unlimited fees",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the main challenge of building value with tokens?",
      options: [
        "Ensuring high transaction speeds",
        "Maintaining a single point of control",
        "Achieving consensus among many nodes",
        "Building community trust and utility",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the impact of tokens on the Ethereum network?",
      options: [
        "It makes the network more susceptible to hacking",
        "It increases the network's efficiency and security",
        "It decreases the network's functionality",
        "It creates a new economy of decentralized applications",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the future of tokens in Ethereum?",
      options: [
        "They will become less important",
        "They will evolve to represent more complex assets",
        "They will remain unchanged",
        "They will be replaced by traditional financial systems",
      ],
      correctAnswer: 2,
    },
  ],
  "8": [
    {
      question: "What is DeFi?",
      options: [
        "A traditional financial system",
        "A decentralized financial system",
        "A type of cryptocurrency",
        "A consensus mechanism",
      ],
      correctAnswer: 1,
    },
    {
      question: "What are the main components of DeFi?",
      options: [
        "Banks, brokers, and exchanges",
        "Smart contracts and decentralized protocols",
        "Centralized servers and databases",
        "Physical ATMs",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the benefit of DeFi over traditional finance?",
      options: [
        "Higher transaction fees",
        "Lower fees and increased accessibility",
        "More complex regulations",
        "Less security",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the main challenge of DeFi?",
      options: [
        "Ensuring high transaction speeds",
        "Maintaining a single point of control",
        "Achieving consensus among many nodes",
        "Building community trust and utility",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the impact of DeFi on the financial world?",
      options: [
        "It will replace traditional finance entirely",
        "It will coexist with traditional finance",
        "It will be banned by governments",
        "It will have no significant impact",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the future of DeFi?",
      options: [
        "It will become less important",
        "It will evolve to be more secure and accessible",
        "It will remain unchanged",
        "It will be replaced by traditional financial systems",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is a decentralized protocol?",
      options: [
        "A protocol run by a central authority",
        "A protocol run by many independent nodes",
        "A type of cryptocurrency",
        "A consensus mechanism",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is composability in DeFi?",
      options: [
        "The ability to combine different protocols",
        "The ability to isolate protocols",
        "The ability to change protocol rules",
        "The ability to delete protocols",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the benefit of composability in DeFi?",
      options: [
        "It makes protocols less flexible",
        "It increases the complexity of transactions",
        "It allows for more complex financial applications",
        "It decreases the security of the network",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the main risk of DeFi?",
      options: [
        "Higher transaction speeds",
        "Maintaining a single point of control",
        "Smart contract bugs and security exploits",
        "Increased accessibility",
      ],
      correctAnswer: 2,
    },
  ],
  "9": [
    {
      question: "What is the Ethereum Virtual Machine (EVM)?",
      options: ["A physical computer", "A software program", "A type of cryptocurrency", "A consensus mechanism"],
      correctAnswer: 1,
    },
    {
      question: "What is the role of the EVM in Ethereum?",
      options: [
        "To store the complete blockchain history",
        "To validate transactions and secure the network",
        "To execute smart contract code",
        "To manage user accounts",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the benefit of the EVM?",
      options: [
        "It allows for more complex smart contracts",
        "It decreases the network's efficiency",
        "It makes the network more susceptible to hacking",
        "It centralizes control in a few hands",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the main challenge of the EVM?",
      options: [
        "Ensuring high transaction speeds",
        "Maintaining a single point of control",
        "Achieving consensus among many nodes",
        "Building community trust and utility",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the impact of the EVM on the Ethereum network?",
      options: [
        "It makes the network more susceptible to hacking",
        "It increases the network's efficiency and security",
        "It decreases the network's functionality",
        "It creates a new economy of decentralized applications",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the future of the EVM?",
      options: [
        "It will become less important",
        "It will evolve to be more secure and efficient",
        "It will remain unchanged",
        "It will be replaced by traditional computing systems",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is Turing-completeness?",
      options: [
        "The ability to solve any computational problem",
        "The ability to solve only simple problems",
        "The ability to solve problems faster than traditional computers",
        "The ability to solve problems more securely than traditional computers",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the main advantage of the EVM's instruction set being Turing-complete?",
      options: [
        "It limits the types of smart contracts that can be created",
        "It allows for the creation of any smart contract",
        "It decreases the security of the network",
        "It increases the complexity of transactions",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is interoperability in the context of the EVM?",
      options: [
        "The ability to run only Ethereum smart contracts",
        "The ability to run smart contracts from other blockchains",
        "The ability to run only simple smart contracts",
        "The ability to run only complex smart contracts",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the impact of interoperability on the Ethereum network?",
      options: [
        "It makes the network more susceptible to hacking",
        "It increases the network's efficiency and security",
        "It decreases the network's functionality",
        "It creates a new economy of decentralized applications",
      ],
      correctAnswer: 1,
    },
  ],
  "10": [
    {
      question: "What is a Decentralized Autonomous Organization (DAO)?",
      options: [
        "A traditional organization with a central authority",
        "A community governed by code and collective decision-making",
        "A type of cryptocurrency",
        "A consensus mechanism",
      ],
      correctAnswer: 1,
    },
    {
      question: "What are the main components of a DAO?",
      options: [
        "Banks, brokers, and exchanges",
        "Smart contracts and decentralized protocols",
        "Centralized servers and databases",
        "Physical ATMs",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the benefit of a DAO over traditional organizations?",
      options: [
        "Higher transaction fees",
        "Lower fees and increased accessibility",
        "More complex regulations",
        "Less security",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the main challenge of a DAO?",
      options: [
        "Ensuring high transaction speeds",
        "Maintaining a single point of control",
        "Achieving consensus among many nodes",
        "Building community trust and utility",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the impact of DAOs on the world?",
      options: [
        "It will replace traditional organizations entirely",
        "It will coexist with traditional organizations",
        "It will be banned by governments",
        "It will have no significant impact",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the future of DAOs?",
      options: [
        "It will become less important",
        "It will evolve to be more secure and accessible",
        "It will remain unchanged",
        "It will be replaced by traditional organizations",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is collective decision-making?",
      options: [
        "Decision-making by a single entity",
        "Decision-making by many entities working together",
        "Decision-making by a few key individuals",
        "Decision-making by traditional voting systems",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the benefit of collective decision-making in a DAO?",
      options: [
        "It allows for more complex decisions",
        "It increases the speed of decision-making",
        "It ensures that decisions are made by a single entity",
        "It allows for decentralized governance",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the main risk of collective decision-making in a DAO?",
      options: [
        "Ensuring high transaction speeds",
        "Maintaining a single point of control",
        "Achieving consensus among many nodes",
        "Smart contract bugs and security exploits",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is a potential use case for DAOs?",
      options: ["Sending emails", "Browsing the web", "Decentralized finance (DeFi)", "Playing video games"],
      correctAnswer: 2,
    },
  ],
}
