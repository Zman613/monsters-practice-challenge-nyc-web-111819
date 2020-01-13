document.addEventListener('DOMContentLoaded', function () {
  let page = 1
  let list = document.getElementById('monster-container')
  let create = document.getElementById('create-monster')
  let forward = document.getElementById('forward')
  let back = document.getElementById('back')

  function createNewMonster(monster) {
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(monster)
    })
      .catch(error => {
        alert(error.message)
      })
  }

  function formEvent() {
    let formProper = document.getElementsByClassName('form')[0]
    console.log(formProper)
    formProper.addEventListener("submit", function () {
      console.log("name")
      event.preventDefault()
      let name = event.target.name.value
      let age = event.target.age.value
      let description = event.target.description.value
      let newMonster = { name, age, description }
      createNewMonster(newMonster)
      event.target.reset()
    })
  }

  function formAdder() {
    let form = document.createElement('form')
    let name = document.createElement('input')
    let age = document.createElement('input')
    let description = document.createElement('input')
    let submit = document.createElement('button')
    form.className = "form"
    name.id = "name"
    name.placeholder = 'Name...'
    age.id = "age"
    age.placeholder = 'Age...'
    description.id = "description"
    description.placeholder = "Bio..."
    submit.innerText = 'Create Monstr'
    submit.type = 'submit'
    submit.className = 'submit'
    form.appendChild(name)
    form.appendChild(age)
    form.appendChild(description)
    form.appendChild(submit)
    // form.innerHTML = `<label for="name">Name: </label>
    // <input type="text" name="name" id="name">
    // <label for="age">Age: </label>
    // <input type="number" name="age" id="age">
    // <label for="description">Bio: </label>
    // <input type="text" name="description" id="description">
    // <input type="submit" value="Create Monster" name='submit' class='submit'>`
    create.append(form)
    formEvent()
  }

  function addToList(monster) {
    let name = monster.name
    let age = monster.age
    let description = monster.description
    let div = document.createElement('div')
    div.innerHTML = `<h2>Name: ${name}</h2>
    <b>Age: ${age}</b>
    <p>Bio: ${description}</p>`
    console.log(monster)
    list.append(div)
  }

  function getFiftyMonsters(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then(response => response.json())
      .then(monsters => {
        monsters.forEach(addToList)
      })
      .catch(error => {
        alert(error.message)
      })
  }

  getFiftyMonsters(page)
  formAdder()

  forward.addEventListener('click', function () {
    event.preventDefault()
      page++
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
      getFiftyMonsters(page)
  })


  back.addEventListener('click', function () {
    if (page === 1) {
      alert("You are on the first page")
    } else {
      page--
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
      getFiftyMonsters(page)
    }
  })

})