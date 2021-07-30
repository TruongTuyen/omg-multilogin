export const generatorPassword = (len = 12) => {
    return Array(len)
        .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
        .map(function (x) {
            return x[Math.floor(Math.random() * x.length)];
        })
        .join('');
};

export const isEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const RegExp =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

export const toSnakeCase = (str: string): string =>
    str
        .match(RegExp)!
        .map((x) => x.toLowerCase())
        .join('_');
