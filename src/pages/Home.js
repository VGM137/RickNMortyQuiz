/* import getData from '../utils/getData'*/
import Juego from './Juego.js' 
/* import router from '../routes/Router.js' */

/* import Router from "../routes/Router" */

class Home{
  constructor(){
    this.view()
/*     this.url = window.location;
    history.pushState({},'this works', this.url); */
  }
  view(){
      this.view = `
        <div id="home" class="Home">
          <div id="homeImgCn" class="homeImgCn">
            <img id='homeImg' class='homeImg' src="../../images/RMLogo.png" alt="Rick&MortyLogo">
          </div>
          <button id="btn" class="btn btnJugar">Jugar</button>
        </div>
        `  
      content.innerHTML = this.view
    /* console.log(this.view) */
    this.activarBoton()
  }
  activarBoton(){
    this.btnJugar = document.getElementById('btn')
    this.btnJugar.onclick = () => new Juego
  }
}

export default Home