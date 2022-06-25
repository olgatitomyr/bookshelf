import { getBooks } from '../data';
import { NavLink } from "react-router-dom";
import { Outlet, useSearchParams } from 'react-router-dom';
import { BookSummary } from './BookSummary';


function SearchPage() {
    let books = getBooks() 
    let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="bookSum">
        <nav>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {books
          .filter((book) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = book.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
            .map((book) => (
                
                <NavLink
                    style={({ isActive }) => {
                        return {
                        display: "block",
                        margin: "1rem 0",
                        color: isActive ? "red" : "",
                        };
                    }}
                    to={`/books/${book.id}`}
                    key={book.id}
                >
                    <BookSummary image={book.image} name={book.name} author={book.author}/>
                    
                </NavLink>
                
            ))}
        </nav>
        <Outlet />
    </div>
  );
}

export default SearchPage;
