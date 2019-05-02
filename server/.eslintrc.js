module.exports = {
    globals: {
        __basedir: true
    },
    env: {
        node: true
    },
    extends: 'standard',
    rules: {
        semi: [ 2, 'always' ],
        indent: [ 2, 4, { 'SwitchCase': 1 } ],
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'no-trailing-spaces': ['error', {
            skipBlankLines: true
        }]
    }
};
