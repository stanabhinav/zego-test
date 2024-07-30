import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';

interface ToggleButtonProps {
  state: boolean;
  enable: () => void;
  title: string;
}

export const ToggleButton = ({state, enable, title}: ToggleButtonProps) => {
  return (
    <View style={style.row}>
      <Text style={{color: 'black'}}>
        {title}:{' '}
        <Text style={{fontWeight: 'bold'}}>{state ? 'on' : 'off'}</Text>
      </Text>
      <View style={{flexDirection: 'row', gap: 12}}>
        <Button title={'enable'} onPress={enable} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
