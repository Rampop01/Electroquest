// Scroll content for each Celo quest
export const celoScrollContent: Record<
  string,
  { title: string; content: string[]; analogy: { title: string; text: string } }
> = {
  "1": {
    title: "Celo Network Foundations",
    content: [
      "Celo is a carbon-negative, mobile-first blockchain that makes financial tools accessible to anyone with a mobile phone. It is transitioning to an Ethereum Layer 2 to align with the Ethereum ecosystem while maintaining its unique focus on real-world utility.",
      "At its core, Celo is built for mobile accessibility. It uses phone numbers as public keys, making it as easy to send crypto as it is to send a text message.",
      "The Celo ecosystem is home to a suite of algorithmic stablecoins like cUSD, cEUR, and cREAL, which are backed by the Celo Reserve and provide price stability for everyday transactions.",
      "By transitioning to an Ethereum L2, Celo will leverage Ethereum's security while providing the ultra-low fees and fast finality required for global financial inclusion.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Imagine Ethereum as a busy highway where traffic is slow and expensive. Celo is like adding an express lane that runs parallel to the main highway. It can handle more cars (transactions) at higher speeds (faster confirmations) and lower tolls (gas fees), while still being connected to the main highway for security and finality.",
    },
  },
  "2": {
    title: "Celo's Optimistic Rollup Technology",
    content: [
      "Celo leverages Optimistic Rollup technology to achieve its impressive scalability. This approach bundles multiple transactions together and submits them to Ethereum as a single transaction, significantly reducing costs and increasing throughput.",
      "The 'optimistic' in Optimistic Rollups comes from the assumption that all transactions are valid by default. However, there's a challenge period during which anyone can dispute a transaction's validity if they believe it's fraudulent.",
      "Celo's implementation includes several optimizations over standard Optimistic Rollups, including a decentralized sequencer and improved data compression techniques. These enhancements help reduce latency and further decrease transaction costs.",
      "The network also implements a unique fraud proof system that allows anyone to challenge invalid state transitions, ensuring the network remains secure even as it scales.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Imagine you're a teacher collecting homework from 100 students. Instead of grading each paper individually (like Ethereum mainnet), you collect them all in a folder (rollup batch) and only submit one grade for the entire class. If a student thinks you made a mistake (fraud proof), they can challenge it within a certain time. This way, you maintain accuracy while saving enormous time and effort.",
    },
  },
  "3": {
    title: "The $CELO Token and Mento Protocol",
    content: [
      "$CELO is the native asset of the Electroneum blockchain, used for transaction fees, governance, and securing the network through staking.",
      "The Mento Protocol is a key component of Celo, responsible for the stability of Celo stablecoins. It allows users to trade $CELO for cUSD and other stable assets based on real-time market demand.",
      "Governance on Celo is truly decentralized. CELO holders can vote on protocol changes, additions to the Celo Reserve, and community fund allocations.",
      "As Celo moves to Ethereum L2, the CELO token will continue to play a central role in the network's decentralized sequencer and governance structure.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "$MNT is like owning shares in a cooperative business. As a token holder, you get voting rights on important decisions (governance), you can use your shares to participate in the business's operations (staking), and the value of your shares may increase as the business grows. The more active and successful the cooperative becomes, the more valuable your participation becomes.",
    },
  },
  "4": {
    title: "Building dApps on Celo",
    content: [
      "Developing on Celo is designed to be as seamless as possible for Ethereum developers. Since Celo is EVM-compatible, you can deploy existing Solidity smart contracts with minimal changes.",
      "The network provides developers with a comprehensive set of tools and documentation to get started quickly. This includes development frameworks, testing environments, and deployment tooling that will feel familiar to Ethereum developers.",
      "Celo's architecture is designed to support complex dApps with high throughput requirements, making it ideal for DeFi protocols, gaming applications, and social networks.",
      "The network also offers developer grants and other incentives to encourage the creation of innovative applications that leverage Celo's unique capabilities.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Building on Celo is like moving your business to a new office in a business park. The furniture and equipment (smart contracts) from your old office fit perfectly in the new space (EVM compatibility), but now you have access to better infrastructure (scaling), lower rent (gas fees), and a growing community of other businesses (ecosystem). The landlord (Celo team) even offers incentives to help you set up and grow your business.",
    },
  },
  "5": {
    title: "Celo's Modular Architecture",
    content: [
      "Celo's innovative modular architecture separates the blockchain's core functions into distinct layers, allowing for greater flexibility and scalability.",
      "The execution layer handles transaction processing, while the settlement layer ensures finality and security. This separation allows each layer to be optimized independently.",
      "Data availability is handled through a separate module, ensuring that all transaction data is accessible when needed while keeping costs low.",
      "This modular approach makes it easier to upgrade individual components of the network without disrupting the entire system, enabling faster innovation and adaptation.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Celo's modular architecture is like a modern, modular home. Instead of having all the plumbing, electrical, and structural elements permanently fixed together, each system is designed as an independent module. If you want to upgrade the electrical system (execution layer), you don't need to tear down the whole house. This makes maintenance easier, allows for targeted improvements, and lets the home (network) evolve over time without major disruptions.",
    },
  },
  "6": {
    title: "Data Availability on Celo",
    content: [
      "Celo implements an innovative approach to data availability that significantly reduces costs while maintaining security. It uses a combination of on-chain and off-chain data storage to achieve this balance.",
      "The network employs data availability sampling to ensure that all necessary data is accessible when needed, without requiring every node to store the entire history of the chain.",
      "This approach allows Celo to scale efficiently while keeping transaction fees low. It also enables faster transaction finality compared to traditional blockchain architectures.",
      "Developers can choose different data availability options based on their application's specific requirements, balancing cost, security, and performance.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Celo's data availability is like having a highly efficient library system. Instead of keeping every book (transaction data) in the main reading room (on-chain storage), less frequently accessed books are stored in a high-capacity archive (off-chain storage). A precise catalog system (cryptographic proofs) ensures any book can be quickly retrieved when needed, while the main reading room remains uncluttered and efficient for daily use.",
    },
  },
  "7": {
    title: "Security and Decentralization in Celo",
    content: [
      "While Celo offers significant scalability improvements, it doesn't compromise on security. The network inherits Ethereum's security through its rollup architecture while adding additional safeguards.",
      "The decentralized sequencer ensures that no single entity controls transaction ordering, preventing front-running and other forms of MEV (Miner Extractable Value) exploitation.",
      "Celo's fraud proof system is designed to be efficient and accessible, allowing anyone to participate in securing the network. This decentralized verification is crucial for maintaining the network's integrity.",
      "Regular security audits and bug bounty programs help identify and address potential vulnerabilities before they can be exploited.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Celo's security model is like a modern bank vault with multiple layers of protection. The outer walls are made of the same strong materials as traditional vaults (Ethereum's security), but inside there are additional high-tech security measures (fraud proofs, decentralized sequencing) that make it even more secure. Multiple independent security guards (validators) constantly monitor the vault, and there's a reward for anyone who can find a weakness in the system.",
    },
  },
  "8": {
    title: "Bridging Assets to Celo",
    content: [
      "Celo provides secure bridges that allow users to move assets between Ethereum and the Celo network. These bridges are designed to be trust-minimized and secure.",
      "The bridging process is straightforward: users lock their assets in a smart contract on the origin chain, and equivalent assets are minted on Celo. The reverse process burns the assets on Celo to unlock them on the original chain.",
      "Multiple bridge implementations are available, including official bridges and third-party solutions, giving users flexibility in how they move their assets.",
      "Security is a top priority for bridging, with multiple layers of protection against common attack vectors like front-running and replay attacks.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Bridging assets to Celo is like exchanging currency when traveling to another country. You exchange your home currency (Ethereum assets) for the local currency (Celo-wrapped assets) at a trusted exchange (bridge). The exchange gives you a receipt (proof) that you can use to get your original currency back when you return home. The exchange rate is always 1:1, and the process is designed to be secure and verifiable at every step.",
    },
  },
  "9": {
    title: "Celo's Roadmap and Future Developments",
    content: [
      "Celo has an ambitious roadmap focused on continuous improvement and expansion. The development team is working on several key upgrades to enhance the network's capabilities.",
      "Upcoming features include improved fraud proof mechanisms, enhanced cross-chain interoperability, and additional developer tooling to make building on Celo even easier.",
      "The network is also exploring ways to further decentralize its infrastructure, including the addition of more node operators and validators from the community.",
      "Long-term, Celo aims to be a leading Layer 2 solution that supports a wide range of decentralized applications while maintaining strong security and decentralization.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Celo's development is like constructing a city with a master plan. The initial neighborhoods (core features) are already built and thriving, but there are carefully planned expansions (upgrades) in the works. New roads (scaling solutions), parks (developer tools), and public services (governance mechanisms) are being added based on the needs of the community. The city planners (core team) work closely with the residents (community) to ensure the development meets everyone's needs.",
    },
  },
  "10": {
    title: "Celo's Role in the Broader Ethereum Ecosystem",
    content: [
      "Celo is an important part of Ethereum's multi-chain future, providing a scalable execution layer that complements Ethereum's security and decentralization.",
      "The network is designed to be interoperable with other Layer 2 solutions and Ethereum itself, allowing for seamless movement of assets and data across the ecosystem.",
      "By handling transactions off-chain while maintaining strong connections to Ethereum, Celo helps reduce congestion on the mainnet while still benefiting from its security.",
      "The success of Celo and other Layer 2 solutions is crucial for Ethereum's ability to scale to billions of users while maintaining its core values.",
    ],
    analogy: {
      title: "Think of it like...",
      text: "Celo's role in the Ethereum ecosystem is like a high-speed rail system connected to a major city (Ethereum). The city remains the cultural and economic hub (settlement layer), but the rail system (Celo) allows people to live and work in the surrounding areas (off-chain) while still being closely connected. This reduces congestion in the city center while allowing the entire metropolitan area to grow and thrive together.",
    },
  },
};

// Quest room data with letter positions
export const celoQuestRooms: Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    letter: string;
    nextUrl: string;
    word: string;
    letters: Array<{
      id: string;
      letter: string;
      roomId: number;
      position: { x: string; y: string };
      hint: string;
    }>;
  }
> = {
  "1": {
    id: "1",
    title: "The Prosperity Chamber",
    description: "Discover the foundations of Celo's mobile-first mission and its role in global financial inclusion.",
    letter: "C",
    nextUrl: "/electro-quests/2",
    word: "CELO",
    letters: [
      {
        id: "c",
        letter: "C",
        roomId: 0,
        position: { x: "20%", y: "30%" },
        hint: "The first letter of Celo"
      },
      {
        id: "e",
        letter: "E",
        roomId: 1,
        position: { x: "40%", y: "50%" },
        hint: "Second letter of Celo"
      },
      {
        id: "l",
        letter: "L",
        roomId: 2,
        position: { x: "60%", y: "40%" },
        hint: "Third letter of Celo"
      },
      {
        id: "o",
        letter: "O",
        roomId: 3,
        position: { x: "80%", y: "40%" },
        hint: "Final letter of Celo"
      }
    ]
  },
  "2": {
    id: "2",
    title: "The Stable Vault",
    description: "Explore the Mento Protocol and the suite of Celo stablecoins (cUSD, cEUR, cREAL).",
    letter: "S",
    nextUrl: "/electro-quests/3",
    word: "STABLE",
    letters: [
      {
        id: "s",
        letter: "S",
        roomId: 0,
        position: { x: "15%", y: "30%" },
        hint: "The first letter of Stable"
      },
      {
        id: "t",
        letter: "T",
        roomId: 1,
        position: { x: "30%", y: "50%" },
        hint: "Second letter"
      },
      {
        id: "a",
        letter: "A",
        roomId: 2,
        position: { x: "45%", y: "30%" },
        hint: "Third letter"
      },
      {
        id: "b",
        letter: "B",
        roomId: 3,
        position: { x: "60%", y: "50%" },
        hint: "Fourth letter"
      },
      {
        id: "l",
        letter: "L",
        roomId: 0,
        position: { x: "75%", y: "30%" },
        hint: "Fifth letter"
      },
      {
        id: "e",
        letter: "E",
        roomId: 1,
        position: { x: "90%", y: "50%" },
        hint: "Final letter"
      }
    ]
  }
};

export const celoQuizData: Record<
  string,
  Array<{ question: string; options: string[]; correctAnswer: number }>
> = {
  "1": [
    {
      question: "What is the primary focus of the Celo Network?",
      options: [
        "Replacing Ethereum entirely",
        "High-frequency stock trading",
        "Mobile-first financial inclusion for everyone",
        "Storage for large video files",
      ],
      correctAnswer: 2,
    },
    {
      question: "Which of these is a unique feature of the Electroneum blockchain?",
      options: [
        "It requires a supercomputer to run a node",
        "It uses phone numbers as public keys for easy mapping",
        "It only works on desktop browsers",
        "It has no governance mechanism",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the native utility and governance token of Celo?",
      options: ["cUSD", "CELO", "GOLD", "cREAL"],
      correctAnswer: 1,
    },
    {
      question: "Celo is best described as which type of network?",
      options: [
        "An Ethereum Layer 1",
        "A centralized exchange",
        "An Ethereum Layer 2",
        "A standalone private chain",
      ],
      correctAnswer: 2,
    },
    {
      question: "Why is Celo considered EVM-compatible?",
      options: [
        "It runs Bitcoin scripts",
        "It can execute Ethereum smart contracts",
        "It only supports NFTs",
        "It replaces Ethereum consensus",
      ],
      correctAnswer: 1,
    },
    {
      question: "What are cUSD, cEUR, and cREAL on Celo?",
      options: [
        "Algorithmic stablecoins managed by the Mento Protocol",
        "Different names for the CELO token",
        "Mining rewards for validators",
        "External tokens bridged from Bitcoin",
      ],
      correctAnswer: 0,
    },
    {
      question: "Celo's architecture is often described as modular because it separates what?",
      options: [
        "Execution, settlement, and data availability",
        "Mining, staking, and burning",
        "Wallets, exchanges, and NFTs",
        "Email, chat, and payments",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does Celo inherit from Ethereum through its rollup design?",
      options: [
        "Ethereum's security guarantees",
        "Ethereum's gas token supply",
        "Ethereum's private mempool",
        "Ethereum's ability to reverse transactions",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one core purpose of Celo DAO governance?",
      options: [
        "To centralize control of upgrades",
        "To let stakeholders vote on protocol decisions",
        "To stop smart contracts from running",
        "To issue KYC for all users",
      ],
      correctAnswer: 1,
    },
    {
      question: "What does Celo's transition to an Ethereum Layer 2 mean?",
      options: [
        "It will stop working on mobile phones",
        "It will leverage Ethereum's security while keeping its unique features",
        "It will become a private blockchain",
        "It will merge with Bitcoin",
      ],
      correctAnswer: 1,
    },
  ],
  "2": [
    {
      question: "What does the 'optimistic' in Optimistic Rollups refer to?",
      options: [
        "The positive outlook of developers",
        "The assumption that transactions are valid by default",
        "The network's ability to handle high traffic",
        "The fast transaction speeds",
      ],
      correctAnswer: 1,
    },
    {
      question: "How do Optimistic Rollups reduce transaction costs?",
      options: [
        "By using a different consensus mechanism",
        "By bundling multiple transactions together",
        "By eliminating all validators",
        "By storing everything off-chain",
      ],
      correctAnswer: 1,
    },
    {
      question: "What can users do during the challenge period in Optimistic Rollups?",
      options: [
        "Stake more tokens",
        "Create new smart contracts",
        "Dispute transaction validity",
        "Vote on governance proposals",
      ],
      correctAnswer: 2,
    },
    {
      question: "Where is an Optimistic Rollup's final settlement anchored?",
      options: [
        "On an off-chain database",
        "On Ethereum (Layer 1)",
        "On a centralized server",
        "On Bitcoin",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is typically posted to Ethereum by an Optimistic Rollup?",
      options: [
        "A batch of transactions and related state commitments",
        "User private keys",
        "Only NFT images",
        "Only wallet addresses",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why can withdrawals from Optimistic Rollups take longer than deposits?",
      options: [
        "Because Ethereum blocks are slower on weekends",
        "Because of the fraud-proof challenge window",
        "Because deposits require proof-of-work",
        "Because wallets are rate-limited",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the role of a fraud proof in an Optimistic Rollup?",
      options: [
        "It proves all transactions are private",
        "It allows anyone to challenge an invalid state transition",
        "It mints new tokens every block",
        "It prevents users from submitting transactions",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is one major reason rollups increase throughput?",
      options: [
        "They run fewer transactions",
        "They compress and batch many transactions into fewer L1 posts",
        "They disable smart contracts",
        "They require KYC for faster confirmation",
      ],
      correctAnswer: 1,
    },
    {
      question: "In rollup systems, what does a sequencer typically do?",
      options: [
        "Orders and batches transactions",
        "Stores all Ethereum history",
        "Upgrades user wallets automatically",
        "Creates new EVM opcodes",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the key security assumption of Optimistic Rollups?",
      options: [
        "No one will ever challenge fraud",
        "At least one honest party can submit a fraud proof when needed",
        "All transactions must be signed by the DAO",
        "Ethereum validators run Celo smart contracts directly",
      ],
      correctAnswer: 1,
    },
  ],
  "3": [
    {
      question: "What is the primary role of the $MNT token on Celo?",
      options: [
        "A meme token with no utility",
        "A utility and governance token for the network",
        "A stablecoin pegged to ETH",
        "A token used only for NFT minting",
      ],
      correctAnswer: 1,
    },
    {
      question: "How can $MNT holders influence Celo’s future development?",
      options: [
        "By voting on governance proposals",
        "By changing Ethereum’s consensus rules",
        "By disabling fraud proofs",
        "By minting blocks directly",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which is a common activity enabled by holding $MNT?",
      options: [
        "Proof-of-Work mining",
        "Staking to help secure the network and earn rewards",
        "Running Bitcoin nodes",
        "Replacing EVM bytecode with WASM",
      ],
      correctAnswer: 1,
    },
    {
      question: "What does it mean when a portion of fees is burned?",
      options: [
        "Tokens are permanently removed from circulation",
        "Tokens are moved to a different wallet temporarily",
        "Tokens are converted into stablecoins",
        "Tokens are duplicated to increase supply",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one key goal of Celo’s token economics?",
      options: [
        "To remove all incentives from users",
        "To align incentives across network participants",
        "To eliminate governance entirely",
        "To require KYC for all transactions",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which statement best describes staking in Celo’s context?",
      options: [
        "Locking $MNT to help secure the network and potentially earn rewards",
        "Printing new ETH on demand",
        "Sending tokens to an irreversible burn address only",
        "Replacing the sequencer with a centralized server",
      ],
      correctAnswer: 0,
    },
    {
      question: "Who can propose changes in a decentralized governance model like Celo DAO?",
      options: [
        "Only a single administrator",
        "Only Ethereum validators",
        "Typically token holders and the community (per rules)",
        "Only centralized exchanges",
      ],
      correctAnswer: 2,
    },
    {
      question: "Why might burning fees create deflationary pressure?",
      options: [
        "It increases total token supply",
        "It reduces circulating supply over time",
        "It guarantees prices will always go up",
        "It stops all transactions",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is one practical benefit of using an L2 like Celo instead of Ethereum mainnet directly?",
      options: [
        "Cheaper transactions for frequent interactions",
        "Guaranteed profit for every user",
        "No need for security assumptions",
        "No need to sign transactions",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which statement best describes a safe bridging approach?",
      options: [
        "Security-first design with verifiable processes",
        "Relying on a single unverified website",
        "Sharing seed phrases with the bridge",
        "Bridging without any confirmations",
      ],
      correctAnswer: 0,
    },
  ],
  "4": [
    {
      question: "Why is building on Celo familiar to Ethereum developers?",
      options: [
        "Celo is EVM-compatible",
        "Celo only supports Bitcoin scripts",
        "Celo requires a brand-new programming language",
        "Celo disables smart contracts",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does EVM compatibility allow developers to do?",
      options: [
        "Run Ethereum smart contracts with minimal changes",
        "Mine blocks with GPUs",
        "Store NFT images directly inside blocks only",
        "Replace Ethereum’s settlement layer",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which type of application is Celo well-suited for due to high throughput?",
      options: [
        "DeFi protocols",
        "Offline spreadsheet editing",
        "Email-only systems",
        "Physical vending machines without software",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one reason Celo can be attractive for developers and users?",
      options: [
        "Higher transaction fees than Ethereum mainnet",
        "Lower transaction fees while keeping strong security guarantees",
        "No settlement on Ethereum",
        "No need for wallets",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which tooling is most likely part of a developer-friendly ecosystem on Celo?",
      options: [
        "Frameworks, testing environments, and deployment tooling",
        "Mandatory paper forms for deployments",
        "Manual bytecode entry via SMS",
        "Mining pool hardware setups",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the purpose of developer grants on networks like Celo?",
      options: [
        "To discourage innovation",
        "To incentivize builders to create new applications",
        "To remove all open-source code",
        "To prevent dApps from launching",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which statement best describes deploying existing Solidity contracts to Celo?",
      options: [
        "It typically requires rewriting everything from scratch",
        "It can often be done with minimal changes due to EVM compatibility",
        "It is impossible because Celo doesn’t support smart contracts",
        "It requires converting Solidity to Python",
      ],
      correctAnswer: 1,
    },
    {
      question: "How does Celo’s design help dApps that need lots of transactions?",
      options: [
        "It increases block time to reduce load",
        "It supports higher throughput and lower costs compared to L1",
        "It removes all users from the network",
        "It limits every account to one transaction per day",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which of the following is a common category of dApps that benefit from lower fees?",
      options: [
        "On-chain games",
        "Offline calculators",
        "Desktop-only word processors",
        "Hardware-only IoT sensors with no blockchain",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one practical benefit of using an L2 like Celo instead of Ethereum mainnet directly?",
      options: [
        "Cheaper transactions for frequent interactions",
        "Guaranteed profit for every user",
        "No need for security assumptions",
        "No need to sign transactions",
      ],
      correctAnswer: 0,
    },
  ],
  "5": [
    {
      question: "What does it mean that Celo has a modular architecture?",
      options: [
        "It separates core blockchain functions into distinct layers",
        "It runs only one function for the entire network",
        "It removes the need for settlement",
        "It stores all data only on mobile devices",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which set of layers is commonly separated in Celo’s modular design?",
      options: [
        "Execution, settlement, and data availability",
        "Email, chat, and photos",
        "Mining, halving, and airdrops",
        "Wallets, exchanges, and NFTs",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the benefit of separating layers in a modular architecture?",
      options: [
        "Each layer can be optimized independently",
        "It makes upgrades impossible",
        "It increases transaction fees",
        "It forces every dApp to be identical",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does the execution layer primarily handle?",
      options: [
        "Transaction processing and execution",
        "National identity verification",
        "Physical hardware mining",
        "Printing new tokens for free",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does the settlement layer provide?",
      options: [
        "Finality and security anchoring",
        "A centralized database for private keys",
        "Unlimited free transactions",
        "A replacement for the EVM",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why is modularity helpful for upgrades?",
      options: [
        "It allows upgrading components without disrupting the entire network",
        "It prevents any component from changing",
        "It requires hard forks every hour",
        "It locks all users out during updates",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one goal of modular architecture from a performance perspective?",
      options: [
        "Improve scalability and flexibility",
        "Reduce throughput on purpose",
        "Eliminate smart contracts",
        "Make every transaction cost more",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which statement best matches the 'modular home' analogy?",
      options: [
        "You can upgrade one system (like electrical) without rebuilding everything",
        "You must rebuild the entire home to change a light bulb",
        "Everything must be fixed permanently and never changed",
        "Only the roof can be upgraded",
      ],
      correctAnswer: 0,
    },
    {
      question: "In a modular system, why might costs be reduced?",
      options: [
        "Because optimization can be targeted to the most expensive parts",
        "Because security is removed",
        "Because all data is deleted",
        "Because transactions are banned",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is a key tradeoff modular designs try to balance?",
      options: [
        "Scalability, security, and decentralization",
        "Only entertainment and memes",
        "Only censorship and control",
        "Only physical hardware and electricity",
      ],
      correctAnswer: 0,
    },
  ],
  "6": [
    {
      question: "What does data availability mean in rollup systems?",
      options: [
        "Transaction data must be accessible for verification when needed",
        "Data is hidden forever",
        "Only token prices are available",
        "Only NFTs are stored",
      ],
      correctAnswer: 0,
    },
    {
      question: "How does Celo reduce costs while maintaining data availability?",
      options: [
        "By combining on-chain and off-chain data storage approaches",
        "By deleting transaction history",
        "By requiring all nodes to store full history always",
        "By disabling block explorers",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is data availability sampling used for?",
      options: [
        "To ensure required data can be retrieved without every node storing everything",
        "To predict token prices",
        "To run proof-of-work mining",
        "To encrypt wallets automatically",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why is keeping data availability secure important?",
      options: [
        "So participants can verify the state and challenge invalid transitions",
        "So users can avoid signing transactions",
        "So tokens can be minted infinitely",
        "So nodes can operate without internet",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one benefit of good data availability design?",
      options: [
        "Lower transaction fees and better scalability",
        "Higher fees and lower throughput",
        "No need for cryptography",
        "No need for consensus",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which statement best matches the 'library' analogy for data availability?",
      options: [
        "Some data is kept in an archive, but can be retrieved with proofs when needed",
        "All books are burned after reading",
        "The library has no catalog system",
        "Only one person can read any book",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why might a network offer different data availability options to developers?",
      options: [
        "To balance cost, security, and performance for specific applications",
        "To force all apps to pay the maximum fee",
        "To prevent any app from launching",
        "To remove the need for block production",
      ],
      correctAnswer: 0,
    },
    {
      question: "What could happen if data availability is not ensured?",
      options: [
        "Users may be unable to verify or challenge incorrect state updates",
        "All transactions become free forever",
        "Smart contracts become unnecessary",
        "Ethereum mainnet shuts down",
      ],
      correctAnswer: 0,
    },
    {
      question: "In general, what is a common tradeoff involving data availability?",
      options: [
        "Lower cost vs stronger guarantees from more on-chain data",
        "More memes vs fewer memes",
        "More electricity vs fewer computers",
        "More NFTs vs fewer wallets",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which phrase best describes Celo’s approach to data availability?",
      options: [
        "Security-focused with cost efficiency",
        "No security, maximum risk",
        "Only centralized storage",
        "Only proof-of-work storage",
      ],
      correctAnswer: 0,
    },
  ],
  "7": [
    {
      question: "How does Celo inherit security from Ethereum?",
      options: [
        "By settling rollup results to Ethereum",
        "By replacing Ethereum validators",
        "By removing fraud proofs",
        "By making all transactions private by default",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the purpose of a decentralized sequencer?",
      options: [
        "To prevent one entity from controlling transaction ordering",
        "To delete transaction history",
        "To mint tokens without limits",
        "To disable dApps",
      ],
      correctAnswer: 0,
    },
    {
      question: "MEV issues are often related to what?",
      options: [
        "Transaction ordering and front-running",
        "Screen resolution settings",
        "Wallet seed phrase length",
        "Image compression for NFTs",
      ],
      correctAnswer: 0,
    },
    {
      question: "What role do fraud proofs play in Celo’s security model?",
      options: [
        "They allow anyone to challenge invalid state transitions",
        "They guarantee prices always increase",
        "They remove the need for settlement",
        "They sign transactions for users",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why is community participation important for fraud-proof systems?",
      options: [
        "At least one honest party can challenge fraud when needed",
        "So no one ever disputes anything",
        "So all transactions can be reversed instantly",
        "So wallets don’t need keys",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one method networks use to improve security over time?",
      options: [
        "Security audits and bug bounty programs",
        "Turning off cryptography",
        "Publishing private keys",
        "Removing verification",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which statement best describes Celo’s security goal?",
      options: [
        "Scale without compromising security guarantees",
        "Increase risk to gain speed",
        "Remove Ethereum anchoring completely",
        "Disable dispute mechanisms",
      ],
      correctAnswer: 0,
    },
    {
      question: "What could a decentralized sequencer help reduce?",
      options: [
        "Centralized control and certain MEV abuses",
        "The number of smart contracts allowed",
        "User wallet functionality",
        "Network uptime",
      ],
      correctAnswer: 0,
    },
    {
      question: "In general, why do rollups rely on challenge mechanisms?",
      options: [
        "To correct invalid submissions during a dispute window",
        "To make deposits slower than withdrawals",
        "To avoid posting anything to L1",
        "To disable upgrades",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the broad purpose of decentralization in a Layer 2 network?",
      options: [
        "Reduce single points of control and improve resilience",
        "Guarantee free transactions forever",
        "Eliminate the need for wallets",
        "Remove all transparency",
      ],
      correctAnswer: 0,
    },
  ],
  "8": [
    {
      question: "What is the basic concept of bridging assets to Celo?",
      options: [
        "Lock assets on Ethereum and mint equivalents on Celo",
        "Send assets via email",
        "Convert all assets into NFTs automatically",
        "Mine new assets from scratch",
      ],
      correctAnswer: 0,
    },
    {
      question: "How does the reverse bridge process typically work?",
      options: [
        "Burn on Celo to unlock on Ethereum",
        "Mint on Celo to delete on Ethereum",
        "Double the supply on both chains",
        "Move private keys on-chain",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does 'trust-minimized' mean for bridges?",
      options: [
        "Security relies more on smart contracts and proofs than a trusted intermediary",
        "Users must trust a single company completely",
        "Bridges work only when markets are calm",
        "Only exchanges can use them",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why might multiple bridge implementations exist?",
      options: [
        "To give users flexibility (official and third-party options)",
        "To ensure no one can ever bridge",
        "To force every user to use the same wallet",
        "To remove L1 settlement",
      ],
      correctAnswer: 0,
    },
    {
      question: "In a common bridge model, what is the exchange rate when bridging?",
      options: [
        "Usually 1:1 representation of the locked asset",
        "Always 2:1",
        "Always 0.5:1",
        "Randomized per transaction",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one security risk bridges often defend against?",
      options: [
        "Front-running and replay attacks",
        "Screen brightness issues",
        "Keyboard layout differences",
        "Browser tab limits",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is typically required to bridge an asset to Celo?",
      options: [
        "A transaction locking or depositing the asset on the origin chain",
        "A phone call to a bank",
        "A hardware mining rig",
        "A mandatory identity card",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why is bridging important for Layer 2 ecosystems?",
      options: [
        "It allows users to move liquidity and assets between chains",
        "It makes all assets disappear",
        "It prevents smart contracts from running",
        "It forces all dApps to stay on L1",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does it mean when equivalent assets are minted on Celo?",
      options: [
        "A representation of the locked asset is created on Celo",
        "New unrelated tokens are created with no backing",
        "ETH is destroyed permanently",
        "The bridge deletes transaction history",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which statement best describes a safe bridging approach?",
      options: [
        "Security-first design with verifiable processes",
        "Relying on a single unverified website",
        "Sharing seed phrases with the bridge",
        "Bridging without any confirmations",
      ],
      correctAnswer: 0,
    },
  ],
  "9": [
    {
      question: "What does a network roadmap usually describe?",
      options: [
        "Planned upgrades and future developments",
        "A list of private keys",
        "A guarantee of token price",
        "A set of banned addresses",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which is an example of an upgrade Celo might pursue?",
      options: [
        "Improved fraud proof mechanisms",
        "Removing EVM compatibility",
        "Disabling decentralization",
        "Stopping all smart contracts",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does 'cross-chain interoperability' generally mean?",
      options: [
        "Seamless movement of assets/data across different networks",
        "Only one chain can exist",
        "Transactions can’t be verified",
        "Smart contracts must be centralized",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why would Celo invest in additional developer tooling?",
      options: [
        "To make building and deploying applications easier",
        "To make development impossible",
        "To remove testing capabilities",
        "To require paper contracts",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is one way Celo might further decentralize its infrastructure?",
      options: [
        "Add more independent node operators and validators",
        "Centralize sequencing to one server",
        "Restrict access to one company only",
        "Disable governance voting",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is a realistic long-term goal for Celo as a Layer 2?",
      options: [
        "Support scalable applications while staying connected to Ethereum",
        "Operate completely isolated from Ethereum forever",
        "Ban cross-chain messaging",
        "Require all users to mine blocks",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why are fraud proof improvements important?",
      options: [
        "They strengthen the ability to challenge invalid state updates",
        "They increase the number of spam transactions",
        "They remove the need for settlement",
        "They make bridges unnecessary",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which statement best matches the 'city master plan' analogy?",
      options: [
        "Core features exist now, with planned expansions based on community needs",
        "No changes are ever allowed",
        "Only one neighborhood can exist",
        "Upgrades happen randomly with no plan",
      ],
      correctAnswer: 0,
    },
    {
      question: "Who benefits from a transparent roadmap?",
      options: [
        "Developers and users planning around future features",
        "Only hackers",
        "Only centralized exchanges",
        "No one at all",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is an example of ecosystem growth in a roadmap context?",
      options: [
        "More node operators, better tooling, and broader interoperability",
        "Less security and more censorship",
        "Fewer applications and less usage",
        "Removing community involvement",
      ],
      correctAnswer: 0,
    },
  ],
  "10": [
    {
      question: "How is Celo positioned relative to Ethereum?",
      options: [
        "As a Layer 2 execution layer that leverages Ethereum for security",
        "As a replacement for Ethereum Layer 1",
        "As a centralized exchange",
        "As an offline database",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the benefit of an Ethereum multi-chain ecosystem?",
      options: [
        "It allows scaling by distributing activity across L2s while keeping strong settlement",
        "It guarantees no congestion ever",
        "It removes the need for cryptography",
        "It prevents interoperability",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does interoperability enable in the broader ecosystem?",
      options: [
        "Movement of assets and data across L1 and L2 networks",
        "Only one wallet can exist",
        "Transactions can’t be verified",
        "Smart contracts must be centralized",
      ],
      correctAnswer: 0,
    },
    {
      question: "How does Celo help reduce Ethereum mainnet congestion?",
      options: [
        "By moving many transactions off-chain and settling to Ethereum",
        "By increasing mainnet fees",
        "By disabling rollups",
        "By preventing any transactions",
      ],
      correctAnswer: 0,
    },
    {
      question: "In the analogy, Ethereum is compared to what?",
      options: [
        "A major city / settlement hub",
        "A single user’s laptop",
        "A paper notebook",
        "A private email server",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is a key reason Celo still settles to Ethereum?",
      options: [
        "To benefit from Ethereum’s security and finality",
        "To avoid using smart contracts",
        "To remove all decentralization",
        "To eliminate transparency",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which statement best describes Celo’s long-term ecosystem role?",
      options: [
        "Support scalable applications while staying connected to Ethereum",
        "Operate completely isolated from Ethereum forever",
        "Ban cross-chain messaging",
        "Require all users to mine blocks",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why is scalability important for Ethereum’s adoption?",
      options: [
        "To support many users with reasonable fees and performance",
        "To stop all transactions",
        "To reduce the number of dApps to zero",
        "To remove wallets",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does it mean that Celo is an execution layer?",
      options: [
        "It processes transactions and smart contract execution at scale",
        "It mints ETH on Ethereum mainnet",
        "It stores private keys for users",
        "It replaces wallet software",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which is a key success factor for Layer 2 networks in Ethereum’s future?",
      options: [
        "Maintaining security and decentralization while scaling",
        "Removing dispute mechanisms",
        "Disabling EVM compatibility",
        "Preventing bridges",
      ],
      correctAnswer: 0,
    },
  ],
};