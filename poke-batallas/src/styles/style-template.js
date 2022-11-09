import { css } from "lit";

export const stylestemplate = css`

    @media (max-width: 900px) {
        .dash{
            flex-direction:column;
            align-items:center;
        }
        h1{
        font-size:1.5em !important;
        }
        .container1{
        width:90% !important;
        }
        .container2{
            width:90% !important;
            padding-top:1em !important;
        }
        .sep{
            margin:2em !important;
        }
    }

    :host{
        display:block;
        text-align:center;
        font-family: "Comic Sans MS", "Comic Sans", cursive;
    }
    .dash{
        display:flex;
        justify-content:center;
    }
    h1{
      font-size:2em;
      margin:0;
    }
    .container1{
        width:40%;
        margin:0.5em;
    }
    .container2{
        width:40%;
        margin:0.5em;
    }
    .cont1{
        height:49%;
        background-color:#e9d4d4;
    }
    .cont2{
        height:49%;
        background-color:#c9ede1;
    }
    .sep{
        height:2%;
    }

    `;
