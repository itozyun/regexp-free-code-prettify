/**
 * @license
 * Copyright (C) 2013 Peter Kofler
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

// Contributed by peter dot kofler at code minus cop dot org

/**
 * @fileoverview
 * Registers a language handler for (Turbo) Pascal.
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-pascal">(my Pascal code)</pre>
 *
 * @author peter dot kofler at code minus cop dot org
 */

registerLangHandler(
    createSimpleLexer(
        [ // shortcutStylePatterns
          // 'single-line-string'
          [PR_STRING,        RegExpProxy( "^(?:\\'(?:[^\\\\\\'\\r\\n]|\\\\.)*(?:\\'|$))" ), null, '\''],
          // Whitespace
          [PR_PLAIN,         RegExpProxy( "^\\s+" ), null, ' \r\n\t\xA0']
        ],
        [ // fallthroughStylePatterns
          // A cStyleComments comment (* *) or {}
          [PR_COMMENT,       RegExpProxy( "^\\(\\*[\\s\\S]*?(?:\\*\\)|$)|^\\{[\\s\\S]*?(?:\\}|$)" ), null],
          [PR_KEYWORD,       RegExpProxy( "^(?:ABSOLUTE|AND|ARRAY|ASM|ASSEMBLER|BEGIN|CASE|CONST|CONSTRUCTOR|DESTRUCTOR|DIV|DO|DOWNTO|ELSE|END|EXTERNAL|FOR|FORWARD|FUNCTION|GOTO|IF|IMPLEMENTATION|IN|INLINE|INTERFACE|INTERRUPT|LABEL|MOD|NOT|OBJECT|OF|OR|PACKED|PROCEDURE|PROGRAM|RECORD|REPEAT|SET|SHL|SHR|THEN|TO|TYPE|UNIT|UNTIL|USES|VAR|VIRTUAL|WHILE|WITH|XOR)\\b", 'i' ), null],
          [PR_LITERAL,       RegExpProxy( "^(?:true|false|self|nil)", 'i' ), null],
          [PR_PLAIN,         RegExpProxy( "^[a-z][a-z0-9]*", 'i' ), null],
          // Literals .0, 0, 0.0 0E13
          [PR_LITERAL,       RegExpProxy( "^(?:\\$[a-f0-9]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+\\-]?\\d+)?)", 'i' ),  null, '0123456789'],
          [PR_PUNCTUATION,   RegExpProxy( "^.[^\\s\\w\\.$@\\'\\/]*" ), null]
        ]),
    ['pascal']);
