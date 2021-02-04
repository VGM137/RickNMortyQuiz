import getData from '../utils/getData.js'

class Juego{
  constructor(){
    this.view = `
    <section id="question" class="question">
    <h1>¿Quién es este personaje?</h1>
    <div>
    <button>A</button>
    <button>B</button>
    <button>C</button>
    </div>
    </section>
    `
    content.innerHTML = this.view
    this.getData()
  }
  async getData(){
    let allCharacters = []
    let allPages = []
    this.data = await getData()
      .then(data => data.map(function(pages){allPages.push(pages.results)}))
    allPages.forEach(function(page){page.map(function(character){
      allCharacters.push(character)
      })
    })
    this.names = allCharacters.map(character => character.name)
    console.log(allCharacters)
    console.log(allPages.length)
    console.log(this.names)
  }
}

export default Juego