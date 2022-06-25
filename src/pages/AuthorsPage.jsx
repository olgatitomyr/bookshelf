import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthorsService from '../services/AuthorsService';
import FavoritesService from '../services/FavoritesService';
import AuthorList from '../components/AuthorList';

export default class AuthorsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    #favoritesService = new FavoritesService();
    #authorsService = new AuthorsService();

    async componentDidMount() {
        const result = await this.#authorsService.GetAuthors();
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
                        <AuthorList authors={items}/>
                    </div>);
        }
    }
}