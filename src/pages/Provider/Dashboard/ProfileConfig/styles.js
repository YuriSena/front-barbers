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

        #services-container {
          display: flex;
          width: 80%;

          label {
            display: flex;
            flex-direction: column;
            margin: 0.5em;
            width: 80%;
            height: 60px;
            font-weight: 500;

            input {
              height: 100%;
              padding: 0.3em;
              font-size: 16px;
              border: 1px solid;
              border-radius: 5px;
            }
          }

          input {
            width: 20px;
          }
        }

        #services-price-container {
          display: flex;
          width: 80%;

          label {
            display: flex;
            flex-direction: column;
            margin: 0.5em;
            width: 80%;
            height: 70px;
            font-weight: 500;

            input {
              height: 100%;
              padding: 0.3em;
              font-size: 16px;
              border: 1px solid;
              border-radius: 5px;
              width: 100px;
            }
          }
        }

        #shifts-container {
          display: flex;
          position: relative;
          margin-top: 0.5em;
          padding-top: 0.5em;

          &:before {
            display: block;
            content: '';
            width: 100%;
            height: 3px;
            background-color: rgba(0, 0, 0, 0.2);
            position: absolute;
            top: 0;
          }

          #checkbox-container {
            display: flex;
            flex-direction: column;
            width: 100%;

            label {
              display: flex;
              width: 100%;
              text-align: center;
              align-items: center;

              input {
                width: 20px;
                margin-top: 0;
                margin-right: 0.5em;
              }
            }

            #start-end-container {
              display: flex;
              flex-direction: row;
              width: 100%;
              justify-content: start;
              align-items: center;
              margin-bottom: 1em;

              label {
                width: auto;
                margin-left: 0.5em;
              }

              input {
                width: 80px;
                margin-top: 0;
                margin-left: 0.5em;
              }
            }

            #addShift-container {
              display: flex;
              width: 100%;
              padding-left: 0.6em;
              align-items: center;
              color: #b2acfa;
              cursor: pointer;

              span {
                margin-left: 0.2em;
              }
            }
          }
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
        }
      }

      button {
        min-height: 40px;
        color: white;
        border: 1px solid;
        border-radius: 5px;
        background-color: black;
        cursor: pointer;
      }
    }
  }
`;
