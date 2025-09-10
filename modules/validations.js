import stringify from "safe-stable-stringify"

/**
 * Regular expression for validating email addresses.
 * @see {@link https://emailregex.com/}
 * @type {RegExp}
 */
export const email_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i


/**
 * Validates whether a given string is a valid IPv4 address.
 * @param {string} ip - The IP address string to validate.
 * @returns {boolean} True if the IP address is valid, otherwise false.
 */
export const is_ipv4 = ip => {

    // Split the IP address into its components and make then numbers
    const octets = `${ ip }`.split( '.' ).map( octet => parseInt( octet, 10 ) )

    // Check if the IP address has 4 octets and each octet is between 0 and 255
    return octets.length === 4 && octets.every( octet => !isNaN( octet ) && octet >= 0 && octet <= 255 )

}

/**
 * Checks if a string is a valid IPv6 address. VERY NAIVELY
 * @param {string} ip - The IP address to check.
 * @returns {boolean} True if this is probably a valid IPv6 address, otherwise false.
 */
export const is_ipv6 = ip => {

    // must be string
    if( typeof ip !== 'string' ) return false

    // must have only hex digits and colons
    if( !/^[0-9a-f:]+$/.test( ip ) ) return false

    // If no :: compression it must be 8 parts, otherwise it must be 7 or under
    if( ip.includes( '::' ) ) return ip.split( ':' ).length <= 8
    return ip.split( ':' ).length === 8

}


/**
 * Checks if an object contains all the required properties.
 * @param {Object} obj - The object to check.
 * @param {Array} required_properties - The array of required properties.
 * @param {boolean} [error_on_fail=true] - Determines whether to throw an error if properties are missing.
 * @returns {boolean} - Returns true if all required properties are present, otherwise returns false.
 * @throws {Error} - Throws an error if properties are missing and `error_on_fail` is true.
 */
export const require_props = ( obj={}, required_properties=[], error_on_fail=true ) => {

    // Get the keys on the object
    const keys = Object.keys( obj )

    // Check that required props are present
    const missing_properties = required_properties.filter( prop => !keys.includes( prop ) )

    // If properties are missing, throw errors or return false
    if( error_on_fail && missing_properties.length ) throw new Error( `Missing required properties on object: ${ missing_properties.join( ', ' ) }` )
    if( missing_properties.length ) return false

    // If all good, return true
    return true

}

/**
 * Validates the properties of an object against a list of allowed properties.
 * 
 * @param {Object} obj - The object to validate.
 * @param {Array} allowed_properties - The list of allowed properties.
 * @param {boolean} [error_on_fail=true] - Determines whether to throw an error if unknown properties are found.
 * @returns {boolean} - Returns true if all properties are allowed, false otherwise.
 * @throws {Error} - Throws an error if unknown properties are found and `error_on_fail` is true.
 */
export const allow_props = ( obj={}, allowed_properties=[], error_on_fail=true ) => {

    // Get the keys on the object
    const keys = Object.keys( obj )

    // Check that required props are present
    const unknownProperties = keys.filter( key => !allowed_properties.includes( key ) )

    // If properties are missing, throw errors or return false
    if( error_on_fail && unknownProperties.length ) throw new Error( `Unknown properties on object: ${ unknownProperties.join( ', ' ) }` )
    if( unknownProperties.length ) return false

    // If all good, return true
    return true

}


/**
 * Compares two objects and returns the differences between them.
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @param {boolean} [include_originals=false] - Determines whether to include the original objects in the return value.
 * @returns {Object} - An object containing the changes between the two objects.
 */
export const shallow_compare_objects = ( obj1={}, obj2={}, include_originals=false ) => {

    // Get all keys between the two objects
    const keys = [ ...new Set( [ ...Object.keys( obj1 ), ...Object.keys( obj2 ) ] ) ]

    // Generate a diff object that has changed keys that have a { from, to } structure where additions and removals are marked using undefined
    const changes = keys.reduce( ( acc, key ) => {

        // Check if the key is in both objects
        if( stringify( obj1[ key ] ) === stringify( obj2[ key ] ) ) return acc

        // Generate from/to object
        const changes = { from: obj1[ key ], to: obj2[ key ] }

        // Add the change to the accumulator
        acc[ key ] = changes

        // Return the accumulator
        return acc

    }, {} )

    if( include_originals ) return { changes, obj1, obj2 }

    return changes

}