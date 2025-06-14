// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require("./copland-lexer.js")
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "copland", "symbols": ["initial_place", "_", "phrase"], "postprocess":  
        d => ({ 
          type: "copland", 
          initial_place: d[0], 
          phrase: d[2] 
        }) 
        },
    {"name": "initial_place", "symbols": [(lexer.has("star") ? {type: "star"} : star), "_", "places", "_", (lexer.has("colon") ? {type: "colon"} : colon)], "postprocess":  
        d => ({
          type: "initial_place",
          places: d[2]
        })
        },
    {"name": "places$ebnf$1", "symbols": []},
    {"name": "places$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "place", "_"]},
    {"name": "places$ebnf$1", "symbols": ["places$ebnf$1", "places$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "places", "symbols": ["place", "_", "places$ebnf$1"], "postprocess":  
        d => [d[0], ...d[2].map(p => p[2])]
        },
    {"name": "phrase", "symbols": ["symbol", "_", "place", "_", "symbol"], "postprocess": 
        d => ({
          type: "measurement",
          probe: d[0],
          place: d[2],
          target: d[4]
        })
        },
    {"name": "phrase", "symbols": [(lexer.has("null") ? {type: "null"} : null)], "postprocess": d => ({ type: "null" })},
    {"name": "phrase", "symbols": [(lexer.has("copy") ? {type: "copy"} : copy), "_", "symbol"], "postprocess": d => ({ type: "copy" })},
    {"name": "phrase", "symbols": [(lexer.has("sig") ? {type: "sig"} : sig), "_", "symbol"], "postprocess": d => ({ type: "signature" })},
    {"name": "phrase", "symbols": [(lexer.has("hash") ? {type: "hash"} : hash), "_", "symbol"], "postprocess": d => ({ type: "hash" })},
    {"name": "phrase", "symbols": [(lexer.has("at") ? {type: "at"} : at), "_", "place", "_", "phrase"], "postprocess": 
        d => ({
          type: "at",
          place: d[2],
          phrase: d[4]
        })
          },
    {"name": "phrase", "symbols": [(lexer.has("at") ? {type: "at"} : at), "_", "place", "_", (lexer.has("lbrack") ? {type: "lbrack"} : lbrack), "_", "phrase", "_", (lexer.has("rbrack") ? {type: "rbrack"} : rbrack)], "postprocess": 
        d => ({
          type: "at_bracket",
          place: d[2],
          phrase: d[6]
        })
          },
    {"name": "phrase", "symbols": ["phrase", "_", (lexer.has("arrow") ? {type: "arrow"} : arrow), "_", "phrase"], "postprocess": 
        d => ({
        	type: "linear sequencing",
        	phrase: d[0],
        	phrase: d[4]
        })
          },
    {"name": "symbol", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": d => d[0].value},
    {"name": "place", "symbols": ["symbol"], "postprocess": d => d[0]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "copland"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
