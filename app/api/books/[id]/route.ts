
import database from '@/app/api/db';
export async function DELETE(req: Request, {params}: {params:Promise<{id:string}>}) { 
    const { id } = await params;
    
    console.log('Deleting book with id:', id);
    const foundBook = database.findIndex(book => book.id === parseInt(id));
    if (foundBook === -1) {
        return new Response('Book not found', { status: 404 })
    }

    database.splice(foundBook, 1)
    return new Response('Book deleted', { status: 200 })
}