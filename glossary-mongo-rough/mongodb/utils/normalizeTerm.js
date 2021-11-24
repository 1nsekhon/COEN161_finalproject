const normalizeTerm = (word) => {
  return word.toLowerCase().replace(/ /g, "-").replace(/\%20/g, "-");
};

module.exports = normalizeTerm;
