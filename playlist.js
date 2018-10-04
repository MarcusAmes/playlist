const t = document.querySelector('.top')
const baseURL = ('https://lit-fortress-6467.herokuapp.com/')
const box = document.querySelector('.box')
const clear = document.querySelector('#clear')
const submit = document.querySelector('#submit')
const p = document.querySelector('p')

axios.get(`${baseURL}object`)
.then(res => {
  for (let i = 0; i < res.data.results.length; i++) {
    let img = document.createElement('img')
    img.classList.add('album')
    img.src = `images/${res.data.results[i].cover_art}`
    t.appendChild(img)
  }
})

t.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    let source = e.target.src
    let slashAt
    for (let i = 0; i < source.length; i++) {
      if(source[i] === '/')
        slashAt = i + 1
    }
    source = source.substring(slashAt, source.length)
    axios.get(`${baseURL}object`)
    .then(res => {
      let results = res.data.results
      for (let i = 0; i < results.length; i++) {
        if(source === results[i].cover_art) {
          let para = document.createElement('p')
          para.innerText = `${results[i].artist}: ${results[i].title}`;
          box.appendChild(para)
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
  for (let i = 0; i < p.length; i++) {
    for (let j = 0; j < p[i].length; j++) {
      p[i][j]
    }
  }
  axios.post(`${baseURL}post`, {})
  .then(res => {
    console.log(res.data);
  })
})
