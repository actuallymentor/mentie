// Import environment data
import { dev, is_emulator, loglevel } from "./environment.js"

const should_log = levels => {

    // Check if the loglevel matches this call
    const valid_levels = [ 'info', 'warn', 'error' ]

    // Check if the loglevel is valid
    if( !valid_levels.includes( loglevel ) ) console.warn( `Invalid log level: ${ loglevel }` )

    return levels.includes( loglevel )

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
    if( dev || should_log( levels ) ) console.log( ...messages )

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
    if( is_emulator || should_log( levels ) ) console.info( ...messages )

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
    if( dev || should_log( levels ) ) console.warn( ...messages )

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