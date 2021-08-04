import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

const BookList = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
            <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
                <ul>
                    {props.shelves.map((shelf) => (
                        <li key={shelf.shelfTitle}>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">{shelf.shelfTitle}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {shelf.bookList.map((book) => (
                                            <li key={book.id}>
                                                <Book book={book} onUpdateShelf={(book, shelf) => props.onUpdateBookShelf(book, shelf)}/>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="open-search">
                    <Link
                        to='/search'>
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

BookList.propTypes = {
    shelves: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
}

export default BookList;