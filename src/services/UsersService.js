import ApiServiceBase from './ApiServiceBase'

export default class UsersService extends ApiServiceBase {

    IsLoggedIn() {
        return !!localStorage.getItem('token');
    }

    static GetCurrentUserId() {
        const userString = localStorage.getItem('user');
        if (!userString) return undefined;

        const user = JSON.parse(userString);
        return user.id;
    }

    async Login(userName, password) {
        const endpoint = `${this.BASE_URI}/Users/login`;

        let response = await this.Post(endpoint, { userName: userName, password: password });

        let result = {
            success: false,
        }

        if (!response.ok) {
            if (response.status === 401) {
                result.text = 'Невірний логін або пароль'
            } else {
                result.text = 'Не вдалося зв\'язатися з сервером'
            }
        } else {
            result.success = true;
            result.text = await response.json();
            localStorage.setItem('token', result.text.token);
            localStorage.setItem('user', JSON.stringify(result.text.user));
        }

        return result;
    }
}