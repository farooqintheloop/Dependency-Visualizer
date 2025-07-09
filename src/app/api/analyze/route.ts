import { NextRequest, NextResponse } from 'next/server'
import { AnalysisService } from '@/lib/analysis-service'
import { AnalyzeRequest, AnalyzeResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json()
    
    if (!body.packageJson) {
      return NextResponse.json(
        { success: false, error: 'package.json content is required' },
        { status: 400 }
      )
    }
    
    // Validate JSON format
    try {
      JSON.parse(body.packageJson)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400 }
      )
    }
    
    // Analyze the package.json
    const result = await AnalysisService.analyzePackageJson(
      body.packageJson,
      body.options
    )
    
    const response: AnalyzeResponse = {
      success: true,
      data: result,
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in analyze API:', error)
    
    const response: AnalyzeResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    }
    
    return NextResponse.json(response, { status: 500 })
  }
} 