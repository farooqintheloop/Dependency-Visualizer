'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Target, Loader2, Play } from 'lucide-react'
import { FileUpload } from '@/components/ui/file-upload'
import { DependencyGraph } from '@/components/dependency-graph'
import { StatsPanel } from '@/components/stats-panel'
import { AnalysisResult } from '@/types'

export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = async (content: string) => {
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageJson: content,
          options: {
            includeDevDependencies: true,
            maxDepth: 3,
          },
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setAnalysisResult(result.data)
      } else {
        setError(result.error || 'Analysis failed')
      }
    } catch {
      console.error('Analysis error')
      setError('Failed to analyze package.json. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleTryExample = async () => {
    try {
      const response = await fetch('/api/example')
      const result = await response.json()
      
      if (result.success) {
        await handleFileSelect(result.packageJson)
      }
          } catch {
        setError('Failed to load example')
      }
  }

  const resetAnalysis = () => {
    setAnalysisResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link 
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </Link>
              <div className="flex items-center">
                <Target className="h-6 w-6 text-indigo-600 mr-2" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Dependency Analyzer
                </h1>
              </div>
            </div>
            
            {analysisResult && (
              <button
                onClick={resetAnalysis}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysisResult && !isAnalyzing ? (
          /* Upload Section */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload Your Package.json
              </h2>
              <p className="text-lg text-gray-600">
                Get instant insights into your project&apos;s dependency structure and security
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <FileUpload onFileSelect={handleFileSelect} />
              
              <div className="mt-6 text-center">
                <div className="text-gray-500 text-sm mb-4">or</div>
                <button
                  onClick={handleTryExample}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Try Example Project
                </button>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What we&apos;ll analyze:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dependency tree structure and relationships</li>
                  <li>• Security vulnerabilities via npm audit</li>
                  <li>• Package types (production, development, peer)</li>
                  <li>• Overall project health metrics</li>
                </ul>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        ) : isAnalyzing ? (
          /* Loading Section */
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analyzing Dependencies
              </h3>
              <p className="text-gray-600">
                This may take a few moments for large projects...
              </p>
            </div>
          </div>
        ) : (
          /* Results Section */
          analysisResult && (
            <div className="space-y-8">
              {/* Project Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {analysisResult.projectInfo.name}
                    </h2>
                    <p className="text-gray-600">
                      v{analysisResult.projectInfo.version}
                    </p>
                    {analysisResult.projectInfo.description && (
                      <p className="text-gray-700 mt-2">
                        {analysisResult.projectInfo.description}
                      </p>
                    )}
                  </div>
                  <StatsPanel stats={analysisResult.stats} />
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dependency Graph
                  </h3>
                  <p className="text-gray-600">
                    Interactive visualization of your dependency tree
                  </p>
                </div>
                <div className="p-6">
                  <DependencyGraph 
                    dependencies={analysisResult.dependencyTree}
                    vulnerabilities={analysisResult.vulnerabilities}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
} 