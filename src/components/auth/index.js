export const signup = userObj => {
  return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  }).then(res => {
    return res.json();
  });
};

export const signin = userObj => {
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  }).then(res => {
    return res.json();
  });
};

export const signOut = next => {
  if (window !== "undefined") {
    var currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
    localStorage.removeItem("jwt");
  }
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + currentJWT
    }
  })
    .then(response => {
      console.log("sign out status", response.status);
      return response;
    })
    .catch(e => console.log("Signout error: ", e));
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};
