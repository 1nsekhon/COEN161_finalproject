const Views = {
    initialize: () =>{
       //document.getElement().addEventListener("click", API.createUser);
    document.querySelector("#submit").addEventListener("click", Views.onSubmit);

    },
    createUserElement: (name, email) => {
      const dataList = document.querySelector("dl");
      const dataTerm = document.createElement("dt");
      const dataDefinition = document.createElement("dd");
      console.log("IN HERE");
      dataTerm.textContent = "Thanks, " + name + "!";
      //dataDefinition.textContent = email;

      dataList.appendChild(dataTerm);
  
      /*dataList.appendChild(dataTerm);
      dataList.appendChild(dataDefinition);*/
    },
    onSubmit: (event) => {
        event.preventDefault();
        const nameElement = document.querySelector("#name");
        const emailElement = document.querySelector("#email");
    
        const name = nameElement.value.trim();
        const email = emailElement.value.trim();
    
    
        if (name && email) {
          API.createUser(name, email);
          Views.createUserElement(name, email);
        }
      },

};
Views.initialize();