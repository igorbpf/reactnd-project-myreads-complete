import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
    constructor(props) {
      super(props)

      this.updateShelf = this.updateShelf.bind(this)
    }

  state = {
      books: [],
      animation: 'fade up',
      duration: 500
  }


  updateShelf(target, book) {
      let books  = this.state.books
      books = books.filter(b => b.title !== book.title).concat({
          ...book,
          visible: false
      })
      book.visible = false
      this.setState({ books: books }, () => setTimeout(() => {
          books = this.state.books.filter(b => b.title !== book.title).concat({
              ...book,
              shelf: target.value
          })
        book.shelf =  target.value
        this.setState({ books: books }, () => setTimeout(() => {
            books = this.state.books.filter(b => b.title !== book.title).concat({
                ...book,
                visible: true
            })
            const stringfiedBooks = JSON.stringify(books)
            window.localStorage.setItem('booksUsed', stringfiedBooks)

            this.setState({ books: books })
        }, 200))
    }, 200))


  }


  componentWillMount(){
      // Populate the initial page randomly
      const firstTime = window.localStorage.getItem('first') || true

      // Populate shelves for the first time
      if (JSON.parse(firstTime)){
          BooksAPI.getAll().then((books) => {

              const shelves = ["currentlyReading", "wantToRead", "read"]

              books.map(book => BooksAPI.update(book, shelves[Math.floor(Math.random() * shelves.length)]))

              BooksAPI.getAll().then((books) => {
                  books.forEach(book => book.visible = true )
                  this.setState({ books: books }, () => {

                      const stringfiedBooks = JSON.stringify(books)
                      window.localStorage.setItem('booksUsed', stringfiedBooks)
                      window.localStorage.setItem('first', JSON.stringify(false))

                  })

              })
          })

      } else {
          const booksUsed = window.localStorage.getItem('booksUsed')
          this.setState({ books: JSON.parse(booksUsed )})
      }

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

    const trans = { animation: this.state.animation,
                    duration: this.state.duration}

    return (
      <div className="app">

        <Route path='/search' render={({ history }) => (
            <SearchPage up={this.updateShelf} knownBooks={this.state.books}/>
      )}/>

        <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} shelves={shelves} up={this.updateShelf} trans={trans}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
