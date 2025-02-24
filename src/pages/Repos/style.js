import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div`
  background: #f5f5f5;
  padding: 4em;
  max-width: 1000px;
  margin: 50px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    grid-gap: 0.5rem;
  }

  img {
    width: 40px;
    border-radius: 20%;
  }
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const IssuesList = styled.ul`
  margin-top: 2rem;
  padding-top: 2rem;
  list-style: none;
  max-width: 800px;
margin: 0 auto;

  a {
    text-decoration: none;
    color: #333;

    &:hover {
    color: #52d89f;
  }
  }

  li {
    display: flex;
    padding: 15px 10px;
    border-radius: 4px;
    grid-gap: 10px;
    & + li {
      border-top: 1px solid #eee;
    }
  }


  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .user {
    font-size: 1rem;
    font-style: italic;
  }

  .tag {
    font-size: 0.7rem;
    color: #fff;
    background: #000;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    margin-left: 0.5rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  max-width: 200px;
  margin: 0 auto;
  padding: 1rem 0;
  button {
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const SelectStatus = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 200px;
  }

  select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #eee;
  }

  label {
    font-size: .8rem;
    font-weight: bold;
  }
`;
