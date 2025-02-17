import React from 'react'
import EditSnippetForm from '@/components/ui/editSnippetForm'
import { prisma } from '@/lib/prisma';

const editSnippet = async({ params }: { params: Promise<{ id: string }> }) => {
  

  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id: id
    }
  });

  if (!snippet) {
    
    return <div>Snippet not found</div>;
  }


  return (
    <div>
      
      
        <EditSnippetForm  snippet={snippet}  />
    
    </div>
  )
}

export default editSnippet