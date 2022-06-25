import { Author } from '../components/Author'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import AuthorsService from '../services/AuthorsService';

export default function AuthorDetailsPage() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [author, setAuthor] = useState({});

    let params = useParams();

    useEffect(() => {
        async function fetchData() {
            const authorsService = new AuthorsService();
            let result = await authorsService.GetAuthor(params.authorId);

            setIsLoaded(true);
            if (result.success) {
                setAuthor(result.text);
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
        var authorImage = require(`../images/${author.imageName}`);
        return (<Author image={authorImage} name={author.name} biography={author.biography} years_of_life={author.birthDate} id={author.authorId} books={author.books} />);
    }
}