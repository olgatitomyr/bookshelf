import { getBooks } from '../data';
import { NavLink } from "react-router-dom";

export function Author(props) {

    return (
        <div className="author">
            <h1>{props.name} </h1>
            <img src={props.image} />
            <div>
                <p>Дата народження: {props.years_of_life}</p>
                <p>Біографія:</p>
                <p>{props.biography}</p>

                <p>Усі книги автора:</p>
                {props.books.map((book) =>
                    <NavLink to={`/books/${book.bookId}`} key={book.bookId}>
                        <p>{book.title}</p>
                    </NavLink>
                )}
            </div>
        </div>
    )
}