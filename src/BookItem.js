import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import categories from './utils/categories';
import { motion } from 'framer-motion';

const BookItem = ({ data, activeCategory, onUpdate }) => {
    const currentCategory = activeCategory || 'none';

    const onHandleUpdate = (event) => {
        onUpdate(data, event.target.value);
    };

    return (
        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} layout>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: data?.imageLinks?.smallThumbnail !== undefined ? `url(${data?.imageLinks?.smallThumbnail})` : 'unset',
                        }}
                    />
                    <div className="book-shelf-changer">
                        <select defaultValue={currentCategory} onChange={onHandleUpdate}>
                            <option disabled>
                                Move to...
                            </option>
                            {categories.map(category => {
                                return (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                );
                            })}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{data.title}</div>
                <div className="book-authors">{data.authors && data.authors.join(', ')}</div>
                <Link className="book-button" to={`book/${data.id}`}>Details</Link>
            </div>
        </motion.li>
    );
};

BookItem.propTypes = {
    data: PropTypes.object.isRequired,
    activeCategory: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
};

export default BookItem;
