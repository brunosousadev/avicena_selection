import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Change from './pages/Change'

export default createAppContainer(
  createSwitchNavigator({
    Dashboard,
    Register,
    Change,
  })
);