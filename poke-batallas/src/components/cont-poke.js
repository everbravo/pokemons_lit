import { LitElement, html, css } from "lit";
import "./get-data";
import { styles } from "../styles/style-data";
import * as f from "../application/pokemons";

class ContPoke extends LitElement {
  static get properties() {
    return {
      info: { type: Array },
      page: { type: Number, reflect: true },
      next: { type: Number, reflect: true },
      _pokes: { type: Array },
      reset: { type: Boolean }
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this._pokes = [];
    this.page = 0;
    this.info = [];
    this.next = 0;
    this.reset = false;
    this.addEventListener("api-data", e => {
      //console.log(e);
      this.info = f._formatData(e.detail);
    });
  }

  get dataTemplate() {
    return html`
      ${this.info.map(
        character => html`
      <div class="contenedor">
        <div class="cont-radio">
            <input 
              for="cont-datos" 
              type="checkbox" 
              id="${character["name"]}" 
              value='{"nombre":"${character["name"]}", "hp":${character[
          "hp"
        ]}, "attack":${character["attack"]}, "image":"${character["image"]}"}' 
              @change="${f.doChange}" 
              >
            <!--<input type="radio" value='{"nombre":"${character[
              "name"
            ]}", "hp":${character["hp"]}, "attack":${character[
          "attack"
        ]}, "image":"${character["image"]}"}' class="${character[
          "name"
        ]}" id="radio" @change="${this.doChange}">-->
        </div>
            <img src="${character["image"]}" alt="img pokemon">
        <div class="cont-datos">
            <div class="titulos">
                <p>Nombre</p>
                <p>Poder</p>
                <p>Vida</p>
                <p>Batallas Ganadas</p>
            </div>
            <div class="data">
                <p id="name">${character["name"]}</p>
                <p id="powe">${character["hp"]}</p>
                <p id="attack">${character["attack"]}</p>
                <p id="bat-wons">${character["wons"]}</p>
            </div>
        </div>
  </div>
      `
      )}
      `;
  }

  _nextPage() {
    this.page += 1;
    this.next = this.page * 6;
  }

  _prevPage() {
    this.page -= 1;
    this.next = this.page * 6;
  }

  _homePage() {
    this.page = 0;
    this.next = 0;
  }

  render() {
    f.resetearSelects(this.reset);
    return html`
        <get-data
            offset=${this.next}
        >
        </get-data>
            <div class="mega-cont">
                ${this.dataTemplate}
                <div class="btns">
                    ${this.page >= 1
                      ? html`<button @click=${this._prevPage} @onTouch=${this
                          ._prevPage}><p><</p></button>`
                      : ""}
                    <button @click=${this._homePage} @onTouch=${this
      ._homePage}><p>Home</p></button>
                    <button @click=${this._nextPage} @onTouch=${this
      ._nextPage}><p>></p></button>
                </div>
            </div>
        </div>
           
      `;
  }

  updated() {
    f.findCheckPokesPagesSelected();
  }
}

customElements.define("cont-poke", ContPoke);
