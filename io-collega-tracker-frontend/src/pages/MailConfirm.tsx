import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const MailConfirm: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Check iO Address</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Check iO Address</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form>
          <h1>Enter your iO mail address</h1>
          <input type="email" placeholder='example@example.com'/>
          <input type="submit" value="Check Address"/>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default MailConfirm;
