import { log } from "./logging.js"

/**
 * Cache object for storing data.
 * @type {Object}
 * @private
 */
const _cache = {}

/**
 * Caches the value with the specified key.
 * If a value is provided, it sets the value in the cache.
 * If no value is provided, it retrieves the value from the cache.
 *
 * @param {string} key - The key to cache the value.
 * @param {*} [value] - The value to be cached (optional).
 * @returns {*} The cached value.
 */
export function cache( key, value ) {

    // If the key is undefined, log a warning
    if( key === undefined ) {
        log.warn( `The cache key is undefined, this may indicate a bug in your cache logic` )
    }

    // Warn if the key contains 'undefined'
    if( key.includes( 'undefined' ) ) {
        log.warn( `The cache key ${ key } contains 'undefined', this may indicate a bug in your cache logic` )
    }

    if( value ) _cache[key] = value
    return _cache[key]
}