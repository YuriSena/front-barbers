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

      #provider-name {
        margin-left: 1em;
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

    #content-title {
      text-align: center;
      color: white;
      margin-bottom: 0.5em;
    }

    #content-container {
      display: flex;
      flex-direction: column;
      grid-column: 3;
      grid-row: 2/7;
      height: 90vh;
      color: black;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display: none;
      }

      #appoint-date {
        position: relative;
        padding-bottom: 0.5em;

        &:before {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background-color: white;
          bottom: 0;
          position: absolute;
        }
      }

      #barber-container {
        display: flex;
        min-height: 100px;
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
        }

        #barber-info-container {
          display: flex;
          flex-direction: row;
          padding-left: 1em;
          padding-right: 1em;
          justify-content: space-between;
          width: 100%;

          #info-name {
            width: 40%;
          }
        }
      }
    }
  }
`;
