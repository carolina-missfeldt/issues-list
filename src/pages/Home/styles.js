import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
  padding: 5em;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 55px;
    padding: 0 20px;
    background: #fff;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
    border: ${(props) => (props.withError ? "2px solid #f00" : 0)};
  }
`;

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  height: 55px;
  padding: 0 20px;
  margin-left: 10px;
  background: #63f5b8;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: 0;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: #52d89f;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;
    width: 100%;
    max-width: 1000px;
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
    
        & + li {
        border-top: 1px solid #eee;
        }
    
        a, button {
        color: #63f5b8;
        text-decoration: none;
        margin-left: 20px;
        }
    }
    `;
