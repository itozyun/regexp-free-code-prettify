/**
 * @license
 * Copyright (C) 2013 Eric Knibbe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for Lasso. <http://www.lassosoft.com>
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then enclose your code in an HTML tag like so:
 *      <pre class="prettyprint lang-lasso">[your Lasso code]</pre>
 *
 * @author Eric Knibbe
 */

registerLangHandler(
    createSimpleLexer(
        [
          // whitespace
          [PR_PLAIN,        RegExpProxy( "^[\\t\\n\\r \\xA0]+" ), null, '\t\n\r \xA0'],
          // single quote strings
          [PR_STRING,       RegExpProxy( "^\\'[^\\'\\\\]*(?:\\\\[\\s\\S][^\\'\\\\]*)*(?:\\'|$)" ), null, "'"],
          // double quote strings
          [PR_STRING,       RegExpProxy( "^\\\"[^\\\"\\\\]*(?:\\\\[\\s\\S][^\\\"\\\\]*)*(?:\\\"|$)" ), null, '"'],
          // ticked strings
          [PR_STRING,       RegExpProxy( "^\\`[^\\`]*(?:\\`|$)" ), null, '`'],
          // numeral as integer or hexidecimal
          [PR_LITERAL,      RegExpProxy( "^0x[\\da-f]+|\\d+", 'i' ), null, '0123456789'],
          // local or thread variables, or hashbang
          [PR_ATTRIB_NAME,  RegExpProxy("^[#$][a-z_][\\w.]*|#\\d+\\b|#![ \\S]+lasso9\\b", 'i' ), null, '#$']
        ],
        [
          // square or angle bracket delimiters
          [PR_TAG,          RegExpProxy( "^[[\\]]|<\\?(?:lasso(?:script)?|=)|\\?>|(no_square_brackets|noprocess)\\b", 'i' )],
          // single-line or block comments
          [PR_COMMENT,      RegExpProxy( "^\\/\\/[^\\r\\n]*|\\/\\*[\\s\\S]*?\\*\\/" )],
          // member variables or keyword parameters
          [PR_ATTRIB_NAME,  RegExpProxy( "^-(?!infinity)[a-z_][\\w.]*|\\.\\s*'[a-z_][\\w.]*'|\\.{3}", 'i' )],
          // numeral as decimal or scientific notation
          [PR_LITERAL,      RegExpProxy( "^\\d*\\.\\d+(?:e[-+]?\\d+)?|(infinity|NaN)\\b", 'i' )],
          // tag literals
          [PR_ATTRIB_VALUE, RegExpProxy( "^::\\s*[a-z_][\\w.]*", 'i' )],
          // constants
          [PR_LITERAL,      RegExpProxy( "^(?:true|false|none|minimal|full|all|void|and|or|not|bw|nbw|ew|new|cn|ncn|lt|lte|gt|gte|eq|neq|rx|nrx|ft)\\b", 'i' )],
          // standard type or variable declarations
          [PR_TYPE,         RegExpProxy( "^(?:array|date|decimal|duration|integer|map|pair|string|tag|xml|null|boolean|bytes|keyword|list|locale|queue|set|stack|staticarray|local|var|variable|global|data|self|inherited|currentcapture|givenblock)\\b|^\\.\\.?", 'i' )],
          // container or control keywords
          [PR_KEYWORD,      RegExpProxy( "^(?:cache|database_names|database_schemanames|database_tablenames|define_tag|define_type|email_batch|encode_set|html_comment|handle|handle_error|header|if|inline|iterate|ljax_target|link|link_currentaction|link_currentgroup|link_currentrecord|link_detail|link_firstgroup|link_firstrecord|link_lastgroup|link_lastrecord|link_nextgroup|link_nextrecord|link_prevgroup|link_prevrecord|log|loop|namespace_using|output_none|portal|private|protect|records|referer|referrer|repeating|resultset|rows|search_args|search_arguments|select|sort_args|sort_arguments|thread_atomic|value_list|while|abort|case|else|fail_if|fail_ifnot|fail|if_empty|if_false|if_null|if_true|loop_abort|loop_continue|loop_count|params|params_up|return|return_value|run_children|soap_definetag|soap_lastrequest|soap_lastresponse|tag_name|ascending|average|by|define|descending|do|equals|frozen|group|handle_failure|import|in|into|join|let|match|max|min|on|order|parent|protected|provide|public|require|returnhome|skip|split_thread|sum|take|thread|to|trait|type|where|with|yield|yieldhome)\\b", 'i' )],
          // type, method, or parameter names
          [PR_PLAIN,        RegExpProxy( "^[a-z_][\\w.]*(?:=\\s*(?=\\())?", 'i' )],
          // operators
          [PR_PUNCTUATION,  RegExpProxy( "^:=|[-+*\\/%=<>&|!?\\\\]+" )]
        ]),
    ['lasso', 'ls', 'lassoscript']);
