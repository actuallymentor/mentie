// Import environment data
import { dev, is_cypress, is_emulator, loglevel } from "./environment.js"

const should_log = levels => {

    // Check if the loglevel matches this call
    const valid_levels = [ 'info', 'warn', 'error' ]

    // Check if the loglevel is valid
    if( !valid_levels.includes( loglevel ) ) console.warn( `Invalid log level: ${ loglevel }` )

    return levels.includes( loglevel )

}

/**
 * Adds a stack trace IN PLACE to the provided messages array if executed in a browser context
 * and if the URL query string contains `trace=true`.
 * 
 * @param {Array} messages - The array of messages to potentially add a trace to.
 * @returns {Array} - The modified array of messages, including a stack trace if conditions were met.
 */
const add_trace = messages => {

    // Try to add stack to messages if needed
    try {

        // Do nothing if we are not in a browser
        if( typeof window === 'undefined' ) return messages

        // If there is no trace=true in the url, do nothing
        if( !window.location?.search?.includes?.( 'trace=true' ) ) return messages


        // Get the stack trace
        let { stack } = new Error()

        // Remove the first line of the stack trace
        stack = stack.split( '\n' ).slice( 1 ).join( '\n' )

        // Annotate the provided messages
        messages.push( { stack } )

        return messages

    } catch ( error ) {

        // This should never happen but we'll add it so we don't crash in unexpected situations
        return messages

    }

}

/**
 * Modifies the input messages by potentially stringifying them if in a Cypress environment,
 * and by appending a stack trace if the conditions specified in `add_trace` are met.
 * 
 * @param {Array} messages - The array of messages to be annotated.
 * @returns {void} - This function modifies the input array directly and does not return a value.
 */
const annotate_messages = messages => {


    // If we are running in cypress, stringify the messages because they become unavailable in the console
    if( is_cypress ) messages = messages.map( message => JSON.stringify( message, null, 2 ) )

    // Annotate the provided messages
    messages = add_trace( messages )

    // Return the annotated messages
    return messages

}

/**
 * Logs the provided messages to the console.
 * Only logs in development mode OR if ?loglevel= or LOG_LEVEL= is set to one of the following: 'error', 'warn', 'info'.
 *  🎯 Goal: log informational messages about the state of the application.
 * @example log( `User state was updated to: `, user )
 * @param {...any} messages - The messages to be logged.
 * @property {function} info - Logs info trace messages used only for extremely granular debugging.
 * @property {function} warn - Logs warnings of things that should not happen, but do not break functionality.
 * @property {function} error - Logs errors that impact proper functioning of the application.
 * @property {string} loglevel - The log level used in the environment
 */
export function log( ...messages ) {

    // Check if the loglevel matches this call
    const levels = [ 'info' ]

    // Log the messages if the loglevel matches
    if( dev || should_log( levels ) ) {

        // Annotate the provided messages
        annotate_messages( messages )

        // Log the messages
        console.log( ...messages )

    }

}

/**
 * Logs the provided info messages to the console.
 * Only logs in firebase emulator or if ?loglevel= or LOG_LEVEL= is set to: 'info'
 * 🎯 Goal: log info trace messages used only for extremely granular debugging
 * @example log.info( `Retreived key '${ key }' of type '${ typeof key }' from localstorage: `, cache )
 * @param {...any} messages - The messages to be logged.
 */
log.info = function( ...messages ) {

    // Check if the loglevel matches this call
    const levels = [ 'info' ]

    // Log the messages if the loglevel matches
    if( is_emulator || should_log( levels ) ) {

        // Annotate the provided messages
        annotate_messages( messages )

        // Log the messages
        console.info( ...messages )
        
    }

}

/**
 * Logs the provided info messages to the console.
 * Only logs in development mode OR if ?loglevel= or LOG_LEVEL= is set to one of the following: 'warn', 'info'
 * 🎯 Goal: log warnings of things that should not happen, but do not break functionality
 * @example log.warn( `Transaction history was empty, this should never happen: `, history )
 * @param {...any} messages - The messages to be logged.
 */
log.warn = function( ...messages ) {

    // Check if the loglevel matches this call
    const levels = [ 'warn', 'info' ]

    // Log the messages if the loglevel matches
    if( dev || should_log( levels ) ) {

        // Annotate the provided messages
        annotate_messages( messages )

        // Log the messages
        console.warn( ...messages )
        
    }

}

/**
 * Logs the provided error messages to the console.
 * Only logs in development mode OR if ?loglevel= or LOG_LEVEL= is set to one of the following: 'error', 'warn', 'info'
 * @scope log errors that impact proper functioning of the application
 * @example log.error( `Error connecting to database: `, error )
 * @param {...any} messages - The messages to be logged.
 */
log.error = function( ...messages ) {

    // Check if the loglevel matches this call
    const levels = [ 'error', 'warn', 'info' ]
    const should_log = dev || levels.includes( loglevel )
    if( !dev || !should_log ) return

    // Log the messages if the loglevel matches
    console.error( ...messages )
    console.trace()

}

// Set the loglevel on the log function
log.loglevel = loglevel