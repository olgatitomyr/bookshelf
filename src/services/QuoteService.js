export default class QuoteService{
    static async GetQuoteOfTheDay() {
        let response = await (await fetch("https://quotes.rest/qod?language=en")).json();
        return response.contents.quotes[0];
    }
}