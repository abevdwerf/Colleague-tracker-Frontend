import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './MailConfirm.css';

const MailConfirm: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <form className='form'>
          <i className="fa-solid fa-envelope fa-3x"></i>
          <h1>Enter your iO mail address:</h1>
          <input type="email" placeholder='example@iodigital.com' className='textbox' /> <br /><br /><br />
          
          <label className='container'>I've read and accepted the <a className='terms' href="">terms and conditions</a>.
            <input type="checkbox"/>
            <span className="checkmark"></span> 
          </label> <br /><br /><br />
          <div className='submit'>
            <label className="label">Verify your email address to prove that you are an iO employee.</label> <br />
            <input type="submit" value="Check Address" className='btn' />
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default MailConfirm;
