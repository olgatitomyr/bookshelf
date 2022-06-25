import { Book } from '../components/Book'
import { useParams } from "react-router-dom";
import BooksService from '../services/BooksService';
import { useState, useEffect } from 'react';

export default function BookDetailsPage() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [book, setBook] = useState({});

    let params = useParams();

    useEffect(() => {
        async function fetchData() {
            const booksService = new BooksService();
            let result = await booksService.GetBook(params.bookId);

            setIsLoaded(true);
            if (result.success) {
                setBook(result.text);
            } else {
                setError(result.text);
            }
        }
        fetchData()
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        var bookImage = require(`../images/${book.imageName}`);
        return (<Book image={bookImage} id={book.bookId} name={book.title} author={book.author.name} author_id={book.authorId} page={book.pagesCount} country={book.country} category={book.category} period={book.period} annotation={book.description} />);
    }
}