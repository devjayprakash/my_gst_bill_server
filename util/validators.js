let isEmpty = require("is-empty");

let validateSignup = (data) => {
  let problems = [];

  if (isEmpty(data.name)) {
    problems.push("No name provided");
  }
  if (isEmpty(data.password)) {
    problems.push("No password given");
  } else {
    if (data.password.length < 6) {
      problems.push("The length of the password cannnot be less than 6");
    }
  }
  if (isEmpty(data.email)) {
    problems.push("No email id provided");
  }
  if (isEmpty(data.phone)) {
    problems.push("No phone number provided");
  }

  if (problems.length !== 0) {
    return {
      problems,
      result: false,
    };
  } else {
    return {
      problems,
      result: true,
    };
  }
};

let signInValidator = (data) => {
  let problems = [];

  if (isEmpty(data.email)) {
    problems.push("Email not provided");
  }

  if (isEmpty(data.password)) {
    problems.push("No password provided");
  }

  if (problems.length !== 0) {
    return {
      result: false,
      problems,
    };
  } else {
    return {
      result: true,
      problems,
    };
  }
};

let validateTokenRequest = (data) => {
  let empty = isEmpty(data.token);

  return {
    result: !empty,
    problems: empty ? ["no token provided"] : [],
  };
};

let validateData = (data) => {
  let problems = [];

  if (isEmpty(data.data)) {
    problems.push("no data provided");
  }

  if (isEmpty(data.uid)) {
    problems.push("No user id provided");
  }

  if (problems.length !== 0) {
    return {
      result: false,
      problems,
    };
  } else {
    return {
      result: true,
      problems,
    };
  }
};

module.exports = {
  validateSignup,
  signInValidator,
  validateTokenRequest,
  validateData,
};
