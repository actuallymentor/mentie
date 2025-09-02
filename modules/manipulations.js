/**
 * Shuffle an array using the Fisher-Yates algorithm.
 * @param {Array} array 
 * @returns {Array} The shuffled array.
 */
export const shuffle_array = array => {

    // Validate input
    if( Array.isArray( array ) === false ) throw new Error( 'Input must be an array' )

    // Fisher-Yates shuffle 
    for( let i = array.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ array[i], array[j] ] = [ array[j], array[i] ]
    }

    return array

}