import styled from 'styled-components';

export const Page = styled.div`
  font-family: Helvitica, Arial;
  padding: 1em;
  background: papayawhip;
`;

export const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`;

export const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

export const Input = styled.input`
  margin: 0.25em;
`;

export const BlogLink = styled.div`
  padding-top: 0.75em;  

  &:hover {
    background-color: Chocolate;
  }
`;
