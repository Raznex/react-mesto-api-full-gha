export const options = {
  url: 'https://api.mesto.raznex.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem("token")}`,

  },
};