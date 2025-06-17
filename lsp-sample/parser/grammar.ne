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
	| phrase {% d => d[0] %}

initial_place -> %star _ places _ %colon {% 
  d => ({
    type: "initial_place",
    places: d[2]
  })
%}

# to do: places delimited by spaces
places -> place _ (%comma _ place):* {% 
  d => [d[0], ...d[2].map(p => p[2])]
%}

# +=== PHRASE RULES ===+

phrase -> at_phrase {% d => d[0] %}
		# | %lparen _ phrase _ %rparen {% d => d[2] %}

at_phrase -> %at _ place _ phrase {%
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
  
  | branch_phrase {% d => d[0] %}

branch_phrase ->
    sequence_phrase _ branch_op _ sequence_phrase {%
      d => ({ type: "branch exp", 
      op: {
		type: d[2].type,
		value: d[2].value
	  }, 
      left: d[0], 
      right: d[4] })
    %}
  | sequence_phrase {% d => d[0] %}

sequence_phrase ->
    base_phrase _ %arrow _ sequence_phrase {%
      d => ({ 
      type: "linear sequencing", 
      phraseL: d[0], 
      phraseR: d[4] })
    %}
  | base_phrase {% d => d[0] %}


base_phrase ->
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
	| symbol _ place _ symbol {%
	d => ({
		type: "measurement",
		probe: d[0],
		place: d[2],
		target: d[4]
	})
	%}
  | %null {% d => ({ type: "null" }) %}
  | %copy _ symbol {% d => ({ type: "copy" }) %}
  | %sig _ symbol {% d => ({ type: "signature" }) %}
  | %hash _ symbol {% d => ({ type: "hash" }) %}

# +=== SUPPORT RULES ===+

branch_op ->
  %seq_branch
  | %par_branch

symbol -> %identifier {% d => d[0].value %}

place -> symbol {% d => d[0] %}

_ -> %ws:* {% () => null %}
