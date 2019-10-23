const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.getElementById('toy-collection')
let addToy = false

let toys


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('DOMContentLoaded', fetchToys());
document.addEventListener('click', addLike)

function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => loadToys(json))
}

function loadToys(json) {
  toys = json
  json.forEach(toy => {
    const div = document.createElement('div')
    div.className = 'card'

    const h2 = document.createElement('h2')
    h2.innerText = `${toy.name}`

    const img = document.createElement('img')
    img.src = `${toy.image}`
    img.className = 'toy-avatar'

    const p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    const button = document.createElement('button')
    button.className = 'like-btn'
    button.innerText = 'Like'
    button.id = toy.id

    toyList.appendChild(div)
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
  })
}

toyForm.addEventListener('submit', event => {
  event.preventDefault()
  createToy(event.target)
})

function createToy(form) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"name": form.name.value, "image": form.image.value, "likes": 0})
  })
  .then(function(respone) {
    return response.json();
  })
  .then(loadToys(json))
}

function addLike(event) {
  if (event.target.className === 'like-btn'){
    const toy = toys.find(toy => {
      return toy.id == event.target.id
    })
    toy.likes += 1
    debugger
    event.target.parentElement.querySelector('p').innerHTML = `${toy.likes} likes`
  }
}
