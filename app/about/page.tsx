import DeleteBtn from "@/components/ExploreBtn";

interface Book {
    id: number;
    name: string;
   
    // add other properties if needed
}

const Page = async() => {
    const response = await fetch('http://localhost:3000/api/books')
    if (!response.ok) throw new Error('we have a problem')
    
   
    
    const books: Book[] = await response.json();
    return (
       <div></div>
    )
}

export default Page