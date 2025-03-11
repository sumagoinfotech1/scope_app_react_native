package com.scopeengagement;

import android.util.Log;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d("FCM", "Message received: " + remoteMessage.getData());
    }
}

// package com.scopeengagement;

// import android.app.NotificationChannel;
// import android.app.NotificationManager;
// import android.app.PendingIntent;
// import android.content.Context;
// import android.content.Intent;
// import android.media.RingtoneManager;
// import android.net.Uri;
// import android.os.Build;
// import android.util.Log;

// import androidx.annotation.NonNull;
// import androidx.core.app.NotificationCompat;

// import com.google.firebase.messaging.FirebaseMessagingService;
// import com.google.firebase.messaging.RemoteMessage;

// public class MyFirebaseMessagingService extends FirebaseMessagingService {

//     @Override
//     public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
//         Log.d("FCM", "Message received: " + remoteMessage.getData());

//         // Check if the message contains notification payload
//         if (remoteMessage.getNotification() != null) {
//             sendNotification(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody());
//         }
//     }

//     private void sendNotification(String title, String messageBody) {
//         Intent intent = new Intent(this, MainActivity.class);
//         intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

//         PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent,
//                 PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_IMMUTABLE);

//         String channelId = "default_channel";
//         Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

//         NotificationCompat.Builder notificationBuilder =
//                 new NotificationCompat.Builder(this, channelId)
//                         .setSmallIcon(R.mipmap.ic_launcher) // Change to your app icon
//                         .setContentTitle(title)
//                         .setContentText(messageBody)
//                         .setAutoCancel(true)
//                         .setSound(defaultSoundUri)
//                         .setContentIntent(pendingIntent);

//         NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

//         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//             NotificationChannel channel = new NotificationChannel(channelId, "Default Channel", NotificationManager.IMPORTANCE_HIGH);
//             notificationManager.createNotificationChannel(channel);
//         }

//         notificationManager.notify(0, notificationBuilder.build());
//     }
// }
