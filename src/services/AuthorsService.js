import ApiServiceBase from './ApiServiceBase'

export default class AuthorsService extends ApiServiceBase {

    async GetAuthors() {
        const endpoint = `${this.BASE_URI}/Authors`;

        let response = await this.Get(endpoint);

        let result = {
            success: false,
        }

        if (!response.ok) {
                result.text = 'Не вдалося зв\'язатися з сервером'
        } else {
            result.success = true;
            result.text = await response.json();
        }

        return result;
    }

    async GetAuthor(authorId) {
        const endpoint = `${this.BASE_URI}/Authors/${authorId}`;

        let response = await this.Get(endpoint);

        let result = {
            success: false,
        }

        if (!response.ok) {
            if (response.status === 404) {
                result.text = `Не вдалося знайти письменника з ідентифікатором ${authorId}`;
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