import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Define zeego permissions for Android and iOS
const zeegoRequiredPermissions = {
  camera: Platform.select({
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  }),
  audio: Platform.select({
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    ios: PERMISSIONS.IOS.MICROPHONE,
  }),
};

export const checkAndRequestZeegoPermissions = async () => {
  try {
    const permissionResults = {};
    for (const [key, permission] of Object.entries(zeegoRequiredPermissions)) {
      const result = await check(permission);

      // If permission is not granted, request it
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        permissionResults[key] = requestResult === RESULTS.GRANTED;
      } else {
        // If permission is already granted, set the result to true
        permissionResults[key] = true;
      }
    }

    console.log('Permissions Check & Request Status:', permissionResults);
    return permissionResults;
  } catch (error) {
    console.warn('Error checking or requesting permissions:', error);
    return null;
  }
};

// Function to request permissions only if not already granted
export const requestPermissions = async () => {
  try {
    const permissionResults = {};

    // Loop through each permission
    for (const [key, permission] of Object.entries(zeegoRequiredPermissions)) {
      const result = await check(permission);
      // If permission is not granted, request it
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        permissionResults[key] = requestResult === RESULTS.GRANTED;
      } else {
        // If already granted, set the result to true
        permissionResults[key] = true;
      }
    }

    console.log('Permissions Request Status:', permissionResults);
    return permissionResults;
  } catch (error) {
    console.warn('Error requesting permissions:', error);
    return null;
  }
};

// Individual controllers to handle specific permission requests
export const requestCameraPermission = async () => {
  const result = await check(zeegoRequiredPermissions.camera);
  // Request permission only if not granted
  if (result !== RESULTS.GRANTED) {
    const requestResult = await request(zeegoRequiredPermissions.camera);
    return requestResult === RESULTS.GRANTED;
  }
  return true; // Already granted
};

export const requestAudioPermission = async () => {
  const result = await check(zeegoRequiredPermissions.audio);
  // Request permission only if not granted
  if (result !== RESULTS.GRANTED) {
    const requestResult = await request(zeegoRequiredPermissions.audio);
    return requestResult === RESULTS.GRANTED;
  }
  return true; // Already granted
};
