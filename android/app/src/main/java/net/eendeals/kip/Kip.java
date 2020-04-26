package net.eendeals.kip;

import android.util.Log;

import net.eendeals.MainActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import me.kiip.sdk.Kiip;
import me.kiip.sdk.KiipFragmentCompat;
import me.kiip.sdk.Poptart;

/**
 * Created by jagjot on 23/01/18.
 */

public class Kip extends ReactContextBaseJavaModule {
    private KiipFragmentCompat mKiipFragment;

    public Kip(ReactApplicationContext reactContext){
        super(reactContext);
//        context = reactContext;
    }

    @Override
    public String getName() {
        return "Kip";
    }

    @ReactMethod
    public void callMoment() {
        Kiip.getInstance().saveMoment("auto_reward", new Kiip.Callback() {

            @Override
            public void onFinished(Kiip kiip, Poptart poptart) {
                if (poptart == null) {
                    Log.d("rna", "Successful moment but no reward to give.");
                }
                else {
                    onPoptart(poptart);
                }
            }

            @Override
            public void onFailed(Kiip kiip, Exception exception) {
                // handle failure
            }
        });
    }

    public void onPoptart(Poptart poptart) {
//        MainActivity.showPoptart(poptart);
    }

}
