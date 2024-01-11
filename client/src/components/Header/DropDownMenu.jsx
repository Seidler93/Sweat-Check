import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <select id="dropdown" onChange={handleSelectChange} value={'25'}>
        <option value=""><Icon icon='gravity-ui:bars' color='white' width="30" height="30" className='me-1' /></option>
        <option value="option1"><Link to={'/calendar'} className="menu-option">Calendar</Link></option>
        
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
