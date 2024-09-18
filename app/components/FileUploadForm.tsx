'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function FileUploadForm() {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    setIsUploading(true)

    try {
      const response = await fetch('https://api.kuuichi.xyz/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setFileUrl(data.file_url)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-md mx-auto bg-[#24283b]">
        <CardContent className="p-6">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#7aa2f7] border-dashed rounded-lg cursor-pointer bg-[#1a1b26] hover:bg-[#292e42] transition-colors duration-300">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-[#7aa2f7]" />
                <p className="mb-2 text-sm text-[#7aa2f7]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                {/* <p className="text-xs text-[#565f89]">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
              </div>
              <Input 
                id="file-upload" 
                type="file" 
                name="file" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
          {fileUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 p-4 bg-[#1a1b26] rounded-md"
            >
              <h2 className="text-lg font-semibold mb-2 text-[#7aa2f7]">Uploaded File:</h2>
              <p className="text-sm break-all text-[#7aa2f7]">{fileUrl}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
