package com.shrav.MediAlert;

import android.app.Service;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.IBinder;
import android.provider.Settings;

public class MyService extends Service {
    MediaPlayer md;
    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onCreate() {
        super.onCreate();
        md = MediaPlayer.create(this, Settings.System.DEFAULT_ALARM_ALERT_URI);
        md.setLooping(true);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        md.start();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        md.stop();
    }
}