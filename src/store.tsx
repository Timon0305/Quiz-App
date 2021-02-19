
let userstate = {};
let premium = {
    "boulangerie": false,
    "patisserie": false,
};
let endpoint = "https://mtsqmmjcs3.execute-api.eu-central-1.amazonaws.com/dev"
let apiKey = "4hCTz2V9DW1W8rpeIk9r4v8lGKrQXOC4GdwZpXUi"


export const setData = (user: {}) => {
    userstate = user
}



