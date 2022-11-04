import { LitElement, html, css } from 'lit';
import { stylebatt } from '../styles/style-battle';

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
        let arrpok = [];
    }

    firstUpdated(){
        this.activarBtnBatalla();
    }

    get obtainPokes(){
        let arrayPokemons = [];
        if (this.arrpokes.da !== undefined){
            this.arrpokes.da.forEach(s => arrayPokemons.push(JSON.parse(s)));
        }
        this.arrpok = arrayPokemons;
        return this.dataTemplate();
    }

    dataTemplate() {
        if (this.arrpok.length > 0){
            return html`
            ${this.arrpok.map(  (character) => html`
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

    battleRamdom(){
        let aleat = Math.floor(Math.random() * this.arrpok.length);
        let copiaArray = this.arrpok;
        
        let oneAttack = copiaArray[aleat];
        copiaArray = copiaArray.filter(nombre => nombre['nombre'] !== oneAttack['nombre']);
        let twoAttack = copiaArray[0];

        //console.log("one -> ", oneAttack);
        //console.log("two -> ", twoAttack);

        const f = this.startBattle(oneAttack, twoAttack);
        this.senDataWon(f);
      }

    senDataWon(data){
        this.dispatchEvent(new CustomEvent('poke-won', {
            detail:{data},
            bubbles:true,
            composed: true
        }));
    }

    startBattle(first, second){
        let hp1 = parseInt(first['hp']);
        let hp2 = parseInt(second['hp']);

        let pw1 = parseInt(first['attack']);
        let pw2 = parseInt(second['attack']);

        while ((hp1 > 0)) {
            hp2 -= pw1;
            if(hp2 > 0){
                hp1 -= pw2;
            }else{
                return first;
            }
        }
        return second;
      }
    
    activarBtnBatalla(){
        //console.log("why??? ",this.battle);
        let  cons = this.shadowRoot.querySelector("button");
        if(this.battle === 1){
            cons.removeAttribute('disabled');
        }else{
            cons.setAttribute('disabled', '');
        }
    }

    render() {
        return html`
            <div class="main-container">
                <div class="cont-poke">
                   ${this.obtainPokes} 
                </div>
                <div class="btn-battle">
                    <button class="fight" @click="${this.battleRamdom}" disabled>Batalla</button>
                </div>
            </div>
        `;
    }

    updated() {
        this.activarBtnBatalla();
    }

    
}
customElements.define('battle-poke', BattlePoke);
