import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

const CreateSnippet = () => {

  
  async function createSnippet (formData:FormData){
    "use server" // use server directive to run this function on the server
    const title = formData.get('title') as string | null;
    const code = formData.get('code') as string | null;

    if (!title || !code) {
      throw new Error("Title and code are required");
    }
        code: code as string
    const snippet = await prisma.snippet.create({
      data: {
        title: title,
        code: code
      }
    })

    console.log(snippet);
   
    redirect("/")
   
  }



  return (
    <div className="min-h-screen w-full font-mono bg-zinc-800 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-3xl font-bold">Create a New Snippet</h1>
          <form action={createSnippet} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                placeholder="Enter snippet title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">
                Code
              </Label>
              <Textarea
                name="code"
                id="code"
                rows={6}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                placeholder="Paste your code snippet here"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-zinc-700 hover:bg-zinc-600 rounded-md shadow-sm text-sm font-medium transition-colors duration-200"
            >
              Create Snippet
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateSnippet

