import ApiServiceBase from './ApiServiceBase'

export default class BooksService extends ApiServiceBase {

    async GetBooks() {
        const endpoint = `${this.BASE_URI}/Books`;

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

    async GetBook(bookId) {
        const endpoint = `${this.BASE_URI}/Books/${bookId}`;

        let response = await this.Get(endpoint);

        let result = {
            success: false,
        }

        if (!response.ok) {
            if (response.status === 404) {
                result.text = `Не вдалося знайти книгу з ідентифікатором ${bookId}`;
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