import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import ListBooks from "./components/ListBooks/Index";
import {getAll, update} from "./BooksAPI";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
    state = {
        books: {},
        ungroupedBooks: [],
        loading: true
    }

    componentDidMount() {
        getAll().then((books) => {
            this.setState(() => ({
                books:  this.groupBooks(books),
                ungroupedBooks: Object.keys(books).sort().map((book) => (
                    books[book]
                )),
                loading: false
            }))
        })
    }

    groupBooks (books) {
        return books.reduce((shelfGroup, book) => {
            shelfGroup[book.shelf] = [...shelfGroup[book.shelf] || [], book];
            return shelfGroup;
        }, {});
    }

    moveBookToShelf = (updatedBook, shelf) => {
        this.setState({loading: true})
        update(updatedBook, shelf).then(() => {
            alert('Book Moved')
            updatedBook.shelf = shelf
            this.setState((currentState) => {
                const books = [];
                shelf !== 'none' && books.push(updatedBook)
                Object.keys(currentState.books).map((book) => {
                    return currentState.books[book].map((bk) => {
                       const check = books.some((b) => b.id === bk.id)
                        return (!check && bk.shelf !== 'none') && books.push(bk)
                    })
                })
                return {
                    books: this.groupBooks(books),
                    ungroupedBooks: books,
                    loading: false
                }
            })
        }).catch(() => {
            alert('Oops! Could not load data, Please try again')
        })
    }
    render() {
        const {books, ungroupedBooks, loading} = this.state
        return (
            <div className="app">
                <Route exact path={'/'} render={() => (
                    <ListBooks onMoveBook={this.moveBookToShelf} books={books} loading={loading}/>
                )}/>
                <Route exact path={'/search'} render={() => (
                    <SearchBooks loading={loading} existingBooks={ungroupedBooks} onMoveBook={this.moveBookToShelf}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
