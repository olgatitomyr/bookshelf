import React from 'react';
import { Navigate } from 'react-router-dom';
import BooksService from '../services/BooksService';
import FavoritesService from '../services/FavoritesService';
import BookList from '../components/BookList';

export default class BooksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    #favoritesService = new FavoritesService();
    #booksService = new BooksService();

    async componentDidMount() {
        const result = await this.#booksService.GetBooks();
        let newState = {isLoaded: true}

        if (result.success) {
            newState.items = result.text;
        } else {
            newState.error = result.text;
        }

        this.setState(newState);
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Помилка: {error}</div>;
        } else if (!isLoaded) {
            return <div>Завантаження...</div>;
        } else {
            return (
                    <div>
                        <BookList books={items}/>
                    </div>);
        }
    }
}