import styled from 'styled-components';
import { colors } from '../../../colors';

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 4fr 2fr 1fr;
  grid-template-rows: 50px 1fr 2fr 1fr;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-image: linear-gradient(to bottom, black, black, #1f1f1f, #2e2e2e);

  #logo-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* background: white; */
    grid-column: 3/4;
    grid-row: 2/3;

    #logo-image {
    }

    #logo-title {
      color: white;
      font-size: 30px;
    }
  }

  #select-container {
    display: flex;
    color: black;
    grid-column: 3/4;
    grid-row: 2;
    align-items: flex-end;
    /* background-color: white;
    height: 25px; */

    #provider-select {
      display: flex;
      flex: 1;
      background-color: gray;
      height: 35px;
      justify-content: center;
      align-items: center;
      border: 2px solid rgba(0, 0, 0, 0.4);
      color: white;
      cursor: pointer;
    }

    #client-select {
      display: flex;
      flex: 1;
      background-color: white;
      height: 35px;
      justify-content: center;
      align-items: center;
      border: 2px solid rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }
  }

  #modal-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    grid-column: 3/4;
    grid-row: 3/4;
    background: white;
    padding: 1em;
    border-radius: 5px;

    #modal-title-container {
      text-align: center;
    }

    #form-container {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      label {
        display: flex;
        flex-direction: column;
        margin: 0.5em;
        width: 80%;
        height: 60px;
        font-weight: 600;
        input {
          height: 100%;
          padding: 0.3em;
          font-size: 16px;
          border: 1px solid;
          border-radius: 5px;
        }
      }
    }

    #question-container {
      display: flex;
      margin: 1em 0 1em 0;

      #link-to-register {
        margin-left: 0.3em;
        cursor: pointer;
        color: ${colors.SkyBlue};
      }
    }

    #button-container {
      display: flex;
      width: 80%;
      height: 50px;
      justify-content: space-evenly;
      align-items: space-evenly;

      button {
        width: 20%;
        background: transparent;
        border-radius: 5px;
        background-color: #363636;
        color: white;
        height: auto;
        cursor: pointer;
      }
    }
  }
`;
