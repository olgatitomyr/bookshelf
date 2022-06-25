import { getAuthors } from '../data';
import { Link } from "react-router-dom";
import { AuthorSummary } from './AuthorSummary';

function AuthorList(props) {
    let authors = props.authors;
    console.log(authors)
    return (
        <div className="bookSum">
            {authors?.map((author) => (
                <Link to={`/authors/${author.authorId}`} key={`${author.authorId}`}>
                    <AuthorSummary image={getImage(author.imageName)} name={author.name} />
                </Link>
            ))}
        </div>
    );
}

export default AuthorList;
function getImage(name) {
    if (!name) name = 'placeholder.png';

    return require(`../images/${name}`);
}