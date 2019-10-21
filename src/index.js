const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

document.addEventListener('DOMContentLoaded', function () {
  console.log('Call function to fetch toys now');
  renderToys()

});

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
});

const form = document.querySelector('.add-toy-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('form submitted');
  let toyData = {
    name: form.querySelector('input[name]').value,
    image: form.querySelector('input[name="image"]').value,
    likes: 0
  };
  console.log(toyData)

  let configObj = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(toyData)
  };

  fetch('http://localhost:3000/toys', configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object);
      })
      .catch(function (error) {
        alert("Someone's coming!");
        console.log(error.message)
      })
});

function createToyCards(object) {
    for (const element of object) {
      for (const key in element) {
        console.log(element[key])
      }
    }
}

function renderToys() {
  fetch('http://localhost:3000/toys')
      .then(function (response) {
        return response.json();
      })
      .then(function (object) {
        createToyCards(object);
        console.log(object);
      })
      .catch(function (error) {
        alert("Someone's coming!");
        console.log(error.message)
      })
}



