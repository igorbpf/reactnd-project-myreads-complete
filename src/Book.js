import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookButton from './BookButton'


const Book = ({book}) => {
    const {title, authors, image} = book

    return (

        <div className="book">
          <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>

              <BookButton/>

          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>


    )

}

export default Book