const nearley = require("nearley");
const grammar = require("./copland.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar),
	{ keepHistory: true }
);

// Parse something!
parser.feed("*p0, n : @ p1 [meas p2 sys] -> @ p1 [meas p2 targ] -<+ (asp p3 test +~+ asp p4 test) -> (@ p4 [meas p5 test1 -> meas p5 test2])");

// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results, null, 3));
console.log("possible parses: ", parser.results.length);
console.log(parser.table)