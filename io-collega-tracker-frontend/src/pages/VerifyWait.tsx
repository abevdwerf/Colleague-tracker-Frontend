import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './VerifyWait.css';

const VerifyWait: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <form>
          <h1>A verification mail has been sent to this email address:</h1> <br/>
          <label className="mail">example@iodigital.com</label>
          <i className="fa-solid fa-envelope-open-text fa-5x"></i>
          <div className='submit'>
            <label className="label">Please verify your entered mail address by clicking on the link in the sent verification mail.</label>
            <button className="btn">Resend Email</button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default VerifyWait;
