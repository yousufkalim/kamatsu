import './index.css'
import Select from 'react-select'

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    control: (base, state) => ({
        ...base,
        '&:hover': {borderColor: state.isFocused ? '#A5ABAF': '#A5ABAF'},
        // border: 0,
        boxShadow: 'none'
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = ''
      return {
        ...styles,
        backgroundColor: isDisabled ? 'red' : '#fffff',
        backgroundColor: isFocused ? "rgba(255, 200, 47, 0.2)" : null,
        // backgroundColor: isSelected ? "rgba(255, 200, 47, 0.2)" : null,
        color: '#A5ABAF',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
    menuList: (provided, state) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0
    }),
    menu: (provided, state) => ({
        ...provided,
        marginTop:0,
    })
  };

const DropDown =({options, onChange}) => {
    return(
        <Select options={options}
            onChange={onChange}
            styles={colourStyles}
            className="basic"
        />

    )
}

export default  DropDown