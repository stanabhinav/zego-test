/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/Demo';
import App from './poc/app/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
