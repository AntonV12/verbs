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
    font-family: Arial;
    font-size: 14px;
    color: #645555;
  }
`;

export const H1 = styled.h1`
  margin-top: 0;
  margin-bottom: 7px;
  font-family: "Times New Roman";
  font-size: 50px;
  font-weight: normal;
  width: 50%;
  text-align: center;
`;

export const About = styled.div`
  margin-bottom: 30px;
  font-family: Arial;
  font-size: 16px;
  color: #645555;
`;

export const Start = styled.button`
  padding: 25px 80px;
  font-family: Tahoma;
  font-size: 20px;
  color: #3d593d;
  background-color: #d6f1d6;
  border: 1px solid green;
  border-radius: 3px;
  transition: 1s ease all;

  &:hover {
    cursor: pointer;
    background-color: #c6e5c6;
  }
`;

export const Main = styled.main`
  width: min(100%, 800px);
  margin: 0 auto 50px;
  position: relative;

  .process {
    @media screen and (max-width: 600px) {
      text-align: end;
    }
    @media screen and (min-width: 600px) {
      position: absolute;
      top: 15px;
    }

    right: 0;
    font-family: Arial;
    font-size: 15px;
    color: #645555;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 5px;
    text-align: center;
    font-family: "Times New Roman";
    font-size: 37px;
    font-weight: normal;
  }

  .task {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: center;
    font-family: Arial;
    font-size: 17px;
    font-style: italic;
    color: #242121;
  }

  .table {
    width: 100%;
    margin-bottom: 15px;

    td {
      border: 1px solid gray;
      padding: 15px 10px;
      font-family: Arial;
      font-size: 17px;
      color: #242121;
    }

    td:first-child {
      font-weight: bold;
      text-align: center;
      width: 30%;
    }

    td:last-child {
      width: 70%;
    }

    input {
      outline: none;
      padding: 10px 5px;
      font-family: Arial;
      font-size: 17px;
      border: 2px solid gray;
      transition: 1s ease all;

      &:focus {
        outline: none;
        border: 2px solid #0bacbc;
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
      font-family: Tahoma;
      font-size: 18px;
      width: 236px;
      color: #3d593d;
      background-color: #d6f1d6;
      border: 1px solid green;
      border-radius: 3px;
      transition: 1s ease all;

      &:hover {
        cursor: pointer;
        background-color: #c6e5c6;
      }
    }
  }

  .retail {
    margin-bottom: 10px;

    .text {
      margin-top: 0;
      border: 1px dashed gray;
      padding: 10px;
      text-align: justify;
      font-family: Arial;
      font-size: 18px;
      line-height: 1.3;
    }

    .textarea {
      text-align: justify;
      font-family: Arial;
      font-size: 18px;
      padding: 10px;
      width: 100%;
      height: 200px;
      box-sizing: border-box;
      border: 2px solid gray;
      transition: 1s ease all;
      resize: vertical;

      &:focus {
        outline: none;
        border: 2px solid #0bacbc;
      }
    }
    .missed {
      text-decoration: red wavy underline;
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
  font-family: Arial;
  font-size: 16px;
  color: #645555;
`;
