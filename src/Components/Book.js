import React, { useState } from "react";
import { update } from "./../BooksAPI";
function Book(props) {
  const [currShelf, setCurrShelf] = useState([]);
  const [currBook, setCurrBook] = useState([]);

  const updatingBooks = async function (event) {
    const shelf = event.target.value;

    const book = event.target.closest(".book");

    console.log(book, shelf);

    setCurrShelf(currShelf.splice(-1, 0, shelf));
    setCurrBook(currBook.splice(-1, 0, book));

    console.log(currBook[0], currShelf[0]);
    console.log(props);

    await update(currBook[0], currShelf[0]);
    props.setFlag(true);
    // props.setRef = false;
  };

  return (
    <li>
      <div className="book" id={props.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,

              backgroundImage: `url(${props.url})`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={updatingBooks} value={props.shelf || "none"}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors}</div>
        <div></div>
      </div>
    </li>
  );
}
export default Book;
