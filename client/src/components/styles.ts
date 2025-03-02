import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
`;

export const About = styled.div`
  margin-bottom: 30px;
  font-size: 16px;
  color: #645555;
`;

export const Start = styled.button`
  padding: 25px 80px;
  font-size: 20px;
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

export const StyledProcess = styled.div`
  @media screen and (max-width: 600px) {
    text-align: end;
  }
  @media screen and (min-width: 600px) {
    position: absolute;
    top: 15px;
  }

  right: 10px;
  font-size: 15px;
  color: #645555;
`;

export const Main = styled.main`
  width: min(80%, 800px);
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
    margin-bottom: 15px;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid #ccc;
    }

    tr:last-child {
      border-bottom: none;
    }

    tr:nth-child(3n) td {
      border-bottom: 10px solid transparent;
    } 

    tr:nth-child(6n) td {
      border-bottom: 20px solid transparent;
    } 

    td {
      padding: 15px 10px;
      font-size: 17px;
      color: #242121;
    }

    td:first-child {
      font-weight: bold;
      width: 30%;
    }

    td:last-child {
      width: 70%;
    }
  }

    input {
      outline: none;
      padding: 10px 5px;
      font-size: 17px;
      border: 2px solid gray;
      transition: 1s ease all;
      border-radius: 3px;

      &:focus {
        outline: none;
        border: 2px solid #45548f;
      }
    }

    input.en {
      font-weight: bold;
      text-align: right;
      width: 90%;
    }

    input.ru {
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
