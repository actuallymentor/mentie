/**
 * Waits for the specified amount of time.
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} - A promise that resolves after the specified time.
 */
export const wait = ( ms=0 ) => new Promise( resolve => setTimeout( resolve, ms ) )