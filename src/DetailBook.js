import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

function DetailBook() {
    const [book, setBook] = useState();
    const { id } = useParams();

    useEffect(() => {
        (async function get() {
            try {
                const res = await BooksAPI.get(id);

                setBook(res);
            } catch (err) {
                console.log(err);

                throw err;
            }
        })();
    }, [id]);

    return (
        <div className="book-detail">
            <Link to="/" className="close">Close</Link>
            {book && (
                <div className="book-detail-wrapper">
                    {book?.imageLinks?.thumbnail !== undefined && <img src={book.imageLinks.thumbnail} alt={`Book cover: ${book.title}`} className="book-detail-img" />}
                    <div>
                        <h1 className="book-detail-title">{book.title}</h1>
                        <strong className="book-detail-subtitle">{book.subtitle}</strong>
                        {book.authors && <p className="book-detail-authors"><strong>Author(s):</strong> {book.authors.join(', ')}</p>}

                        {book.averageRating && <p className="book-detail-rating"><strong>Rating:</strong> {book.averageRating}</p>}

                        {book.categories && <p className="book-detail-categories"><strong>Categories:</strong> {book.categories.join(', ')}</p>}
                        {book.publishedDate && <p className="book-detail-published"><strong>Published:</strong> {book.publishedDate}</p>}
                        <div className="book-detail-description">
                            {book.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailBook;
