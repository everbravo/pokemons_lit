import { LitElement, html, css } from 'lit';
import { stylebatt } from '../styles/style-battle';
import * as btt from '../application/batlle';

export class BattlePoke extends LitElement {
    static styles = [stylebatt];

    static get properties() {
        return{
            pokes:{type:Array},
            arrpokes: {type:Array},
            battle : {type:Number, reflect:true},
        }
      }
    
    constructor(){
     super();
        this.pokes = [];
        this.arrpokes = [];
        this.battle = 0;
    }

    firstUpdated(){
        btt.activarBtnBatalla();
    }

    get dataTemplate() {
        let arrpok = btt.obtainPokes(this.arrpokes);
        if (arrpok.length > 0){
            return html`
            ${arrpok.map((character) => html`
                <div class="poke">
                    <img src="${character['image']}" alt="poke beautiful">
                    <p>${character['nombre']}</p>
                </div>
            `)}
            `
        }else{
            return html`
            <div class="poke">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" alt="">
                <p>Poke 1</p>
            </div>
            <div class="poke">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" alt="">
                <p>Poke 2</p>
            </div>`
        }
        
    }
    
    render() {
        return html`
            <div class="main-container">
                <div class="cont-poke">
                   ${this.dataTemplate} 
                </div>
                <div class="btn-battle">
                    <button class="fight" @click="${btt.battleRamdom}" disabled>Batalla</button>
                </div>
            </div>
        `;
    }

    updated() {
        btt.activarBtnBatalla(this.battle);
    }

    
}
customElements.define('battle-poke', BattlePoke);
