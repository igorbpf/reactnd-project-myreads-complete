import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { debounce } from 'throttle-debounce'
import PropTypes from 'prop-types'


class SearchPage extends Component {
    static propType = {
        up: PropTypes.func.isRequired,
        knownBooks: PropTypes.array.isRequired
    }

    state = {
        query: "",
        books: []
    }

    componentWillMount(){
        this.searchBooks = debounce(500, this.searchBooks);
    }

    updateQuery = (event) => {
        this.searchBooks(event.target.value);
    }

    searchBooks = (value) => {
        this.setState({ query: value }, () => {
            BooksAPI.search(this.state.query)
            .then(books => {
                this.setState({ books: books })
            })
            .catch((err) => {
                this.setState({ books: [] })
            });
        })
    }

    render(){

        const books = this.state.books
        const { up, knownBooks } = this.props

        const knownIds = knownBooks.map(book => book.id);

        // This step is used in order to check which books returned by the search
        // are present on the shelves and then chage their shelf property
        const filteredBooks = books.map(book => {
            if (knownIds.includes(book.id)){
                const filteredBook = knownBooks.filter(b => b.id === book.id)[0]
                book.shelf = filteredBook.shelf
                return book
            } else {
                book.shelf = "none"
                return book
            }
        })

        return (
            <div className="search-books">
                <div className="list-books-title">
                  <h1>Search</h1>
                </div>

              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" onChange={this.updateQuery.bind(this)}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">

                    {filteredBooks.map(book =>  <li key={book.id}><Book book={book} up={up}/></li>)}

                </ol>
              </div>
            </div>
        )
    }
}


export default SearchPage
