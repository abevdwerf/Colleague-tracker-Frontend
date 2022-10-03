import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const LoginSuccess: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Success</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login Success</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>You have successfully logged into your iO account!</h1>
      </IonContent>
    </IonPage>
  );
};

export default LoginSuccess;
