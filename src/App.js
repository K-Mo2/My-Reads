import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import SearchPage from "./Components/Pages/SearchPage";
import { getAll } from "./BooksAPI";
import "./App.css";

export default function App(props) {
  const booksObj = {
    books: [],
    wantToRead: [],
    currentlyReading: [],
    read: [],
  };

  const [booksState, setBooksState] = useState(booksObj);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      foos();
    }
  }, [flag]);

  // const propsRef = useRef(false);
  // useEffect(() => {
  //   if (!propsRef.current) {
  //     foos();
  //     console.log(props);
  //     propsRef.current = true;
  //   }
  // }, [propsRef.current]);

  const foos = async function () {
    try {
      const fetchingBooksFunc = async function (shelfType) {
        const fetching = await getAll();
        const filter = await fetching.filter((book) => {
          return book.shelf === `${shelfType}`;
        });
        return filter;
      };
      const fetching = await getAll();
      const wantToRead = await fetchingBooksFunc("wantToRead");
      const currentlyReading = await fetchingBooksFunc("currentlyReading");
      const read = await fetchingBooksFunc("read");

      setBooksState(() => {
        return {
          books: fetching,
          wantToRead: wantToRead,
          currentlyReading: currentlyReading,
          read: read,
        };
      });
      setFlag(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className="app" />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage
            {...booksState}
            setFlag={setFlag} /* setRef={propsRef.current}*/
          />
        </Route>
        <Route path="/search" exact={true}>
          <SearchPage {...booksState} setFlag={setFlag} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
