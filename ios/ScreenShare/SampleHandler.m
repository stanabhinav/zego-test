//
//  SampleHandler.m
//  ScreenShare
//
//  Created by Aman Verma on 02/09/24.
//


#import "SampleHandler.h"
#import <ZegoExpressEngine/ZegoExpressDefines.h>
#import <ZegoExpressEngine/ZegoExpressEventHandler.h>

@implementation SampleHandler

- (void)broadcastStartedWithSetupInfo:(NSDictionary<NSString *,NSObject *> *)setupInfo {
  [ZegoReplayKitExt.sharedInstance setupWithDelegate:self];
    // User has requested to start the broadcast. Setup info from the UI extension can be supplied but optional. 
}

- (void)broadcastPaused {
    // User has requested to pause the broadcast. Samples will stop being delivered.
}

- (void)broadcastResumed {
    // User has requested to resume the broadcast. Samples delivery will resume.
}

- (void)broadcastFinished {
  [ZegoReplayKitExt.sharedInstance finished];
    // User has requested to finish the broadcast.
}

- (void)processSampleBuffer:(CMSampleBufferRef)sampleBuffer withType:(RPSampleBufferType)sampleBufferType {
    
  [ZegoReplayKitExt.sharedInstance sendSampleBuffer:sampleBuffer withType:sampleBufferType];
    switch (sampleBufferType) {
        case RPSampleBufferTypeVideo:
            // Handle video sample buffer
            break;
        case RPSampleBufferTypeAudioApp:
            // Handle audio sample buffer for app audio
            break;
        case RPSampleBufferTypeAudioMic:
            // Handle audio sample buffer for mic audio
            break;
            
        default:
            break;
    }
}

@end
