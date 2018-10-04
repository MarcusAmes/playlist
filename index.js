const chooseBtn = document.querySelector('#choose-btn')
const baseURL = ('https://lit-fortress-6467.herokuapp.com/object')
const right = document.querySelector('.right')

axios.get(baseURL)
  .then(res => {
    let position = 20;
    for (let i = 0; i < 3; i++) {
      console.log(position);
      let img = document.createElement('img')
      img.classList.add('album')
      img.src = `images/${res.data.results[i].cover_art}`
      img.style.top = `${position}px`;
      right.appendChild(img)
      position += 200;
    }
  })
