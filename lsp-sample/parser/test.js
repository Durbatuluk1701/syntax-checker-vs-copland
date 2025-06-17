const nearley = require("nearley");
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed("*p0, vc: @ p3 meas p2 sys -> @ p1 [meas p2 targ]");

// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results, null, 3));
console.log("possible parses: ", parser.results.length);