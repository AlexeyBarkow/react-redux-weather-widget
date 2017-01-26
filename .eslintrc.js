module.exports = {
    'extends': 'airbnb',
    'plugins': [
        'react',
        'jsx-a11y',
        'import',
    ],
    'parser': 'babel-eslint',
    'rules': {
        'arrow-parens': 1,
        'comma-dangle': 1,
        'func-names': 1,
        'global-require': 0,
        'indent': [1, 4, { 'SwitchCase': 1 }],
        'linebreak-style': [1, 'windows'],
        'no-multiple-empty-lines': 1,
        'no-unused-vars': [1, { 'varsIgnorePattern': 'css' }],
        'react/forbid-prop-types': 0,
        'react/jsx-closing-bracket-location': 1,
        'react/jsx-filename-extension': 0,
        'react/jsx-indent': [1, 4],
        'react/jsx-indent-props': 1,
        'react/prefer-stateless-function': 0,
        'react/prop-types': [1, {
            'ignore': [
                'weather',
                'changeWeatherInfo',
            ],
        }],
        'react/require-default-props': 1,
        'react/self-closing-comp':1,
        'semi': 1,
        'space-before-blocks': 1,
        'spaced-comment': 0,
    },
    'env': {
        'browser': true,
    },
};
