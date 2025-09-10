import { is_ipv4 } from "./validations"

/**
 * Shuffle an array using the Fisher-Yates algorithm.
 * @param {Array} array 
 * @returns {Array} The shuffled array.
 */
export const shuffle_array = ( array, in_place=true ) => {


    // Validate input
    if( Array.isArray( array ) === false ) throw new Error( 'Input must be an array' )

    // Handle in-place shuffling
    const to_shuffle = in_place ? array : [ ...array ]

    // Fisher-Yates shuffle 
    for( let i = to_shuffle.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ to_shuffle[i], to_shuffle[j] ] = [ to_shuffle[j], to_shuffle[i] ]
    }

    return to_shuffle

}

/**
 * Trims whitespace from each line of a multiline string.
 * @param {string} string - The multiline string to trim.
 * @returns {string} - The trimmed multiline string.
 */
export const multiline_trim = string => `${ string }`.split( '\n' ).map( s => s?.trim() ).join( '\n' ).trim()

/**
 * Sanitizes a string by removing leading and trailing whitespace and converting it to lowercase.
 *
 * @param {string} string - The string to be sanitized.
 * @param {boolean} [multiline=true] - Whether to trim each line of a multiline string.
 * @returns {string} - The sanitized string.
 */
export const sanetise_string = ( string, multiline=true ) => {
    string = `${ string }`.toLowerCase()
    if( multiline ) string = multiline_trim( string )
    else string = string.trim()
    return string
}

/**
 * Sanitizes and optionally validates an IPv4 address.
 * @param {Object} options - The options object.
 * @param {string} options.ip - The IP address to sanitize.
 * @param {boolean} [options.validate=false] - Whether to validate the IP address.
 * @param {boolean} [options.error_on_invalid=false] - Whether to throw an error on an invalid IP.
 * @returns {string|null} The sanitized IPv4 address, or null if validation fails and error_on_invalid is false.
 * @throws {Error} If the IP address is not provided or invalid when error_on_invalid is true.
 */
export const sanetise_ipv4 = ( { ip, validate=false, error_on_invalid=false } ) => {

    // Ensure ip was provided
    if( !ip ) throw new Error( 'IP address is required' )

    // Sanetise ip address as string
    ip = sanetise_string( ip )

    // Remove ipv6 prefix if present
    ip = ip.replace( '::ffff:', '' )

    // Check if the IP address is valid
    if( validate && !is_ipv4( ip ) ) {
        if( error_on_invalid ) throw new Error( `Invalid IPv4 address: ${ ip }` )
        return null
    }

    // Return the sanitized IP address
    return ip

}