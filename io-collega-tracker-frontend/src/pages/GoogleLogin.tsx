import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './GoogleLogin.css';

const GoogleLogin: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content'>
          <h1>Please log in with a valid Google account to continue.</h1> <br />
          <label className='label'>If you have never logged in before, you will be prompted to verify your role as an iO employee by entering your iO email address.</label>
          <br />
          <button className="btn">Login with Google</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GoogleLogin;
