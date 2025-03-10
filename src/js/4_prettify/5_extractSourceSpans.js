/**
 * Split markup into a string of source code and an array mapping ranges in
 * that string to the text nodes in which they appear.
 *
 * <p>
 * The HTML DOM structure:</p>
 * <pre>
 * (Element   "p"
 *   (Element "b"
 *     (Text  "print "))       ; #1
 *   (Text    "'Hello '")      ; #2
 *   (Element "br")            ; #3
 *   (Text    "  + 'World';")) ; #4
 * </pre>
 * <p>
 * corresponds to the HTML
 * {@code <p><b>print </b>'Hello '<br>  + 'World';</p>}.</p>
 *
 * <p>
 * It will produce the output:</p>
 * <pre>
 * {
 *   sourceCode: "print 'Hello '\n  + 'World';",
 *   //                     1          2
 *   //           012345678901234 5678901234567
 *   spans: [0, #1, 6, #2, 14, #3, 15, #4]
 * }
 * </pre>
 * <p>
 * where #1 is a reference to the {@code "print "} text node above, and so
 * on for the other text nodes.
 * </p>
 *
 * <p>
 * The {@code} spans array is an array of pairs.  Even elements are the start
 * indices of substrings, and odd elements are the text nodes (or BR elements)
 * that contain the text for those substrings.
 * Substrings continue until the next index or the end of the source.
 * </p>
 *
 * @param {!Node} node an HTML DOM subtree containing source-code.
 * @param {boolean|number} isPreformatted truthy if white-space in
 *    text nodes should be considered significant.
 * @return {!SourceSpansT} source code and the nodes in which they occur.
 */
 m_extractSourceSpans = function( node, isPreformatted ){
    var chunks = [];
    var length = 0;
    var spans = [];
    var k = 0;

    function walk( node ){
        var type = node.nodeType;
        if( type === 1 ){  // Element
            if( p_DOM_hasClassName( node, 'nocode' ) ){
                return;
            };
            for( var child = node.firstChild; child; child = child.nextSibling ){
                walk( child );
            };
            var nodeName = p_DOM_getTagName( node );
            if( 'BR' === nodeName || 'LI' === nodeName ){
                chunks[ k ] = '\n';
                spans[ k << 1 ] = length++;
                spans[ ( k++ << 1 ) | 1 ] = node;
            };
        } else if( type === 3 || type === 4 ){ // Text
            var text = node.nodeValue;
            if( text ){
                if( !isPreformatted ){
                    text = text.split( '\t' ).join( ' ' ).split( '\r' ).join( ' ' ).split( '\n' ).join( ' ' );
                } else {
                    text = text.split( '\r\n' ).join( '\n' ).split( '\r' ).join( '\n' );  // Normalize newlines.
                };
                // TODO: handle tabs here?
                chunks[ k ] = text;
                spans[ k << 1 ] = length;
                length += text.length;
                spans[ ( k++ << 1 ) | 1 ] = node;
            };
        };
    };

    walk( node );

    var text = chunks.join( '' );
    if( text.charAt( text.length - 1 ) === '\n' ){
        text = text.substr( 0, text.length - 1 );
    };

    return {
        sourceCode : text,
        spans      : spans
    };
};
