package net.eendeals.adscend;

import android.content.Intent;

import com.adscendmedia.sdk.ui.OffersActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by jagjot on 04/02/18.
 */

public class Adscend extends ReactContextBaseJavaModule {

    public Adscend(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void showOfferWall() {
        String publisherId = "32740";
        String adwallId = "2074";
        String subId1 = "demo_subid1";

        Intent intent = OffersActivity.getIntentForOfferWall(this.getCurrentActivity(), publisherId, adwallId, subId1);
        this.getCurrentActivity().startActivity(intent);
    }

    @Override
    public String getName() {
        return "Adscend";
    }

}
