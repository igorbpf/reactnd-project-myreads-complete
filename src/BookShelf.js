import React from 'react'
import Book from "./Book"

const BookShelf = ({title, books}) => {
    const shelfBooks = books.filter(book => (book.shelf == title))
    console.log(shelfBooks)
    return (

        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">

            {shelfBooks.map((book) => (<li key={book.title}><Book book={book}/></li>))}

            </ol>
          </div>
        </div>



    )
}

export default BookShelf
