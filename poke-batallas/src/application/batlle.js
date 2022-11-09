var arrpok = [];

export function obtainPokes(arrpokes) {
  let arrayPokemons = [];
  if (arrpokes.da !== undefined) {
    arrpokes.da.forEach(s => arrayPokemons.push(JSON.parse(s)));
  }
  arrpok = arrayPokemons;
  return arrpok;
}

export function battleRamdom() {
  //let aleat = Math.floor(Math.random() * this.arrpok.length);
  let aleat = Math.floor(Math.random() * 10 % 2);
  let copiaArray = arrpok;

  let oneAttack = copiaArray[aleat];
  copiaArray = copiaArray.filter(
    nombre => nombre["nombre"] !== oneAttack["nombre"]
  );
  let twoAttack = copiaArray[0];

  //console.log("one -> ", oneAttack);
  //console.log("two -> ", twoAttack);

  const f = startBattle(oneAttack, twoAttack);
  senDataWon(f);
}

export function senDataWon(data) {
  let btt = document
    .querySelector("poke-batallas")
    .renderRoot.querySelector("battle-poke");
  btt.dispatchEvent(
    new CustomEvent("poke-won", {
      detail: { data },
      bubbles: true,
      composed: true
    })
  );
}

export function startBattle(first, second) {
  // TODO: this
  let hp1 = parseInt(first["hp"]);
  let hp2 = parseInt(second["hp"]);

  let pw1 = parseInt(first["attack"]);
  let pw2 = parseInt(second["attack"]);

  while (hp1 > 0) {
    hp2 -= pw1;
    if (hp2 > 0) {
      hp1 -= pw2;
    } else {
      return first;
    }
  }
  return second;
}

export function activarBtnBatalla(battle) {
  //console.log("why??? ",this.battle);
  let btt = document
    .querySelector("poke-batallas")
    .renderRoot.querySelector("battle-poke")
    .renderRoot.querySelector("div");
  let cons = btt.querySelector("button");
  if (battle === 1) {
    cons.removeAttribute("disabled");
  } else {
    cons.setAttribute("disabled", "");
  }
}
