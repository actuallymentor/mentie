/**
 * Waits for the specified amount of time.
 * @param {number} ms - The number of milliseconds to wait.
 * @param {boolean} [error=false] - If true, the promise will reject after the specified time.
 * @returns {Promise<void>} - A promise that resolves after the specified time.
 */
export const wait = ( ms, error=false ) => new Promise( ( res, rej ) => setTimeout( error ? rej : res, ms ) )

/**
 * Converts a timestamp to RFC-822 date format.
 * @param {number} timestamp - The timestamp to convert.
 * @returns {string} The RFC-822 formatted date string.
 */
export function timestamp_to_RFC822( timestamp ) {

    // Days and months
    const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

    // Create a date object from the timestamp
    const date = new Date( timestamp )

    // Get components of the date
    const dayOfWeek = days[date.getUTCDay()]
    const dayOfMonth = date.getUTCDate()
    const month = months[date.getUTCMonth()]
    const year = date.getUTCFullYear()
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()

    // Format components
    const dayStr = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth
    const hoursStr = hours < 10 ? '0' + hours : hours
    const minutesStr = minutes < 10 ? '0' + minutes : minutes
    const secondsStr = seconds < 10 ? '0' + seconds : seconds

    // Get the timezone on the running machine
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

    // Construct the RFC-822 date string
    return `${ dayOfWeek }, ${ dayStr } ${ month } ${ year } ${ hoursStr }:${ minutesStr }:${ secondsStr } ${ timeZone }`
}

/**
 * Converts seconds to HH:MM:SS format.
 *
 * @param {number} seconds - The number of seconds to convert.
 * @returns {string} The formatted time in HH:MM:SS format.
 */
export function seconds_to_hh_mm_ss( seconds ) {

    // Round the input to the nearest second
    const rounded_seconds = Math.round( seconds )

    // Calculate hours, minutes, and seconds
    const hours = Math.floor( rounded_seconds / 3600 )
    const minutes = Math.floor( rounded_seconds % 3600  / 60 )
    const remaining_seconds = rounded_seconds % 60
    
    // Pad each unit with zeros and concatenate them
    const padded_hours = String( hours ).padStart( 2, '0' )
    const padded_minutes = String( minutes ).padStart( 2, '0' )
    const padded_seconds = String( remaining_seconds ).padStart( 2, '0' )
    
    // Return the formatted time
    return `${ padded_hours }:${ padded_minutes }:${ padded_seconds }`

}