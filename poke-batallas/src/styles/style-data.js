import { css } from "lit";

export const styles = css`
    @media (max-width: 900px) {
        p{
            font-size: 10px !important;
        }
        img{
            flex:30px !important;
            width:0 !important;
        }
        .cont-radio{
            flex: 15px !important;
        }
        .cont-datos{
            flex: 55% !important;
        }
    }
    :host{
        display:block;
    }
    .contenedor{
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap:wrap;
        /*margin: 5px;
        border:0.2px solid gray;
        width: -webkit-fill-available;
        width: 80%;
        */
        height:5.5em;
    }
    .mega-cont{
        background-color: rgb(232 231 233);
        /*display: flex;
        */
        flex-direction: column;
        align-items: center;
        /* padding-top:10px;
        */
    }
    p{
        margin: 0;
        font-size:12px;
        font-family: "Comic Sans MS", "Comic Sans", cursive;
    }
    .cont-radio{
        display: flex;
        align-self: center;
        justify-content: center;
        flex: 25px;
    }
    .cont-radio input{
        clip-path: circle(43% at 52% 54%);
    }
    .data{
        text-align:end !important;
    }
    .cont-datos{
        margin:5px;
        display: flex;
        flex:40%;
        padding: 0px 10px 0px 10px;
        width: -webkit-fill-available;
        justify-content: space-evenly;
        align-items: center;
    }
    .cont-datos div{
        text-align: justify 
    }
    img{
        flex:45px;
        width: 100%;
        max-height: 90%;
        max-width: 5em;
    }
    .btns{
        padding:20px;
    }
    get-data{
        display:none;
    }
    `;
