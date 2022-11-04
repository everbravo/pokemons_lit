import { css } from "lit";

export const stylebatt = css`
    :host {
                display: block;
            }
            .main-container{
                flex-direction: column;
                place-content: center;
                /* margin: -1px; */
                /*border: 1px solid;*/
                padding: 2em;
            }
            img{
            width: 100%;
            }
            .cont-poke{
            display: flex;
            flex-direction: row;
            /*border: 1px solid;*/
            margin: 10px;
            width: 100%;
            justify-content: center;
            }
            .btn-battle{
            margin: 10px;
            align-self: center;
            width: 100%;
            }
            .cont-poke{
            align-self: center;
            }
            .poke{
                text-align: center;
                /*border: 1px solid;
                 margin: 20px; */
                padding: 10px;
                /* align-items: stretch; */
                width: 40%;

            }
            button{
            width: 100%;
            border-radius: 15px;
            border: 1px solid gainsboro;
            background-color: darkkhaki;
            font-family: "Comic Sans MS", "Comic Sans", cursive;
            font-size: 16px;
            }
            
    `;
