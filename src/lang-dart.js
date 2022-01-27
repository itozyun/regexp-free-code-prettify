/**
 * @license
 * Copyright (C) 2013 Google Inc.
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
 * Registers a language handler Dart.
 * Loosely structured based on the DartLexer in Pygments: http://pygments.org/.
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-dart">(Dart code)</pre>
 *
 * @author armstrong.timothy@gmail.com
 */

PR['registerLangHandler'](
  PR['createSimpleLexer'](
    [
      // Whitespace.
      [PR['PR_PLAIN'], new RegExpCompat( "^[\\t\\n\\r \\xA0]+" ), null, '\t\n\r \xA0']
    ],
    [
      // Script tag.
      [PR['PR_COMMENT'], new RegExpCompat( "^#!(?:.*)" )],

      // `import`, `library`, `part of`, `part`, `as`, `show`, and `hide`
      // keywords.
      [PR['PR_KEYWORD'], new RegExpCompat( "^\\b(?:import|library|part of|part|as|show|hide)\\b", 'i' )],

      // Single-line comments.
      [PR['PR_COMMENT'], new RegExpCompat( "^\\/\\/(?:.*)" )],

      // Multiline comments.
      [PR['PR_COMMENT'], new RegExpCompat( "^\\/\\*[^*]*\\*+(?:[^\\/*][^*]*\\*+)*\\/" )], // */

      // `class` and `interface` keywords.
      [PR['PR_KEYWORD'], new RegExpCompat( "^\\b(?:class|interface)\\b", 'i' )],

      // General keywords.
      [PR['PR_KEYWORD'], new RegExpCompat( "^\\b(?:assert|async|await|break|case|catch|continue|default|do|else|finally|for|if|in|is|new|return|super|switch|sync|this|throw|try|while)\\b", 'i' )],

      // Declaration keywords.
      [PR['PR_KEYWORD'], new RegExpCompat( "^\\b(?:abstract|const|extends|factory|final|get|implements|native|operator|set|static|typedef|var)\\b", 'i' )],

      // Keywords for types.
      [PR['PR_TYPE'], new RegExpCompat( "^\\b(?:bool|double|Dynamic|int|num|Object|String|void)\\b", 'i' )],

      // Keywords for constants.
      [PR['PR_KEYWORD'], new RegExpCompat( "^\\b(?:false|null|true)\\b", 'i' )],

      // Multiline strings, single- and double-quoted.
      [PR['PR_STRING'], new RegExpCompat( "^r?[\\']{3}[\\s|\\S]*?[^\\\\][\\']{3}" )],
      [PR['PR_STRING'], new RegExpCompat( "^r?[\\\"]{3}[\\s|\\S]*?[^\\\\][\\\"]{3}" )],

      // Normal and raw strings, single- and double-quoted.
      [PR['PR_STRING'], new RegExpCompat( "^r?\\'(\\'|(?:[^\\n\\r\\f])*?[^\\\\]\\')" )],
      [PR['PR_STRING'], new RegExpCompat( "^r?\\\"(\\\"|(?:[^\\n\\r\\f])*?[^\\\\]\\\")" )],

      // Types are capitalized by convention.
      [PR['PR_TYPE'], new RegExpCompat( "^[A-Z]\\w*" )],

      // Identifiers.
      [PR['PR_PLAIN'], new RegExpCompat( "^[a-z_$][a-z0-9_]*", 'i' )],

      // Operators.
      [PR['PR_PUNCTUATION'], new RegExpCompat( "^[~!%^&*+=|?:<>/-]" )],

      // Hex numbers.
      [PR['PR_LITERAL'], new RegExpCompat( "^\\b0x[0-9a-f]+", 'i' )],

      // Decimal numbers.
      [PR['PR_LITERAL'], new RegExpCompat( "^\\b\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?", 'i' )],
      [PR['PR_LITERAL'], new RegExpCompat( "^\\b\\.\\d+(?:e[+-]?\\d+)?", 'i' )],

      // Punctuation.
      [PR['PR_PUNCTUATION'], new RegExpCompat( "^[(){}\\[\\],.;]" )]
    ]),
  ['dart']);
