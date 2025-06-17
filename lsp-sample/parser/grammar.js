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
    {"name": "copland", "symbols": ["phrase"], "postprocess": d => d[0]},
    {"name": "initial_place", "symbols": [(lexer.has("star") ? {type: "star"} : star), "_", "places", "_", (lexer.has("colon") ? {type: "colon"} : colon)], "postprocess":  
        d => ({
          type: "initial_place",
          places: d[2]
        })
        },
    {"name": "places$ebnf$1", "symbols": []},
    {"name": "places$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "place"]},
    {"name": "places$ebnf$1", "symbols": ["places$ebnf$1", "places$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "places", "symbols": ["place", "_", "places$ebnf$1"], "postprocess":  
        d => [d[0], ...d[2].map(p => p[2])]
        },
    {"name": "phrase", "symbols": ["at_phrase"], "postprocess": d => d[0]},
    {"name": "at_phrase", "symbols": [(lexer.has("at") ? {type: "at"} : at), "_", "place", "_", "phrase"], "postprocess": 
        d => ({
          type: "at",
          place: d[2],
          phrase: d[4]
        })
            },
    {"name": "at_phrase", "symbols": [(lexer.has("at") ? {type: "at"} : at), "_", "place", "_", (lexer.has("lbrack") ? {type: "lbrack"} : lbrack), "_", "phrase", "_", (lexer.has("rbrack") ? {type: "rbrack"} : rbrack)], "postprocess": 
        d => ({
          type: "at_bracket",
          place: d[2],
          phrase: d[6]
        })
            },
    {"name": "at_phrase", "symbols": ["branch_phrase"], "postprocess": d => d[0]},
    {"name": "branch_phrase", "symbols": ["sequence_phrase", "_", "branch_op", "_", "sequence_phrase"], "postprocess": 
              d => ({ type: "branch exp", 
              op: {
        type: d[2].type,
        value: d[2].value
        	  }, 
              left: d[0], 
              right: d[4] })
            },
    {"name": "branch_phrase", "symbols": ["sequence_phrase"], "postprocess": d => d[0]},
    {"name": "sequence_phrase", "symbols": ["base_phrase", "_", (lexer.has("arrow") ? {type: "arrow"} : arrow), "_", "sequence_phrase"], "postprocess": 
        d => ({ 
        type: "linear sequencing", 
        phraseL: d[0], 
        phraseR: d[4] })
            },
    {"name": "sequence_phrase", "symbols": ["base_phrase"], "postprocess": d => d[0]},
    {"name": "base_phrase", "symbols": [(lexer.has("at") ? {type: "at"} : at), "_", "place", "_", "phrase"], "postprocess": 
        d => ({
          type: "at",
          place: d[2],
          phrase: d[4]
        })
            },
    {"name": "base_phrase", "symbols": [(lexer.has("at") ? {type: "at"} : at), "_", "place", "_", (lexer.has("lbrack") ? {type: "lbrack"} : lbrack), "_", "phrase", "_", (lexer.has("rbrack") ? {type: "rbrack"} : rbrack)], "postprocess": 
        d => ({
          type: "at_bracket",
          place: d[2],
          phrase: d[6]
        })
            },
    {"name": "base_phrase", "symbols": ["symbol", "_", "place", "_", "symbol"], "postprocess": 
        d => ({
        	type: "measurement",
        	probe: d[0],
        	place: d[2],
        	target: d[4]
        })
        },
    {"name": "base_phrase", "symbols": [(lexer.has("null") ? {type: "null"} : null)], "postprocess": d => ({ type: "null" })},
    {"name": "base_phrase", "symbols": [(lexer.has("copy") ? {type: "copy"} : copy), "_", "symbol"], "postprocess": d => ({ type: "copy" })},
    {"name": "base_phrase", "symbols": [(lexer.has("sig") ? {type: "sig"} : sig), "_", "symbol"], "postprocess": d => ({ type: "signature" })},
    {"name": "base_phrase", "symbols": [(lexer.has("hash") ? {type: "hash"} : hash), "_", "symbol"], "postprocess": d => ({ type: "hash" })},
    {"name": "branch_op", "symbols": [(lexer.has("seq_branch") ? {type: "seq_branch"} : seq_branch)]},
    {"name": "branch_op", "symbols": [(lexer.has("par_branch") ? {type: "par_branch"} : par_branch)]},
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
