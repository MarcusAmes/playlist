const t = document.querySelector('.top')
const baseURL = ('albums.json')
const box = document.querySelector('.box')
const clear = document.querySelector('#clear')
const submit = document.querySelector('#submit')
const selectedImage = document.querySelector('.selected-image')
const albumInfo = document.querySelector('.album-info')

axios.get(baseURL)
.then(res => {
  for (let i = 0; i < res.data.data.array.length; i++) {
    let img = document.createElement('img')
    img.classList.add('album')
    img.id = res.data.data.array[i].id
    img.src = res.data.data.array[i].album_art
    t.appendChild(img)
  }
})

t.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    while (box.firstChild) {
      box.removeChild(box.firstChild);
    }
    axios.get(baseURL)
    .then(res => {
      let results = res.data.data.array
      let imgId = e.target.id
      for (let i = 0; i < results.length; i++) {
        if(imgId === results[i].id) {
          selectedImage.src = e.target.src
          albumInfo.innerText = `${results[i].artist}: ${results[i].album}`
          for (let j = 0; j < results[i].songs.length; j++) {
            let para = document.createElement('p')
            para.innerText = results[i].songs[j];
            box.appendChild(para)
          }
        }
      }
    })
  }
})

clear.addEventListener('click', e=> {
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
})

submit.addEventListener('click', e=> {
  let obj = {}
  let p = document.querySelectorAll('p')
  for (let i = 0; i < p.length; i++) {
    let colonAt = 0;
    for (let j = 0; j < p[i].innerText.length; j++) {
      if(p[i].innerText[j] === ':') {
        colonAt = j;
      }
    }
    obj[p[i].innerText.substring(0,colonAt)] = p[i].innerText.substring(colonAt + 2,p[i].innerText.length)
  }
  console.log(obj);
  axios.post(`https://lit-fortress-6467.herokuapp.com/post`, obj)
  .then(res => {
    console.log(res.data);
  })
})
