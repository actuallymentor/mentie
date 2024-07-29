// ///////////////////////////////
// Platform and environment detection
// ///////////////////////////////

/**
 * Checks if the code is running in a web environment.
 * @returns {boolean} Returns true if the code is running in a web environment, otherwise returns false.
 */
export const is_web = typeof window !== 'undefined'
/**
 * Checks if the code is running in a Node environment.
 * @returns {boolean} Returns true if the code is running in a Node environment, otherwise returns false.
 */
export const is_node = typeof process !== 'undefined' && process.versions && process.versions.node

/**
 * Checks if the code is running in a Firebase functions emulator environment.
 * @returns {boolean} Returns true if the code is running in a Firebase environment, otherwise returns false.
 */
export const is_emulator = typeof process !== 'undefined' && process.env?.FUNCTIONS_EMULATOR === 'true'

// ///////////////////////////////
// Mode and loglevel detection
// ///////////////////////////////

const node_dev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development'
const web_dev = typeof location !== 'undefined' && ( `${ location.href }`.includes( 'debug=true' ) || `${ location.href }`.includes( 'localhost' ) )

/**
 * Represents the development environment.
 * @type {boolean}
 */
export const dev = node_dev || web_dev

/**
 * The log level for web applications.
 * @type {string}
 */
export const web_loglevel = is_web && new URLSearchParams( location?.search ).get( 'loglevel' )

/**
 * The log level for the Node environment.
 * @type {string}
 */
export const node_loglevel = process.env?.LOG_LEVEL


/**
 * The log level used in the environment.
 * @type {string}
 */
export const loglevel = web_loglevel || node_loglevel || 'info'