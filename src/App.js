import './App.css';
import { useEffect, useState, useCallback } from 'react';
import * as BooksAPI from './BooksAPI';
import { Route, Routes } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import DetailBook from './DetailBook';

function App() {
    const [books, setBooks] = useState([]);

    const getBooks = useCallback(async () => {
        const books = await BooksAPI.getAll();
        setBooks(books);
    }, []);

    const updateBook = (book, shelf) => {
        (async function update() {
            try {
                const res = await BooksAPI.update(book, shelf);

                if (res) {
                    getBooks();
                }
            } catch (err) {
                console.log(err);

                throw err;
            }
        })();
    };

    useEffect(() => {
        getBooks();
    }, [getBooks]);

    return (
        <div className="app">
            <Routes>
                <Route exact path="/" element={<ListBooks books={books} onUpdate={updateBook} />} />
                <Route exact path="/search" element={<SearchBooks books={books} onUpdate={updateBook} />} />
                <Route exact path="/book/:id" element={<DetailBook />} />
            </Routes>
        </div>
    );
}

export default App;
