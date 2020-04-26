package net.eendeals.ironsrc;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.ironsource.mediationsdk.IronSource;
import com.ironsource.mediationsdk.logger.IronSourceError;
import com.ironsource.mediationsdk.model.Placement;
import com.ironsource.mediationsdk.sdk.OfferwallListener;
import com.ironsource.mediationsdk.sdk.RewardedVideoListener;

import android.app.Activity;
import android.util.Log;

/**
 * Created by jagjot on 06/01/18.
 */

public class IronSrc extends ReactContextBaseJavaModule {

    Callback callback;

    public IronSrc(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IronSrc";
    }

    @ReactMethod
    public void startIronSrc() {
        IronSource.init(this.getCurrentActivity(), "6b9a74fd", IronSource.AD_UNIT.REWARDED_VIDEO);
        IronSource.init(this.getCurrentActivity(), "6b9a74fd", IronSource.AD_UNIT.OFFERWALL);

        IronSource.setRewardedVideoListener(new RewardedVideoListener() {
            /**
             * Invoked when the RewardedVideo ad view has opened.
             * Your Activity will lose focus. Please avoid performing heavy
             * tasks till the video ad will be closed.
             */
            @Override
            public void onRewardedVideoAdOpened() {
            }
            /*Invoked when the RewardedVideo ad view is about to be closed.
            Your activity will now regain its focus.*/
            @Override
            public void onRewardedVideoAdClosed() {
                callback.invoke();
            }
            /**
             * Invoked when there is a change in the ad availability status.
             *
             * @param - available - value will change to true when rewarded videos are *available.
             *          You can then show the video by calling showRewardedVideo().
             *          Value will change to false when no videos are available.
             */
            @Override
            public void onRewardedVideoAvailabilityChanged(boolean available) {
                //Change the in-app 'Traffic Driver' state according to availability.
            }
            /**
             * Invoked when the video ad starts playing.
             */
            @Override
            public void onRewardedVideoAdStarted() {
            }
            /*Invoked when the video ad finishes playing.*/
            @Override
            public void onRewardedVideoAdEnded() {

            }
            /**
             * Invoked when the user completed the video and should be rewarded.
             * If using server-to-server callbacks you may ignore this events and wait *for the callback from the ironSource server.
             *
             * @param - placement - the Placement the user completed a video from.
             */
            @Override
            public void onRewardedVideoAdRewarded(Placement placement) {
                /** here you can reward the user according to the given amount.
                 String rewardName = placement.getRewardName();
                 int rewardAmount = placement.getRewardAmount();
                 */
            }
            /* Invoked when RewardedVideo call to show a rewarded video has failed
             * IronSourceError contains the reason for the failure.
             */
            @Override
            public void onRewardedVideoAdShowFailed(IronSourceError error) {
            }
            /*Invoked when the end user clicked on the RewardedVideo ad
            */
            @Override
            public void onRewardedVideoAdClicked(Placement placement){
            }
        });

        IronSource.setOfferwallListener(new OfferwallListener() {
            /**
             * Invoked when there is a change in the Offerwall availability status.
             * @param - available - value will change to YES when Offerwall are available.
             * You can then show the offerwall by calling showOfferwall(). Value will *change to NO when Offerwall isn't available.
             */
            @Override
            public void onOfferwallAvailable(boolean isAvailable) {
            }
            /**
             * Invoked when the Offerwall successfully loads for the user, after calling the 'showOfferwall' method
             */
            @Override
            public void onOfferwallOpened() {
            }
            /**
             * Invoked when the method 'showOfferWall' is called and the OfferWall fails to load.
             * @param error - A IronSourceError Object which represents the reason of 'showOfferwall' failure.
             */
            @Override
            public void onOfferwallShowFailed(IronSourceError error) {
            }
            /**
             * Invoked each time the user completes an Offer.
             * Award the user with the credit amount corresponding to the value of the *‘credits’ parameter.
             * @param credits - The number of credits the user has earned.
             * @param totalCredits - The total number of credits ever earned by the user.
             * @param totalCreditsFlag - In some cases, we won’t be able to provide the exact
             * amount of credits since the last event (specifically if the user clears
             * the app’s data). In this case the ‘credits’ will be equal to the ‘totalCredits’, and this flag will be ‘true’.
             * @return boolean - true if you received the callback and rewarded the user, otherwise false.
             */
            @Override
            public boolean onOfferwallAdCredited(int credits, int totalCredits, boolean totalCreditsFlag) {
                return false;
            }
            /**
             * Invoked when the method 'getOfferWallCredits' fails to retrieve
             * the user's credit balance info.
             * @param error - A IronSourceError object which represents the reason of 'getOfferwallCredits' failure.
             * If using client-side callbacks to reward users, it is mandatory to return true on this event
             */
            @Override
            public void onGetOfferwallCreditsFailed(IronSourceError error) {
            }
            /**
             * Invoked when the user is about to return to the application after closing
             * the Offerwall.
             */
            @Override
            public void onOfferwallClosed() {
            }
        });
    }

    @ReactMethod
    public void showAd(final Callback success, Callback error) {
        if(IronSource.isRewardedVideoAvailable()) {
            IronSource.showRewardedVideo("DefaultRewardedVideo");
            callback = success;
        } else {
            error.invoke();
        }
    }

    @ReactMethod
    public void showOfferWall() {
        IronSource.showOfferwall("DefaultOfferWall");
    }
}
