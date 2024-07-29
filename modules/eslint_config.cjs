// Import the styleguide module using ES Module syntax
const styleguide = require( './styleguide.cjs' )

// Export the configuration object using `export default`
module.exports = {

    // Recommended features
    "extends": [ "eslint:recommended", "plugin:react/recommended" ],

    // Plugins
    plugins: [ 'unused-imports' ],

    // React settings
    "settings": {
        "react": { "version": "detect" }
    },

    // Parser features
    parser: "@babel/eslint-parser",
    parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
            jsx: true
        }
    },

    // Rules
    rules: {
        // Import styleguide
        ...styleguide
    },

    // What environment to run in
    env: {
        node: true,
        browser: true,
        mocha: true,
        jest: false,
        es6: true
    },

    // What global variables should be assumed to exist
    globals: {
        context: true,
        cy: true,
        it: true,
        Cypress: true,
        expect: true
    }
}
