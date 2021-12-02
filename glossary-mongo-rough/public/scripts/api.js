const API = {
  currentOffset: 0,
  pageSize: 10,
  initialize: () => {
    API.listTerms(API.currentOffset);
  },
  handleResponse: (response) => {
    return response.ok ? response.json() : Promise.error(response.status);
  },
  listTerms: (offset) => {
    return fetch(`/terms?offset=${offset}`)
      .then(API.handleResponse)
      .then((termsResponse) => {
        for (const term of termsResponse.terms) {
          console.log("term", term);
          VIEWS.createTermElement(term.word, term.definition);
        }

        VIEWS.setPaginationButtons(termsResponse.pagination);
      });
  },
  createTerm: (word, definition) => {
    return fetch("/term", {
      method: "POST",
      body: JSON.stringify({
        word,
        definition,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(API.handleResponse)
      .then((termResponse) => {
        VIEWS.createTermElement(termResponse.word, termResponse.definition);
        VIEWS.clearForm();
      });
  },
  getPreviousPage: () => {
    const newOffset = Math.min(0, API.currentOffset - API.pageSize);

    VIEWS.clearCurrentPage();
    API.listTerms(newOffset).then(() => {
      API.currentOffset = newOffset;
    });
  },
  getNextPage: () => {
    const newOffset = API.currentOffset + API.pageSize;

    VIEWS.clearCurrentPage();
    API.listTerms(newOffset).then(() => {
      API.currentOffset = newOffset;
    });
  },
};

API.initialize();
