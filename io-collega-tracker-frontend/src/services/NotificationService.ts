import { PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { IonButton, useIonAlert } from '@ionic/react';

console.log("Script started")

async function presentAlert() {
    console.warn("Notification Received!")
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.subHeader = 'Important message';
    alert.message = 'This is an alert!';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
    presentAlert()
})