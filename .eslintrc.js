module.exports = {
    'extends': 'airbnb',
    'plugins': [
        'react',
        'jsx-a11y',
        'import'
    ],
    'rules': {
        'indent': [1, 4, { 'SwitchCase': 1 }],
        'linebreak-style': [1, 'windows'],
        'react/jsx-indent': [1, 4],
        'react/jsx-filename-extension': 0,
        'no-unused-vars': 1,
        'global-require': 0,
        'react/prefer-stateless-function': 0,
        'react/forbid-prop-types': 0,
        'react/require-default-props': 1,
        'react/prop-types': [1, {
            'ignore': [
                'weather',
                'changeWeatherInfo',
            ]
        }],
        'spaced-comment': 0,
        'func-names': 1,
        'arrow-parens': 1,
        'semi': 1,
        'react/jsx-indent-props': 1,
        'react/jsx-closing-bracket-location': 1,
    },
    'env': {
        'browser': true,
    },
    'settings': {
        'import/ignore': ['.css$', 'node_modules/*']
    }
};
