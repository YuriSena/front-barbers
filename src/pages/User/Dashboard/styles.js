import styled from 'styled-components';

import dashboardBackground from '../../../assets/dashboardBackground1.png';

export const MainContainer = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  grid-template-columns: 20px 1fr 3fr 1fr 20px;
  grid-template-rows: 20px repeat(5, 1fr) 20px;
  background-image: url(${dashboardBackground});

  #menu-avatar {
    display: flex;
    grid-column: 2/3;
    grid-row: 2;
    position: relative;

    #image-container {
      display: flex;
      width: 100%;
      height: 35%;
      box-sizing: border-box;
      color: white;
      cursor: pointer;

      #profile-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }

      #user-name {
        padding-left: 1em;
        padding-top: 1em;
        width: 80%;
      }

      #menu-arrow {
        position: absolute;
      }
    }

    #pop-up-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 4.8em;
      top: 4em;
      background-color: white;
      width: 50%;
      padding: 1em 0 1em 1em;
      border-radius: 8px;
      box-shadow: 5px 5px rgba(0, 0, 0, 0.3);
      transition: 300ms;

      span {
        cursor: pointer;
      }

      #profile-config {
        padding-bottom: 1em;
      }
    }
  }

  #closure {
    display: block;
    grid-column: 3;
    grid-row: 2/7;
    height: 100%;
    overflow-y: hidden;

    #content-container {
      display: flex;
      flex-direction: column;
      grid-column: 3;
      grid-row: 2/7;
      color: black;
      height: 90vh;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display: none;
      }

      #content-title {
        text-align: center;
        color: white;
      }

      #content-title2 {
        text-align: center;
        color: white;
        margin-top: 1em;
      }

      #barber-container {
        display: flex;
        min-height: 10%;
        align-items: center;
        margin: 1em 0 1em 0;
        border: 2px solid rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        background: #807e66;
        padding-left: 1em;

        #barber-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        #barber-info-container {
          display: flex;
          height: 80%;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5em;
          cursor: pointer;

          span {
            font-weight: 600;
          }

          button {
            width: 100px;
            height: 40px;
            background: #05598b;
            border: 1px solid #05598b;
            border-radius: 5px;
            color: white;
            cursor: pointer;
          }
        }
      }

      #appointment-day {
        color: white;
        margin-top: 1.5em;
      }

      #appointment-error-message {
        color: white;
        text-align: center;
        margin-top: 1em;
      }
    }
  }
`;
