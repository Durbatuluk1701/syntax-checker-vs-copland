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

phrase ->  
	symbol _ place _ symbol _ phrase0 {%
		d => ({
			type: "measurement",
			probe: d[0],
			place: d[2],
			target: d[4],
			phrase0: unwrap(d[6])
		})
	%}
	| %sig _ phrase0 {% d => ({ type: "signature" }) %}
	| %at _ place _ %lbrack _ phrase _ %rbrack _ phrase0:? {%
		d => ({
		type: "at_bracket",
		place: d[2],
		phrase: d[6],
		derivation: "phrase -> at place bracket phrase phrase0"
		})
	%}
	| %lparen _ phrase _ %rparen _ phrase0 {% d => d[2] %}

phrase0 -> null
	| %arrow _ phrase _ phrase0 {%
		d => ({ 
		type: "linear sequencing", 
		phrase: unwrap(d[2]), 
		phrase0: unwrap(d[4]),
		derivation: "phrase0 -> arrow phrase phrase0" })
	%}
	| branch_op _ phrase _ phrase0 {%
      d => ({ type: "branch exp", 
      op: {
		    type: d[0].type,
		    value: d[0].value
	  }, 
      phrase: d[2], 
      phrase0: d[4],
      derivation: "phrase0 -> branch_op phrase phrase0"
    })
    %}
# == SUPPORT RULES ==
symbol -> %identifier {% d => d[0].value %}

branch_op ->
   %seq_branch {% d => ({type: "seq_branch", value: d[0].value}) %}
  | %par_branch {% d => ({type: "par_branch", value: d[0].value}) %}

place -> symbol {% d => d[0] %}

_ -> %ws:* {% () => null %}

@{%

function unwrap(d) {
if (d === null) return null;
  return Array.isArray(d) && d.length === 1 ? d[0] : d;
}

%}