import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';
import { deleteSnippet } from '@/actions'

const SnippetDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = parseInt((await params).id);

    const snippet = await prisma.snippet.findUnique({
        where: {
            id: id,
        },
    });

    if (!snippet) return <h1 className="text-center text-2xl text-red-500">Snippet not found</h1>;

    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id)

    return (
        <div className="min-h-screen w-full font-mono bg-zinc-800 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-zinc-400">{snippet.title}</h1>
                    <div className="flex items-center gap-2">
                        <Link href={`/snippet/${id}/edit`} className="inline-flex">
                            <Button className="bg-blue-600 hover:bg-blue-700 px-4 py-2">
                                Edit
                            </Button>
                        </Link>
                        <form action={deleteSnippetAction} className="inline-flex">
                            <Button 
                                variant="destructive" 
                                className="px-4 py-2"
                            >
                                Delete
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-10">
                    <pre className="bg-zinc-900 p-6 rounded-lg shadow-lg overflow-x-auto">
                        <code className="text-lg text-green-400">{snippet.code}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default SnippetDetail;