import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import { Route } from 'react-router-dom';

class BooksApp extends Component {
    state = {
        books: [],
        shelves: []
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books,
                    shelves: [
                        {shelfTitle:'Currently Reading', bookList: books.filter((book) => book.shelf === 'currentlyReading')},
                        {shelfTitle:'Want to Read', bookList: books.filter((book) => book.shelf === 'wantToRead')},
                        {shelfTitle:'Read', bookList: books.filter((book) => book.shelf === 'read')},
                    ]
                }))
            })
    }

    updateBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(() => {
                this.getAllBooks();
            })
    }
    
    render() {
        return (
        <div className="app">
                <Route exact path='/' render={() => (
                    <BookList shelves={this.state.shelves} onUpdateBookShelf={(book, shelf) => this.updateBookShelf(book, shelf)}/>
                )} />

                <Route path='/search' render={({ history }) => (
                        <BookSearch books={this.state.books} onUpdateBookShelf={(book, shelf) => {
                            this.updateBookShelf(book, shelf)}}
                        />
                    )}
                />
        </div>
        )
    }
}

export default BooksApp
