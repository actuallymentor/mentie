/**
 * Signal helper for fetch requests
 * 
 * @param {Object} options - Options for the signal
 * @param {number} [options.timeout_ms] - Timeout in milliseconds
 * @returns {Object} signal_data - Object containing fetch options and abort signal
 * @returns {Object} signal_data.fetch_options - Options for usage with fetch requests
 * @returns {AbortController} signal_data.controller - Raw abort controller
 * @returns {number|null} signal_data.timeout_id - Timeout ID, or null if no timeout was set
 * @example
 * const { fetch_options, controller } = abort_controller( { timeout_ms: 5000 } )
 * fetch( 'https://api.example.com/data', fetch_options )
 * controller.abort() // Abort the request
 */
export const abort_controller = ( { timeout_ms }={} ) => {

    // Input validation
    if( timeout_ms !== undefined && ( typeof timeout_ms !== 'number' || timeout_ms < 0 ) ) {
        throw new Error( 'timeout_ms must be a non-negative number' )
    }

    // Request with timeout
    const controller = new AbortController()
    const timeout_id = timeout_ms !== undefined ? setTimeout( () => {
        controller.abort()
    }, timeout_ms ) : null

    // Clear timeout when controller is aborted
    controller.signal.addEventListener( 'abort', () => {
        if( timeout_id !== null ) clearTimeout( timeout_id )
    } )

    const fetch_options = {
        signal: controller.signal
    }

    return {
        fetch_options,
        controller,
        timeout_id
    }

}