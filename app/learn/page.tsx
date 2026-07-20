import Link from "next/link";
import { BookOpen, Code, Shield, Banknote, Puzzle, Rocket } from "lucide-react";

type LearningPath = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  url: string;
};

export default function LearnPage() {
  const learningPaths: LearningPath[] = [
    {
      id: 'ethereum-basics',
      title: 'Ethereum Fundamentals',
      description: 'Learn the core concepts of Ethereum, blockchain, and how they work together.',
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      difficulty: 'Beginner',
      timeEstimate: '2-3 hours',
      url: '/learn/ethereum-basics',
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contract Development',
      description: 'Master writing, testing, and deploying smart contracts with Solidity.',
      icon: <Code className="w-8 h-8 text-green-500" />,
      difficulty: 'Intermediate',
      timeEstimate: '4-6 hours',
      url: '/learn/smart-contracts',
    },
    {
      id: 'defi',
      title: 'DeFi & DApps',
      description: 'Explore decentralized finance and how to build decentralized applications.',
      icon: <Banknote className="w-8 h-8 text-yellow-500" />,
      difficulty: 'Intermediate',
      timeEstimate: '3-5 hours',
      url: '/learn/defi',
    },
    {
      id: 'security',
      title: 'Blockchain Security',
      description: 'Learn about common vulnerabilities and best practices in Web3 security.',
      icon: <Shield className="w-8 h-8 text-red-500" />,
      difficulty: 'Advanced',
      timeEstimate: '4-6 hours',
      url: '/learn/security',
    },
    {
      id: 'scaling',
      title: 'Scaling Solutions',
      description: 'Understand Layer 2 solutions and how to build scalable dApps.',
      icon: <Rocket className="w-8 h-8 text-purple-500" />,
      difficulty: 'Intermediate',
      timeEstimate: '3-4 hours',
      url: '/learn/scaling',
    },
    {
      id: 'nft',
      title: 'NFT Development',
      description: 'Create, mint, and trade non-fungible tokens on Ethereum.',
      icon: <Puzzle className="w-8 h-8 text-pink-500" />,
      difficulty: 'Intermediate',
      timeEstimate: '3-5 hours',
      url: '/learn/nft',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Ethereum Learning Paths
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-500 sm:mt-5">
            Choose your learning journey and master Ethereum development at your own pace.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((path) => (
            <Link
              key={path.id}
              href={path.url}
              className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 hover:border-blue-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {path.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {path.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {path.title}
              </h3>
              <p className="text-gray-600 mb-4">{path.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>⏱️ {path.timeEstimate}</span>
                <span className="mx-2">•</span>
                <span className="text-blue-600 font-medium group-hover:underline">
                  Start Learning →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Not sure where to start?</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              If you're new to Ethereum, we recommend starting with <strong>Ethereum Fundamentals</strong> to build a solid foundation.
            </p>
            <p>
              Already familiar with the basics? Jump into <strong>Smart Contract Development</strong> to start building on Ethereum.
            </p>
          </div>
          <div className="mt-8 flex space-x-4">
            <Link
              href="/learn/ethereum-basics"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start with Fundamentals
            </Link>
            <Link
              href="/learn/smart-contracts"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Jump to Smart Contracts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
