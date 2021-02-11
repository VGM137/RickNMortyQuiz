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
    this.difficulty = 10 + 1
    do{
      let number = Math.floor(Math.random() * (this.difficulty - 1) ) + 1
        levelOneCharacters.map(function(character){
          let char = character.id
          let charIndex = levelOneCharacters.indexOf(character)
          if(char === number){
            let splice = levelOneCharacters.splice(charIndex, 1)
            quizOneCharacters.push(splice[0])
          }
        }) 
    }while(levelOneCharacters.length > 0)
      this.start(quizOneCharacters, this.difficulty)
  }
  level2(){
    this.randomCharacter(15, levelTwoCharacters)
    this.easyButton.onclick = () => ''
    this.difficulty = 15 + 1
    do{
      let number = Math.floor(Math.random() * (this.difficulty - 1) ) + 1
        levelTwoCharacters.map(function(character){
          let char = character.id
          let charIndex = levelTwoCharacters.indexOf(character)
          if(char === number){
            let splice = levelTwoCharacters.splice(charIndex, 1)
            quizTwoCharacters.push(splice[0])
          }
        }) 
    }while(levelTwoCharacters.length > 0)
      this.start(quizTwoCharacters, this.difficulty)
  }
  level3(){
    this.randomCharacter(this.count, levelThreeCharacters)
    console.log(this.count)
    this.easyButton.onclick = () => ''
    this.difficulty = 20 + 1
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
      this.start(quizThreeCharacters, this.difficulty)
  }
  start(array, difficulty){
    console.log(this.arrayCopy)
    this.question(array, difficulty)
  }
  question(array, difficulty){
    if(array.length <= 0){
      this.nextQuestion.disabled = true
    }
    let preguntas = array
    let el = preguntas.shift()
    this.view(el, preguntas, difficulty)
  }
  view(el, array, difficulty){
    let questions = difficulty
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
    <button id="nextQuestion" class="btnSiguiente btn" >Siguiente</button>
    </div>
    </section>
    `
    this.options = this.displayOptions(el)
    this.add = this.addAnswers(el, questions)
    this.nextQuestion = document.getElementById('nextQuestion')
    this.nextQuestion.disabled = true
    this.nextQuestion.onclick = async () => {
      this.container = document.getElementById('optionsContainer')
      this.nodes = this.container.children
/*       this.nodesArray = [] */
      for(let i = 0; i < this.nodes.length; i++){
        let node = this.nodes[i]
        if(node.value == 'true'){
          if(node.innerHTML == node.title){
            console.log('Right Answer')
          }else{
            console.log('Wrong Answer')
          }
        }
      }
      await this.question(array, questions)
    }
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
    <button id="optionOne" class="optionOne" value='false'></button>
    <button id="optionTwo" class="optionTwo" value='false'></button>
    <button id="optionThree" class="optionThree" value='false'></button>
    <button id="optionFour" class="optionFour" value='false'></button>
    `
  }
  async addAnswers(el, difficulty){
    let number = Math.floor(Math.random() * (4 - 1) ) + 1
    this.container = document.getElementById('optionsContainer')
    this.nodes = this.container.children
    this.nodesArray = []
    for(let i = 0; i < this.nodes.length; i++){
      let node = this.nodes[i]
      this.nodesArray.push(node)
    }
    let rightAns = this.nodesArray.indexOf(this.nodesArray[number])
    let answer =  this.nodesArray.splice(rightAns, 1)
    let rightAnswer = answer[0]
    rightAnswer.title = el.name
    rightAnswer.innerHTML = el.name
    let rightAnswerName = rightAnswer.innerHTML
    let wrongAnswers = this.nodesArray 
    let questionChars = allCharacters.slice(0, (difficulty-1))
    wrongAnswers.forEach(function(ans){
      do{
        let number = Math.floor(Math.random() * ((difficulty-1) - 1) ) + 1
        let char = questionChars[number]
        if(char.name !== rightAnswerName && char.name !== wrongAnswers[0].innerHTML && char.name !== wrongAnswers[1].innerHTML && char.name !== wrongAnswers[2].innerHTML){
          ans.innerHTML = char.name
        }
      }while(ans.innerHTML == '')
    })
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
    if(this.nodesArray[0].value == 'true' || this.nodesArray[1].value == 'true' || this.nodesArray[2].value == 'true' || this.nodesArray[3].value == 'true'){
      this.nextQuestion.disabled = false
    }else{
      this.nextQuestion.disabled = true
    }
  }

}

export default Juego