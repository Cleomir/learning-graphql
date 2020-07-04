import React, { Component } from "react";
import { Query } from "@apollo/react-components";

import { GET_BOOKS } from "../graphql/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  render() {
    return (
      <Query query={GET_BOOKS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading books...</div>;
          if (error) return <div>Could not query data</div>;

          return (
            <div>
              <ul id="book-list">
                {data.books.map((book) => {
                  return (
                    <li
                      key={book.id}
                      onClick={(e) => this.setState({ selected: book.id })}
                    >
                      {book.name}
                    </li>
                  );
                })}
              </ul>
              <BookDetails bookId={this.state.selected} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default BookList;
