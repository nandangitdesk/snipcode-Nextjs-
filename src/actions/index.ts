"use server"

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import {revalidatePath} from 'next/cache'

export const saveSnippet = async (id: number,code: string) => {

     await prisma.snippet.update({
        where: {
            id: id,
        },
        data: {
            // title: title,
            code: code
        }

        
    });
    revalidatePath(`/snippet/${id}`)
    redirect(`/snippet/${id}`)
}

export const deleteSnippet = async (id: number) => {
    await prisma.snippet.delete({
        where: {
            id: id,
        },
    });

    revalidatePath('/')
    redirect(`/`)
}

export async function createSnippet (prevState:{message:string},formData:FormData){
   // use server directive to run this function on the server
    const title = formData.get('title') as string | null;
    const code = formData.get('code') as string | null;
 
    if (typeof title !== 'string' || title.length < 4) {
        return { message: 'Title is required and must be longer' };
    }


    if (typeof code !== 'string' || code.length < 10) {
        return { message: 'Code must be at least 10 characters long' };
    }
        
     await prisma.snippet.create({
        data: {
            title: title,
            code: code
        }
    });

    
   
    revalidatePath('/');
    redirect("/");
}