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