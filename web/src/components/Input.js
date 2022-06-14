import styled from "styled-components";
import { Select } from 'antd'

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  font-family: 'poppins', sans-serif;

  label {
    position: absolute;
    top: 50%;
    left: 7%;
    transform: translate(-7%, -50%);
    font-size: 14px;
    transition: 0.2s ease-out;
    margin-right: 6px;
    color: rgb(85, 88, 111);
  }
`;
export const Input = styled.input`
  padding: 1em;
  color: rgb(85, 88, 111);
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  width: 100%;
  height: 40px;
  background: white;
  border-radius: 5px;
  border: 1px solid #A5ABAF;
  outline: none;

}

&::placeholder {
    color: #A5ABAF !important;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
  }

  &:focus + label,  &:valid + label {
    top: -1px;
    left: 7%;
    padding: 0 4px;
    background: #f9f9f6;
    transition: 0.2s ease-out;
    font-size: 12px
  }
`;

export const InputWithIcon = styled.div`
  color: grey;
  font-size: 16px;
  font-weight: 300;
  width: 100%;
  height: 50px;
  background: white;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  outline: none;

  span {
    position: absolute;
    right: 1rem;
  }

  label {
    font-size: 14px;
    color: rgb(85, 88, 111);
    font-weight: 400
  }
`
export const CustomSelect = styled(Select)`
  display: flex;
  align-items: center;
  width: 100%;

  .ant-select:hover .ant-select-selector {
      border-color: #a2a2a2 !important;
      box-shadow: none !important;
    }

  .ant-select-selector {
    width: 100%;
    height: 50px !important;
    display: flex;
    align-items: center;
    font-weight: 500;
    padding: 0 1rem !important;
    position: relative;
    border: 1px solid  #D2D7DB !important;
    border-radius: 8px !important; 
    color:rgb(85, 88, 111) !important;
    font-size: 15px !important;
    outline: none;

    &:focus {
    outline: none;
    border: 1px solid red !important;
  }

  .ant-select-selection-placeholder {
    color: rgb(85, 88, 111) !important;
    font-size: 14px;
    font-weight: 400
  }

  
}
span.ant-select-arrow {
    position: absolute;
    right: 10px;
  }
  .ant-select-item {
    position: relative;
    display: block;
    min-height: 48px;
    padding: 5px 12px;
    color: red;
    font-size: 15px !important;
    font-family: 'poppins', sans-serif !important;
    color: rgb(85, 88, 111) !important;
    font-size: 14px !important;
    font-weight: 500 !important;
}
  .ant-select-item-option-content {
    flex: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px !important;
    font-family: 'poppins', sans-serif !important;
    color: rgb(85, 88, 111) !important;
    font-size: 14px !important;
    font-weight: 500 !important;
}
.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    color: red !important;
    font-weight: 600;
    background-color: #000;
}
`
export const Button = styled.button`
   color: var(--dark);
    letter-spacing: 1px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: 'poppins', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: 0px;
    cursor: pointer;
    height: 50px;
    background-color: var(--yellow);
    padding: 0 24px;
    width: 100%;
    border-radius: 6px;
    white-space: nowrap;
    margin-top: 0px;
    text-decoration: none;
    transition: all .4s ease;

    &:hover {
      color: var(--yellow);
      background-color: var(--dark);
      font-weight: 600;
    }

`
export const TextArea = styled.textarea`
  padding: 1em;
  color: rgb(85, 88, 111);
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  width: 100%;
  height: 150px;
  background: white;
  border-radius: 8px;
  border: 1px solid #A5ABAF;
  outline: none;


&::placeholder {
    color: #A5ABAF !important;
    font-size: 14px;
    font-weight: 400
  }


`
