import { LitElement } from "lit";

export class GetData extends LitElement {
  static get properties() {
    return {
      offset: { type: Number, reflect: true },
      meth: { type: String },
      wiki: { type: Array }
    };
  }

  constructor() {
    super();
    this.wiki = [];
    this.meth = "GET";
  }

  performUpdate() {
    this.offset = 12;
    //this.GetDataHead(this.meth);
  }
  attributeChangedCallback(att, oldvalue, newvalue) {
    super.attributeChangedCallback(att, oldvalue, newvalue);
    //console.log("connected ",this.offset);
    this.GetDataHead(this.meth, this.offset);
  }

  // función que envia los datos hacia el contenedor de pokemones mediante un evento
  _sendData(data) {
    this.dispatchEvent(
      new CustomEvent("api-data", {
        detail: { data },
        bubbles: true,
        composed: true
      })
    );
  }

  // función que permite obtener la data referente a los pokemones
  async GetDataHead(met, ogg) {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=${ogg}&limit=6`;
    // console.log(url);
    await fetch(url, { method: met })
      .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then(data => {
        data["results"].forEach(r => {
          fetch(r.url, { method: this.meth })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(response);
            })
            .then(data => {
              this.addData(data);
            })
            .catch(err => {
              console.log("Something was wrong lv2 ", err);
            });
        });
      })
      .catch(err => {
        console.log("Something was wrong", err);
      })
      .finally(() => {
        //console.log(this.wiki);
      });
    //console.log("fin");
    //this._sendData(foo);
  }

  // agregar los datos extraidos a un arreglo global
  addData(data) {
    let nombre = data.name;
    let img = data.sprites.front_default;
    let hpp = data.stats[0].base_stat;
    let attc = data.stats[1].base_stat;

    this.wiki.push({
      name: nombre,
      image: img,
      hp: hpp,
      attack: attc
    });

    if (this.wiki.length === 6) {
      //console.log("datos enviado: "+ `${this.wiki}`);
      this._sendData(this.wiki);
      this.wiki = [];
    }
  }
}

customElements.define("get-data", GetData);
