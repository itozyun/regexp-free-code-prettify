/**
 * @typedef {!Array.<number|string>}
 * Alternating indices and the decorations that should be inserted there.
 * The indices are monotonically increasing.
 */
var DecorationsT;

/**
 * @typedef {!{
 *   sourceNode: !Element,
 *   pre: !(number|boolean),
 *   langExtension: ?string,
 *   numberLines: ?(number|boolean),
 *   sourceCode: string,
 *   spans: ?(Array.<number|Node>),
 *   basePos: ?number,
 *   decorations: ?DecorationsT
 * }}
 * <dl>
 *  <dt>sourceNode<dd>the element containing the source
 *  <dt>sourceCode<dd>source as plain text
 *  <dt>pre<dd>truthy if white-space in text nodes
 *     should be considered significant.
 *  <dt>spans<dd> alternating span start indices into source
 *     and the text node or element (e.g. {@code <BR>}) corresponding to that
 *     span.
 *  <dt>decorations<dd>an array of style classes preceded
 *     by the position at which they start in job.sourceCode in order
 *  <dt>basePos<dd>integer position of this.sourceCode in the larger chunk of
 *     source.
 * </dl>
 */
var JobT;

/**
 * @typedef {!{
 *   sourceCode: string,
 *   spans: !(Array.<number|Node>)
 * }}
 * <dl>
 *  <dt>sourceCode<dd>source as plain text
 *  <dt>spans<dd> alternating span start indices into source
 *     and the text node or element (e.g. {@code <BR>}) corresponding to that
 *     span.
 * </dl>
 */
var SourceSpansT;


/**
 * @typedef {Array.<string|RegExp|RegExpCompat|null|undefined>}
 * 0 : string,
 * 1 : (RegExp|RegExpCompat),
 * 2 : (string|null|undefined),
 * 3 : (string|null|undefined)
 */
var StylePattern;

/**
 * @typedef {Array.<Object.<string,Array.<StylePattern>>|RegExp|RegExpCompat|Array.<StylePattern>>}
 * 0 : Object.<string,Array.<StylePattern>>
 * 1 : (RegExp|RegExpCompat)
 * 2 : Array.<StylePattern>
 */
var SimpleLexer;

/**
 * @typedef {{
 *   test:function(string):boolean,
 *   replace:function(string,*=):string,
 *   match:function(string):(RegExpResult|null)
 * }}
 */
var RegExpCompat;