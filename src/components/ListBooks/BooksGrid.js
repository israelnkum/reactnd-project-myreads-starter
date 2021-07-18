import React from 'react'
import PropTypes from 'prop-types'
import NoImage from '../../icons/no-image.svg'
class BooksGrid extends React.Component {

    static propTypes = {
        books : PropTypes.array.isRequired,
        onMoveBook : PropTypes.func.isRequired,
    }
    render() {
        const {books, onMoveBook} = this.props
        return (
            <ol className="books-grid">
                {
                    books.map((b) => (
                        <li key={b.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: `url(${b.imageLinks ? b.imageLinks['thumbnail'] : `${NoImage}`})`
                                    }}/>
                                    <div className="book-shelf-changer">
                                        <select value={b.shelf || 'none'} onChange={(e) => onMoveBook(b, e.target.value)}>
                                            <option value='move' disabled>Move to...</option>
                                            <option value='currentlyReading' >Currently Reading</option>
                                            <option value='wantToRead' >Want to Read</option>
                                            <option value='read' >Read</option>
                                            <option value='none' >None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{b.title}</div>
                                <div className="book-authors">
                                    {
                                        b.authors ? b.authors.map((author, index) => (
                                            <small key={index}>{author}</small>
                                        )) : 'Anonymous'
                                    }
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ol>
        )
    }
}

export default BooksGrid
