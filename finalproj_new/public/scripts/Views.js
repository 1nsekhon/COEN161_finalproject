const Views = {
    initialize: () =>{
       //document.getElement().addEventListener("click", API.createUser);
    document.querySelector("#submit").addEventListener("click", Views.onSubmit);

    },
    createUserElement: (name, email) => {
      if(!name){ return; }
      const dataList = document.querySelector("dl");
      const dataTerm = document.createElement("dt");
      const dataDefinition = document.createElement("dd");
      dataTerm.textContent = "Thanks, " + name.split(" ")[0] + "!";
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
          API.getUser(name);
        }
      },

};
Views.initialize();