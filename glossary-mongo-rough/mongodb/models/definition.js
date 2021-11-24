const Definition = (definition) => {
  return {
    __type: "term.definition",
    definition,
    upvotes: 0,
  };
};

module.exports = Definition;
