import { LitElement, html, css } from 'lit';
import { styleswon } from '../styles/style-wons';


export class WonsPoke extends LitElement {
    static styles = [styleswon];

    static get properties() {
        return{
            wons:{type:String}
        }
      }

      constructor(){
        super();
        this.wons = "";
        let localSave = [];
       }

    firstUpdated(){
        this.activarBtnBatalla();
    }

    get dataTemplate() {
        let json = JSON.parse(this.wons);
        //console.log(json);
        this.saveToLCS(json);
        return html`
        <div class="cont-poke">
            <img src="${json['image']}" alt="">
            <p>${json['nombre']}</p>
        </div>
        `
      }
    
    startNewBattles() {
        this.dispatchEvent(new CustomEvent('new-battle', {
            detail:null,
            bubbles:true,
            composed: true
        }));
    }

    activarBtnBatalla(){
        //console.log("why??? ",this.battle);
        let  cons = this.shadowRoot.querySelector("button");
        if(this.wons === ""){
            cons.setAttribute('disabled', '');
        }else{
            cons.removeAttribute('disabled');
        }
    }

    render() {
        return html`
            <div class="main-container">
                <h2>Ganador</h2>
                ${this.wons === "" ?
                    html`<div class="cont-poke">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" alt="">
                        <p>Poke 1</p>
                    </div>`
                  : 
                  this.dataTemplate
                  }
                
                <div class="btn-battle">
                    <button class="fight" @click="${this.startNewBattles}" >Nueva Batalla</button>
                </div>
            </div>
        `;
    }

    updated(){
        this.activarBtnBatalla();
    }

    saveToLCS(data){
        let key = "wons";
        let nombre = data.nombre;
        this.verGetLocalData(key, nombre);
    }

    verGetLocalData(key, name){
        let localSave = [];
        const item = localStorage.getItem(key);
        if(item !== null){
            this.findPokeData(name, JSON.parse(item));
        }else{
            localSave.push({nombre: name, battles:1});
            localStorage.setItem(key, JSON.stringify(localSave));
        }
    }

    findPokeData(nombre, data){
        let bool = false;
        data.forEach(element => {
            if(element.nombre === nombre){
                element.battles += 1;
                bool = true;
            }
        });
        if(!bool){
            data.push({nombre: nombre, battles:1});
        }
        localStorage.setItem("wons",JSON.stringify(data));
    }
}
customElements.define('wons-poke', WonsPoke);
