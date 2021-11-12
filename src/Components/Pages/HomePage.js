import React, { useEffect, useRef } from "react";
import Search from "../SearchBtn";
import Shelf from "../Shelf";
import Book from "../Book";
const HomePage = function (props) {
  const propsRef = useRef(false);

  useEffect(() => {
    if (propsRef.current) {
      console.log(props);
    } else {
      propsRef.current = true;
    }
  }, [props]);

  const appendingFilteredBooks = function (booksArr) {
    const res = booksArr.map((book) => {
      return (
        <Book
          {...props}
          key={book.id}
          id={book.id}
          title={book.title}
          authors={book.authors.join(",")}
          url={book.imageLinks.thumbnail}
          shelf={book.shelf}
        />
      );
    });
    return res;
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <div className="list-books-content" />
      <Shelf title="Want to read" {...props}>
        {appendingFilteredBooks(props.wantToRead)}
      </Shelf>
      <Shelf title="Currently reading" {...props}>
        {appendingFilteredBooks(props.currentlyReading)}
      </Shelf>
      <Shelf title="Read" {...props}>
        {appendingFilteredBooks(props.read)}
      </Shelf>
      <Search />
    </div>
  );
};

export default HomePage;
