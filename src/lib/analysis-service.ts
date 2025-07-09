import { PackageJsonData, DependencyNode, AnalysisResult, Vulnerability } from '@/types'
import { NpmService } from './npm-service'

export class AnalysisService {
  static async analyzePackageJson(
    packageJsonContent: string,
    options: { includeDevDependencies?: boolean; maxDepth?: number } = {}
  ): Promise<AnalysisResult> {
    try {
      // Parse package.json
      const packageJson: PackageJsonData = JSON.parse(packageJsonContent)
      
      // Extract project info
      const projectInfo = {
        name: packageJson.name || 'Unknown Project',
        version: packageJson.version || '0.0.0',
        description: packageJson.description || '',
      }
      
      // Build dependency tree
      const dependencyTree = await this.buildDependencyTree(
        packageJson,
        options.includeDevDependencies ?? true,
        options.maxDepth ?? 3
      )
      
      // Run vulnerability scan
      const auditResult = await NpmService.runNpmAudit(packageJson)
      const vulnerabilities: Vulnerability[] = auditResult.vulnerabilities
      
      // Add vulnerabilities to dependency nodes
      this.attachVulnerabilitiesToNodes(dependencyTree, vulnerabilities)
      
      // Calculate stats
      const stats = this.calculateStats(dependencyTree, vulnerabilities)
      
      // Generate a simple project ID for this session
      const projectId = `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      return {
        projectId,
        projectInfo,
        dependencyTree,
        vulnerabilities,
        stats,
      }
    } catch (error) {
      console.error('Error analyzing package.json:', error)
      throw new Error('Failed to analyze package.json')
    }
  }
  
  private static async buildDependencyTree(
    packageJson: PackageJsonData,
    includeDevDeps: boolean,
    maxDepth: number,
    currentDepth: number = 0
  ): Promise<DependencyNode[]> {
    if (currentDepth >= maxDepth) {
      return []
    }
    
    const dependencies: DependencyNode[] = []
    
    // Process different dependency types
    const depTypes: Array<{
      deps: Record<string, string> | undefined;
      type: 'dependencies' | 'devDependencies' | 'peerDependencies';
    }> = [
      { deps: packageJson.dependencies, type: 'dependencies' },
      ...(includeDevDeps ? [{ deps: packageJson.devDependencies, type: 'devDependencies' as const }] : []),
      { deps: packageJson.peerDependencies, type: 'peerDependencies' },
    ]
    
    for (const { deps, type } of depTypes) {
      if (!deps) continue
      
      for (const [name, versionRange] of Object.entries(deps)) {
        try {
          // For MVP, limit API calls and create simplified nodes
          const packageInfo = currentDepth < 2 ? await NpmService.getPackageInfo(name) : null
          
          const dependency: DependencyNode = {
            id: `${name}@${packageInfo?.version || 'unknown'}-${currentDepth}`,
            name,
            version: packageInfo?.version || 'unknown',
            requestedRange: versionRange,
            type,
            depth: currentDepth,
            description: packageInfo?.description,
            homepage: packageInfo?.homepage,
            license: packageInfo?.license,
            vulnerabilities: [], // Will be populated later
            children: [], // Simplified - no deep nesting for MVP
          }
          
          dependencies.push(dependency)
        } catch (error) {
          console.warn(`Failed to fetch info for ${name}:`, error)
          // Add a basic node even if we can't fetch details
          dependencies.push({
            id: `${name}@unknown-${currentDepth}`,
            name,
            version: 'unknown',
            requestedRange: versionRange,
            type,
            depth: currentDepth,
            vulnerabilities: [],
            children: [],
          })
        }
      }
    }
    
    return dependencies
  }
  
  private static attachVulnerabilitiesToNodes(
    dependencyTree: DependencyNode[],
    vulnerabilities: Vulnerability[]
  ) {
    const attachVulns = (nodes: DependencyNode[]) => {
      for (const node of nodes) {
        // Find vulnerabilities for this package by checking if the vulnerability ID contains the package name
        const nodeVulns = vulnerabilities.filter(vuln => 
          vuln.id.includes(`vuln-${node.name}`) || vuln.id.includes(node.name)
        )
        node.vulnerabilities = nodeVulns
        
        // Recursively attach to children
        if (node.children.length > 0) {
          attachVulns(node.children)
        }
      }
    }
    
    attachVulns(dependencyTree)
  }
  
  private static flattenDependencyTree(tree: DependencyNode[]): DependencyNode[] {
    const result: DependencyNode[] = []
    
    function traverse(nodes: DependencyNode[]) {
      for (const node of nodes) {
        result.push(node)
        if (node.children.length > 0) {
          traverse(node.children)
        }
      }
    }
    
    traverse(tree)
    return result
  }
  
  private static calculateStats(
    dependencyTree: DependencyNode[],
    vulnerabilities: Vulnerability[]
  ) {
    const flatTree = this.flattenDependencyTree(dependencyTree)
    
    const vulnerabilityCount = {
      critical: vulnerabilities.filter(v => v.severity === 'critical').length,
      high: vulnerabilities.filter(v => v.severity === 'high').length,
      medium: vulnerabilities.filter(v => v.severity === 'medium').length,
      low: vulnerabilities.filter(v => v.severity === 'low').length,
    }
    
    const dependencyTypes = {
      production: flatTree.filter(d => d.type === 'dependencies').length,
      development: flatTree.filter(d => d.type === 'devDependencies').length,
      peer: flatTree.filter(d => d.type === 'peerDependencies').length,
    }
    
    return {
      totalDependencies: flatTree.length,
      vulnerabilityCount,
      dependencyTypes,
    }
  }
} 