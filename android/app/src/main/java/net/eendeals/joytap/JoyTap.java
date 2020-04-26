package net.eendeals.joytap;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tapjoy.TJActionRequest;
import com.tapjoy.TJError;
import com.tapjoy.TJPlacement;
import com.tapjoy.TJPlacementListener;
import com.tapjoy.Tapjoy;

/**
 * Created by jagjot on 13/03/18.
 */

public class JoyTap extends ReactContextBaseJavaModule {
    public JoyTap(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "JoyTap";
    }

    @ReactMethod
    public void setUserId(String user_id) {
        Tapjoy.setUserID(user_id);
    }

    @ReactMethod
    public void showAd(final Callback cb, final Callback error) {
        TJPlacementListener placementListener = new TJPlacementListener() {
            @Override
            public void onRequestSuccess(TJPlacement tjPlacement) {
                cb.invoke();
            }

            @Override
            public void onRequestFailure(TJPlacement tjPlacement, TJError tjError) {
            }

            @Override
            public void onContentReady(TJPlacement tjPlacement) {
                tjPlacement.showContent();
            }

            @Override
            public void onContentShow(TJPlacement tjPlacement) {

            }

            @Override
            public void onContentDismiss(TJPlacement tjPlacement) {
            }

            @Override
            public void onPurchaseRequest(TJPlacement tjPlacement, TJActionRequest tjActionRequest, String s) {

            }

            @Override
            public void onRewardRequest(TJPlacement tjPlacement, TJActionRequest tjActionRequest, String s, int i) {
            }
        };
        TJPlacement p = Tapjoy.getPlacement("Video", placementListener);
        if(Tapjoy.isConnected()) {
            p.requestContent();
        }
    }

    @ReactMethod
    public void showWall() {
        TJPlacementListener placementListener = new TJPlacementListener() {
            @Override
            public void onRequestSuccess(TJPlacement tjPlacement) {
            }

            @Override
            public void onRequestFailure(TJPlacement tjPlacement, TJError tjError) {
            }

            @Override
            public void onContentReady(TJPlacement tjPlacement) {
                tjPlacement.showContent();
            }

            @Override
            public void onContentShow(TJPlacement tjPlacement) {

            }

            @Override
            public void onContentDismiss(TJPlacement tjPlacement) {

            }

            @Override
            public void onPurchaseRequest(TJPlacement tjPlacement, TJActionRequest tjActionRequest, String s) {

            }

            @Override
            public void onRewardRequest(TJPlacement tjPlacement, TJActionRequest tjActionRequest, String s, int i) {

            }
        };
        TJPlacement p = Tapjoy.getPlacement("Offers", placementListener);
        if(Tapjoy.isConnected()) {
            p.requestContent();
        } else {
            Log.d("Eendeals", "Tapjoy SDK must finish connecting before requesting content.");
        }
    }
}
