import { NextResponse } from 'next/server'

export async function GET() {
  const examplePackageJson = {
    name: "example-react-app",
    version: "1.0.0",
    description: "A sample React application for testing dependency analysis",
    dependencies: {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "axios": "^1.0.0",
      "lodash": "^4.17.21",
      "moment": "^2.29.4"
    },
    devDependencies: {
      "typescript": "^5.0.0",
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
      "vite": "^4.0.0"
    },
    scripts: {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    }
  }

  return NextResponse.json({
    success: true,
    packageJson: JSON.stringify(examplePackageJson, null, 2)
  })
} 