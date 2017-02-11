export const load = (key) => {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return undefined;
        }
        return JSON.parse(serializedData);
    } catch (e) {
        return undefined;
    }
};

export const save = (key, data) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (e) {
        console.error('local storage is not supported');
    }
};
