/**
 * Breaks {@code job.sourceCode} around style boundaries in
 * {@code job.decorations} and modifies {@code job.sourceNode} in place.
 * @private
 */
m_recombineTagsAndDecorations = function(){
    var job = currentJob;
    var source = job.sourceCode;
    var sourceLength = source.length;
    // Index into source after the last code-unit recombined.
    var sourceIndex = 0;

    var spans = job.spans;
    var nSpans = spans.length;
    // Index into spans after the last span which ends at or before sourceIndex.
    var spanIndex = 0;

    var decorations = /** @type {!DecorationsT} */ (job.decorations);
    var nDecorations = decorations.length;
    // Index into decorations after the last decoration which ends at or before
    // sourceIndex.
    var decorationIndex = 0;

    // Remove all zero-length decorations.
    decorations[ nDecorations ] = sourceLength;
    var decPos, i;
    for( i = decPos = 0; i < nDecorations; ){
        if( decorations[ i ] !== decorations[ i + 2 ] ){
            decorations[ decPos++ ] = decorations[ i++ ];
            decorations[ decPos++ ] = decorations[ i++ ];
        } else {
            i += 2;
        };
    };
    nDecorations = decPos;

    // Simplify decorations.
    for( i = decPos = 0; i < nDecorations; ){
        var startPos = decorations[ i ];
        // Conflate all adjacent decorations that use the same style.
        var startDec = decorations[ i + 1 ];
        var end = i + 2;
        while( end + 2 <= nDecorations && decorations[ end + 1 ] === startDec ){
            end += 2;
        };
        decorations[ decPos++ ] = startPos;
        decorations[ decPos++ ] = startDec;
        i = end;
    };

    nDecorations = decorations.length = decPos;

    var sourceNode = job.sourceNode;
    var oldDisplay = '';
    if( sourceNode ){
        oldDisplay = sourceNode.style.display;
        p_DOM_setStyle( sourceNode, 'display', 'none' );
    };
    // try {
    //  var decoration = null;
    while( spanIndex < nSpans ){
        // var spanStart = spans[ spanIndex ];
        var spanEnd = /** @type {number} */ (spans[ spanIndex + 2 ]) || sourceLength;

        var decEnd = decorations[ decorationIndex + 2 ] || sourceLength;

        var end = Math.min( spanEnd, decEnd );

        var textNode = /** @type {!Node} */ (spans[ spanIndex + 1 ]);
        var styledText;
        if( textNode.nodeType !== 1  // Don't muck with <BR>s or <LI>s
            // Don't introduce spans around empty text nodes.
            && ( styledText = source.substring( sourceIndex, end ) )
        ){
            // This may seem bizarre, and it is.  Emitting LF on IE causes the
            // code to display with spaces instead of line breaks.
            // Emitting Windows standard issue linebreaks (CRLF) causes a blank
            // space to appear at the beginning of every line but the first.
            // Emitting an old Mac OS 9 line separator makes everything spiffy.
            //   これは奇妙に思えるかもしれませんし、実際そうなのです。
            //   IE で LF を出すと、コードが改行されずにスペースで表示されます。
            //   Windows 標準の改行（CRLF）を出すと、先頭以外のすべての行の先頭に空白が表示されます。
            //   Mac OS 9 時代の古いラインセパレータを使うと、すべてがピッカピカになります。
            if( p_Trident < 9 ){
                styledText = styledText.split( '\n' ).join( '\r' );
            };
            var span = p_DOM_insertElementBefore( textNode, 'span', { className : storeClasses[ /** @type {number} */ (decorations[ decorationIndex + 1 ]) ] }, styledText );
            p_DOM_remove( textNode );

            if( sourceIndex < spanEnd ){  // Split off a text node.
                spans[ spanIndex + 1 ] = textNode
                    // TODO: Possibly optimize by using '' if there's no flicker.
                    = p_DOM_insertTextNodeAfter( span, source.substring( end, spanEnd ) );
            };
        };

        sourceIndex = end;

        if( sourceIndex >= spanEnd ){
            spanIndex += 2;
        };
        if( sourceIndex >= decEnd ){
            decorationIndex += 2;
        };
    };
    // } finally {
    if( sourceNode ){
        p_DOM_setStyle( sourceNode, 'display', oldDisplay );
    };
    //}

    currentJob = undefined;
    // finish up in a continuation
    m_graduallyPrettify( m_applyPrettifyElementOne, undefined, TASK_IS_UPDATE_DOM, true );
};