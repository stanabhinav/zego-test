//
//  SampleHandler.m
//  ScreenShare
//
//  Created by Aman Verma on 2024/9/5.
//


#import "SampleHandler.h"
#import <ZegoExpressEngine/ZegoExpressDefines.h>
#import <ZegoExpressEngine/ZegoExpressEventHandler.h>

@interface SampleHandler () <ZegoReplayKitExtHandler>

@end

@implementation SampleHandler


- (void)broadcastStartedWithSetupInfo:(NSDictionary<NSString *,NSObject *> *)setupInfo {
 
  NSLog(@"broadcastStartedWithSetupInfo");
  
  [ZegoReplayKitExt.sharedInstance setupWithDelegate:self];

//  [ZegoReplayKitExt.sharedInstance setupWithDelegate:self appGroup:@"group.zego.test.screenshare"];
  
}

- (void)broadcastPaused {
    // User has requested to pause the broadcast. Samples will stop being delivered.
}

- (void)broadcastResumed {
    // User has requested to resume the broadcast. Samples delivery will resume.
}

- (void)broadcastFinished {
  [ZegoReplayKitExt.sharedInstance finished];
  NSLog(@"broadcastFinished");

    // User has requested to finish the broadcast.
}

- (void)processSampleBuffer:(CMSampleBufferRef)sampleBuffer withType:(RPSampleBufferType)sampleBufferType {
    
  [ZegoReplayKitExt.sharedInstance sendSampleBuffer:sampleBuffer withType:sampleBufferType];
  
  NSLog(@"processSampleBuffer");

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


- (void)broadcastFinished:(ZegoReplayKitExt *)broadcast reason:(ZegoReplayKitExtReason)reason {
    
    switch (reason) {
        case ZegoReplayKitExtReasonHostStop:
            {
                NSDictionary *userInfo = @{NSLocalizedDescriptionKey : @"Host app stop srceen capture"};
                NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:0 userInfo:userInfo];
                [self finishBroadcastWithError:error];
            }
            break;
        case ZegoReplayKitExtReasonConnectFail:
            {
                NSDictionary *userInfo = @{NSLocalizedDescriptionKey : @"Connect host app fail need startScreenCapture in host app"};
                NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:0 userInfo:userInfo];
                [self finishBroadcastWithError:error];
            }
            break;
        case ZegoReplayKitExtReasonDisconnect:
            {
                NSDictionary *userInfo = @{NSLocalizedDescriptionKey : @"disconnect with host app"};
                NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:0 userInfo:userInfo];
                [self finishBroadcastWithError:error];
            }
            break;
    }
}

@end

