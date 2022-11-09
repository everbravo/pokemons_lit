import { css } from "lit";

export const styleswon = css`
    :host {
        padding: 0 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main-container{
        align-content: center;
        justify-content: center;
        width: 87%;
    }
    .cont-poke{
        width:100%;
    }
    img{
        width:auto;
        max-width: 40%;
    }
    button{
        width: 100%;
        border-radius: 15px;
        border: 1px solid #c9c9c9;
        font-family: "Comic Sans MS", "Comic Sans", cursive;
        font-size: 16px;
        background-color: rgb(233, 212, 212);
    }
    .btn-battle{
        margin: 10px;
        align-self: center;
        width: 100%;
    }
    `;
