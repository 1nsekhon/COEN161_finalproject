const API = {
    initialize: ()=> {

    },
    handleResponse: (response)=>{
        return response.ok ? response.json(): Promise.reject(response.status)
    },
    createUser: (name, email) =>{
        return fetch ("/user", {
            method: "POST", 
            body: JSON.stringify({
                name, 
                email,

            }),
            headers: {
                "Content-Type": "application/JSON"
            }
        })
        .then(API.handleResponse)
        .then((termResponse) => {
            Views.createUserElement(termResponse.name, termResponse.email);
          });

        
    }
}
API.initialize();