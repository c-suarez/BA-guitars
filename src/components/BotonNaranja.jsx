import styled from 'styled-components'

const BotonNaranja = styled.button`
  background-color: #ff6600;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  cursor: pointer;
  outline: none;
  &:hover,
  &:focus {
    background-color: #e55a00;
    box-shadow: 0 4px 16px rgba(255, 102, 0, 0.13);
    transform: translateY(-2px) scale(1.03);
  }
  &:active {
    background-color: #b34700;
    transform: scale(0.98);
  }
  &:disabled {
    background-color: #ccc;
    color: #888;
    cursor: not-allowed;
    box-shadow: none;
  }
`

export default BotonNaranja
