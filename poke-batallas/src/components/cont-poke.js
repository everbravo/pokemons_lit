import { LitElement, html, css } from "lit";
import './get-data';
import {styles} from '../styles/style-data';

class ContPoke extends LitElement {
  static get properties() {
    return{
        info:{type:Array},
        page:{type:Number, reflect:true},
        next:{type:Number, reflect:true},
        _pokes:{type:Array},
        reset: {type:Boolean},
    }
  }

  static get styles() {
    return styles;
  }

  constructor(){
    super();
    this.info = [];
    this._pokes = [];
    this.page = 0;
    this.next = 0;
    this.reset = false;
    this.addEventListener('api-data', (e) => {
      this._formatData(e.detail);
  })
  }

  selectBattlesPokes(){
    let localSave = localStorage.getItem('wons');
    if(localSave !== null){
      console.log('LocalStorage: ', JSON.parse(localSave));
      return JSON.parse(localSave);
    }
    return [];
    
  }

  _formatData(data){
    let batt = this.selectBattlesPokes();
    let pokes = [];
    data['data'].forEach((poke) => {
      let battG = 0;
      batt.forEach((elmt) =>{
        if(poke.name === elmt.nombre){
          battG = elmt.battles;
        }
      });
        pokes.push({
            'name':poke.name, 
            'image':poke.image, 
            'hp':poke.hp,
            'attack':poke.attack,
            'wons':battG
        });
    });
    this.info = pokes;
    //console.log(this.info);
  }

  get dataTemplate() {
    return html`
      ${this.info.map(  (character) => html`
      <div class="contenedor">
        <div class="cont-radio">
            <input for="cont-datos" type="checkbox" id="${character['name']}" value='{"nombre":"${character['name']}", "hp":${character['hp']}, "attack":${character['attack']}, "image":"${character['image']}"}' @change="${this.doChange}">
            <!--<input type="radio" value='{"nombre":"${character['name']}", "hp":${character['hp']}, "attack":${character['attack']}, "image":"${character['image']}"}' class="${character['name']}" id="radio" @change="${this.doChange}">-->
        </div>
            <img src="${character['image']}" alt="img pokemon">
        <div class="cont-datos">
            <div class="titulos">
                <p>Nombre</p>
                <p>Poder</p>
                <p>Vida</p>
                <p>Batallas Ganadas</p>
            </div>
            <div class="data">
                <p id="name">${character['name']}</p>
                <p id="powe">${character['hp']}</p>
                <p id="attack">${character['attack']}</p>
                <p id="bat-wons">${character['wons']}</p>
            </div>
        </div>
  </div>
      `)}
      `
  }

  _nextPage (){
    this.page += 1;
    this.next = this.page * 6;
  }


  _prevPage (){
    this.page -= 1;
    this.next = this.page * 6;
  }

  _homePage (){
    this.page = 0;
    this.next = 0;
  }

  findPokesArray(){
    let check = this.shadowRoot.querySelectorAll('input[type="checkbox"]:checked');
    //console.log(check);
    check.forEach( e => {
      console.log("ever ",e.id);
      this._pokes.forEach( p => {
        
      } ) 
    })
  }

  doChange(e) {
    //console.log(e.target.checked);
    if(e.target.checked){
        this._pokes.push(e.target.value);
    }else{
        this._pokes.splice(this._pokes.indexOf(e.target.value), 1);
    }
    //console.log(this._pokes);
    this.verificarCantPokes();
    this.enviarPokemons();
  }

  enviarPokemons(){
    let da = this._pokes;
    this.dispatchEvent(new CustomEvent('poke-add', {
        detail:{da},
        bubbles:true,
        composed: true
    }));
  }

  btnBatalla(bool){
    //console.log("batalla en estado ", bool);
    this.dispatchEvent(new CustomEvent('activar-battle', {
        detail:{val:bool},
        bubbles:true,
        composed: true
    }));
  }

  verificarCantPokes(){
    //console.log(this._pokes);
    let check = this.shadowRoot.querySelectorAll('input[type="checkbox"]:not(:checked)');
    if(this._pokes.length == 2 ){
        this.btnBatalla(1);
        check.forEach((item) => {
            item.disabled = !item.disabled;
          });
    }else{
        this.btnBatalla(0);
        check.forEach((item) => {
            item.disabled = false;
          });
    }
  }

  resetearSelects(){
    if(this.reset === true){
      this.reset = false;
        this.arrpok = [];
        this._pokes = [];
        this.page = 0;
        let check = this.shadowRoot.querySelectorAll('input[type="checkbox"]');
        check.forEach((item) => {
            item.disabled = false;
            item.checked = false;
        });
    }
  }

  render() {
    this.resetearSelects();
    this.findPokesArray();
    return html`
        <get-data
            offset=${this.next}
        >
        </get-data>
            <div class="mega-cont">
                ${this.dataTemplate}
                <div class="btns">
                    ${
                        this.page >= 1 
                        ?html`<button @click=${this._prevPage} @onTouch=${this._prevPage}><p><</p></button>`
                        :''
                    }
                    <button @click=${this._homePage} @onTouch=${this._homePage}><p>Home</p></button>
                    <button @click=${this._nextPage} @onTouch=${this._nextPage}><p>></p></button>
                </div>
            </div>
        </div>
           
      `
  }
}

customElements.define("cont-poke", ContPoke);
