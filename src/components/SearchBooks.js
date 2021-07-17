import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {search} from "../BooksAPI"
import BooksGrid from "./ListBooks/BooksGrid"

class SearchBooks extends React.Component {
    state ={
        books: [],
        searchTerm: '',
        searching: true,
    }
    static propTypes = {
        onMoveBook: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        existingBooks: PropTypes.array.isRequired
    }
    updateSearchTerm = (searchTerm) => {
        this.setState(() => ({
            searchTerm: searchTerm,
            searching: true
        }))

        this.searchBooks(searchTerm)
    }
    searchBooks = (searchTerm) => {
        if (searchTerm !== ''){
            setTimeout(() => {
                search(searchTerm).then((books) => {
                    const { existingBooks } = this.props;
                    let mergedBooks = [];
                    if (books.length > 0){
                        mergedBooks = books.map((book) => {
                            const item = existingBooks.find((existing) => existing.id === book.id)
                            return item ? item : book;
                        })
                    }
                    this.setState(() => ({
                        books: mergedBooks,
                        loading: false,
                        searching: false
                    }))
                })
            }, 500)
        }else{
            this.setState(() => ({
                books: []
            }))
        }
    }

    render() {
        const { books, searchTerm,searching } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to={'/'} className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.searchTerm}
                            onChange={(event) => {this.updateSearchTerm(event.target.value)}}
                        />

                    </div>
                </div>
                <div className="search-books-results" align={'center'}>
                    <h3>{(searching && searchTerm !== '') && 'Searching...'}</h3>
                    {
                        searchTerm !== '' &&
                        <div align={'center'}>
                            {
                                this.props.loading ? 'Loading...' : <BooksGrid books={this.state.books} onMoveBook={this.props.onMoveBook}/>
                            }
                        </div>
                    }
                    <h3>{(searchTerm !== '' && searching === false && books.length === 0) && 'No Result found for the search'}</h3>
                </div>
            </div>
        )
    }
}

export default SearchBooks
