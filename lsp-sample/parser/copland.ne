@lexer lexer

@{%
const lexer = require("./copland-lexer.js")
%}

copland -> initial_place _ phrase
	{%
		d => ({
			type: "copland",
			initial_place: d[0],
			phrase: d[2]
		})
	%}
	| phrase {% d => d[0] %}

initial_place -> %star _ places _ %colon {% 
  d => ({
    type: "initial_place",
    places: d[2]
  })
%}

places -> place _ (%comma _ place):* {% 
  d => [d[0], ...d[2].map(p => p[2])]
%}

# == PHRASE RULES ==

phrase -> at_phrase {% d => d[0] %}

at_phrase -> 
	%at _ place _ branch_phrase {%
      d => ({
        type: "at",
        place: d[2],
        phrase: unwrap(d[4]),
        derivation: "at_phrase -> at place branch_phrase"
      })
  %}
  | branch_phrase

branch_phrase -> 
    branch_phrase _ branch_op _ sequence_phrase {%
      d => ({ type: "branch exp", 
      op: {
		    type: d[2].type,
		    value: d[2].value
	  }, 
      branchLeft: d[0], 
      branchRight: d[4],
      derivation: "branch_phrase -> branch_phrase branch_op sequence_phrase"
    })
    %}
  | sequence_phrase {% d => d[0] %}

sequence_phrase ->
     terminal_phrase _ %arrow _ sequence_phrase {%
      d => ({ 
      type: "linear sequencing", 
      seqLeft: unwrap(d[0]), 
      seqRight: unwrap(d[4]) }),
      derivation: "sequence_phrase -> terminal_phrase arrow sequence_phrase"
    %}
  | terminal_phrase {% d => d[0] %}

terminal_phrase ->
  symbol _ place _ symbol {%
	d => ({
		type: "measurement",
		probe: d[0],
		place: d[2],
		target: d[4]
	})
	%}
  | %sig {% d => ({ type: "signature" }) %}
  | %at _ place _ %lbrack _ branch_phrase _ %rbrack {%
    d => ({
      type: "at_bracket",
      place: d[2],
      phrase: d[6],
      derivation: "terminal_phrase -> at place lbrack branch_phrase rbrack"
      })
  %}
  | %at _ place _ branch_phrase {%
      d => ({
        type: "at",
        place: d[2],
        phrase: unwrap(d[4]),
        derivation: "terminal_phrase -> at place branch_phrase"
      })
  %}
  | %lparen _ phrase _ %rparen {% d => d[2] %}


# == SUPPORT RULES ==
symbol -> %identifier {% d => d[0].value %}

branch_op ->
  %seq_branch {% d => ({type: "seq_branch", value: d[0].value}) %}
  | %par_branch {% d => ({type: "par_branch", value: d[0].value}) %}

place -> symbol {% d => d[0] %}

_ -> %ws:* {% () => null %}

@{%

function unwrap(d) {
  return Array.isArray(d) && d.length === 1 ? d[0] : d;
}

%}


