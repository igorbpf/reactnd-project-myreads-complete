import React, { Component } from 'react'

const BookButton = ({book, up}) => {
    // const _book = book
    return (
        <div className="book-shelf-changer">
        <select onChange={(e) => up(e.target, book)}>
          <option selected="true" value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>

    )
}

export default BookButton
