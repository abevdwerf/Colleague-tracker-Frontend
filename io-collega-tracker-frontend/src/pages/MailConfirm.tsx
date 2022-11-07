import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonLoading , useIonAlert } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import './MailConfirm.css';

const MailConfirm: React.FC = () => {
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();


  function redirectToVerifyWait(){
    window.location.href="/verifyWait";
  }

  function submitEmail(){
    

    let config = {
      headers: {
        idToken: localStorage.getItem("token"),
        "Content-Type": "text/plain"
      }
    }
    let mail = (document.getElementById("emailInput") as HTMLInputElement).value;
    localStorage.setItem("mail", mail)
    present({
      message: 'Sending Email...'
    })
    axios.post(`http://localhost:8080/api/email/verify`, mail , config)
        .then(res => {
          console.log(res)
          if (res.data.statusCode === 200) {
            dismiss();
            redirectToVerifyWait()
          } else if (res.data.statusCode === 400) {
            dismiss();
            presentAlert({
              header: 'Mail Verification',
              message: 'Your account has already been verified!',
              buttons: ['Continue to App'],
            })
          }

          else if (res.data.statusCode === 401) {
            dismiss();
            presentAlert({
              header: 'Mail Verification',
              message: 'This email is already in use, please use a different email',
              buttons: ['OK'],
            })
          }
          dismiss();
        })
        .catch(err => {
          dismiss();
          console.log(err)
        })

  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='form'>
          <i className="fa-solid fa-envelope fa-3x"></i>
          <h1>Enter your iO mail address:</h1>
          <input id='emailInput' type="email" placeholder='example@iodigital.com' className='textbox' /> <br /><br /><br />
          
          <label className='container'>I've read and accepted the <a className='terms' href="">terms and conditions</a>.
            <input type="checkbox"/>
            <span className="checkmark"></span> 
          </label> <br /><br /><br />
          <div className='submit'>
            <label className="label">Verify your email address to prove that you are an iO employee.</label> <br />
            <button onClick={submitEmail} className='btn'>Submit</button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default MailConfirm;
