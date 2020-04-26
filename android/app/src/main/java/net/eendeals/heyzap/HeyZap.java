package net.eendeals.heyzap;

/**
 * Created by jagjot on 06/01/18.
 */


import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.app.Activity;
import android.util.Log;

import com.heyzap.sdk.ads.HeyzapAds;
import com.heyzap.sdk.ads.IncentivizedAd;
import com.heyzap.sdk.ads.HeyzapAds.OnStatusListener;

public class HeyZap extends ReactContextBaseJavaModule {

    static ReactApplicationContext context;
    Callback callback;

    public HeyZap(ReactApplicationContext reactContext){
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "HeyZap";
    }

    @ReactMethod
    public void callTest() {
        HeyzapAds.start("8cbcb6086617c9ce9113c066ddeba467", getCurrentActivity());
        HeyzapAds.startTestActivity(this.getCurrentActivity());
    }

    @ReactMethod
    public void startHeyZap() {
        HeyzapAds.start("8cbcb6086617c9ce9113c066ddeba467", getCurrentActivity());
        IncentivizedAd.setOnStatusListener(new OnStatusListener() {
            @Override
            public void onShow(String s) {
            }

            @Override
            public void onClick(String s) {
            }

            @Override
            public void onHide(String s) {
                callback.invoke();
                IncentivizedAd.fetch();
            }

            @Override
            public void onFailedToShow(String s) {
            }

            @Override
            public void onAvailable(String s) {

            }

            @Override
            public void onFailedToFetch(String s) {
            }

            @Override
            public void onAudioStarted() {
            }

            @Override
            public void onAudioFinished() {
            }
        });
        IncentivizedAd.fetch();
    }

    @ReactMethod
    public void isAvailable(final Callback callback) {
        callback.invoke(IncentivizedAd.isAvailable());
    }

    @ReactMethod
    public void showAd(final Callback call) {
        if(IncentivizedAd.isAvailable()) {
            callback = call;
            IncentivizedAd.display(this.getCurrentActivity());
        }
    }

}
