// package com.scopeengagement;

// import android.util.Log;
// import com.google.firebase.messaging.FirebaseMessagingService;
// import com.google.firebase.messaging.RemoteMessage;

// public class MyFirebaseMessagingService extends FirebaseMessagingService {
//     @Override
//     public void onMessageReceived(RemoteMessage remoteMessage) {
//         Log.d("FCM", "Message received: " + remoteMessage.getData());
//     }
// }
package com.scopeengagement;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Random;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String TAG = "FCM";
    private static final String CHANNEL_ID = "Default-channel";

  @Override
public void onMessageReceived(RemoteMessage remoteMessage) {
    super.onMessageReceived(remoteMessage);
    Log.d(TAG, "Message received: " + remoteMessage.getData());

    // ✅ Ignore Firebase's default notifications
    if (remoteMessage.getNotification() != null) {
        Log.d(TAG, "Default Firebase notification ignored.");
        return; // Prevents showing Firebase's automatic notifications
    }

    // ✅ Extract and process custom notification data
    String title = remoteMessage.getData().get("title");
    String message = remoteMessage.getData().get("message");

    if (title == null || message == null) {
        Log.w(TAG, "Received notification with missing title or message.");
        return;  // Prevents showing empty notifications
    }

    // ✅ Show the notification using your custom method
    showNotification(title, message);
}


    private void showNotification(String title, String message) {
        Context context = getApplicationContext();

        // Ensure notification channel exists (for Android 8+)
        createNotificationChannel(context);

        // Create an Intent to open the app when notification is clicked
        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        // Generate a unique notification ID to avoid overwriting previous notifications
        int notificationId = new Random().nextInt(10000);

        // Build the notification
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(title)
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setContentIntent(pendingIntent)
                .setAutoCancel(true);

        // Check for Android 13+ (requires POST_NOTIFICATIONS permission)
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            !notificationManager.areNotificationsEnabled()) {
            Log.w(TAG, "Notifications are disabled. Cannot display notification.");
            return;
        }

        // Show the notification
        notificationManager.notify(notificationId, builder.build());
    }

    private void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "Default Notifications",
                    NotificationManager.IMPORTANCE_HIGH
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }
}
