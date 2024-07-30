import {useEffect, useState} from 'react';
import {Impl} from './Impl';
import {u1, u2, User} from './constants';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

export default function Demo() {
  const [user, setUser] = useState<User>();
  const [cameraGranted, setCameraGranted] = useState(false);
  const [audioGranted, setAudioGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          const cameraGranted =
            granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
            PermissionsAndroid.RESULTS.GRANTED;
          const audioGranted =
            granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
            PermissionsAndroid.RESULTS.GRANTED;

          setCameraGranted(cameraGranted);
          setAudioGranted(audioGranted);
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestPermissions();

    const checkPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const cameraGranted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          const audioGranted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          );
          setCameraGranted(cameraGranted);
          setAudioGranted(audioGranted);
        } catch (err) {
          console.warn(err);
        }
      }
    };

    checkPermissions();
  }, []);

  if (!cameraGranted || !audioGranted) {
    return (
      <View style={style.warning}>
        <Text style={style.info}>
          Camera Permission:{' '}
          <Text style={{fontWeight: 'bold'}}>
            {cameraGranted ? 'granted' : 'denied'}
          </Text>
        </Text>
        <Text style={style.info}>
          Audio Permission:{' '}
          <Text style={{fontWeight: 'bold'}}>
            {audioGranted ? 'granted' : 'denied'}
          </Text>
        </Text>

        <Text style={[style.info, {marginTop: 16}]}>
          Please grant all the Permission in settings
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, padding: 16, gap: 16}}>
      {user ? (
        <>
          <Button title="reset user" onPress={() => setUser(undefined)} />
        </>
      ) : (
        <View style={{flexDirection: 'row', gap: 16}}>
          <Button title="set user 1" onPress={() => setUser(u1)} />
          <Button title="set user 2" onPress={() => setUser(u2)} />
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
