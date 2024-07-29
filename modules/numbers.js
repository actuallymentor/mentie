export const round_number_to_decimals = ( number, decimals=4 ) => {

    if( number == undefined ) return ''

    const factor = 10 ** decimals
    return Math.round( number * factor ) / factor
}

/**
 * Generates a random number between 1 and the specified maximum number.
 *
 * @param {number} max_number - The maximum number for generating the random number.
 * @returns {number} The generated random number.
 */
export const random_number_of_max = max_number => Math.floor( Math.random() * max_number ) + 1


/**
 * Generates a random number of a specified length.
 *
 * @param {number} length - The length of the random number.
 * @returns {number} - The generated random number.
 */
export const random_number_of_length = length => Number( [ ...Array( length ) ].map( () => random_number_of_max( 9 ) ).join( '' ) )
