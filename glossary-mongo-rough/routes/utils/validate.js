const validate = {
  isString: (str) => typeof str === "string",
  isTagsArray: (tags) =>
    !Array.isArray(tags) || !tags.every((tag) => typeof tag === "string"),
  isLecture: (lecture) => {
    return !isNaN(lecture) && lecture > 0 && lecture < 20;
  },
};

module.exports = validate;
