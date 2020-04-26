package net.eendeals;

import android.support.multidex.MultiDexApplication;

import net.eendeals.adscend.AdScendPackage;
import net.eendeals.ironsrc.IronSrcPackage;
import net.eendeals.joytap.JoyTapPackage;
import net.eendeals.kip.KipPackage;
import net.eendeals.rubicko.RubickoPackage;
import net.eendeals.ruck.RuckPackage;
import net.eendeals.tracking.TrackingPackage;

// import com.expletus.mobiruck.MobiruckSdk;
import com.facebook.react.ReactApplication;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.mobvantage.react.gaid.RNGaidPackage;
import com.imagepicker.ImagePickerPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import me.kiip.sdk.Kiip;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.tapjoy.Tapjoy;

import java.util.Arrays;
import java.util.Hashtable;
import java.util.List;

import net.eendeals.heyzap.HeyZapPackage;

public class MainApplication extends MultiDexApplication implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new VectorIconsPackage(),
                    new RNGaidPackage(),
                    new ImagePickerPackage(),
                    new RNAccountKitPackage(),
                    new HeyZapPackage(),
                    new IronSrcPackage(),
                    new RNAdMobPackage(),
                    new KipPackage(),
                    new AdScendPackage(),
                    new RNFirebasePackage(),
                    new RNFirebaseAnalyticsPackage(),
                    new TrackingPackage(),
                    new RubickoPackage(),
                    new JoyTapPackage(),
                    new RuckPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        Hashtable connectFlags = null;
        Tapjoy.connect(this.getApplicationContext(), "Bb3TCStRRFurvZG4PJQRQgEC4O0r7FqCwSjJfgSwoaAMK8PeV75cDku6nv61", connectFlags);
        Tapjoy.setDebugEnabled(true);
        // MobiruckSdk.getInstance().init(this.getApplicationContext(), "", true);
        // MobiruckSdk.getInstance().startTracking();
        // Kiip.init(this, "1774c803b0f63f4913ebdf6175052f23", "83a6e2eded0f51f3deaca65cc084783b");
    }
}
