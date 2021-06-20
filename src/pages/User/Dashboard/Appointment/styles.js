import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  background: linear-gradient(to bottom, black, black, #1f1f1f, #2e2e2e);
  color: white;

  #content {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 500px;
    max-width: 50%;

    #barber-image-container {
      display: flex;
      width: 100%;
      height: 150px;
      align-items: center;

      img {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        object-fit: cover;
      }

      h2 {
        text-align: center;
        margin: 0 0 0 0.5em;
      }
    }

    #info-container {
      display: flex;
      width: 100%;
      flex-direction: column;
      padding: 1em 0;
      .info-text {
        display: flex;
        padding: 0.5em 0;
        width: 100%;
        font-size: 18px;
        font-weight: 600;
      }
    }

    #button-container {
      display: flex;
      width: 100%;
      justify-content: space-between;

      button {
        width: 150px;
        height: 40px;
        background: transparent;
        border: 1px solid white;
        border-radius: 5px;
        color: white;
        cursor: pointer;
      }
    }
  }
`;
