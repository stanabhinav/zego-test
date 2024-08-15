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
    '04AAAAAGa+7lgAEHU4Z3pscTRlYXRlMmlneWQAoGD0BI82ahbBmqB9GOzoSQUunekH0tjJEavOiFnfdJBSkCrCjsukjxlqko/wHwAtfM9JROCh7JgqCLMy6y3Ph9Fn0+gTWx0Uy87RqYf4kpZcLt8p2PWD7c/soslSnyMx7/8/CTP2TR+sjAth+FLbZU5gDtruAW38i1aSQSlmucOCNAAzqcDGjbjADUy/qbHYZHbNXjZ6cgdpfLstVJGEIi8=',
};

export let u2 = {
  uid: '2',
  name: 'user2',
  token:
    '04AAAAAGa+7mcAEHpkNnBoc2xteWViNmt2NGgAoP9roX08QSYC+wvbwPWo/szhP8FGf0eKAU7LjlHBJOJiNlT3U8Mj2+HgyHrvZKMbG5pxApglJXkoLz2ldCklwBSrTej36vGktT//7pD4xZMzGosLt+e7qJrZuyPa1nPEOGVHa+yUDYLvJhrHH+Hz5Ik7qvTZgrMW7StWqGURr5SstOCcBQeA4GfiCsEsxK7is1/Ukb4QeBKqiT9oVcaOf/I=',
};

export const profile: ZegoEngineProfile = {
  appID: 664740526,
  appSign: 'dbd4a5fb35648445a6b1fa4fe74a0e338f55bd955de0bc000177803f8990c621',
  scenario: ZegoScenario.StandardVideoCall,
};

export const roomId = 'room2';
export const micStreamId = 'audioStream1';
export const screenStreamId = 'screenStream1';
