const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
toyForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let name = document.getElementsByName("name")[0].value
  let image = document.getElementsByName("image")[0].value
  submitData(name, image)
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

document.getElementById("toy-collection").addEventListener("click", function (e) {
  // e.target is our targetted element.
  // try doing console.log(e.target.nodeName), it will result LI
  if (e.target && e.target.nodeName == "BUTTON") {
    let newLikes = parseInt(e.target.parentElement.querySelector("p").innerHTML.split(" ")[0]) + 1
    e.target.parentElement.querySelector("p").innerHTML = newLikes + " Likes"
    // console.log(e.target.getAttribute("toyid"))
    updateLikes(newLikes, e.target.getAttribute("toyid"))
  }
});

// OR HERE!
function updateLikes(newLikes, toyid) {
  let formData = {
    likes: newLikes
  };


  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch(`http://localhost:3000/toys/${toyid}`, configObj)
    .then(function (response) {
      return response.json();
    })
    .then(function (object) {


    })
    .catch(function (error) {


    });
}
document.addEventListener('DOMContentLoaded', function () {
  fetchToys()
});


function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => addToCard(json));
}

function addToCard(json) {
  json.forEach(toy => {
    showCard(toy)
  })
}

function showCard(toy) {
  const list = document.getElementById("toy-collection")

  list.innerHTML += ` <div class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn" toyid = ${toy.id}>Like <3</button>
</div>`
}

function submitData(name, image) {
  let formData = {
    name: name,
    image: image,
    likes: "0"
  };


  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/toys", configObj)
    .then(function (response) {
      return response.json();
    })
    .then(function (object) {
      debugger
      showCard(object)

    })
    .catch(function (error) {

      console.log(error)
    });
}