
fetch('http://localhost:3000/pups')
.then(response => response.json())
.then(pups => renderPuppies(pups))

const grabPups = document.querySelector('#dog-bar')

//menu
function renderPuppies(pups){
    grabPups.innerHTML = ''
    for(const pup of pups) { 
        let span = document.createElement('span')
        span.addEventListener('click', () => 
        displayPuppies(pup))
        span.textContent = pup.name 
        grabPups.append(span)

    }

}

const showInfo = document.querySelector("#dog-info")


function displayPuppies(pup){
    showInfo.innerHTML =  '' //clears out the existing div/data
    // pup.forEach( pup => {
    let img = document.createElement('img')
    img.src = pup.image
    let h2 = document.createElement('h2')
    h2.textContent = pup.name
    let button = document.createElement('button')
    button.textContent = pup.isGoodDog ? "good dog" : "bad dog"
    button.addEventListener('click', () => changeStatus(button, pup))
    showInfo.append(img)
    showInfo.append(h2)
    showInfo.append(button)
}

function changeStatus(b, data){
    if(b.innerText === "good dog"){
        b.innerText = "bad dog"
        data.isGoodDog = false
    }
    else if(b.innerText === "bad dog"){
        b.innerText = "good dog"
        data.isGoodDog = true
    }
    fetch(`http://localhost:3000/pups/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    
    }
