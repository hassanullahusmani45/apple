export const setItem = (key: string, value: any): void => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error setting item in localStorage", error);
    }
}

export const getItem = (key: string): any | undefined => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    } catch (error) {
        console.error("Error getting item from localStorage", error);
        return undefined;
    }
}

export const removeItem = (key: string): void => {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing item from localStorage", error);
    }
}