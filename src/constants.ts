import {ZegoEngineProfile, ZegoScenario} from 'zego-express-engine-reactnative';

export type User = {
  uid: string;
  name: string;
  token: string;
};

export let u1 = {
  uid: '1',
  name: 'user1',
  token:
    '04AAAAAGap77sAEGttbXJoaXFnemdobnlvdmoAoKOlapHy4HspUqApRJyPckEMQkjuY8vyEST3WHy2hd7jd+JSeBbxCd1DH7z9dfAZARpaD1DGRM35hj9NixZXvtGoMo7ZNmfFfb4RQoxrHuTUow/HbpDLWHiCKOUF5U+tF7KMCB7dByYg4Pzr6NDzGzxlWWsN3eXlo9OVGLp5TtJ5KIZK0KsrkOCSGgW2HO7ygbO0jlU7MwvdmOXhEVc+7OM=',
};

export let u2 = {
  uid: '2',
  name: 'user2',
  token:
    '04AAAAAGap7+YAEGJrenlpNGVmZm1ueHlrZzcAoA8ac+eaBh9ZluKb8CLTgLUn/E5FqkvBlsJxXbz/XedhWg4FVJKFPz78v08NR5diZPvNszqdmFzRw+4+l669jHK+KuiMvyPWBPPimliKZMJaOzKKyBcEdZjiF9SF10VELA/MjpA2iRWv2uYutuLm5iQQnwEElLpMynlfhAptZCG8cz0RhYcDjgCI2q/zRnOk2rmjqkSmIsuPV9H7CuEtSzM=',
};

export const profile: ZegoEngineProfile = {
  appID: 664740526,
  appSign: 'dbd4a5fb35648445a6b1fa4fe74a0e338f55bd955de0bc000177803f8990c621',
  scenario: ZegoScenario.StandardVideoCall,
};

export const roomId = 'room1';
export const streamId = 'stream1';
