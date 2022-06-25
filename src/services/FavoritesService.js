import ApiServiceBase from './ApiServiceBase'
import UsersService from './UsersService';

export default class FavoritesService extends ApiServiceBase {

    async GetFavorites() {
        const userId = UsersService.GetCurrentUserId();

        const endpoint = `${this.BASE_URI}/users/${userId}/Favorites`;

        let response = await this.Get(endpoint);

        let result = {
            success: false,
        }

        if (!response.ok) {
            if (response.status === 401) {
                result.text = 'Для перегляду переліку улюблених книг необхідно авторизуватися';
            } else if (response.status === 403) {
                result.text = `Вам недоступний перелік улюблених книг користувача ${userId}`;
            } else {
                result.text = 'Не вдалося зв\'язатися з сервером';
            }
        } else {
            result.success = true;
            result.text = await response.json();
        }

        return result;
    }
    
    async Like(bookId) {
        const userId = UsersService.GetCurrentUserId();

        const endpoint = `${this.BASE_URI}/users/${userId}/Favorites/add/${bookId}`;
console.log(endpoint);
        let response = await this.Post(endpoint);

        let result = {
            success: false,
        }

        if (!response.ok) {
            if (response.status === 401) {
                result.text = 'Для редагування переліку улюблених книг необхідно авторизуватися';
            } else if (response.status === 403) {
                result.text = `На жаль, Вам не дозволено редагувати перелік улюблених книг користувача ${userId}`;
            } else {
                result.text = 'Не вдалося зв\'язатися з сервером';
            }
        } else {
            result.success = true;
            result.text = await response.json();
        }

        return result;
    }
    
    async Unlike(bookId) {
        const userId = UsersService.GetCurrentUserId();

        const endpoint = `${this.BASE_URI}/users/${userId}/Favorites/remove/${bookId}`;

        let response = await this.Delete(endpoint);

        let result = {
            success: false,
        }

        if (!response.ok) {
            if (response.status === 401) {
                result.text = 'Для редагування переліку улюблених книг необхідно авторизуватися';
            } else if (response.status === 403) {
                result.text = `На жаль, Вам не дозволено редагувати перелік улюблених книг користувача ${userId}`;
            } else {
                result.text = 'Не вдалося зв\'язатися з сервером';
            }
        } else {
            result.success = true;
            result.text = await response.json();
        }

        return result;
    }
}