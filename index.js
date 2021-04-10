/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { LogBox } from 'react-native';

// Ignore log notification by message:
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
// LogBox.ignoreLogs(['Warning: ...']);
AppRegistry.registerComponent(appName, () => App);
