import API from "./Api.js";

export async function loadData() {
    app.store.menu = await API.fetchMenu()
}