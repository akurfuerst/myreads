import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
import { search } from './BooksAPI';

const SearchBooks = ({ books, onUpdate }) => {
    const [value, setValue] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleChange = (e) => {
        setValue(e.target.value.trim());
    };

    useEffect(() => {
        if (value) {
            (async function searchBooks() {
                const books = await search(value, 10);

                if (books === undefined || books?.error !== undefined) {
                    setSearchedBooks([]);
                } else {
                    setSearchedBooks(books);
                }
            })();
        } else {
            setSearchedBooks([]);
        }
    }, [value]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close">Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchedBooks && searchedBooks.map(searchedBook => {
                        const activeCategory = books.find(book => book.id === searchedBook.id)?.shelf || 'none';

                        return (
                            <BookItem key={searchedBook.id} data={searchedBook} onUpdate={onUpdate} activeCategory={activeCategory} />
                        );
                    })}
                    {(searchedBooks.length === 0 && value) && <li>Sorry, we couldn't find any books for you. Please try another query.</li>}
                </ol>
            </div>
        </div>
    );
};

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default SearchBooks;
