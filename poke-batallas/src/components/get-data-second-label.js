import { LitElement , html} from "lit";

export class GetDataInfo extends LitElement {
    
    static get properties() {
        return {
            url: { type: String },
            meth: {type: String},
            limit: {type: Number},
            offset: {type: Number}
        };
    }

    constructor() {
        super();
        this.meth = "GET";
        this.limit = 6;
        this.paginacion = 0;
    }

    firstUpdated(){
        this.getPokemon();
    }

    getPokemon = async () => {
        let url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.limit}&offset=${this.paginacion}`;
        const response = await fetch(url, {method: this.meth});
        const json = await response.json();
        await this._sendData(json);    
    }

    _sendData(data){
        this.dispatchEvent(new CustomEvent('api-data-second', {
            detail:{data},
            bubbles:true,
            composed: true
        }));
    }

}

customElements.define('get-info', GetDataInfo);

import { LitElement } from "lit";

export class GetData extends LitElement {
    
    static get properties() {
        return {
            urlglob: { type: String },
            meth: {type: String},
            wiki: {type: Array},
            page: {type: Number},
        };
    }

    constructor() {
        super();
        this.wiki = [];
        this.page = 1;
        this.urlglob = "https://pokeapi.co/api/v2/pokemon/?offset=6&limit=6";
        this.meth = "GET";
        this.GetDataHead(this.urlglob, this.meth);
    }

    get datosFinal(){
        let results = [];
        for (let i = 0; i < this.wiki.length; i++){
            results.push(this.wiki[i]);
        }
        console.log(this.wiki);
        return results;
    }

    _sendData(data){
        var d = this.datosFinal();
        this.dispatchEvent(new CustomEvent('api-data', {
            detail:{d},
            bubbles:true,
            composed: true
        }));
    }

    GetDataHead(url, met){
        
        fetch(url, {method: met})
            .then(response => {
                if (response.ok) return response.json();
                return Promise.reject(response);
            })
            .then((data) => {
                data.results.forEach((r) => {
                    fetch(r.url, {method: this.meth})
                        .then(response => {
                            if (response.ok) return response.json();
                            return Promise.reject(response);
                        })
                        .then((data) => {
                            this.wiki.push(
                                {"name":data.name, 
                                "image":data.sprites.front_default, 
                                "hp":data.stats[0].base_stat,
                                "attack":data.stats[1].base_stat}
                            );
                        })
                        .catch((err) =>{
                            console.log("Something was wrong lv2 ", err);
                        });
                });
            })
            .catch((err) =>{
                console.log("Something was wrong", err);
            })
            .finally(()=>{
                this._sendData(this.wiki);
            }); 
    }

}

customElements.define('get-data', GetData);