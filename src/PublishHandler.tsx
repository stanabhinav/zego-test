import React, {useState} from 'react';
import {ToggleButton} from './ToggleButton';
import ZegoExpressEngine, {
  ZegoAudioSourceType,
  ZegoPublishChannel,
  ZegoVideoSourceType,
} from 'zego-express-engine-reactnative';
import {micStreamId, screenStreamId} from './constants';

export const PublishHandler = () => {
  const [isScreenSharing, setScreenSharing] = useState(false);
  const [isMicStreaming, setMicStreaming] = useState(false);

  const shareMicAudio = async () => {
    await ZegoExpressEngine.instance().setVideoSource(
      ZegoVideoSourceType.None,
      ZegoPublishChannel.Main,
    );
    await ZegoExpressEngine.instance().setAudioSource(
      ZegoAudioSourceType.MainPublishChannel,
      ZegoPublishChannel.Main,
    );
    await ZegoExpressEngine.instance().startPublishingStream(
      micStreamId,
      ZegoPublishChannel.Main,
      {
        forceSynchronousNetworkTime: 0,
      },
    );

    setMicStreaming(true);
  };

  const shareScreen = async () => {
    await ZegoExpressEngine.instance().startScreenCapture({
      captureVideo: true,
      captureAudio: true,
      applicationVolume: 100,
      microphoneVolume: 100,
    });
    await ZegoExpressEngine.instance().setAudioSource(
      ZegoAudioSourceType.ScreenCapture,
      ZegoPublishChannel.Aux,
    );
    await ZegoExpressEngine.instance().setVideoSource(
      ZegoVideoSourceType.ScreenCapture,
      ZegoPublishChannel.Aux,
    );
    await ZegoExpressEngine.instance().startPublishingStream(
      screenStreamId,
      ZegoPublishChannel.Aux,
      {
        forceSynchronousNetworkTime: 0,
      },
    );

    setScreenSharing(true);
  };

  return (
    <>
      <ToggleButton
        state={isScreenSharing}
        enable={shareScreen}
        title={'Publish Screen'}
      />
      <ToggleButton
        state={isMicStreaming}
        enable={shareMicAudio}
        title={'Publish Mic Audio'}
      />
    </>
  );
};
