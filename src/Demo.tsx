import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, Text, View, Button } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Impl } from './Impl';
import { u1, u2, User } from './constants';

export default function Demo() {
  const [user, setUser] = useState<User>();
  const [cameraGranted, setCameraGranted] = useState(false);
  const [audioGranted, setAudioGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          const cameraGranted =
            granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED;
          const audioGranted =
            granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;

          setCameraGranted(cameraGranted);
          setAudioGranted(audioGranted);
        } else if (Platform.OS === 'ios') {
          const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
          const audioStatus = await request(PERMISSIONS.IOS.MICROPHONE);

          setCameraGranted(cameraStatus === RESULTS.GRANTED);
          setAudioGranted(audioStatus === RESULTS.GRANTED);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const checkPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const cameraGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
          const audioGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
          setCameraGranted(cameraGranted);
          setAudioGranted(audioGranted);
        } else if (Platform.OS === 'ios') {
          const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);
          const audioStatus = await check(PERMISSIONS.IOS.MICROPHONE);

          setCameraGranted(cameraStatus === RESULTS.GRANTED);
          setAudioGranted(audioStatus === RESULTS.GRANTED);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
    checkPermissions();
  }, []);

  if (!cameraGranted || !audioGranted) {
    return (
      <View style={style.warning}>
        <Text style={style.info}>
          Camera Permission:{' '}
          <Text style={{ fontWeight: 'bold' }}>{cameraGranted ? 'granted' : 'denied'}</Text>
        </Text>
        <Text style={style.info}>
          Audio Permission:{' '}
          <Text style={{ fontWeight: 'bold' }}>{audioGranted ? 'granted' : 'denied'}</Text>
        </Text>
        <Text style={[style.info, { marginTop: 16 }]}>Please grant all the permissions in settings</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 16, backgroundColor: 'white', marginTop: 160 }}>
      {user ? (
        <>
          <Button title="Reset User" onPress={() => setUser(undefined)} />
        </>
      ) : (
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Button title="Set User 1" onPress={() => setUser(u1)} />
          <Button title="Set User 2" onPress={() => setUser(u2)} />
        </View>
      )}
      {user && (
        <>
          <Text style={style.text}>User: {user.uid}</Text>
          <Impl user={user} />
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    color: 'black',
  },
  warning: {
    margin: 16,
    backgroundColor: '#eed202',
    padding: 16,
  },
  info: {
    color: 'black',
  },
});
