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

  #closure {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30vw;

    h1 {
      font-weight: 600;
      margin-top: 2em;
      align-self: center;
    }
    #content {
      display: flex;
      height: 50vh;
      flex-direction: column;
      padding: 2em;
      height: 80%;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display: none;
      }

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

        h3 {
          margin-top: 2em;
        }
      }

      #avatar-container {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 2em;
        flex-direction: column;

        #picture-switch-container {
          display: flex;
          position: relative;
          z-index: 5;

          &:hover {
            filter: brightness(80%);
          }

          input[type='file'] {
            display: none;
          }

          label {
            width: 150px;
            height: 150px;
            background-color: transparent;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
            /* margin: 10px; */
            padding: 6px 20px;
            position: absolute;
          }

          img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        span {
          margin-top: 1em;
          color: black;
        }
      }

      #button-container {
        display: flex;
        justify-content: space-between;
        width: 100%;

        button {
          width: 80px;
          height: 40px;
          color: white;
          border: 1px solid;
          border-radius: 5px;
          background-color: black;
          cursor: pointer;

          :nth-child(2) {
            background-color: #6558f5;
          }
        }
      }

      #delete-account-button {
        margin-top: 2em;
        width: 150px;
        height: 35px;
        background-color: #d3455b;
        border: 1px solid;
        border-radius: 5px;
        color: white;
        cursor: pointer;
      }
    }
  }
`;
