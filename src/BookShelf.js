import React from 'react'
import Book from "./Book"
import PropTypes from 'prop-types'
import { Transition } from 'semantic-ui-react'


const BookShelf = ({shelf, books, up, trans}) => {
    const shelfBooks = books.filter(book => (book.shelf === shelf.value))
    const { animation, duration } = trans


    return (

        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf.title}</h2>
          <div className="bookshelf-books">

              {shelfBooks.length === 0 && (
                  <p>No books available</p>
              )}

            {shelfBooks.length > 0 && (
                <ol className="books-grid">
                       { shelfBooks.map((book) => (<Transition.Group animation={animation} key={book.title} duration={duration}>{ book.visible && (<li key={book.title}><Book book={book} up={up}/></li>) } </Transition.Group>))}
                </ol>
            )}

          </div>
        </div>

    )
}

BookShelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    up: PropTypes.func.isRequired,
    trans: PropTypes.object.isRequired
}

export default BookShelf
