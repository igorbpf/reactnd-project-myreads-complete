import React from 'react'
import Book from "./Book"

const BookShelf = ({shelf, books, up}) => {
    const shelfBooks = books.filter(book => (book.shelf == shelf.value))
    return (

        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">

            {shelfBooks.map((book) => (<li key={book.title}><Book book={book} up={up}/></li>))}

            </ol>
          </div>
        </div>

    )
}

export default BookShelf
