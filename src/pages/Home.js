import Juego from './Juego.js' 

class Home{
  constructor(){
    this.view()
  }
  view(){
    this.view = `
      <div id="home" class="home">
        <div id="homeImgCn" class="homeImgCn">
          <img id='homeImg' class='homeImg' src="../../images/RMLogo.png" alt="Rick&MortyLogo">
        </div>
        <button id="btn" class="btn btnJugar">Jugar</button>
      </div>
      `  
    content.innerHTML = this.view
    this.activarBoton()
  }
  activarBoton(){
    this.btnJugar = document.getElementById('btn')
    this.btnJugar.onclick = () => new Juego
  }
}

export default Home