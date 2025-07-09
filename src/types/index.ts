// Core types for the dependency visualizer

export interface PackageJsonData {
  name?: string;
  version?: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: any;
}

export interface DependencyNode {
  id: string;
  name: string;
  version: string;
  requestedRange: string;
  type: 'dependencies' | 'devDependencies' | 'peerDependencies';
  depth: number;
  description?: string;
  homepage?: string;
  license?: string;
  vulnerabilities: Vulnerability[];
  children: DependencyNode[];
}

export interface Vulnerability {
  id: string;
  cveId?: string;
  title: string;
  description?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvssScore?: number;
  vulnerableVersions: string;
  patchedVersions?: string;
  url?: string;
  source: string;
}

export interface AnalysisResult {
  projectId: string;
  projectInfo: {
    name?: string;
    version?: string;
    description?: string;
  };
  dependencyTree: DependencyNode[];
  vulnerabilities: Vulnerability[];
  stats: {
    totalDependencies: number;
    vulnerabilityCount: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    dependencyTypes: {
      production: number;
      development: number;
      peer: number;
    };
  };
}

export interface NpmPackageInfo {
  name: string;
  version: string;
  description?: string;
  homepage?: string;
  repository?: {
    type: string;
    url: string;
  };
  license?: string;
  maintainers?: Array<{
    name: string;
    email: string;
  }>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

export interface ReactFlowNode {
  id: string;
  type?: string;
  data: {
    label: string;
    name: string;
    version: string;
    dependencyType: string;
    vulnerabilities: Vulnerability[];
    description?: string;
  };
  position: { x: number; y: number };
  style?: Record<string, any>;
}

export interface ReactFlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  style?: Record<string, any>;
}

export interface AnalyzeRequest {
  packageJson: string;
  options?: {
    includeDevDependencies?: boolean;
    maxDepth?: number;
  };
}

export interface AnalyzeResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
} 