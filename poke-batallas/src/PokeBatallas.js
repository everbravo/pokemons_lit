import { html, css, LitElement } from 'lit';
import './components/cont-poke';
import './components/battle-poke';
import './components/wons-poke';
import * as mf from './application/main';
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
      mf.processPokes(e.detail);
    });
    this.addEventListener('poke-won', (e) => {
      mf.processWon(e.detail.data);
    });
    this.addEventListener('new-battle', () => {
      mf.resetView();
    });
    this.addEventListener('activar-battle', (e) => {
      mf.btns(e.detail.val);
    });
    
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
