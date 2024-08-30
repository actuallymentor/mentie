/**
 * Calculates the hash of the given data using the specified algorithm.
 * 
 * @param {string} data - The data to be hashed.
 * @param {string} [algo='sha256'] - The algorithm to be used for hashing. Defaults to 'sha256'.
 * @param {string} [_digest='hex'] - The encoding of the output hash. Defaults to '
 * @returns {Promise<string>} The hashed value of the data.
 */
export async function hash( data, algo='sha256', _digest='hex' ) {

    try {

        // Native node way
        const { createHash } = await import( 'crypto' )
        const _hash = createHash( algo ).update( data ).digest( _digest )
        return _hash

    } catch {

        // Dependency-based way
        const { default: hash } = await import( 'hash.js' )
        const _hash = hash[ algo ]().update( data ).digest( _digest )
        return _hash

    }

}
