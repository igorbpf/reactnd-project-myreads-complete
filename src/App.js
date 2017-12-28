import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
    constructor(props) {
      super(props)

      this.updateShelf = this.updateShelf.bind(this)
    }

  state = {
      books: [{
          title: "To Kill a Mockingbird",
          authors: "Harper Lee",
          image: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
          shelf: "Currently Reading",
          value: "currentlyReading"
      },
      {
          title: "Ender's Game",
          authors: "Orson Scott Card",
          image: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
          shelf: "Currently Reading",
          value: "currentlyReading"

      },
      {
          title: "1776",
          authors: "David McCullough",
          image: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
          shelf: "Want to Read",
          value: "wantToRead"

      },
      {
          title: "Harry Potter and the Sorcerer's Stone",
          authors: "J.K. Rowling",
          image: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
          shelf: "Want to Read",
          value: "wantToRead"
      },
      {
          title: "The Hobbit",
          authors: "J.R.R. Tolkien",
          image: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
          shelf: "Read",
          value: "read"
      },
      {
          title: "Oh, the Places You'll Go!",
          authors: "Seuss",
          image: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
          shelf: "Read",
          value: "read"
      },
      {
          title: "The Adventures of Tom Sawyer",
          authors: "Mark Twain",
          image: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
          shelf: "Read",
          value: "read"
      }
  ]
  }

  updateShelf(target, book) {
      let books  = this.state.books
      books = books.filter(b => b.title !== book.title).concat({
          ...book,
          value: target.value
      })
      this.setState({ books })
  }


  componentDidMount() {
        BooksAPI.getAll().then((books) => {
            console.log(books)
        })
  }



  render() {

    const shelves = [{
        title: "Currently Reading",
        value: "currentlyReading",
        books: this.state.books
    },
    {
        title: "Want to Read",
        value: "wantToRead",
        books: this.state.books
    },
    {
        title: "Read",
        value: "read",
        books: this.state.books
    }]

    return (
      <div className="app">

        <Route path='/search' render={({ history }) => (
            <SearchPage up={this.updateShelf}/>
      )}/>

        <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} shelves={shelves} up={this.updateShelf}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
