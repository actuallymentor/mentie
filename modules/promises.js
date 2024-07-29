/**
 * Creates a retryable function that wraps an async function and adds retry logic.
 * @param {Function} async_function - The async function to be made retryable. MUST be an UNCALLED function. See example.
 * @param {Object} options - The options for retrying.
 * @param {number} [options.retry_times=5] - The number of times to retry the async function.
 * @param {number} [options.cooldown_in_s=10] - The cooldown time in seconds between retries.
 * @param {boolean} [options.cooldown_entropy=true] - Whether to add randomness to the cooldown time.
 * @param {Function} [options.logger=null] - The logger function to log retry attempts.
 * @returns {Function} - The retryable function.
 * @example
 * make_retryable( do_thing )
 * make_retryable( () => fetch( 'https://api.com/data' ) )
 * @see {@link https://www.npmjs.com/package/promise-retry|promise-retry}
 */
export async function make_retryable( async_function, { retry_times=5, cooldown_in_s=10, cooldown_entropy=true, logger=null } ) {

    // Function dependencies
    const Retrier = await import( 'promise-retry' )
    const { wait } = await import( './time.js' )

    // Set a default logger that does nothing if none was provided
    if( !logger ) logger = () => {}

    // Formulate retry logic
    const retryable_function = () => Retrier( ( do_retry, retry_counter ) => {

        // Failure handling
        return async_function().catch?.( async e => {

            // If retry attempts exhausted, throw out
            if( retry_counter >= retry_times ) {
                logger( { message: 'Retry failed definitively', data: { retry_counter, retry_times } } )
                throw e
            }

            // If retries left, retry with a progressive delay
            const entropy = !cooldown_entropy ? 0 :  .1 + Math.random() // Add some randomness to cooldown
            const cooldown_in_ms = ( cooldown_in_s + entropy ) * 1000 // Convert cooldown to milliseconds
            const cooldown = cooldown_in_ms + cooldown_in_ms * ( retry_counter - 1 ) // Increase cooldown with each retry

            // Log and wait
            logger( { message: 'Retry failed, pausing...', data: { retry_counter, retry_times, cooldown_in_s, cooldown_in_ms, cooldown } } )
            await wait( cooldown )
            logger( { message: 'Cooldown complete, continuing...', data: { retry_counter, retry_times } } )

            // Retry
            return do_retry()

        } )

    } )

    return retryable_function

}


/**
 * Throttles and retries an array of async functions.
 *
 * @param {Array<Function>} async_function_array - Array of async functions to be throttled and retried.
 * @param {Object} options - Options for throttling and retrying.
 * @param {number} [options.max_parallell=2] - Maximum number of functions to run in parallel.
 * @param {number} [options.retry_times] - Number of times to retry each function.
 * @param {number} [options.cooldown_in_s] - Cooldown time in seconds between retries.
 * @param {number} [options.cooldown_entropy] - Random factor to add to the cooldown time.
 * @param {Function} [options.logger] - Progress callback function.
 * @param {boolean} [options.fail_fast=true] - Whether to fail fast or continue with other functions when an error occurs.
 * @returns {Promise<Array>} - A promise that resolves to an array of results from the async functions.
 * @see {@link https://www.npmjs.com/package/promise-parallel-throttle|promise-parallel-throttle}
 */
async function throttle_and_retry( async_function_array=[], { max_parallell=2, retry_times, cooldown_in_s, cooldown_entropy, logger, fail_fast=true } ) {

    // Function dependencies 
    const Throttle = await import( 'promise-parallel-throttle' )

    // Create array of retryable functions
    const retryable_async_functions = async_function_array.map( async_function => {
        const retryable_function = make_retryable( async_function, { retry_times, cooldown_in_s, logger, cooldown_entropy } )
        return retryable_function
    } )

    // Throttle configuration
    const throttle_config = {
        maxInProgress: max_parallell,
        failFast: fail_fast,
        ...logger && { progressCallback: logger }
    }

    // Return throttler
    return Throttle.all( retryable_async_functions, throttle_config )

}