import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import ZegoExpressEngine, {ZegoScenario} from 'zego-express-engine-reactnative';
import ZeegoRoom from '../ZeegoRoom';

const ZeegoInit = () => {
  const [engineCreated, setEngineCreated] = useState(false);
  const createEngine = () => {
    ZegoExpressEngine.createEngineWithProfile({
      appID: 1234567890, // AppmId from the ZEGO Admin Console
      appSign: 'ApnaZegoApp', // App Signature from the ZEGO Admin Console
      scenario: ZegoScenario.Default,
    })
      .then(engine => {
        setEngineCreated(true);
        console.log('ENGINE_CREATED');
        if (engine != undefined) {
          console.log('init sdk success');
        } else {
          console.log('init sdk failed');
        }
      })
      .catch(err => {
        setEngineCreated(false);
        console.error('ERROR: ', err);
      });
  };

  const destroyEngine = () => {
    ZegoExpressEngine.destroyEngine();
    setEngineCreated(false);
  };

  useEffect(() => {
    createEngine();
    return () => {
      destroyEngine();
    };
  }, []);

  return engineCreated ? <ZeegoRoom /> : <></>;
};

export default ZeegoInit;
