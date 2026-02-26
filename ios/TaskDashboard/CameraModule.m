#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CameraModule, NSObject)

RCT_EXTERN_METHOD(takePicture:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end