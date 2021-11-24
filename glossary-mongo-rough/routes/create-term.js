const validate = require("./utils/validate");
const readBody = require("./utils/readBody");
const sendResponse = require("./utils/sendResponse");

const createTerm = (req, res) => {
  return readBody(req).then((requestBody) => {
    const body = JSON.parse(requestBody);

    if (!body.word || !body.definition) {
      return sendResponse(
        res,
        400,
        `Must include both a word and definition field in Create request`
      );
    }

    const term = {
      word: body.word,
      definitions: [body.definition],
    };

    if (body.tags) {
      if (validate.isTagsArray(body.tags)) {
        term.tags = body.tags;
      } else {
        return sendResponse(
          res,
          400,
          "tags field must be an array of sttrinigs"
        );
      }
    }

    if (body.lecture) {
      const lecture = parseInt(body.lecture, 10);
      if (validate.isLecture(lecture)) {
        term.lecture = body.lecture || null;
      } else {
        return sendResponse(
          res,
          400,
          "lecture field must be a number between 0 and 20 if included"
        );
      }
    }

    if (body.acronym) {
      if (validate.isString(body.acronym)) {
        term.acronym = acronym;
      } else {
        return sendResponse(res, 400, "acrnoym field must be a string");
      }
    }
    
    return req.app.db.createTerm(term).then((newTerm) => {
      return sendResponse(res, 201, JSON.stringify(newTerm));
    });
  });
};

module.exports = createTerm;
