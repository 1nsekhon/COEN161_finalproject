const normalizeTerm = (word) => {
    return word.replace(/\%20/g, "-");
    //toLowerCase().replace(/ /g, "-").replace(/\%20/g, "-");
  };
  
  module.exports = normalizeTerm;