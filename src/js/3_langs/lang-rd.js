/**
 * @license
 * Copyright (C) 2012 Jeffrey Arnold
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Support for R documentation (Rd) files
 *
 * Minimal highlighting or Rd files, basically just highlighting
 * macros. It does not try to identify verbatim or R-like regions of
 * macros as that is too complicated for a lexer.  Descriptions of the
 * Rd format can be found
 * http://cran.r-project.org/doc/manuals/R-exts.html and
 * http://developer.r-project.org/parseRd.pdf.
 *
 * @author Jeffrey Arnold
 */
registerLangHandler(
    createSimpleLexer(
        [
            // whitespace
            [PR_PLAIN,   RegExpProxy( "^[\\t\\n\\r \\xA0]+" ), null, '\t\n\r \xA0'],
            // all comments begin with '%'
            [PR_COMMENT, RegExpProxy( "^%[^\\r\\n]*" ), null, '%']
        ],
        [// special macros with no args
            [PR_LITERAL, RegExpProxy( "^\\\\(?:cr|l?dots|R|tab)\\b" )],
	    // macros
            [PR_KEYWORD, RegExpProxy( "^\\\\[a-zA-Z@]+" )],
	    // highlighted as macros, since technically they are
            [PR_KEYWORD, RegExpProxy( "^#(?:ifn?def|endif)" )],
	    // catch escaped brackets
	    [PR_PLAIN, RegExpProxy( "^\\\\[{}]" )],
            // punctuation
            [PR_PUNCTUATION, RegExpProxy( "^[{}()\\[\\]]+" )]
        ]),
    ['Rd', 'rd']);
