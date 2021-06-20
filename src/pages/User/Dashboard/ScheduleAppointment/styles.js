import styled from 'styled-components';
import { colors } from '../../../../colors';

export const MainContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, black, black, #1f1f1f, #2e2e2e);
  overflow-y: hidden;

  #closure {
    display: flex;
    flex-direction: column;
    height: 90vh;
    min-width: 30vw;
    max-width: 30vw;
    background-color: transparent;
    overflow-y: hidden;

    #content {
      display: flex;
      flex-direction: column;
      width: 100%;
      color: white;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display: none;
      }

      #barber-image-container {
        display: flex;
        align-items: center;
        height: 150px;

        #barber-image {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
        }

        h2 {
          margin-left: 0.5em;
        }
      }

      #available-services-container {
        display: flex;
        flex-direction: column;
        margin-top: 1em;

        h4 {
          margin-bottom: 0.8em;
        }

        span {
          margin-bottom: 0.5em;
        }
      }

      #availability-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 1.5em;
        box-sizing: border-box;

        h4 {
          :nth-child(2) {
            margin-top: 1em;
          }
        }

        #calendar {
          background-color: white;
          width: 100%;
          height: 290px;
        }

        #available-times-title {
          color: ${colors.SkyBlue};
        }

        #time-buttons-container {
          display: flex;
          flex-wrap: wrap;

          #time-button {
            width: 60px;
            height: 40px;
            background: transparent;
            border: 1px solid white;
            cursor: pointer;
            margin: 0.3em 0.3em;
            color: white;
          }
        }

        #scheduling-button {
          margin-top: 2em;
          width: 150px;
          height: 30px;
          background: #05598b;
          border: 1px solid #05598b;
          border-radius: 5px;
          color: white;
        }
      }
    }
  }
`;
