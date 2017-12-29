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

        const { query, books } = this.state
        const { up, knownBooks } = this.props

        const knownIds = knownBooks.map(book => book.id);
        // console.log(knownIds);

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

        console.log(filteredBooks)

        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
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
