import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Footer = styled.footer`
  margin-top: auto;
  text-align: center;
  padding: 5px 0;
  color: #645555;
`;

export const StyledHeader = styled.header`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.div`
  position: absolute;
  top: 5px;
  left: 2%;

  img {
    display: block;
  }

  .host {
    display: block;
    margin-top: -10px;
    font-size: 14px;
    color: #645555;
  }
`;

export const H1 = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: normal;
  width: 50%;
  text-align: center;
  line-height: 1;
  background: linear-gradient(to right bottom, #45548f, #fc5656);
  background-clip: text;
  -webkit-background-clip: text;
  -ms-background-clip: text;
  color: transparent;

  @media screen and (max-width: 600px) {
    font-size: 30px;
  }
`;

export const About = styled.div`
  margin-bottom: 30px;
  font-size: 16px;
  color: #645555;
`;

export const Button = styled.button`
  color: white;
  background: linear-gradient(to right bottom, #45548f, #fc5656);
  border: none;
  border-radius: 3px;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0 1px 10px 1px #b8b8b8;
    cursor: pointer;
    transform: translate(-1px, -1px);
  }

  &:active {
    background: linear-gradient(to bottom, #263a8b, #f73838);
  }
`;

export const Start = styled(Button)`
  padding: 25px 80px;
  font-size: 20px;
`;

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledProcess = styled.div`
  /* @media screen and (max-width: 600px) {
    text-align: end;
  }
  @media screen and (min-width: 600px) {
    position: absolute;
    top: 15px;
  } */

  right: 10px;
  font-size: 15px;
  color: #645555;
`;

export const Main = styled.main`
  width: min(80%, 1200px);
  margin: 0 auto 50px;
  position: relative;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: center;
    font-size: 37px;
    color: #242121;

    @media screen and (max-width: 600px) {
      font-size: 25px;
    }
  }

  .task {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: center;
    font-size: 17px;
    font-style: italic;
    color: #242121;
  }

  .table {
    width: 100%;
    //margin-bottom: 10px;

    tr {
      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
      display: flex;

      @media screen and (max-width: 600px) {
        flex-direction: column;
      }

      box-shadow: 0 0 5px #ccc;

      td {
        padding: 15px 10px;
        font-size: 17px;
        color: #242121;
        border: none;
        display: flex;
        align-items: center;

        &:first-child {
          font-weight: bold;
          width: 30%;

          @media screen and (max-width: 600px) {
            width: 90%;
            justify-content: center;
            text-align: center;
          }

          @media screen and (min-width: 600px) and (max-width: 1000px) {
            width: 50%;
          }
        }

        &:last-child {
          width: 70%;

          @media screen and (max-width: 600px) {
            width: 90%;
            justify-content: center;
            text-align: center;
            padding-top: 0;
          }

          @media screen and (min-width: 600px) and (max-width: 1000px) {
            width: 50%;
          }
        }
      }
    }

    tr:nth-child(3n):not(:last-child) {
      margin-bottom: 12px;
    }

    tr:nth-child(6n):not(:last-child) {
      margin-bottom: 30px;
      border-bottom: none;
    }

    tr:nth-child(12n + 1),
    tr:nth-child(12n + 2),
    tr:nth-child(12n + 3),
    tr:nth-child(12n + 4),
    tr:nth-child(12n + 5),
    tr:nth-child(12n + 6) {
      background-color: rgba(69, 84, 143, 0.06);
    }

    tr:nth-child(12n + 7),
    tr:nth-child(12n + 8),
    tr:nth-child(12n + 9),
    tr:nth-child(12n + 10),
    tr:nth-child(12n + 11),
    tr:nth-child(12n + 12) {
      background-color: #ffffff;
    }

    tr:nth-child(6n + 1) {
      border-radius: 10px 10px 0 0;
    }

    tr:nth-child(6n + 6),
    tr:last-child {
      border-radius: 0 0 10px 10px;
    }
  }

  p.message {
    height: 16px;
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: right;
    opacity: 0;
    visibility: hidden;
    transition: all 1s ease;

    &.visible {
      opacity: 1;
      visibility: visible;
    }

    @media screen and (max-width: 380px) {
      font-size: 14px;
    }
  }

  input {
    outline: none;
    padding: 10px 5px;
    font-size: 17px;
    border: 2px solid gray;
    transition: 1s ease all;
    border-radius: 10px;

    &:focus {
      outline: none;
      border: 2px solid #45548f;
    }

    &.en {
      font-weight: bold;
      width: 90%;
      text-align: right;

      @media screen and (max-width: 600px) {
        text-align: center;
      }
    }

    &.ru {
      text-align: left;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .control {
    text-align: right;

    .button {
      margin-left: 7px;
      padding: 15px 25px;
      font-size: 18px;
      width: 236px;
      color: white;
      background: linear-gradient(to right bottom, #45548f, #fc5656);
      border: none;
      border-radius: 3px;

      &:hover {
        box-shadow: 0 1px 10px 1px #b8b8b8;
        cursor: pointer;
        transform: translate(-1px, -1px);
      }

      &:active {
        background: linear-gradient(to bottom, #263a8b, #f73838);
      }
    }
  }

  .retail {
    margin-bottom: 10px;
    position: relative;
    height: fit-content;

    .text {
      margin: 0;
      border: 2px dashed gray;
      padding: 10px;
      text-align: justify;
      font-size: 18px;
      line-height: 1.3;
      position: absolute;
      top: 0;
      background-color: #fff;
      opacity: 0;
      transition: opacity 0.5s ease, visibility 0.5s ease;
      z-index: 1;
      user-select: none;
    }

    .show {
      opacity: 1;
      visibility: visible;
    }

    .hide {
      opacity: 0;
      visibility: hidden;
    }

    .textarea {
      text-align: justify;
      font-size: 18px;
      font-family: "Inter", serif;
      line-height: 1.3;
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      border: 2px solid gray;
      transition: 1s ease border-color;
      resize: none;
      position: absolute;
      top: 0;

      &:focus {
        outline: none;
        border: 2px solid #45548f;
      }
    }
    .missed {
      text-decoration: #f73838 underline;
      background-color: #ffcbcb;
    }

    .correct {
      text-decoration: #28a745 underline;
      background-color: #d4edda;
    }
  }
`;

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TheEnd = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 16px;
  color: #645555;
`;

export const ResetButton = styled.div`
  color: #645555;

  &:hover {
    cursor: pointer;
    color: #f73838;
  }
`;

export const Confirm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(69, 84, 143, 0.71);
  z-index: 2;

  .confirm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 360px;
    height: 120px;
    padding: 10px;
    background-color:rgb(218, 225, 255);
    text-align: center;
    border-radius: 10px;

    p {
      margin: 0 0 20px 0;
    }

    button {
      padding: 10px 20px;
      margin: 0 5px;
  }
`;

export const Alert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(69, 84, 143, 0.71);
  z-index: 2;

  div {
    width: 360px;
    height: 120px;
    padding: 10px;
    background-color:rgb(218, 225, 255);
    text-align: center;
    border-radius: 10px;

    

    button {
      padding: 10px 20px;
      margin: 0 5px;
  
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: -44px;
  left: -27px;
  width: 100px;
  background-color: rgb(208, 214, 238);
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  z-index: 1;

  .tooltip-arrow {
    width: 10px;
    height: 10px;
    background-color: rgb(208, 214, 238);
    position: absolute;
    bottom: -5px;
    transform: rotate(45deg);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 0;
  }
`;
