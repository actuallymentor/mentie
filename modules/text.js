import { random_number_between } from "./numbers.js"

/**
 * Truncates a given text to a specified length and appends a suffix if necessary.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} [length=100] - The maximum length of the truncated text.
 * @param {string} [suffix='...'] - The suffix to be appended to the truncated text.
 * @returns {string} The truncated text.
 */
export const truncate = ( text, length=100, suffix='...' ) => {
    if( !text ) return ''
    if( text.length <= length ) return text
    return `${ text.slice( 0, length ).trim() }${ suffix }`
}

/**
 * Copies the given text to the clipboard.
 * @param {string} text - The text to be copied to the clipboard.
 * @param {object} options - The options for copying to the clipboard.
 * @param {string} [options.success_message='Copied to clipboard'] - The success message to be displayed after copying.
 * @param {function} [options.alerter] - The custom function to display the success message.
 * @returns {Promise<void>} - A promise that resolves when the text is successfully copied to the clipboard.
 */
export const copy_to_clipboard = async ( text, { success_message='Copied to clipboard', alerter=alert } ) => {
    if( !navigator?.clipboard?.writeText ) return alerter( 'Your browser does not support copying to clipboard' )
    await navigator.clipboard.writeText( text )

    alerter( success_message )
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} string - The input string.
 * @returns {string} The capitalized string.
 */
export const capitalise = string => { 
    if( !string ) return ''
    return `${ string?.charAt( 0 ).toUpperCase() }${ string?.slice( 1, string?.length ) }`
}


/**
 * Generates a random letter from the allowed characters.
 *
 * @param {string} [allowed_chars] - A string of characters to choose from. If not provided, defaults to the lowercase English alphabet.
 * @returns {string} A randomly selected character from the allowed characters.
 */
export const random_letter = ( allowed_chars, capitals=true ) => {

    const letters = 'abcdefghijklmnopqrstuvwxyz'
    let chars = allowed_chars || letters
    if( capitals ) chars += letters.toUpperCase()

    return chars.charAt( Math.floor( Math.random() * chars.length ) )

}

export const random_string_of_length = ( length, allowed_chars, numbers=true, capitals=true ) => {

    return Array.from( { length }, () => {
        // If numbers are allowed, add a 50% chance of generating a number
        if( numbers && Math.random() > 0.5 ) return `${ random_number_between( 9, 0 ) }`
        return random_letter( allowed_chars, capitals )
    } ).join( '' )

}