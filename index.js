const chooseBtn = document.querySelector('#choose-btn')
const baseURL = ('https://lit-fortress-6467.herokuapp.com/object')
const right = document.querySelector('.right')

axios.get(baseURL)
  .then(res => {
    let position = 20;
    let arr = random(5)
    for (let i = 0; i < 3; i++) {
      let img = document.createElement('img')
      img.classList.add('album')
      img.src = `images/${res.data.results[arr[i]].cover_art}`
      img.style.top = `${position}px`;
      right.appendChild(img)
      position += 200;
    }
  })

function random(length) {
  let arr = []
  for (var i = 0; i < length; i++) {
    arr.push(i)
  }
  let newArr = []
  for (let a = arr, i = a.length; i--; ) {
    let random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    newArr.push(random)
  }
  return newArr
}
