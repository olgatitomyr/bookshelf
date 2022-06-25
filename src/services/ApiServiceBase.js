export default class ApiServiceBase {
    BASE_URI = "http://localhost:5047/api";

    async Get(endpoint) {
        let headers = this.#addAuthHeader({});
        return await this.#CallAndHandleError(() => fetch(endpoint, {headers: headers}));
    }

    async Post(endpoint, body) {
        let headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
        headers = this.#addAuthHeader(headers);
        
        return await this.#CallAndHandleError(() =>
            fetch(endpoint, { 
                method: 'POST',
                headers: headers, 
                body: JSON.stringify(body) 
            }));
    }

    async Delete(endpoint, body) {
        let headers = this.#addAuthHeader({});

        return await this.#CallAndHandleError(() =>
            fetch(endpoint, { method: 'DELETE', headers: headers, body: JSON.stringify(body) }));
    }

    async #CallAndHandleError(fn) {
        try {
            var result = await fn();
            return result;
        } catch (error) {
            console.log(error);

            return {
                ok: false,
                text: error
            }
        }
    }

    #addAuthHeader(headers) {
        const token = localStorage.getItem('token');
        if (!token) return headers;

        headers.Authorization = `Bearer ${token}`;
        return headers;
    }
}