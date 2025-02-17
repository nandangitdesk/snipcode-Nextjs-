import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

const Home = async () => {


   const snippets = await prisma.snippet.findMany();

  return (
    <div className="min-h-screen w-full font-mono bg-zinc-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <Link href="/">
            <h1 className="text-4xl font-bold text-white">Snipcode.</h1>
          </Link>
        </header>

        <main className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-zinc-200">Snippets</h2>
            <Link href="/snippet/new">
              <Button className="bg-zinc-700 hover:bg-zinc-600 transition-colors duration-200">New Snippet</Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-between flex-wrap gap-20">
               {snippets.map((snippet) => (
                 <div key={snippet.id} className="bg-zinc-600 border border-zinc-400  p-6 rounded-lg shadow-lg flex items-center justify-between space-x-4">
                   <h3 className="text-xl font-semibold text-zinc-200">{snippet.title}</h3>
                   <Link href={`/snippet/${snippet.id}`}>
                     <Button className="bg-zinc-700 hover:bg-zinc-800 transition-colors duration-200">View</Button>
                   </Link>
                 </div>
               ))}
          </div>
        
        </main>
      </div>
    </div>
  )
}

export default Home

