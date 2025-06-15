import React from 'react';
import Tabs from '@mui/material/Tabs';
import logo from '../assets/logo.png';
import { renderTabPanelChildren, renderContent, tabs} from './HeaderDetailUtil';

const HeaderDetails = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
      <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        variant="fullWidth"
      >
        <img src={logo} alt="logo" />
        {tabs.map((name, index) => (
          renderContent(name, index)
        ))}
      </Tabs>
        {renderTabPanelChildren(value)}
      </>
  );
};

export default HeaderDetails;