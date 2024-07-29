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
export const copy_to_clipboard = async ( text, { success_message='Copied to clipboard', alerter } ) => {
    if( !navigator?.clipboard?.writeText ) return alert( 'Your browser does not support copying to clipboard' )
    await navigator.clipboard.writeText( text )

    if( alerter ) alerter( success_message )
    else alert( success_message )
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
