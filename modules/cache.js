import { log } from "./logging.js"

/**
 * Cache object for storing data.
 * @type {Object}
 * @private
 */
let _cache = {}

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
    if( `${ key }`.includes( 'undefined' ) || `${ key }`.includes( 'null' ) ) {
        log.warn( `The cache key is ${ key }, this may indicate a bug in your cache logic` )
    }

    if( typeof expires_in_ms !== 'number' ) {
        log.warn( `cache() expires_in_ms must be a number, got ${ typeof expires_in_ms }` )
        expires_in_ms = Infinity
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
 * Restores the cache from a given cache object.
 * If the cache object is empty, it will overwrite the current cache.
 * If the cache object has keys that already exist in the current cache, those keys will be skipped.
 * @param {Object} cache_object - The cache object to restore.
 * @returns {Object} The updated cache object.
 * @throws {Error} If the cache_object is not an object or is null.
 */
cache.restore = ( cache_object ) => {

    // Impute type of cache_object
    let input_type = typeof cache_object
    if( cache_object === null ) input_type = 'null'
    if( Array.isArray( cache_object ) ) input_type = 'array'

    // Check if the cache_object is an object, specifically check it is not an array
    if( input_type != 'object' ) {
        throw new Error( `cache.restore() expects an object, got ${ input_type }` )
    }

    // If current cache has no keys, restore the cache object
    if( !Object.keys( _cache ).length ) {
        // Assign the cache_object content to the cache obect
        Object.assign( _cache, cache_object )
        log.info( `Cache restored with ${ Object.keys( cache_object ).length } keys` )
        return _cache
    }

    // If current cache has keys, only overwrite keys that are not already in cache, warn for keys that are skipped
    const keys = Object.keys( cache_object )
    for( const key of keys ) {
        if( _cache[key] ) {
            log.warn( `Cache key ${ key } already exists, skipping restore` )
        } else {
            _cache[key] = cache_object[ key ]
        }
    }

    log.info( `Cache restored with ${ keys.length } keys, ${ Object.keys( _cache ).length } total keys in cache` )
    return _cache

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
 * Clears the cache entirely
 */
cache.clear = ( { i_am_sure=false } ) => {
    if( i_am_sure ) {
        _cache = {}
    } else {
        log.warn( `cache.clear() called without i_am_sure=true, cache not cleared` )
    }
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
    const size_bytes = keys.reduce( ( acc, key ) => acc + JSON.stringify( _cache[key] ).length + JSON.stringify( key ).length, 0 )

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
 * Function to inspect concurrency calls of a function. Add this as a logger in a function to log out the concurrency value.
 * 
 * @param {Function} logger - The logger function.
 * @param {string} key_prefix - The key for the concurrency value, used to tag the logging
 * @returns {number} - The concurrency value.
 * @example
 * import { cache, concurrency } from 'mentie';
 * function often_called_function() {
 *    concurrency( console.log, 'important_function' );
 *   // ... function logic ...
 * }
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