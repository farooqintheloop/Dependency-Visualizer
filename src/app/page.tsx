import Link from 'next/link'
import { Upload, Target, Shield, BarChart3 } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Dependency Visualizer
              </h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/Hero Banner.png"
            alt="Dependency Visualizer - Interactive npm dependency analysis"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-2xl" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Visualize Dependencies Like Never Before
            </h2>
            <p className="text-lg opacity-90">
              Interactive graphs • Security analysis • Real-time insights
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Map your npm dependencies
            <span className="text-indigo-600"> like a neural network</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Visualize your project&apos;s dependency tree, identify security vulnerabilities, 
            and understand your codebase structure with interactive graphs.
          </p>
          
          {/* Upload Section */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get Started
              </h2>
              <Link 
                href="/analyze"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload package.json
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Drag and drop your package.json file or browse to select
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Powerful Dependency Analysis
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to understand and secure your dependencies
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Visualization */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Visualization
              </h3>
              <p className="text-gray-600">
                Explore your dependency tree with an interactive graph. 
                Zoom, pan, and click to understand relationships.
              </p>
            </div>

            {/* Feature 2: Security */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Vulnerability Detection
              </h3>
              <p className="text-gray-600">
                Identify security vulnerabilities in your dependencies 
                with npm audit integration.
              </p>
            </div>

            {/* Feature 3: Analytics */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Detailed Analytics
              </h3>
              <p className="text-gray-600">
                Get insights into your dependency types, versions, 
                and overall project health.
              </p>
            </div>
          </div>
        </div>

        {/* Example Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            See It In Action
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "axios": "^1.0.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0"
  }
}`}
            </pre>
          </div>
          <div className="mt-6 text-center">
            <Link 
              href="/analyze"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try This Example
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Dependency Visualizer. Created by <span className="font-semibold text-indigo-600">Muhammad Umar Farooq</span></p>
            <p className="mt-1 text-sm">Built with ❤️ for developers using AI assistance and modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
