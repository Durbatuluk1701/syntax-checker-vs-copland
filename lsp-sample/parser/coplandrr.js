// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require("./copland-lexer.js")



function unwrap(d) {
if (d === null) return null;
  return Array.isArray(d) && d.length === 1 ? d[0] : d;
}

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
    {"name": "phrase", "symbols": ["symbol", "_", "place", "_", "symbol", "_", "phrase0"], "postprocess": 
        d => ({
        	type: "measurement",
        	probe: d[0],
        	place: d[2],
        	target: d[4],
        	phrase0: unwrap(d[6])
        })
        	},
    {"name": "phrase", "symbols": [(lexer.has("sig") ? {type: "sig"} : sig), "_", "phrase0"], "postprocess": d => ({ type: "signature" })},
    {"name": "phrase", "symbols": [(lexer.has("at") ? {type: "at"} : at), "_", "place", "_", (lexer.has("lbrack") ? {type: "lbrack"} : lbrack), "_", "phrase", "_", (lexer.has("rbrack") ? {type: "rbrack"} : rbrack), "_", "phrase0"], "postprocess": 
        d => ({
        type: "at_bracket",
        place: d[2],
        phrase: d[6],
        derivation: "phrase -> at place bracket phrase phrase0"
        })
        	},
    {"name": "phrase", "symbols": [(lexer.has("at") ? {type: "at"} : at), "_", "place", "_", "phrase", "_", "phrase0"], "postprocess": 
        d => ({
        type: "at",
        place: d[2],
        phrase: unwrap(d[4]),
        derivation: "phrase -> at place phrase phrase0"
        })
        	},
    {"name": "phrase0", "symbols": []},
    {"name": "phrase0", "symbols": [(lexer.has("arrow") ? {type: "arrow"} : arrow), "_", "phrase", "_", "phrase0"], "postprocess": 
        d => ({ 
        type: "linear sequencing", 
        phrase: unwrap(d[2]), 
        phrase0: unwrap(d[4]),
        derivation: "phrase0 -> arrow phrase phrase0" })
        	},
    {"name": "phrase0", "symbols": ["branch_op", "_", "phrase", "_", "phrase0"], "postprocess": 
              d => ({ type: "branch exp", 
              op: {
        		    type: d[0].type,
        		    value: d[0].value
        }, 
              phrase: d[2], 
              phrase0: d[4],
              derivation: "phrase0 -> branch_op phrase phrase0"
            })
            },
    {"name": "symbol", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": d => d[0].value},
    {"name": "branch_op", "symbols": [(lexer.has("seq_branch") ? {type: "seq_branch"} : seq_branch)], "postprocess": d => ({type: "seq_branch", value: d[0].value})},
    {"name": "branch_op", "symbols": [(lexer.has("par_branch") ? {type: "par_branch"} : par_branch)], "postprocess": d => ({type: "par_branch", value: d[0].value})},
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
