const t = document.querySelector('.top')
const baseURL = ('albums.json')
const box = document.querySelector('.box')
const clear = document.querySelector('#clear')
const submit = document.querySelector('#submit')
const selectedImage = document.querySelector('.selected-image')
const albumInfo = document.querySelector('.album-info')
const finished = document.querySelector('#finished')

axios.get(baseURL)
.then(res => {
  for (let i = 0; i < res.data.array.length; i++) {
    let img = document.createElement('img')
    img.classList.add('album')
    img.id = res.data.array[i].id
    img.src = res.data.array[i].album_art
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
      let results = res.data.array
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

box.addEventListener('click', e=> {
  if (e.target.tagName === 'P') {
    let para = document.createElement('p')
    para.innerText = e.target.innerText;
    finished.appendChild(para)
  }
})

clear.addEventListener('click', e=> {
  while (box.firstChild) {
    finished.removeChild(finished.firstChild);
  }
})

submit.addEventListener('click', e=> {
  let arr = []
  let p = finished.querySelectorAll('p')
  for (let i = 0; i < p.length; i++) {
    arr.push(p[i].innerText)
    }
  console.log(arr);
  axios.post(`https://lit-fortress-6467.herokuapp.com/post`, arr)
  .then(res => {
    console.log(res.data);
  })
})
