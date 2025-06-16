const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const get = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const LocalStorageService = { save, get };

export default LocalStorageService;
