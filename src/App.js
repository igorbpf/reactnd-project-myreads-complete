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
            this.setState({ books: books })
        }, 800))
    }, 800))


  }


  componentWillMount(){
      // Populate the initial page randomly
      BooksAPI.getAll().then((books) => {

          const shelves = ["currentlyReading", "wantToRead", "read"]

          books.map(book => BooksAPI.update(book, shelves[Math.floor(Math.random() * shelves.length)]))

      })
  }

  componentDidMount() {
        BooksAPI.getAll().then((books) => {
            books.forEach(book => book.visible = true )
            this.setState({ books: books })
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
