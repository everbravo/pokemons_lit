import { html, css, LitElement } from 'lit';
import './components/cont-poke';
import './components/battle-poke';
import './components/wons-poke';
import { stylestemplate } from './styles/style-template';

export class PokeBatallas extends LitElement {
  static get styles() {
    return [stylestemplate];
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
  }

  firstUpdated(){
    this.addEventListener('poke-add', (e) => {
      this.processPokes(e.detail);
    });
    this.addEventListener('poke-won', (e) => {
      this.processWon(e.detail.data);
    });
    this.addEventListener('new-battle', () => {
      this.resetView();
    });
    this.addEventListener('activar-battle', (e) => {
      this.btns(e.detail.val);
    });
    
  }

  btns(da){
      //console.log("I send ",da);
      this.shadowRoot.querySelector('battle-poke').setAttribute('battle', da);
  }

  resetView(){
    let bttpoke = this.shadowRoot.querySelector('battle-poke');
    let wnpoke = this.shadowRoot.querySelector('wons-poke');
    let cntpoke = this.shadowRoot.querySelector('cont-poke');

    bttpoke.setAttribute('arrpokes', '{"da":[]}');
    bttpoke.setAttribute('arrpok', null);
    bttpoke.setAttribute('battle', 0);
    wnpoke.setAttribute('wons','');
    cntpoke.setAttribute('reset', true);
    cntpoke.removeAttribute('next');

    this.actualizarContPoke();

  }

  actualizarContPoke(){
    let cpok = this.shadowRoot.querySelector('cont-poke');
    setTimeout(() => {
      cpok.setAttribute('page', 1);
      cpok.setAttribute('page', 0);
      cpok.setAttribute('next', 0);
    }, "100");

  }

  processWon(data){
    let won = this.shadowRoot.querySelector('wons-poke');
    won.setAttribute('wons', JSON.stringify(data));
    //console.log("listo", data);
  }

  processPokes(data){
    let bttpoke = this.shadowRoot.querySelector('battle-poke');
    bttpoke.setAttribute('arrpokes', JSON.stringify(data));
    //console.log("listo", data);
  }

  render() {
    return html`
    <h1>Batalla Pokemon</h1>
    <div class="dash">
        <div class="container1">
              <cont-poke></cont-poke>
        </div>

        <div class="container2">
            <div class="cont1">
                <battle-poke></battle-poke>
            </div>
            <div class="sep"></div>
            <div class="cont2">
                <wons-poke></wons-poke>
            </div>
        </div>
    </div>
    `;
  }
}
