/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ZegoExpressEngine, {
  ZegoPublishStreamQuality,
} from 'zego-express-engine-reactnative';
import {PublishHandler} from './PublishHandler';
import {StreamHandler} from './StreamHandler';
import {profile, roomId, User} from './constants';

import {NativeModules} from 'react-native';

const {ForegroundService} = NativeModules;

export function Impl({user}: {user: User}) {
  const [isJoined, setIsJoined] = useState(false);

  async function init() {
    await ZegoExpressEngine.createEngineWithProfile(profile);
    let res = await ZegoExpressEngine.instance().loginRoom(
      roomId,
      {userID: user.uid, userName: user.name},
      {
        token: user.token,
        isUserStatusNotify: false,
        maxMemberCount: 0,
      },
    );
    setIsJoined(res.errorCode === 0);

    initHandler();
  }

  function initHandler() {
    // 以下为常用的房间相关回调
    ZegoExpressEngine.instance().on(
      'roomStateUpdate',
      (roomID, state, errorCode, extendedData) => {
        console.log(
          'JS onRoomStateUpdate: ' +
            state +
            ' roomID: ' +
            roomID +
            ' err: ' +
            errorCode +
            ' extendData: ' +
            extendedData,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvBroadcastMessage',
      (roomID, messageList) => {
        console.log(
          'JS onIMRecvBroadcastMessage: ' +
            ' roomID: ' +
            roomID +
            ' messageList: ' +
            messageList,
        );
        for (let msg of messageList) {
          console.log(
            'current broadcast msg: message: ' +
              msg.message +
              ' messageID' +
              msg.messageID +
              ' sendTime: ' +
              msg.sendTime +
              ' from user :' +
              msg.fromUser.userID +
              ' x ' +
              msg.fromUser.userName,
          ); // "0", "1", "2",
        }
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvBarrageMessage',
      (roomID, messageList) => {
        console.log('JS onIMRecvBarrageMessage: ' + ' roomID: ' + roomID);
        for (let msg of messageList) {
          console.log(
            'current barrage msg: message: ' +
              msg.message +
              ' messageID' +
              msg.messageID +
              ' sendTime: ' +
              msg.sendTime +
              ' from user :' +
              msg.fromUser.userID +
              ' x ' +
              msg.fromUser.userName,
          ); // "0", "1", "2",
        }
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvCustomCommand',
      (roomID, fromUser, command) => {
        console.log(
          'JS onIMRecvCustomCommand: ' +
            ' roomID: ' +
            roomID +
            ' from user: ' +
            fromUser.userID +
            ' x ' +
            fromUser.userName +
            ' command: ' +
            command,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'publisherStateUpdate',
      (streamID, state, errorCode, extendedData) => {
        console.log(
          'JS onPublisherStateUpdate: ' +
            state +
            ' streamID: ' +
            streamID +
            ' err: ' +
            errorCode +
            ' extendData: ' +
            extendedData,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'playerStateUpdate',
      (streamID, state, errorCode, extendedData) => {
        console.log(
          'JS onPlayerStateUpdate: ' +
            state +
            ' streamID: ' +
            streamID +
            ' err: ' +
            errorCode +
            ' extendData: ' +
            extendedData,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'publisherQualityUpdate',
      (streamID: string, quality: ZegoPublishStreamQuality) => {
        console.log(
          'JS publisherQualityUpdate: streamID: ' +
            streamID +
            ' ,videoCaptureFPS: ' +
            quality.videoCaptureFPS +
            ' videoKBPS: ' +
            quality.videoKBPS,
        );
      },
    );
  }

  useEffect(() => {
    init();
    ForegroundService.startService();
    return () => {
      ForegroundService.stopService();
      ZegoExpressEngine.destroyEngine();
    };
  }, []);

  return (
    <View style={{flex: 1, gap: 16}}>
      <Text style={styels.text}>{isJoined ? 'room joined' : 'Not Joined'}</Text>
      <Line />
      <PublishHandler />
      <Line />
      <StreamHandler />
    </View>
  );
}

const Line = () => {
  return <View style={{height: 1, width: '100%', backgroundColor: 'black'}} />;
};

const styels = StyleSheet.create({
  text: {
    color: 'black',
  },
});
