@lexer lexer

@{%
const lexer = require("./copland-lexer.js")
%}

# warning: be wary of whitespaces. observe carefully
# to do: phrases
copland -> initial_place _ phrase {% 
  d => ({ 
    type: "copland", 
    initial_place: d[0], 
    phrase: d[2] 
  }) 
%}

initial_place -> %star _ places _ %colon {% 
  d => ({
    type: "initial_place",
    places: d[2]
  })
%}

# to do: places delimited by spaces
places -> place _ (%comma _ place _):* {% 
  d => [d[0], ...d[2].map(p => p[2])]
%}

phrase -> symbol _ place _ symbol {%
  d => ({
    type: "measurement",
    probe: d[0],
    place: d[2],
    target: d[4]
  })
%}
  | %null {% d => ({ type: "null" }) %}
  | %copy _ symbol {% d => ({ type: "copy" }) %}
  | %sig _ symbol  {% d => ({ type: "signature" }) %}
  | %hash _ symbol {% d => ({ type: "hash" }) %}
  | %at _ place _ phrase {%
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
  # to do: ignoring first phrase term after initial_place in test phrase
  | phrase _ %arrow _ phrase {%
	d => ({
		type: "linear sequencing",
		phrase: d[0],
		phrase: d[4]
	})
  %}

symbol -> %identifier {% d => d[0].value %}

place -> symbol {% d => d[0] %}

_ -> %ws:* {% () => null %}
