package net.eendeals.ruck;

// import com.expletus.mobiruck.MobiruckEvent;
// import com.expletus.mobiruck.MobiruckSdk;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by jagjot on 05/04/18.
 */

public class Ruck extends ReactContextBaseJavaModule {
    public Ruck(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Ruck";
    }

    @ReactMethod
    public void trackRegister() {
        // MobiruckEvent mobiruckEvent = new MobiruckEvent();
        // mobiruckEvent.setEvent("Register    ");
        // MobiruckSdk.getInstance().logEvent(mobiruckEvent);
    }
}
