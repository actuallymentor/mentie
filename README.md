# Mentie

Mentor's favorite helpers.

## Logging

Logging options:

- `LOGLEVEL`/`?loglevel=`: Set the log level. Options:
    - `info`: Keeps `log.info()`, `log.warn()`, `log.error()` visible
    - `warn`: Keeps `log.warn()`, `log.error()` visible
    - `error`: Keeps only `log.error()` visible
    - Note that `log.warn()` adds a ⚠️ emoji and `log.error()` adds a 🚨 emoji.
    - Note that `log()` only logs in development mode (detected in environment or through `NODE_ENV`/`?debug=true`).
- `LOG_ANNOTATIONS`/`?log_annotations`: Comma separates list of annotations. Options:
    - `timestamp`: Add `Date.now()` to the log message.
    - `isotime`: Add `new Date().toISOString()` to the log message.
    - `stringify`: Stringifies log messages (useful in environments where variables references might we deleted before you inspect them)
