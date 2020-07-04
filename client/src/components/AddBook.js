import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Mutation } from "@apollo/react-components";

import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../graphql/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }

  render() {
    return (
      <Mutation mutation={ADD_BOOK}>
        {/* Send mutation */}
        {(addBook) => (
          <form
            id="add-book"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(this.state);
              addBook({
                variables: {
                  name: this.state.name,
                  genre: this.state.genre,
                  authorId: this.state.authorId,
                },
                refetchQueries: [
                  {
                    query: GET_BOOKS,
                  },
                ],
              });
            }}
          >
            <div className="field">
              <label>Book name:</label>
              <input
                type="text"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Genre:</label>
              <input
                type="text"
                onChange={(e) => this.setState({ genre: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Author:</label>
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  this.setState({ authorId: e.target.value });
                  console.log(this.state);
                }}
              >
                <option>Select author</option>
                <DisplayAuthors />
              </select>
            </div>

            <button type="submit">+</button>
          </form>
        )}
      </Mutation>
    );
  }
}

const DisplayAuthors = () => {
  // query data
  const { loading, data } = useQuery(GET_AUTHORS);
  if (loading) return <option disabled>Loading authors...</option>;

  // display data
  return data.authors.map((author) => (
    <option key={author.id} value={author.id}>
      {author.name}
    </option>
  ));
};

export default AddBook;
