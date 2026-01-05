// Logging
export { log } from './modules/logging.js'

// Time
export { wait, timestamp_to_RFC822, seconds_to_hh_mm_ss } from './modules/time.js'

// Environment
export {
    env,
    is_web,
    is_localhost,
    is_cypress,
    is_node,
    is_emulator,
    is_github_actions,
    is_apple,
    is_iphone,
    is_mac,
    is_android,
    is_linux,
    is_windows,
    dev,
    web_loglevel,
    node_loglevel,
    loglevel,
    log_environment
} from './modules/environment.js'

// Validations
export { email_regex, is_ipv4, is_ipv6, require_props, allow_props, shallow_compare_objects } from './modules/validations.js'

// Text
export { truncate, copy_to_clipboard, capitalise, random_letter, random_string_of_length } from './modules/text.js'

// Numbers
export { round_number_to_decimals, random_number_between, random_number_of_length } from './modules/numbers.js'

// Promises
export { make_retryable, throttle_and_retry, promise_timeout } from './modules/promises.js'

// Cache
export { cache, concurrency } from './modules/cache.js'

// Crypto
export { hash } from './modules/crypto.js'

// Network
export { abort_controller } from './modules/network.js'

// Manipulations
export { shuffle_array, multiline_trim, sanetise_string, sanetise_ipv4 } from './modules/manipulations.js'
