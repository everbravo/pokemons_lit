export var info = [];
export var _pokes = [];
export var reset = false;
export var arrpok = [];
export var page = 0;

export function _formatData(data) {
    let batt = selectBattlesPokes();
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
    return pokes;
  }


export const selectBattlesPokes = () => {
    let localSave = localStorage.getItem('wons');
    if(localSave !== null){
      //console.log('LocalStorage: ', JSON.parse(localSave));
      return JSON.parse(localSave);
    }
    return [];
    
  }

  var pokesSelectedPag = [];

  export function addPokesPagesSelected(dataVal){
    let data = JSON.parse(dataVal);
    let continuar = (pokesSelectedPag.length > 0);
    var jsonSve = {'id':data.nombre};
    if(continuar){
      findPokesPagesSelected(dataVal, jsonSve);
    }else{
      pokesSelectedPag.push(jsonSve);
      _pokes.push(dataVal);
    }

  }

  export function findPokesPagesSelected(dataVal, json) {
    let bool = false;
    let data = JSON.parse(dataVal);
    pokesSelectedPag.forEach(element => {
        if(element.id === data.nombre){
            bool = true;
        }
    });
    if(!bool){
      pokesSelectedPag.push(json);
      _pokes.push(dataVal);
    }
  }

  export function deletePokesPagesSelected(dataVal) {
    let data = JSON.parse(dataVal);
    pokesSelectedPag.forEach((element, position) => {
          if(element.id === data.nombre){
            pokesSelectedPag.splice(position, 1);
            _pokes.splice(_pokes.indexOf(dataVal), 1);
          }
      });
  }

  export const findCheckPokesPagesSelected = () => {
    let pk1 = document.querySelector('poke-batallas').renderRoot.querySelector('cont-poke').renderRoot.querySelector('div');
    desmarcarTodo(pk1);
    marcarSeleccionados(pk1);
    verificarCantPokes();
    
}

const marcarSeleccionados = (pk1) => {
  pokesSelectedPag.forEach((element) => {
    let tempSel = pk1.querySelector('input[type="checkbox"]#'+element.id);
    if (tempSel !== null){
      tempSel.checked = true;
      tempSel.disabled = false;
    }
    
  });
}

const desmarcarTodo = (pk1) => {
  let check = pk1.querySelectorAll('input[type="checkbox"]');
    check.forEach((i) => {
      i.checked = false;
    });
}

  // deprecated
/*export function checkSaveToLCS(data) {
  addPokesPagesSelected(1, data.nombre);
  console.log('C',pokesSelectedPag);
    let key = 'checked';
    let nombre = data.nombre;
    checkGetLocalData(key, nombre);
}

export function checkGetLocalData(key, name) {
      let localSave = [];
      const item = localStorage.getItem(key);
      if(item !== null){
          checkFindPokeData(name, JSON.parse(item));
      }else{
          localSave.push({nombre: name, page:page});
          localStorage.setItem(key, JSON.stringify(localSave));
      }
  }

export function checkFindPokeData(name, data) {
      let bool = false;
      data.forEach(element => {
          if((element.page === page) && (element.nombre === name)){
              bool = true;
          }
      });
      if(!bool){
          data.push({nombre: name, page:page});
      }
      localStorage.setItem("checked",JSON.stringify(data));
  }

export function checkDeletePokeData(name) {
      let item = localStorage.getItem('checked');
      if(item !== null){
        item = JSON.parse(item);
        item.forEach((element, position) => {
            if((element.page === page) && (element.nombre === name)){
                item.splice(position, 1);
            }
        });
        localStorage.setItem("checked",JSON.stringify(item));
      }
  }

export const checkedFindPokeDataOne = () => {
      let item = localStorage.getItem('checked');
      if(item !== null){
        item = JSON.parse(item);
      }else{
        item = [];
      }
      let check = [];
      let pk1 = document.querySelector('poke-batallas').renderRoot.querySelector('cont-poke').renderRoot.querySelector('div');
      check = pk1.querySelectorAll('input[type="checkbox"]');
      check.forEach((i) => {
        item.forEach((element) => {
          if((element.page === page)&& (element.nombre === i.id)){
            i.checked = true;
            i.disabled = false;
          }else{
            i.checked = false;
            //i.disabled = true;
          }
        })
      });
  }*/
  // end deprecated

export function doChange(e) {
    //console.log(e.target.checked);
    if(e.target.checked){
        addPokesPagesSelected(e.target.value);
    }else{
        deletePokesPagesSelected(e.target.value);
    }
    //console.log(this._pokes);
    console.log("pke... ", pokesSelectedPag);
    verificarCantPokes();
    enviarPokemons();
  }

export const enviarPokemons = () =>{
    let da = _pokes;
    let pk1 = document.querySelector('poke-batallas').renderRoot.querySelector('cont-poke');
    pk1.dispatchEvent(new CustomEvent('poke-add', {
        detail:{da},
        bubbles:true,
        composed: true
    }));
  }

export function btnBatalla(bool){
    //console.log("batalla en estado ", bool);
    let pk1 = document.querySelector('poke-batallas').renderRoot.querySelector('cont-poke');
    pk1.dispatchEvent(new CustomEvent('activar-battle', {
        detail:{val:bool},
        bubbles:true,
        composed: true
    }));
  }

export const verificarCantPokes = () => {
    //console.log(this._pokes);
    let check = [];
    let pk1 = document.querySelector('poke-batallas').renderRoot.querySelector('cont-poke').renderRoot.querySelector('div');
    check = pk1.querySelectorAll('input[type="checkbox"]:not(:checked)');
    //console.log("CHK -> ",check);
    if(_pokes.length == 2 ){
        btnBatalla(1);
        check.forEach((item) => {
            item.disabled = !item.disabled;
          });
    }else{
        btnBatalla(0);
        check.forEach((item) => {
            item.disabled = false;
          });
    }
  }

export const resetearSelects = (bool) => {
    if(bool === true){
      pokesSelectedPag = [];
        arrpok = [];
        _pokes = [];
        page = 0;
        let pk1 = document.querySelector('poke-batallas').renderRoot.querySelector('cont-poke').renderRoot.querySelector('div');
        let check = pk1.querySelectorAll('input[type="checkbox"]');
        check.forEach((item) => {
            item.disabled = false;
            item.checked = false;
        });
    }
  }