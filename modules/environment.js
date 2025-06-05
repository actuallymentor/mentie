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
env.node_loglevel = () => env.is_node() && ( process.env?.LOGLEVEL || process.env?.LOG_LEVEL )

/**
 * Retrieves the effective log level based on the environment. Defaults to 'info' in development environments, 'error' otherwise.
 * @returns {string} The determined log level.
 */
env.loglevel = () => env.web_loglevel() || env.node_loglevel() || env.dev() ? 'info' : 'error'

/**
 * Retrieves the log annotations set via URL parameters in a web environment.
 * @returns {Array<string>|boolean} An array of log annotations from URL parameters, or false if not set.
 */
env.web_log_annotations = () => env.is_web() && new URLSearchParams( location?.search ).get( 'log_annotations' )?.split( ',' )?.filter( Boolean )?.map( annotation => annotation?.trim() )

/**
 * Retrieves the log annotations set via environment variables in a Node.js environment.
 * @returns {Array<string>|boolean} An array of log annotations from environment variables, or false if not set.
 */
env.node_log_annotations = () => env.is_node() && process.env?.LOG_ANNOTATIONS?.split( ',' )?.filter( Boolean )?.map( annotation => annotation?.trim() )

/**
 * Retrieves the effective log annotations based on the environment. Defaults to an empty array if not set.
 * @returns {Array<string>|boolean} An array of log annotations, or false if not set.
 */
env.log_annotations = () => env.web_log_annotations() || env.node_log_annotations() || []

/**
 * Checks if the code is running in a web browser and the platform is Mac.
 * @returns {boolean} True if the code is running in a web browser and the platform is Mac, otherwise false.
 */
env.is_mac = () => env.is_web() && navigator.userAgent?.toUpperCase().includes( 'MAC' )

/**
 * Checks if the code is running in a web browser and the platform is iPhone.
 * @returns {boolean} True if the code is running in a web browser and the platform is iPhone, otherwise false.
 */
env.is_iphone = () => env.is_web() && navigator.userAgent?.toUpperCase().includes( 'IPHONE' )

/**
 * Checks if the code is running in a web browser and the platform is Android.
 * @returns {boolean} True if the code is running in a web browser and the platform is Android, otherwise false.
 */
env.is_android = () => env.is_web() && navigator.userAgent?.toUpperCase().includes( 'ANDROID' )

/**
 * Checks if the code is running in a web browser and the platform is iOS.
 * @returns {boolean} True if the code is running in a web browser and the platform is made by Apple
 */
env.is_apple = () => env.is_web() && navigator.userAgent?.toUpperCase().includes( 'MAC OS X' )

/**
 * Checks if the code is running in a web browser and the platform is Windows.
 * @returns {boolean} True if the code is running in a web browser and the platform is Linux, otherwise false.
 */
env.is_linux = () => env.is_web() && navigator.userAgent?.toUpperCase().includes( 'LINUX' )

/**
 * Checks if the code is running in a web browser and the platform is Windows.
 * @returns {boolean} True if the code is running in a web browser and the platform is Windows, otherwise false.
 */
env.is_windows = () => env.is_web() && navigator.userAgent?.toUpperCase().includes( 'WIN' )

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

/**
 * @returns {boolean} Returns true if the code is running on an Apple device, otherwise returns false.
 */
export const is_apple = env.is_apple()

/**
 * @returns {boolean} Returns true if the code is running on an iPhone, otherwise returns false.
 */
export const is_iphone = env.is_iphone()

/**
 * @returns {boolean} Returns true if the code is running on a Mac, otherwise returns false.
 */
export const is_mac = env.is_mac()

/**
 * @returns {boolean} Returns true if the code is running on an Android device, otherwise returns false.
 */
export const is_android = env.is_android()

/**
 * @returns {boolean} Returns true if the code is running on a Linux device, otherwise returns false.
 */
export const is_linux = env.is_linux()

/**
 * @returns {boolean} Returns true if the code is running on a Windows device, otherwise returns false.
 */
export const is_windows = env.is_windows()

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
            search: typeof location !== 'undefined' && location.search,
            platform: {
                is_android,
                is_apple,
                is_iphone,
                is_linux,
                is_mac,
                is_windows
            }
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