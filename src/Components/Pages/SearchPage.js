import React, { useState, useRef } from "react";
import Search from "../SearchBtn";
import { Link } from "react-router-dom";
import { search } from "./../../BooksAPI";
import Book from "../Book";
function SearchPage(props) {
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState({});

  const stateRef = useRef(false);

  useRef(() => {
    if (stateRef.current) {
    } else {
      stateRef.current = true;
    }
  }, [searchBooks]);

  const searching = async function (event) {
    setSearchBooks({});
    try {
      const input = event.target.value;

      setQuery(() => {
        return input;
      });

      const searchRes = await search(query);

      console.log(searchRes);

      if (Array.isArray(searchRes)) {
        const searchResUpdated = searchRes
          .map((book) => {
            const check = props.books.find((b) => {
              return b.id === book.id;
            });
            if (check) {
              book.shelf = check.shelf;
            } else {
              book.shelf = "none";
            }
            return book;
          })
          .filter((res) => {
            return res.imageLinks;
          });

        setSearchBooks(() => {
          return searchResUpdated;
        });

       
      } else {
        setSearchBooks({});
        return <h1>Please enter a valid search term</h1>;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const appendingFilteredBooks = function (booksArr) {
    try {
      const res = booksArr.map((book) => {
        return (
          <Book
            {...props}
            key={book.id}
            id={book.id}
            title={book.title}
            authors={book.authors}
            url={book.imageLinks.thumbnail}
            shelf={book.shelf}
          />
        );
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={searching}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>

      <Search />
      <div className="books-grid">
        {searchBooks === undefined && query.length === 0 && (
          <h1>Please enter a valid search term</h1>
        )}
        {searchBooks !== undefined &&
          query.length !== 0 &&
          appendingFilteredBooks(searchBooks)}
      </div>
    </div>
  );
}

export default SearchPage;
