import React from 'react';
import { Navigate } from 'react-router-dom';
import UsersService from '../services/UsersService';
import FavoritesService from '../services/FavoritesService';
import BookList from '../components/BookList';

export default class FavoritesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    #usersService = new UsersService();
    #favoritesService = new FavoritesService();

    async componentDidMount() {
        const result = await this.#favoritesService.GetFavorites();
        let newState = { isLoaded: true }

        if (result.success) {
            newState.items = result.text;
        } else {
            newState.error = result.text;
        }

        this.setState(newState);
    }

    render() {
        if (!this.#usersService.IsLoggedIn())
            return (<Navigate to="/" />)

        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Помилка: {error}</div>;
        } else if (!isLoaded) {
            return <div>Завантаження...</div>;
        } else {
            return (
                <div>
                    <BookList books={items} />
                    <button onClick={() => { items.pop(); console.log(items); this.setState(this.state) }} />
                </div>);
        }
    }
}