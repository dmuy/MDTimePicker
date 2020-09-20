export const MDTP_DATA = '_mdtimepicker'

/**
 * Default time picker input query selector class
 */
export const DEFAULT_CLASS = '.mdtimepicker-input'

/**
 * Starting degree value for hour hand
 */
export const HOUR_START_DEG = 120

/**
 * Hour hand degree increment
 */
export const HOUR_DEG_INCR = 30

/**
 * Starting degree value for minute hand
 */
export const MIN_START_DEG = 90

/**
 * Minute hand degree increment
 */
export const MIN_DEG_INCR = 6

/**
 * Degree limit
 */
export const END_DEG = 360

/**
 * Keydown excluded key codes
 */
export const EX_KEYS = [9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123]

/**
 * Default time picker configurations
 */
export const DEFAULTS = {
    // format of the time value (data-time attribute)
    timeFormat: 'hh:mm:ss.000',
    // format of the input value
    format: 'h:mm tt',
    // theme of the timepicker
    theme: 'blue',
    // determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM); 24-hour format has padding by default
    hourPadding: false,
    // determines if clear button is visible
    clearBtn: false,
    // determines if the clock will use 24-hour format in the UI; format config will be forced to `hh:mm` if not specified
    is24hour: false,
    // callback functions
    events: {
        ready: null,
        timeChanged: null,
        shown: null,
        hidden: null
    }
}