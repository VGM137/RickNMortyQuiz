import getData from '../utils/getData.js'
import getCount from '../utils/getCount.js'

let allCharacters = []
let allPages = []
let levelOneCharacters = []
  let quizOneCharacters = []
let levelTwoCharacters = []
  let quizTwoCharacters = []
let levelThreeCharacters = []
  let quizThreeCharacters = []

class Juego{
  constructor(){
    this.getData()
    let count = getCount()
      .then(data => (this.count = data.info.count))
  }
  async getData(){
    this.data = await getData()
      .then(data => data.map(function(pages){allPages.push(pages.results)}))
      allPages.forEach(function(page){page.map(function(character){
        allCharacters.push(character)
      })
    })
    this.names = allCharacters.map(character => character.name)
    this.chooseLevel = `
        <div id='chooseLevel' class="chooseLevel">
          <button id='easyButton' class="easyButton btn">Fácil</button>
          <button id='mediumButton' class="mediumButton btn">Intermedio</button>
          <button id='hardButton' class="hardButton btn">Dificil</button>
        </div>
    `
    content.innerHTML = this.chooseLevel
    this.easyButton = await document.getElementById('easyButton')
    this.mediumButton = await document.getElementById('mediumButton')
    this.hardButton = await document.getElementById('hardButton')
    this.easyButton.onclick = () => this.level1()
    this.mediumButton.onclick = () => this.level2()
    this.hardButton.onclick = () => this.level3()
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  randomCharacter(to, array){
    for(let i = 0; i < to; i++){
    let char = allCharacters[i]
    array.push(char)
    }
  }
  level1(){
    this.randomCharacter(10, levelOneCharacters)
    this.easyButton.onclick = () => ''
    let difficulty = 10 + 1
    do{
      let number = Math.floor(Math.random() * (difficulty - 1) ) + 1
        levelOneCharacters.map(function(character){
          let char = character.id
          let charIndex = levelOneCharacters.indexOf(character)
          if(char === number){
            let splice = levelOneCharacters.splice(charIndex, 1)
            quizOneCharacters.push(splice[0])
          }
        }) 
    }while(levelOneCharacters.length > 0)
      this.start(quizOneCharacters)
  }
  level2(){
    this.randomCharacter(15, levelTwoCharacters)
    this.easyButton.onclick = () => ''
    let difficulty = 15 + 1
    do{
      let number = Math.floor(Math.random() * (difficulty - 1) ) + 1
        levelTwoCharacters.map(function(character){
          let char = character.id
          let charIndex = levelTwoCharacters.indexOf(character)
          if(char === number){
            let splice = levelTwoCharacters.splice(charIndex, 1)
            quizTwoCharacters.push(splice[0])
          }
        }) 
    }while(levelTwoCharacters.length > 0)
      this.start(quizTwoCharacters)
  }
  level3(){
    this.randomCharacter(this.count, levelThreeCharacters)
    console.log(this.count)
    this.easyButton.onclick = () => ''
    let difficulty = 20 + 1
    do{
      let number = Math.floor(Math.random() * (this.count - 1) ) + 1
        levelThreeCharacters.map(function(character){
          let char = character.id
          let charIndex = levelThreeCharacters.indexOf(character)
          if(char === number){
            let splice = levelThreeCharacters.splice(charIndex, 1)
            quizThreeCharacters.push(splice[0])
          }
        }) 
    }while(quizThreeCharacters.length < 20)
      this.start(quizThreeCharacters)
  }
  start(array){
    this.pregunta(array)
  }
  pregunta(array){
    if(array.length <= 0){
      return
    }
    let preguntas = array
    let el = preguntas.shift()
    this.view(el, preguntas)
  }
  view(el, array){
    content.innerHTML = `
    <section id="questioContainer" class="questionContainer">
    <h2>¿Quién es este personaje?</h2>
    <div id="imageContainer" class="imageContainer">
    <img id='characterImg' class="characterImg" src="${el.image}" alt="">
    </div>
    <div id="optionsContainer" class="optionsContainer">
    ${this.options}
    </div>
    <div id="btnContainer" class="btnContainer">
    <button id="siguiente" class="btnSiguiente btn" >Siguiente</button>
    </div>
    </section>
    `
    this.options = this.displayOptions(el)
    this.add = this.addRightAnswer(el)
    this.siguiente = document.getElementById('siguiente')
    this.siguiente.disabled = true
    this.siguiente.onclick = () => this.pregunta(array)
    this.optionOne = document.getElementById('optionOne')
    this.optionTwo = document.getElementById('optionTwo')
    this.optionThree = document.getElementById('optionThree')
    this.optionFour = document.getElementById('optionFour')
    this.optionOne.onclick = () => this.handleOption(this.optionOne, el)
    this.optionTwo.onclick = () => this.handleOption(this.optionTwo, el)
    this.optionThree.onclick = () => this.handleOption(this.optionThree, el)
    this.optionFour.onclick = () => this.handleOption(this.optionFour, el)
  }
  displayOptions(){
    this.container = document.getElementById('optionsContainer')
    this.container.innerHTML = `
    <button id="optionOne" class="optionOne" value='false'>Opción Uno</button>
    <button id="optionTwo" class="optionTwo" value='false'>Opción Dos</button>
    <button id="optionThree" class="optionThree" value='false'>Opción Tres</button>
    <button id="optionFour" class="optionFour" value='false'>Opción cuatro</button>
    `
  }
  addRightAnswer(el){
    let number = Math.floor(Math.random() * (4 - 1) ) + 1
    this.container = document.getElementById('optionsContainer')
    this.nodes = this.container.children
    this.nodes[number].title = el.name
  }
  handleOption(button, el){
    this.container = document.getElementById('optionsContainer')
    this.nodes = this.container.children
    this.nodesArray = []
    for(let i = 0; i < this.nodes.length; i++){
      let node = this.nodes[i]
      this.nodesArray.push(node)
    }
    if(button.value == 'false'){
      button.value = 'true'
      this.nodesArray.forEach(function(node){
        if(node !== button){
            node.value = 'false'
          }
      })
    }else if(button.value == 'true'){
      button.value = 'false'
    }
    if(button.title === el.name){
      console.log('Respuesta Correcta!!')
    }
  }

}

export default Juego