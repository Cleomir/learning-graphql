import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOK } from "../graphql/queries";

const BookDetails = (props) => {
  const { error, data } = useQuery(GET_BOOK, {
    variables: {
      id: props.bookId,
    },
  });

  if (error) console.log(error);

  return <div id="book-details">{displayBookDetails(data)}</div>;
};

const displayBookDetails = (data) => {
  if (data && data.book) {
    const { book } = data;
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div>No book selected</div>;
  }
};

export default BookDetails;
