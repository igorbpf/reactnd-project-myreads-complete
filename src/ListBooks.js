import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'


class ListBooks extends Component {
    static propType = {
        books: PropTypes.array.isRequired,
        up: PropTypes.func.isRequired,
        shelves: PropTypes.array.isRequired
    }

    render() {

        const { books, shelves, up } = this.props

        return (

            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>

                  {shelves.map((shelf, index) => (
                      <BookShelf key={index} shelf={shelf} books={books} up={up}/>
                  ))}

                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>

        )

    }

}

export default ListBooks
