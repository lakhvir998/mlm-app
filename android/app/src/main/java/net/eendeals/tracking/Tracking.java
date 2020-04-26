package net.eendeals.tracking;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.vnative.vtlib.VTLib;

/**
 * Created by jagjot on 12/02/18.
 */

public class Tracking extends ReactContextBaseJavaModule {
    public Tracking(ReactApplicationContext reactContext){
        super(reactContext);
//        context = reactContext;
    }

    @Override
    public String getName() {
        return "Tracking";
    }

    @ReactMethod
    public void callEvent() {
        VTLib.getInstance().trackInAppEvent(this.getReactApplicationContext(), "5a7ed916b6920d2457370936");
    }
}
