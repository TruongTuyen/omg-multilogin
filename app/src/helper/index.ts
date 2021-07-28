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
