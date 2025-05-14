/**
 * Signal helper for fetch requests
 * 
 * @param {Object} options - Options for the signal
 * @param {number} [options.timeout_ms] - Timeout in milliseconds
 * @returns {Object} signal_data - Object containing fetch options and abort signal
 * @returns {Object} signal_data.fetch_options - Options for usage with fetch requests
 * @returns {AbortController} signal_data.controller - Raw abort controller
 * @returns {Function} signal_data.abort_signal - Function to abort the request
 * @returns {Function} signal_data.abort - Alias for abort_signal
 * @returns {number} signal_data.timeout_id - Timeout ID
 */
export const abort_controller = ( { timeout_ms }={} ) => {

    // Request with timeout
    const controller = new AbortController()
    const timeout_id = timeout_ms && setTimeout( () => {
        controller.abort()
    }, timeout_ms )

    const fetch_options = {
        signal: controller.signal
    }

    const abort = () => {
        if( timeout_ms ) clearTimeout( timeout_id )
        controller.abort()
    }

    return {
        fetch_options,
        controller,
        abort_signal: abort,
        abort,
        timeout_id
    }

}