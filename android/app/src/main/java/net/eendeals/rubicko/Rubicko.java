package net.eendeals.rubicko;

import android.app.Activity;

import com.expletus.rubicko.RubickoWall;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by jagjot on 04/03/18.
 */

public class Rubicko extends ReactContextBaseJavaModule {
    public Rubicko(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Rubicko";
    }

    @ReactMethod
    public void showWall(String user_id) {
        RubickoWall rubickoWall = new  RubickoWall();
        rubickoWall.init(user_id, "LEzucH4wW", "btXEu");
        Activity activity = getCurrentActivity();
        if(activity != null) {
            rubickoWall.launchRubickoWall(activity);
        }
    }
}
