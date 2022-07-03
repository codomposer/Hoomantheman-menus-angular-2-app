/**
 * @See https://developer.android.com/studio/build/application-id
 * It must have at least two segments (one or more dots).
 * Each segment must start with a letter.
 * All characters must be alphanumeric or an underscore [a-zA-Z0-9_]
 * @See https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier
 * A bundle ID uniquely identifies a single app throughout the system.
 * The bundle ID string must contain only alphanumeric characters (A-Z, a-z, and 0-9), hyphens (-), and periods (.).
 */
export const App_ID_regex = /^([a-zA-Z][a-zA-Z0-9]*\.?)*[a-zA-Z][a-zA-Z0-9]*$/
