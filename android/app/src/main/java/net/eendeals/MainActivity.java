package net.eendeals;

import android.os.Bundle;

import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.hudl.oss.react.fragment.ReactFragment;
import com.ironsource.mediationsdk.IronSource;
import com.tapjoy.Tapjoy;
import com.vnative.vtlib.VTLib;

import me.kiip.sdk.KiipFragmentCompat;
import me.kiip.sdk.Poptart;

public class MainActivity extends ReactActivity {
    private static KiipFragmentCompat mKiipFragment;
    private static final String COMPONENT_NAME = "eendeals";
    private final static String KIIP_TAG = "kiip_fragment_tag";

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "eendeals";
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        VTLib.getInstance().init(this);
    }
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//
//        if (savedInstanceState == null) {
//            ReactFragment reactFragment = new ReactFragment.Builder(COMPONENT_NAME).build();
//
//            getSupportFragmentManager()
//                    .beginTransaction()
//                    .add(R.id.container_main, reactFragment)
//                    .commit();
//        }
//
//        if (savedInstanceState != null) {
//            mKiipFragment = (KiipFragmentCompat) getSupportFragmentManager().findFragmentByTag(KIIP_TAG);
//        } else {
//            mKiipFragment = new KiipFragmentCompat();
//            getSupportFragmentManager().beginTransaction().add(mKiipFragment, KIIP_TAG).commit();
//        }
//    }

    protected void onResume() {
        super.onResume();
        IronSource.onResume(this);
    }

    protected void onPause() {
        super.onPause();
        IronSource.onPause(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
        Tapjoy.onActivityStart(this);
    }

    @Override
    protected void onStop() {
        Tapjoy.onActivityStop(this);
        super.onStop();
    }

    /**
     * Forward onKeyUp events to the ReactFragment in order to handle double tap reloads
     * and dev menus
     *
     * @param keyCode
     * @param event
     * @return true if event was handled
     */
//    @Override
//    public boolean onKeyUp(int keyCode, KeyEvent event) {
//        boolean handled = false;
//        Fragment activeFragment = getSupportFragmentManager().findFragmentById(R.id.container_main);
//        if (activeFragment instanceof ReactFragment) {
//            handled = ((ReactFragment) activeFragment).onKeyUp(keyCode, event);
//        }
//        return handled || super.onKeyUp(keyCode, event);
//    }

    public static void showPoptart(Poptart poptart) {
        mKiipFragment.showPoptart(poptart);
    }
}
