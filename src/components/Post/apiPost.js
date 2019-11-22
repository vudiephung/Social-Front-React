export const getPostById = async id => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`);
  const data = await response.json();
  return data;
};

export const getAllPosts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
  const data = await response.json();
  return data;
};

export const getAllPostsFromUser = async () => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/me/posts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + currentJWT
    }
  });
  const data = await response.json();
  return data;
};

export const create = async postObj => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/me/post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + currentJWT
    },
    body: JSON.stringify(postObj)
  });
  const data = await response.json();
  return data;
};

export const update = async (postId, postObj) => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  //console.log(postId, JSON.stringify(postObj));
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/me/posts/${postId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentJWT
      },
      body: JSON.stringify(postObj)
    }
  );
  const data = await response.json();
  return data;
};

export const remove = async postId => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/me/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + currentJWT
      }
    }
  );
  const data = response.json();
  return data;
};

export const uploadPhoto = async (postFormData, postId) => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/me/posts/upload/${postId}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + currentJWT
      },
      body: postFormData
    }
  );
  const data = await response.json();
  return data;
};

export const getOwnerDetails = async postId => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/owner`
  );
  const data = await response.json();
  return data;
};

export const getAllPostsFromFollowedUsers = async me => {};

export const like = async postId => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentJWT
      }
    }
  );
  const data = await response.json();
  return data;
};

export const dislike = async postId => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/dislike`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentJWT
      }
    }
  );
  const data = await response.json();
  return data;
};

export const comment = async (postId, comment) => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/comment`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentJWT
      },
      body: JSON.stringify({ comment })
    }
  );
  const data = await response.json();
  return data;
};

export const uncomment = async (postId, comment) => {
  const currentJWT = JSON.parse(localStorage.getItem("jwt")).token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/uncomment`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentJWT
      },
      body: JSON.stringify({ comment })
    }
  );
  const data = await response.json();
  return data;
};
