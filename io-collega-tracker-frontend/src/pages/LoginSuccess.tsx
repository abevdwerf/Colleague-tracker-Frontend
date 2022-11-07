import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import "./LoginSuccess.css"

const LoginSuccess: React.FC = () => {

  useEffect(() => {

    function redirectToApp(){
      window.location.href="/locationSetting"
    }

    setTimeout(redirectToApp, 5000)
    
   }, [])

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content'>
          <h1>You have successfully logged into your iO account!</h1>
          <i className="fa-solid fa-check fa-4x"></i> <br />
          <label className='label'>You will be redirected shortly.</label>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginSuccess;
