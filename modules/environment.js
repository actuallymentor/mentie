// ///////////////////////////////
// Platform and environment detection
// ///////////////////////////////



/**
 * Environment checks for various runtime contexts.
 * Useful in compiled code where the runtime environment may not be known at compile time.
 * @namespace
 */
export const env = {}

/**
 * Determines if the current runtime environment is a web browser.
 * @returns {boolean} True if running in a web environment, otherwise false.
 */
env.is_web = () => typeof window !== 'undefined'

/**
 * 
 * @returns {boolean} True if running in a web browser and the URL includes 'localhost', otherwise false.
 */
env.is_localhost = () => env.is_web() && [ 'localhost', '127.0.0.1', '::1' ].some( host => `${ location.href }`.includes( host ) )

/**
 * Checks if the code is running in the Cypress testing environment within a web browser.
 * @returns {boolean} True if running in Cypress, otherwise false.
 */
env.is_cypress = () => env.is_web() && typeof window.Cypress !== 'undefined'

/**
 * Determines if the current runtime environment is Node.js.
 * @returns {boolean} True if running in Node.js, otherwise false.
 */
env.is_node = () => typeof process !== 'undefined' && process.versions && process.versions?.node

/**
 * Checks if the code is running in an emulator environment in Node.js.
 * @returns {boolean} True if running in a Node.js emulator, otherwise false.
 */
env.is_emulator = () => env.is_node() && process.env?.FUNCTIONS_EMULATOR === 'true'

/**
 * Determines if the Node.js environment is in development mode.
 * @returns {boolean} True if NODE_ENV is 'development', otherwise false.
 */
env.node_dev = () => typeof process !== 'undefined' && process.env?.NODE_ENV === 'development'

/**
 * Determines if the web environment is in development mode.
 * @returns {boolean} True if the URL includes 'debug=true' or 'localhost', otherwise false.
 */
env.web_dev = () => typeof location !== 'undefined' && ( `${ location.href }`.includes( 'debug=true' ) || `${ location.href }`.includes( 'localhost' ) )

/**
 * Determines if the environment is in development mode (either web or Node.js).
 * @returns {boolean} True if either web_dev or node_dev returns true, otherwise false.
 */
env.dev = () => env.node_dev() || env.web_dev()

/**
 * Retrieves the log level set via URL parameters in a web environment.
 * @returns {string|null} The log level from URL parameters, or null if not set.
 */
env.web_loglevel = () => env.is_web() && new URLSearchParams( location?.search ).get( 'loglevel' )

/**
 * Retrieves the log level set via environment variables in a Node.js environment.
 * @returns {string|undefined} The log level from environment variables, or undefined if not set.
 */
env.node_loglevel = () => env.is_node() && process.env?.LOG_LEVEL

/**
 * Retrieves the effective log level based on the environment. Defaults to 'info' in development environments, 'error' otherwise.
 * @returns {string} The determined log level.
 */
env.loglevel = () => env.web_loglevel() || env.node_loglevel() || env.dev() ? 'info' : 'error'


/**
 * Checks if the code is running in a web environment.
 * @returns {boolean} Returns true if the code is running in a web environment, otherwise returns false.
 */
export const is_web = env.is_web()

/**
 * Checks if the code is running in a web environment and the URL includes 'localhost'.
 * @returns {boolean} Returns true if the code is running in a web environment and the URL includes 'localhost', otherwise returns false.
 */
export const is_localhost = env.is_localhost()

/**
 * Checks if the code is running within a Cypress environment.
 * @returns {boolean} Returns true if the code is running in a Cypress environment, otherwise returns false.
 */
export const is_cypress = env.is_cypress()

/**
 * Checks if the code is running in a Node environment.
 * @returns {boolean} Returns true if the code is running in a Node environment, otherwise returns false.
 */
export const is_node = env.is_node()

/**
 * Checks if the code is running in a Firebase functions emulator environment.
 * @returns {boolean} Returns true if the code is running in a Firebase environment, otherwise returns false.
 */
export const is_emulator = env.is_emulator()

/**
 * Checks if the code is running in a development environment.
 * @returns {boolean} Returns true if the code is running in a development environment, otherwise returns false.
 */
export const is_github_actions = typeof process !== 'undefined' && process.env?.GITHUB_ACTIONS == true

// ///////////////////////////////
// Mode and loglevel detection
// ///////////////////////////////

/**
 * Represents the development environment.
 * @type {boolean}
 */
export const dev = env.dev()

/**
 * The log level for web applications.
 * @type {string} - Log level. Valid values are: 'info', 'warn', 'error'
 */
export const web_loglevel = env.web_loglevel()

/**
 * The log level for the Node environment.
 * @type {string} - Log level. Valid values are: 'info', 'warn', 'error'
 */
export const node_loglevel = env.node_loglevel()


/**
 * The log level used in the environment.
 * @type {string}
 */
export const loglevel = env.loglevel()


/**
 * Logs the environment details.
 * @param {Function} logger - Optional logger function to use for logging the environment details.
 */
export const log_environment = logger => {

    // Environment trail
    const env = {
        web: {
            is_web,
            loglevel: web_loglevel,
            window: typeof window !== 'undefined' && window,
            search: typeof location !== 'undefined' && location.search
        },
        node: {
            is_node,
            loglevel: node_loglevel,
            process: typeof process !== 'undefined' && process
        },
        environment: {
            dev,
            is_emulator,
            is_cypress,
            loglevel
        }
    }

    // Log the environment
    if( !logger ) logger = console.log
    logger( 'Environment:', env )

}