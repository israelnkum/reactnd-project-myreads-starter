import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import BookShelf from "./BookShelf"

class Index extends React.Component {

    static propTypes = {
        books: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        onMoveBook: PropTypes.func.isRequired,

    }
    render() {
        const {books, loading, onMoveBook} = this.props
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content" align={'center'}>
                    {
                        loading ? 'Loading' : <BookShelf onMoveBook={onMoveBook} books={books}/>
                    }
                </div>

                <div className={'open-search'}>
                    <Link to={'/search'} >
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default Index
