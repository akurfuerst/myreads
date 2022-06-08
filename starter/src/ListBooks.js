import PropTypes from 'prop-types';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';
import categories from './utils/categories';

const ListBooks = ({ books, onUpdate }) => {

    return (
        <div>
            <div className="list-books">
                <div className="list-books-title"><h1>My Reading</h1></div>
                <div className="list-books-content">
                    {categories.map(category => {
                        return (
                            <div key={category.id}>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{category.title}</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books.filter(book => book.shelf === category.id).map(bookInCategory => (
                                                <BookItem key={bookInCategory.id} data={bookInCategory} activeCategory={category.id} onUpdate={onUpdate} />
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="open-search">
                <Link to={'/search'}>Add a book</Link>
            </div>
        </div>
    );
};


ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default ListBooks;
