let addToy = false;
const form = document.querySelector(".add-toy-form");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", (event) => {
        event.preventDefault();
        postToy(event.target);
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
const div = document.querySelector("#toy-collection");

fetch("http://localhost:3000/toys", (options = {}))
  .then((resp) => resp.json())
  .then((toys) => {
    toys.forEach(makeToy);
  });

function makeToy(toy) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let hTag = document.createElement("h2");
  hTag.textContent = toy.name;

  let image = document.createElement("img");
  image.src = toy.image;
  image.setAttribute("class", "toy-avatar");

  let likes = document.createElement("p");
  likes.textContent = `${toy.likes} likes`;

  let btn = document.createElement("button");
  btn.setAttribute("class", "like-btn");
  btn.setAttribute("id", toy.id);
  btn.innerText = "like";
  btn.addEventListener("click", (e) => {
    console.log(e);
    likesTest(e);
  });

  card.append(hTag, image, likes, btn);
  div.append(card);
}

function postToy(toy_data) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: toy_data.name.value,
      image: toy_data.image.value,
      likes: 0,
    }),
  })
    .then((res) => res.json())
    .then((new_toy) => {
      makeToy(new_toy);
    });
}
function likesTest(e) {
  e.preventDefault();
  let more = parseInt(e.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: more,
    }),
  })
    .then((res) => res.json())
    .then((like_obj) => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    });
}
