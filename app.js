const MOCK_API = "https://jsonplaceholder.typicode.com";

// Retrieves posts for a specific user from API
const getUserPosts = async (userId) => {
  const postsResponse = await fetch(`${MOCK_API}/posts?userId=${userId}`);
  const posts = await postsResponse.json();
  return posts;
};

// Retrieves all users from API
const getAllUsers = async () => {
  const usersResponse = await fetch(`${MOCK_API}/users`);
  const users = await usersResponse.json();
  return users;
};

// Renders user cards to the page on load
const initializeUsers = async () => {
  let users = null;
  try {
    users = await getAllUsers();
  } catch (error) {
    usersTableBody.textContent = "error: " + error;
  }
  createUserCards(users);
};

// Creates a card for each user
const createUserCards = (userData) => {
  const userCard = document.querySelector(".users-table-body");
  for (user of userData) {
    const currentUser = user;
    const userRow = document.createElement("tr");
    userRow.addEventListener("click", () => displayPosts(currentUser));
    userRow.innerHTML = `<td>${user.name}</td>
    <td>${user.phone}</td>
    <td>${user.username}</td>
    <td>${user.website}</td>
    <td>${user.company.name}</td>`;
    userCard.append(userRow);
  }
};

// Creates DOM for an indiviual post
const createPost = (post) => {
  let postHTML = ``;
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");
  postHTML += `<h3>${post.title}</h3>
    <p>${post.body}</p>`;
  postCard.innerHTML = postHTML;
  return postCard;
};

const displayPosts = async (user) => {
  let posts = null;
  try {
    posts = await getUserPosts(user.id);
  } catch (error) {
    console.error(error);
  }

  const modal = document.querySelector("#posts-modal");
  const modalHeader = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");

  const modalHeaderHTML = `<h2>${user.username}'s Posts</h2>`;
  modalHeader.innerHTML = modalHeaderHTML;

  removeAllChildNodes(modalBody);

  for (post of posts) {
    modalBody.append(createPost(post));
  }

  const close = document.querySelector(".close");
  modal.style.display = "block";

  close.onclick = () => (modal.style.display = "none");
};

// Clears child nodes so that posts dont accumulate when clicking between users
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

initializeUsers();
