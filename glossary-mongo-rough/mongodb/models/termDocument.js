const Definition = require("./definition");
const normalizeTerm = require("../utils/normalizeTerm");

const TermDocument = ({ word, tags, acronym, definitions, lecture }) => {
  let __definitions = [];

  for (const def of definitions) {
    if (typeof def === "string") {
      __definitions.push(Definition(def));
    } else if (typeof def === "object" && def.type === "term.definition") {
      __definitions.push(def);
    }
  }

  return {
    normalizedWord: normalizeTerm(word),
    word,
    tags,
    acronym,
    lecture,
    definitions: __definitions,
  };
};

module.exports = TermDocument;
