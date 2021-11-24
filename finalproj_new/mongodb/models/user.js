const User = ({name, email}) => {
    return {
      __type: "User",
      name,
      email
    };
  };
  
  module.exports = User;