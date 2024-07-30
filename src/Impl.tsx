/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Button, findNodeHandle, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ToggleButton} from './ToggleButton';
import {profile, roomId, streamId, User} from './constants';
import ZegoExpressEngine, {
  ZegoTextureView,
  ZegoVideoSourceType,
  ZegoView,
  ZegoViewMode,
} from 'zego-express-engine-reactnative';

export function Impl({user}: {user: User}) {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isPlayingStream, setIsPlayingStream] = useState(false);

  const zegoViewRef = useRef<ZegoTextureView>(null);

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
  }

  useEffect(() => {
    init();
    return () => {
      ZegoExpressEngine.destroyEngine();
    };
  }, []);

  async function enableScreenShare() {
    await ZegoExpressEngine.instance().startScreenCapture({
      captureVideo: true,
      captureAudio: false,
      applicationVolume: 100,
      microphoneVolume: 100,
    });
    await ZegoExpressEngine.instance().setVideoSource(
      ZegoVideoSourceType.ScreenCapture,
      undefined,
    );
    setIsScreenSharing(true);

    await ZegoExpressEngine.instance().startPublishingStream(
      streamId,
      undefined,
      {
        forceSynchronousNetworkTime: 0,
      },
    );
    setIsPublishing(true);
  }

  async function startCamera() {
    await ZegoExpressEngine.instance().enableCamera(true, undefined);
    setIsCameraEnabled(true);
    await ZegoExpressEngine.instance().startPublishingStream(
      streamId,
      undefined,
      {
        forceSynchronousNetworkTime: 0,
      },
    );
    setIsPublishing(true);
  }

  async function startPreview() {
    let zegoView: ZegoView = {
      reactTag: findNodeHandle(zegoViewRef.current)!,
      viewMode: 0,
      backgroundColor: 0,
    };

    ZegoExpressEngine.instance().startPreview(zegoView, undefined);
    setIsPreviewing(true);
  }

  async function startPlayingStream() {
    let zegoView: ZegoView = {
      reactTag: findNodeHandle(zegoViewRef.current)!,
      viewMode: ZegoViewMode.AspectFill,
      backgroundColor: 0,
    };

    ZegoExpressEngine.instance().startPlayingStream(
      streamId,
      zegoView,
      undefined,
    );
    setIsPlayingStream(true);
  }

  return (
    <View style={{flex: 1, gap: 16}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styels.text}>
          {isJoined ? 'room joined' : 'Not Joined'}
        </Text>
        <Text style={styels.text}>
          Publish state:{' '}
          <Text style={{fontWeight: 'bold'}}>
            {isPublishing ? 'on' : 'off'}
          </Text>
        </Text>
      </View>

      <ToggleButton
        state={isScreenSharing}
        enable={enableScreenShare}
        title="Screen Share"
      />
      <ToggleButton
        state={isCameraEnabled}
        enable={startCamera}
        title="Camera"
      />
      <ToggleButton
        state={isPreviewing}
        enable={startPreview}
        title="Previewing"
      />
      <ToggleButton
        state={isPlayingStream}
        enable={startPlayingStream}
        title="play stream"
      />

      <View style={styels.textureView}>
        <ZegoTextureView ref={zegoViewRef} />
      </View>
    </View>
  );
}

const styels = StyleSheet.create({
  text: {
    color: 'black',
  },
  textureView: {
    width: 100,
    height: 100,
    marginTop: 16,
    backgroundColor: 'darkgreen',
  },
});
