import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './MailConfirm.css';

const MailConfirm: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <form>
          <i className="fa-solid fa-envelope fa-3x"></i>
          <h1>Enter your iO mail address:</h1>
          <input type="email" placeholder='example@example.com' className='textbox' /> <br /><br /><br />
          <input type="checkbox" className='checkbox' /> <label className='label'>I've read and accepted the <a className='terms' href="">terms and conditions</a>.</label> <br /><br /><br />
          <div className='submit'>
            <label className="label">Verify your emailaddress to prove that you are an iO employee.</label>
            <input type="submit" value="Check Address" className='btn' />
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default MailConfirm;
