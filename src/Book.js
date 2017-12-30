import React from 'react'
import PropTypes from 'prop-types'
import BookButton from './BookButton'


const Book = ({book, up}) => {
    const {title, authors, imageLinks} = book
    let image = ""
    if (imageLinks) {
        image = imageLinks.thumbnail
    }

    return (

        <div className="book">
          <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>

              <BookButton book={book} up={up}/>

          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>


    )

}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    up: PropTypes.func.isRequired
}

export default Book
