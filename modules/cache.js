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
 * @param {*} [value] - The value to be cached (optional). Use null to unset, undefined is never saved when provided as a parameter
 * @param {number} [expires_in_ms=Infinity] - The expiration time in milliseconds (optional).
 * @returns {*} The cached value.
 */
export function cache( key, value, expires_in_ms=Infinity ) {

    // If the key is undefined, log a warning
    if( key === undefined ) {
        log.warn( `The cache key is undefined, this may indicate a bug in your cache logic` )
    }

    // Warn if the key contains 'undefined'
    if( `${ key }`.includes( 'undefined' ) ) {
        log.warn( `The cache key ${ key } contains 'undefined', this may indicate a bug in your cache logic` )
    }

    // If value is provided, save value and expiration
    if( value !== undefined ) _cache[key] = { value, expires: Date.now() + expires_in_ms }

    // If cache has value, but it expired, remove it
    if( _cache[key] && _cache[key].expires < Date.now() ) {
        log.info( `Cache key ${ key } expired, removing from cache` )
        delete _cache[key]
    }
    
    // Return the value of the cache key, which may be undefined
    return _cache[key]?.value
}

/**
 * 
 * @returns {Object} - A copy of the cache object.
 */
cache.dump = () => {

    // Return a copy of the cache object
    return { ..._cache }

}

/**
 * 
 * @returns {Object} stats - An object containing statistics about the cache.
 * @returns {number} stats.keys - The number of keys in the cache.
 * @returns {number} stats.size_bytes - The size of the cache in bytes.
 * @returns {string} stats.size_mib - The size of the cache in MiB, rounded to 2 decimal places.
 * @returns {string} stats.size_gib - The size of the cache in GiB, rounded to 2 decimal places.
 */
cache.stats = () => {

    // Get the number of keys in the cache
    const keys = Object.keys( _cache )

    // Get the size in bytes of the cache
    const size_bytes = keys.reduce( ( acc, key ) => acc + JSON.stringify( _cache[key] ).length, 0 )

    // Calculate side to MiB and GiB, both rounded to 2 decimal places
    const size_mib = ( size_bytes / ( 1024 * 1024 ) ).toFixed( 2 )
    const size_gib = ( size_bytes / ( 1024 * 1024 * 1024 ) ).toFixed( 2 )

    // Return the stats
    return {
        keys: keys.length,
        size_bytes,
        size_mib,
        size_gib
    }

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