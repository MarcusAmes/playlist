const chooseBtn = document.querySelector('#choose-btn')
const baseURL = ('albums.json')
const right = document.querySelector('.right')

axios.get(baseURL)
  .then(res => {
    console.log(res.data.data);
    let position = 20;
    let arr = random(res.data.data.array.length)
    for (let i = 0; i < 3; i++) {
      let img = document.createElement('img')
      img.classList.add('album')
      img.src = res.data.data.array[arr[i]].album_art
      img.style.top = `${position}px`;
      right.appendChild(img)
      position += 200;
      console.log();
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
