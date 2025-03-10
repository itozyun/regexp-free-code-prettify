/**
 * @typedef {!Array.<string|number|!RegExp|!RegExpCompat>|undefined}
 * 0 : string|number,
 * 1 : (RegExp|RegExpCompat)
 */
var StylePattern;

/**
 * @typedef {!Array.<!Object.<string,!StylePattern>|!RegExp|!RegExpCompat|!Array.<!StylePattern>>|undefined}
 * 0 : Object.<string,!StylePattern>
 * 1 : (RegExp|RegExpCompat)
 * 2 : Array.<!StylePattern>
 */
var SimpleLexer;

/** @type {!Object.<string,(!SimpleLexer|!ZippedSimpleLexer)|undefined>} Maps language-specific file extensions to handlers. */
var simpleLexerRegistry;
