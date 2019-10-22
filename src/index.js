const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

const createToyCard = (element) => {
  const collection = document.getElementById('toy-collection');
  let toyDiv = document.createElement('div');
  toyDiv.className = 'card';
  collection.appendChild(toyDiv);

  let heading = document.createElement('h2');
  let toyName = document.createTextNode(element['name']);
  heading.appendChild(toyName);
  toyDiv.appendChild(heading);

  let img = document.createElement('img');
  img.src = element['image'];
  img.className = 'toy-avatar';
  toyDiv.append(img);

  let par = document.createElement('p');
  let toyLikes = document.createTextNode(element['likes'] + ' Likes');
  par.appendChild(toyLikes);
  toyDiv.appendChild(par);

  let likeBtn = document.createElement('button');
  likeBtn.className = 'like-btn';
  let likeIt = document.createTextNode('Like <3');

  likeBtn.appendChild(likeIt);
  toyDiv.appendChild(likeBtn);

  likeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('like button clicked');
    let newCount = element['likes'] + 1;
    e.target.parentElement.querySelector('p').innerHTML = `${newCount} Likes`;
    console.log(newCount);

    let configObj = {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: {
        'likes': newCount
      }
    };

    fetch(`http://localhost:3000/toys/${element['id']}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    })
    // .catch(function (error) {
    //   alert("Someone's coming!");
    //   console.log(error.message)
    // })

  })
}


const renderToys = () => {
  fetch('http://localhost:3000/toys')
      .then(function (response) {
        return response.json();
      })
      .then(function (object) {
        for (const element of object) {
          createToyCard(element)
        }
        console.log(object);
      })
      .catch(function (error) {
        alert("Someone's coming!");
        console.log(error.message)
      })
};

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
  console.log(toyData);

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
        createToyCard(object)
      })
      .catch(function (error) {
        alert("Someone's coming!");
        console.log(error.message)
      })
});

document.addEventListener('DOMContentLoaded', function () {
  console.log('Call function to fetch toys now');
  renderToys()
});


