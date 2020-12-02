module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-plusplus': 'off',
        'no-unused-expressions': 'off',
        'import/no-named-as-default': 'off',
    },
};

