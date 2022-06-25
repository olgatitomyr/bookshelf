import { NavLink } from "react-router-dom";
import FavoritesService from "../services/FavoritesService";
import UsersService from "../services/UsersService";
import {  useState, useEffect } from 'react';

const favoritesService = new FavoritesService();
const usersService = new UsersService();

export function Book(props) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const result = await favoritesService.GetFavorites();

            if (result.success) {
                setLiked(result.text.map(b => b.bookId).indexOf(props.id));
            }
        }
        fetchData()
    }, [])
    const toggle = previous => !previous;
    return (
            <div className="book">
                <h1 >{props.name} </h1>
                <img src={props.image} />
                <button onClick={() => Like(props.id)}>{liked? '♡ Like' :  'Unlike'}</button>
                <div>
                    <NavLink to={`/authors/${props.author_id}`}
                        key={props.author}>
                        <p>Автор: {props.author}</p>
                    </NavLink>
                    <p>Кількість сторінок: {props.page}</p>
                    <p>Категорія: {props.category}</p>
                    <p>Країна: {props.country}</p>
                    <p>Період: {props.period}</p>
                    <p>Аннотація:</p>
                    <p>{props.annotation}</p>
                </div>
            </div>
    )

    async function Like(id) {
        if (liked){
            try {await favoritesService.Like(id);} catch {}
            setLiked(toggle);
        }
        else {
            try {await favoritesService.Unlike(id);} catch {}
            setLiked(toggle);
        }
    }
}