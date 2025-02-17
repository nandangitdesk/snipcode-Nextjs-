"use client"
import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import type { Snippet } from '@prisma/client'
import { Button } from './button'
import { saveSnippet } from '@/actions'

const EditSnippetForm = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet.code)
  const saveSnippetAction = saveSnippet.bind(null, snippet.id, code)

  const changeEventHandler = (value:string = "")=>{
        setCode(value || '')
  }

  return (
    <div className="min-h-screen bg-zinc-800 text-zinc-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
            Edit: {snippet.title}
          </h1>
        </div>

        <form action={saveSnippetAction} className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="code" 
              className="block text-sm font-medium text-zinc-300"
            >
              Code
            </label>
            <div className="rounded-lg overflow-hidden border border-zinc-700 shadow-xl">
              <Editor
                height="60vh"
                defaultLanguage="javascript"
                value={code}
                onChange={changeEventHandler}
                theme="vs-dark"
                
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  contextmenu: false,
                  fontFamily: 'Fira Code, monospace',
                }}
                className="rounded-lg"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 w-full md:w-auto"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditSnippetForm