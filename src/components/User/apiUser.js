export const fetchUserById = async userId => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}`
  );
  const data = await response.json();
  return data;
};

export const listAllUsers = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
  const data = await response.json();
  return data;
};

export const remove = async () => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + currentJWT
    }
  });
  const data = await response.json();
  return data;
};

// export const uploadAvatar = async user => {
//   const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
//   const response = await fetch(
//     `${process.env.REACT_APP_API_URL}/users/me/avatar`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + currentJWT
//       },
//       body: user
//     }
//   );
//   const data = await response.json();
//   return data;
// };

export const updateUser = async user => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + currentJWT
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  console.log("from updateuser", data);
  return data;
};

export const follow = async followId => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/follow`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentJWT
      },
      body: JSON.stringify({ followId })
    }
  );
  const data = await response.json();
  return data;
};

export const unfollow = async unfollowId => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/unfollow`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentJWT
      },
      body: JSON.stringify({ unfollowId })
    }
  );
  const data = await response.json();
  return data;
};

export const getFollowStatus = async userId => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}/followStatus`
  );
  const data = await response.json();
  return data;
};

export const findUserToFollow = async () => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/findUserToFollow`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + currentJWT
      }
    }
  );
  const data = await response.json();
  return data;
};

export const getAllPostsByUser = async userId => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/${userId}/posts`
  );
  const data = await response.json();
  return data;
};
