export const btns = (da) => {
    document.querySelector('poke-batallas').renderRoot.querySelector('battle-poke').setAttribute('battle', da);
}

export const resetView = () => {
  let bttpoke = document.querySelector('poke-batallas').renderRoot.querySelector('battle-poke');
  let wnpoke = document.querySelector('poke-batallas').renderRoot.querySelector('wons-poke');
  let cntpoke = document.querySelector('poke-batallas').renderRoot.querySelector('cont-poke');

  bttpoke.setAttribute('arrpokes', '{"da":[]}');
  bttpoke.setAttribute('arrpok', null);
  bttpoke.setAttribute('battle', 0);
  wnpoke.setAttribute('wons','');
  cntpoke.setAttribute('reset', true);
  cntpoke.removeAttribute('next');

  actualizarContPoke();
  eliminarLCSChecked();

}

export const eliminarLCSChecked = () => {
    let item = localStorage.getItem('checked');
      if(item !== null){
        localStorage.removeItem('checked');
      }
}

export const actualizarContPoke = () => {
  let cpok = document.querySelector('poke-batallas').renderRoot.querySelector('cont-poke');
  setTimeout(() => {
    cpok.setAttribute('page', 1);
    cpok.setAttribute('page', 0);
    cpok.setAttribute('next', 0);
  }, "100");

}

export function processWon(data){
  let won = document.querySelector('poke-batallas').renderRoot.querySelector('wons-poke');
  won.setAttribute('wons', JSON.stringify(data));
  //console.log("listo", data);
}

export function processPokes(data){
  let bttpoke = document.querySelector('poke-batallas').renderRoot.querySelector('battle-poke');
  bttpoke.setAttribute('arrpokes', JSON.stringify(data));
  //console.log("listo", data);
}