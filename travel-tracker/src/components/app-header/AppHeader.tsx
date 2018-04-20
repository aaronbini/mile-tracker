import * as React from 'react';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import RestoreIcon from '@material-ui/icons/Restore';
import FlightIcon from '@material-ui/icons/FlightTakeoff';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const logo = require('../../assets/ee_logo2.jpg');
import './AppHeader.css';

export const AppHeader = ({ selectedIndex }) => {
  let current = selectedIndex;
  function select(index) {
    current = index;
    console.log('current: ', current);
  }
  return (
    <section>
      <div className="flex-container-row">
        <img className="logo" src={logo} alt="Company Logo"></img>
        <h1 >Equal Exchange Travel Tracker</h1>
      </div>
      <div>
      <Paper elevation={1}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Dashboard"
            icon={<RestoreIcon />}
            onClick={() => select(0)}
          />
          <BottomNavigationAction
            label="New Trip"
            icon={<FlightIcon />}
            onClick={() => select(1)}
          />
          <BottomNavigationAction
            label="Third"
            icon={<LocationOnIcon />}
            onClick={() => select(2)}
          />
        </BottomNavigation>
      </Paper>
      </div>
    </section>
  );
};