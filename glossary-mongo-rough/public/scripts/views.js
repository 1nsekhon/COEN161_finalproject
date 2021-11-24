const VIEWS = {
  initialize: () => {
    document.querySelector("#submit").addEventListener("click", VIEWS.onSubmit);
    document
      .querySelector("#term")
      .addEventListener("focus", (event) =>
        VIEWS.removeErrorState(event.currentTarget)
      );
    document
      .querySelector("#definition")
      .addEventListener("focus", (event) =>
        VIEWS.removeErrorState(event.currentTarget)
      );
    document
      .querySelector("#previous-page-button")
      .addEventListener("click", API.getPreviousPage);
    document
      .querySelector("#next-page-button")
      .addEventListener("click", API.getNextPage);

  },
  clearForm: () => {
    const termElement = document.querySelector("#term");
    const definitionElement = document.querySelector("#definition");

    termElement.value = "";
    definitionElement.value = "";
  },
  clearCurrentPage: () => {
    // If using document.querySelector('dl').children, you have to
    // convert it to an array first
    for (const child of document.querySelectorAll("dl > *")) {
      child.remove();
    }
  },
  createTermElement: (word, definition) => {
    const dataList = document.querySelector("dl");
    const dataTerm = document.createElement("dt");
    const dataDefinition = document.createElement("dd");

    dataTerm.textContent = word;
    dataDefinition.textContent = definition;

    dataList.appendChild(dataTerm);
    dataList.appendChild(dataDefinition);
  },
  setPaginationButtons: (pagination) => {
    document.querySelector("#next-page-button").disabled =
      !pagination.hasNextPage;
    document.querySelector("#previous-page-button").disabled =
      !pagination.hasPreviousPage;
  },
  addErrorState: (element) => {
    element.classList.add("error");
  },
  removeErrorState: (element) => {
    element.classList.remove("error");
  },
  onSubmit: (event) => {
    event.preventDefault();
    const termElement = document.querySelector("#term");
    const definitionElement = document.querySelector("#definition");

    const term = termElement.value.trim();
    const definition = definitionElement.value.trim();

    if (!term) {
      VIEWS.addErrorState(termElement);
    }

    if (!definition) {
      VIEWS.addErrorState(definitionElement);
    }

    if (term && definition) {
      API.createTerm(term, definition);
      VIEWS.createTermElement(term, definition);
    }
  },
};

VIEWS.initialize();
