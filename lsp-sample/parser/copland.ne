@lexer lexer

@{%
const lexer = require("./copland-lexer.js")
%}

# branch phrase is next to implement for precedence

copland -> initial_place _ at_phrase
	{%
		d => ({
			type: "copland",
			initial_place: d[0],
			at_phrase: d[2]
		})
	%}
	| at_phrase {% d => d[0] %}

initial_place -> %star _ places _ %colon {% 
  d => ({
    type: "initial_place",
    places: d[2]
  })
%}

places -> place _ (%comma _ place):* {% 
  d => [d[0], ...d[2].map(p => p[2])]
%}

at_phrase -> 
	%at _ place _ phrase {%
      d => ({
        type: "at",
        place: d[2],
        phrase: d[4]
      })
  %}
  | %at _ place _ %lbrack _ phrase _ %rbrack {%
    d => ({
      type: "at_bracket",
      place: d[2],
      phrase: d[6]
      })
  %}

phrase -> symbol _ place _ symbol {%
	d => ({
		type: "measurement",
		probe: d[0],
		place: d[2],
		target: d[4]
	})
	%}


symbol -> %identifier {% d => d[0].value %}

place -> symbol {% d => d[0] %}

_ -> %ws:* {% () => null %}



