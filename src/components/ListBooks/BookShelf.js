import React from 'react'
import PropTypes from 'prop-types'
import BooksGrid from "./BooksGrid";
class BookShelf extends React.Component {
    static propTypes = {
        books : PropTypes.object.isRequired,
        onMoveBook : PropTypes.func.isRequired,
    }

    render() {
        const {books, onMoveBook} = this.props
        return (
            Object.keys(books).sort().map((book, index) => (
                <div key={index} className="bookshelf">
                    <h2 className="bookshelf-title">{book.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}</h2>
                    <div className="bookshelf-books">
                        <BooksGrid books={books[book]} onMoveBook={onMoveBook}/>
                    </div>
                </div>
            ))
        )
    }
}

export default BookShelf
