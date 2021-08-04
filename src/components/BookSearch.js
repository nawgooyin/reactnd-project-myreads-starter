import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'

class BookSearch extends Component {
    static propTypes = {
        searchedBooks: PropTypes.array,
        books: PropTypes.array
    }

    state = {
        query: '',
        searchedBooks: []
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))

        setTimeout(() => {
            if (query.length > 0) {
                BooksAPI.search(query)
                    .then((searchedBooks) => {
                        let newBookShelf = [];

                        searchedBooks.map((searchedBook) => {
                            this.props.books.map((book) => {
                                if (book.id === searchedBook.id) {
                                    searchedBook.shelf = book.shelf;
                                }

                                return searchedBook;
                            })

                            return newBookShelf.push(searchedBook);
                        })

                        this.setState(() => ({
                            searchedBooks: newBookShelf
                        }))
                    }).catch(() => {
                        this.setState(() => ({
                            searchedBooks: []
                        }))
                    })
            } else {
                this.setState(() => ({
                    searchedBooks: []
                }))
            }
        }, 1000);
    }

    render() {
        const { query, searchedBooks} = this.state;
        const { onUpdateBookShelf } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)} />
                </div>
                </div>
                <div className="search-books-results">
                <ul className="books-grid">
                    {searchedBooks.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdateShelf={(book, shelf) => onUpdateBookShelf(book, shelf)}/>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        )
    }
}

export default BookSearch;