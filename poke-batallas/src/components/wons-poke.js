import { LitElement, html, css } from 'lit';
import { styleswon } from '../styles/style-wons';
import * as wns from '../application/wons';


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
        wns.activarBtnBatalla();
    }

    get dataTemplate() {
        let json = JSON.parse(this.wons);
        //console.log(json);
        wns.saveToLCS(json);
        return html`
        <div class="cont-poke">
            <img src="${json['image']}" alt="">
            <p>${json['nombre']}</p>
        </div>
        `
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
                    <button class="fight" @click="${wns.startNewBattles}" >Nueva Batalla</button>
                </div>
            </div>
        `;
    }

    updated(){
        wns.activarBtnBatalla(this.wons);
    }

}
customElements.define('wons-poke', WonsPoke);
