// comenzar una nueva batalla
export const startNewBattles = () => {
  let wns = document
    .querySelector("poke-batallas")
    .renderRoot.querySelector("wons-poke");
  wns.dispatchEvent(
    new CustomEvent("new-battle", {
      detail: null,
      bubbles: true,
      composed: true
    })
  );
};

// activar el boton de batalla
export function activarBtnBatalla(wons) {
  //console.log("why??? ",this.battle);
  let wns = document
    .querySelector("poke-batallas")
    .renderRoot.querySelector("wons-poke")
    .renderRoot.querySelector("div");
  let cons = wns.querySelector("button");
  if (wons === "") {
    cons.setAttribute("disabled", "");
  } else {
    cons.removeAttribute("disabled");
  }
}

// guardar informacion de pokemones ganadores al local storage
export function saveToLCS(data) {
  let key = "wons";
  let nombre = data.nombre;
  this.verGetLocalData(key, nombre);
}

// Obtener los datos almacenados en el local storage
export function verGetLocalData(key, name) {
  let localSave = [];
  const item = localStorage.getItem(key);
  if (item !== null) {
    findPokeData(name, JSON.parse(item));
  } else {
    localSave.push({ nombre: name, battles: 1 });
    localStorage.setItem(key, JSON.stringify(localSave));
  }
}

// buscar un pokemon en los datos del local storage
export function findPokeData(nombre, data) {
  let bool = false;
  data.forEach(element => {
    if (element.nombre === nombre) {
      element.battles += 1;
      bool = true;
    }
  });
  if (!bool) {
    data.push({ nombre: nombre, battles: 1 });
  }
  localStorage.setItem("wons", JSON.stringify(data));
}
