import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  position: absolute;
  top: o;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;

  #content {
    display: flex;
    flex-direction: column;
    padding: 2em;
    height: 80%;

    form {
      display: flex;
      flex-direction: column;
      margin-bottom: 2em;

      input {
        margin-top: 1em;
        height: 40px;
        padding-left: 1em;
        border: 1px solid;
        border-radius: 5px;
      }
    }

    #button-container {
      display: flex;
      width: 100%;
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
