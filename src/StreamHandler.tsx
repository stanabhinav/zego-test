import React, {RefObject, useRef, useState} from 'react';
import {ToggleButton} from './ToggleButton';
import ZegoExpressEngine, {
  ZegoTextureView,
  ZegoView,
} from 'zego-express-engine-reactnative';
import {findNodeHandle} from 'react-native';
import {micStreamId, screenStreamId} from './constants';

const getZegoView = (viewRef: RefObject<ZegoTextureView>): ZegoView => ({
  reactTag: findNodeHandle(viewRef.current)!,
  viewMode: 0,
  backgroundColor: 0,
});

export const StreamHandler = () => {
  const [isScreenShareStreaming, setScreenShareStream] = useState(false);
  const [isAudioStreaming, setAudioStream] = useState(false);

  const audioStreamView = useRef<ZegoTextureView>(null);
  const screenShareView = useRef<ZegoTextureView>(null);

  const playScreenShareStream = () => {
    ZegoExpressEngine.instance().startPlayingStream(
      screenStreamId,
      getZegoView(screenShareView),
      undefined,
    );
    setScreenShareStream(true);
  };

  const playAudioStream = () => {
    ZegoExpressEngine.instance().startPlayingStream(
      micStreamId,
      getZegoView(audioStreamView),
      undefined,
    );
    setAudioStream(true);
  };

  return (
    <>
      <ToggleButton
        state={isScreenShareStreaming}
        enable={playScreenShareStream}
        title={'Stream Screen'}
      />
      <ToggleButton
        state={isAudioStreaming}
        enable={playAudioStream}
        title={'Stream Mic Audio'}
      />
      <ZegoTextureView style={{height: 100}} ref={screenShareView} />
      <ZegoTextureView ref={audioStreamView} />
    </>
  );
};
