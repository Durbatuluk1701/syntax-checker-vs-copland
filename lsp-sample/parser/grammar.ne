@lexer lexer

@{%
const lexer = require("./copland-lexer.js")
%}

# warning: be wary of whitespaces. observe carefully
# to do: fix parentheses?
# to do: fix sig, hash, null, etc
# to do: make everything indented properly
# to do: fix operator in branch

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

phrase -> branch_phrase {% d => d[0] %}

branch_phrase ->
    sequence_phrase _ branch_op _ sequence_phrase {%
      d => ({ type: "branch exp", 
      op: {
		    type: d[2].type,
		    value: d[2].value
	  }, 
      branchLeft: d[0], 
      branchRight: d[4] })
    %}
  | sequence_phrase {% d => d[0] %}

sequence_phrase ->
    unary_phrase _ %arrow _ sequence_phrase {%
      d => ({ 
      type: "linear sequencing", 
      seqLeft: d[0], 
      seqRight: d[4] })
    %}
  | unary_phrase {% d => d[0] %}

unary_phrase ->
    %null {% d => ({ type: "null" }) %}
  | %null _ unary_phrase {% d => ({ type: "null" }) %}
  | %copy {% d => ({ type: "copy" }) %}
  | %copy _ unary_phrase {% d => ({ type: "copy" }) %}
  | %sig {% d => ({ type: "signature" }) %}
  | %sig _ unary_phrase {% d => ({ type: "signature" }) %}
  | %hash {% d => ({ type: "hash" }) %}
  | %hash _ unary_phrase {% d => ({ type: "hash" }) %}
  | base_phrase

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
  | %lparen _ phrase _ %rparen {% d => d[2] %}

# +=== SUPPORT RULES ===+

branch_op ->
  %seq_branch
  | %par_branch

symbol -> %identifier {% d => d[0].value %}

place -> symbol {% d => d[0] %}

_ -> %ws:* {% () => null %}
