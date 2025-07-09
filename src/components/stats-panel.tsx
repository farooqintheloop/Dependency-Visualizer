'use client'

import { Shield, Package, AlertTriangle, CheckCircle } from 'lucide-react'

interface StatsProps {
  stats: {
    totalDependencies: number
    vulnerabilityCount: {
      critical: number
      high: number
      medium: number
      low: number
    }
    dependencyTypes: {
      production: number
      development: number
      peer: number
    }
  }
}

export function StatsPanel({ stats }: StatsProps) {
  const totalVulns = 
    stats.vulnerabilityCount.critical +
    stats.vulnerabilityCount.high +
    stats.vulnerabilityCount.medium +
    stats.vulnerabilityCount.low

  const getVulnerabilityColor = (count: number) => {
    if (count === 0) return 'text-green-600'
    if (count <= 3) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getVulnerabilityIcon = (count: number) => {
    if (count === 0) return <CheckCircle className="h-5 w-5 text-green-600" />
    return <AlertTriangle className="h-5 w-5 text-red-600" />
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* Total Dependencies */}
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <Package className="h-6 w-6 text-gray-600 mx-auto mb-2" />
        <div className="text-2xl font-bold text-gray-900">
          {stats.totalDependencies}
        </div>
        <div className="text-sm text-gray-600">
          Total Dependencies
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        {getVulnerabilityIcon(totalVulns)}
        <div className={`text-2xl font-bold ${getVulnerabilityColor(totalVulns)} mt-2`}>
          {totalVulns}
        </div>
        <div className="text-sm text-gray-600">
          Vulnerabilities
        </div>
      </div>

      {/* Production Dependencies */}
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <div className="w-6 h-6 bg-blue-100 rounded mx-auto mb-2 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {stats.dependencyTypes.production}
        </div>
        <div className="text-sm text-gray-600">
          Production
        </div>
      </div>

      {/* Dev Dependencies */}
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <div className="w-6 h-6 bg-orange-100 rounded mx-auto mb-2 flex items-center justify-center">
          <div className="w-3 h-3 bg-orange-600 rounded"></div>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {stats.dependencyTypes.development}
        </div>
        <div className="text-sm text-gray-600">
          Development
        </div>
      </div>

      {/* Vulnerability Breakdown */}
      {totalVulns > 0 && (
        <div className="col-span-2 lg:col-span-4 bg-red-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-red-600 mr-2" />
            <h4 className="font-semibold text-red-900">Security Overview</h4>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-700">
                {stats.vulnerabilityCount.critical}
              </div>
              <div className="text-xs text-red-600">Critical</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-700">
                {stats.vulnerabilityCount.high}
              </div>
              <div className="text-xs text-orange-600">High</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-700">
                {stats.vulnerabilityCount.medium}
              </div>
              <div className="text-xs text-yellow-600">Medium</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-700">
                {stats.vulnerabilityCount.low}
              </div>
              <div className="text-xs text-blue-600">Low</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 