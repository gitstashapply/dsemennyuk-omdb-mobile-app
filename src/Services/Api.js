class Api {
  baseUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=b9488f42";

  getMovies = async ({ inputValue, type, page = 1 }) => {
    const body = {
      s: inputValue
    };
    const url = `${this.baseUrl}&s=${inputValue}&page=${page}`;
    const res = await this.get({ url });

    return {
      data: res.Search,
      totalPages: Math.round(res.totalResults / 10),
      currentPage: page
    };
  };

  get = async ({ url, body }) => {
    const params = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    return fetch(url, params, body)
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export default new Api();
