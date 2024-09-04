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

/**
 * Function to inspect concurrency.
 * 
 * @param {Function} logger - The logger function.
 * @param {string} key_prefix - The key for the concurrency value, used to tag the logging
 * @returns {number} - The concurrency value.
 */
export function concurrency( logger, key_prefix ) {

    // Get the concurrency key
    let key = cache( `concurrency_key` )
    if( !key ) {
        cache( `concurrency_key`, `${ key_prefix }_${ Date.now() }` )
        key = cache( `concurrency_key` )
    }

    // Get the latest concurrency value
    const concurrency = cache( `concurrency` ) || 1

    // Set the new concurrency value
    cache( `concurrency`, concurrency + 1 )

    // If there was no logger, return the concurrency value
    if( !logger ) return concurrency

    // Log the concurrency value
    logger( `Concurrency key ${ key }: ${ concurrency }` )

}