'use client'

import { useState, useCallback, DragEvent, ChangeEvent } from 'react'
import { Upload, FileText, X } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (content: string, filename: string) => void
  accept?: string
  maxSize?: number // in bytes
  className?: string
}

export function FileUpload({ 
  onFileSelect, 
  accept = '.json',
  maxSize = 1024 * 1024, // 1MB default
  className = ''
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback((file: File) => {
    setError(null)
    
    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / 1024)}KB`)
      return
    }
    
    // Validate file type
    if (accept && !file.name.endsWith(accept.replace('.', ''))) {
      setError(`Please select a ${accept} file`)
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      try {
        // Validate JSON format
        JSON.parse(content)
        setSelectedFile(file.name)
        onFileSelect(content, file.name)
      } catch {
        setError('Invalid JSON format')
      }
    }
    reader.readAsText(file)
  }, [onFileSelect, accept, maxSize])

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const clearFile = useCallback(() => {
    setSelectedFile(null)
    setError(null)
  }, [])

  return (
    <div className={className}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragOver 
            ? 'border-indigo-500 bg-indigo-50' 
            : selectedFile
            ? 'border-green-500 bg-green-50'
            : error
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          {selectedFile ? (
            <>
              <div className="flex items-center justify-center">
                <FileText className="h-12 w-12 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-green-700">
                  {selectedFile}
                </p>
                <p className="text-sm text-green-600">
                  File uploaded successfully
                </p>
              </div>
              <button
                onClick={clearFile}
                className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
              >
                <X className="h-4 w-4 mr-1" />
                Remove
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center">
                <Upload className={`h-12 w-12 ${isDragOver ? 'text-indigo-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop your package.json file here
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse
                </p>
              </div>
              <div className="text-xs text-gray-400">
                Supports JSON files up to {Math.round(maxSize / 1024)}KB
              </div>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
} 