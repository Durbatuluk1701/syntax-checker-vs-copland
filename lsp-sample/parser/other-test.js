const nearley = require("nearley");
const grammar = require("./copland.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed("*p0: @p1 kim p2 ker -> ! -<- @p2 (vc p2 sys) -> !");

// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results, null, 3));
console.log("possible parses: ", parser.results.length);