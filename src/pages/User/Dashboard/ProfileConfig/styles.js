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

    button {
      height: 40px;
      color: white;
      border: 1px solid;
      border-radius: 5px;
      background-color: black;
      cursor: pointer;
    }
  }
`;
