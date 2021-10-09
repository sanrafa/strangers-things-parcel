export const API_URL =
  "https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/";

export async function fetchAllPosts(token) {
  if (!token) {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

export async function sendMessage(postID, token, msg) {
  try {
    const response = await fetch(`${API_URL}/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: msg,
        },
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function makeNewPost(token, postObj) {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: postObj }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(postID, token) {
  try {
    const response = await fetch(`${API_URL}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function editPost(token, postID, postObj) {
  try {
    const response = await fetch(`${API_URL}/posts/${postID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: postObj,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function registerNewUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserInfo(token) {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getLoggedInUser(token) {
  try {
    const response = await fetch(`${API_URL}/test/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const username = data.data.user.username;
    return username;
  } catch (err) {
    console.error(err);
  }
}
