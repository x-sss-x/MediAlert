package com.shrav.MediAlert;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Build;
import android.provider.Settings;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.AlarmManagerCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class ALModule extends ReactContextBaseJavaModule {
    private  static MediaPlayer mP;
    private static ReactApplicationContext ctx;
    public ALModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        ctx = reactContext;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void start() {
       ctx.startService(new Intent(ctx,MyService.class));
    }

    @ReactMethod
    public void stop(){
        ctx.stopService(new Intent(ctx,MyService.class));
    }

    @NonNull
    @Override
    public String getName() {
        return "ALModule";
    }

}
