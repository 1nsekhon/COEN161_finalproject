const User = ({name, emailId}) => {
    return {
      __type: "User",
      name,
      emailId,
    };
  };
  
  module.exports = User;