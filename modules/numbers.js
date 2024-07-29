/**
 * Rounds a number to the specified number of decimals.
 *
 * @param {number} number - The number to round.
 * @param {number} [decimals=4] - The number of decimals to round to. Default is 4.
 * @returns {number} The rounded number.
 */
export const round_number_to_decimals = ( number, decimals=4 ) => {

    if( number == undefined ) return ''

    const factor = 10 ** decimals
    return Math.round( number * factor ) / factor
}

/**
 * Generates a random number between a minimum and maximum value.
 *
 * @param {number} max_num - The maximum value for the random number.
 * @param {number} [min_num=1] - The minimum value for the random number
 * @returns {number} The generated random number.
 */
export const random_number_between = ( max_num, min_num=1 ) => Math.floor( Math.random() * ( max_num - min_num + 1 ) ) + min_num


/**
 * Generates a random number of a specified length.
 *
 * @param {number} length - The length of the random number.
 * @returns {number} - The generated random number.
 */
export const random_number_of_length = length =>  parseInt( Array.from( { length }, () => Math.floor( Math.random() * 10 ) ).join( '' ), 10 )
