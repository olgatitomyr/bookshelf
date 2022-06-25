import { getBooks } from '../data';
import { Link } from "react-router-dom";
import { BookSummary } from './BookSummary';

function BookList(props) {
    let books = props.books;
console.log(props)
    return (
        <div className="bookSum">
            {books?.map((book) => (
                <Link to={`/books/${book.bookId}`} key={`${book.bookId}`}>
                    <BookSummary image={require(`../images/${book.imageName}`)} name={book.title} author={book.author.name} />
                </Link>
            ))}
        </div>
    );
}

export default BookList;
