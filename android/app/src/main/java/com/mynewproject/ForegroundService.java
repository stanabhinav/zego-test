package com.mynewproject;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;
import com.mynewproject.R;

/**
 * Foreground service, only used to keep the process in the foreground to receive messages
 */
public class ForegroundService extends Service {
    private static final String CHANNEL_ID = "channel";
    private static final String CHANNEL_NAME = "channel name";
    private static final String CHANNEL_DESC = "channel desc";

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();

        // Retrieve the launcher activity name from the package manager
        PackageManager pm = getPackageManager();
        Intent intentToResolve = new Intent(Intent.ACTION_MAIN)
                .addCategory(Intent.CATEGORY_LAUNCHER);
        String launcherActivity = null;

        if (pm.resolveActivity(intentToResolve, PackageManager.MATCH_DEFAULT_ONLY) != null) {
            launcherActivity = pm.resolveActivity(intentToResolve, PackageManager.MATCH_DEFAULT_ONLY)
                    .activityInfo.name;
        }

        Intent appIntent = new Intent();
        try {
            if (launcherActivity != null) {
                appIntent = new Intent(this, Class.forName(launcherActivity));
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        appIntent.setAction(Intent.ACTION_MAIN);
        appIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        PendingIntent pendingIntent;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            pendingIntent = PendingIntent.getActivity(
                    this, 0, appIntent,
                    PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT
            );
        } else {
            pendingIntent = PendingIntent.getActivity(
                    this, 0, appIntent, PendingIntent.FLAG_UPDATE_CURRENT
            );
        }

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Service Running")
                .setContentText("Foreground Service is running")
                .setSmallIcon(R.drawable.icon)
                .setContentIntent(pendingIntent);

        startForeground(1, notificationBuilder.build());

        return START_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription(CHANNEL_DESC);

            NotificationManager notificationManager = (NotificationManager)
                    getSystemService(NOTIFICATION_SERVICE);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
