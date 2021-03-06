import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }

    render() {
        const { book, onUpdateShelf } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                    <select value={!book.shelf ? 'none' : book.shelf} onChange={(event) => {onUpdateShelf(book, event.target.value); book.shelf = event.target.value}}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {!!book.authors && 
                    <div className="book-authors">
                        {book.authors.map((author) => (
                            <div key={author}>{author} <br/></div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default Book;