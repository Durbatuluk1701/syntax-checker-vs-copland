const nearley = require("nearley");
const grammar = require("./coplandrr.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar),
	{ keepHistory: true }
);

// Parse something!
parser.feed("*p0: @p1 @p2 !");

// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results, null, 3));
console.log("possible parses: ", parser.results.length);