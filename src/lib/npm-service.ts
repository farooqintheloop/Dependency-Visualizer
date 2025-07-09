import { NpmPackageInfo, Vulnerability } from '@/types'

// Cache for npm registry responses to avoid rate limiting
const npmCache = new Map<string, NpmPackageInfo>()

export class NpmService {
  private static readonly NPM_REGISTRY_URL = 'https://registry.npmjs.org'
  
  static async getPackageInfo(packageName: string, version?: string): Promise<NpmPackageInfo | null> {
    try {
      const cacheKey = `${packageName}@${version || 'latest'}`
      
      // Check cache first
      if (npmCache.has(cacheKey)) {
        return npmCache.get(cacheKey)!
      }
      
      const url = version 
        ? `${this.NPM_REGISTRY_URL}/${packageName}/${version}`
        : `${this.NPM_REGISTRY_URL}/${packageName}/latest`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        console.warn(`Failed to fetch package info for ${packageName}:`, response.statusText)
        return null
      }
      
      const data = await response.json()
      
      const packageInfo: NpmPackageInfo = {
        name: data.name,
        version: data.version,
        description: data.description,
        homepage: data.homepage,
        repository: data.repository,
        license: data.license,
        maintainers: data.maintainers,
        dependencies: data.dependencies || {},
        devDependencies: data.devDependencies || {},
        peerDependencies: data.peerDependencies || {},
      }
      
      // Cache the result
      npmCache.set(cacheKey, packageInfo)
      
      return packageInfo
    } catch (error) {
      console.error(`Error fetching package info for ${packageName}:`, error)
      return null
    }
  }
  
  static async getLatestVersion(packageName: string): Promise<string | null> {
    try {
      const packageInfo = await this.getPackageInfo(packageName)
      return packageInfo?.version || null
    } catch (error) {
      console.error(`Error fetching latest version for ${packageName}:`, error)
      return null
    }
  }
  
  static async runNpmAudit(packageJson: Record<string, any>): Promise<{ vulnerabilities: Vulnerability[], metadata: any }> {
    try {
      // For now, we'll simulate npm audit by checking against a simple vulnerability list
      // In a production app, you'd want to either:
      // 1. Use the npm audit API
      // 2. Integrate with security databases
      // 3. Use existing vulnerability services
      
      const vulnerabilities: Vulnerability[] = []
      
      // Example: Check for known vulnerable packages (simplified)
      const knownVulnerablePackages = [
        { name: 'lodash', versions: ['<4.17.12'], severity: 'high' as const, title: 'Prototype Pollution' },
        { name: 'axios', versions: ['<0.21.1'], severity: 'medium' as const, title: 'SSRF vulnerability' },
        { name: 'node-forge', versions: ['<1.0.0'], severity: 'critical' as const, title: 'RSA PKCS#1 signature verification' },
        { name: 'moment', versions: ['<2.30.0'], severity: 'medium' as const, title: 'Path traversal vulnerability' },
      ]
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
        ...packageJson.peerDependencies,
      }
      
      for (const [depName, depVersion] of Object.entries(allDeps)) {
        const vulnerable = knownVulnerablePackages.find(pkg => pkg.name === depName)
        if (vulnerable) {
          vulnerabilities.push({
            id: `vuln-${depName}`,
            title: vulnerable.title,
            severity: vulnerable.severity,
            vulnerableVersions: vulnerable.versions.join(', '),
            description: `${depName} has a known vulnerability: ${vulnerable.title}`,
            source: 'npm_audit',
          })
        }
      }
      
      return {
        vulnerabilities,
        metadata: {
          totalDependencies: Object.keys(allDeps).length,
          vulnerabilities: vulnerabilities.length,
        }
      }
    } catch (error) {
      console.error('Error running npm audit:', error)
      return { vulnerabilities: [], metadata: {} }
    }
  }
} 