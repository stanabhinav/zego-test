import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {checkAndRequestZeegoPermissions} from '../../utilities/Permissions';

const ZeegoRoom = () => {
  const [permissionStatusPayload, setPermissionStatusPayload] = useState<any>();

  const checkZeegoPermissions = async () => {
    const permissionsStatus = await checkAndRequestZeegoPermissions();
    setPermissionStatusPayload(permissionsStatus);
    if (permissionsStatus) {
      console.log('Permissions Status:', permissionsStatus);

      if (permissionsStatus?.camera) {
        console.log('Camera permission granted.');
      } else {
        console.log('Camera permission denied.');
      }

      if (permissionsStatus?.audio) {
        console.log('Audio permission granted.');
      } else {
        console.log('Audio permission denied.');
      }
    }
  };

  useEffect(() => {
    checkZeegoPermissions();
  }, []);

  const renderPermissionNotGranted = () => {
    return (
      <View>
        <Text>
          Please grant these permissions{' '}
          {!permissionStatusPayload?.camera && 'Camera'}
          {!permissionStatusPayload?.audio && 'Audio'}
        </Text>
      </View>
    );
  };

  const renderRoom = () => {
    return (
      <View>
        <Text>ZeegoRoom</Text>
      </View>
    );
  };

  return (
    <View>
      {permissionStatusPayload?.camera && permissionStatusPayload?.audio
        ? renderRoom()
        : renderPermissionNotGranted()}
    </View>
  );
};

export default ZeegoRoom;
