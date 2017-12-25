import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import serializeForm from 'form-serialize'


class SearchPage extends Component {

    state = {
        query: "",
        books: []
    }

    updateQuery = (query) => {
        this.setState({ query: query }, () => {
                    console.log(`The query is ${this.state.query}`)
                    if (query !== "") {
                        BooksAPI.search(this.state.query)
                        .then(books => {
                            if (books && !Object.keys(books).includes("error")){
                                this.setState({ books: books })
                                console.log(this.state.books)
                            } else {
                                this.setState({ books: [] })
                                console.log(this.state.books)
                            }
                        })

                    } else {
                        this.setState({ books: [] })
                    }
                })
            }

    render(){

        const { query, books } = this.state

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
                  <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => (this.updateQuery(event.target.value))}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">

                    {books.map(book =>  <li>{book.title}</li>)}

                </ol>
              </div>
            </div>
        )
    }
}


export default SearchPage
