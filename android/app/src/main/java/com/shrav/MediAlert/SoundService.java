package com.shrav.MediAlert;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.provider.Settings;

public class SoundService extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        MediaPlayer mp= MediaPlayer.create(context, Settings.System.DEFAULT_ALARM_ALERT_URI);
        mp.setLooping(true);
        mp.start();
        System.out.println("Playing");
    }
}
