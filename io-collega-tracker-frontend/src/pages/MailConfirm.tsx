import { IonContent, IonModal, IonPage, useIonLoading, useIonAlert, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import axios from 'axios';
import { useRef } from 'react';
import './MailConfirm.css';

const MailConfirm: React.FC = () => {
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  (document.getElementById("tab-bar") as HTMLElement).hidden = true;

  function redirectToVerifyWait() {
    window.location.href = "/verifyWait";
  }

  function submitEmail() {
    const checkbox = document.getElementById("myCheckbox");
    const textbox = document.getElementById("emailInput");
    if ((checkbox as HTMLInputElement)?.checked && (textbox as HTMLInputElement)?.value != "") {
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
      axios.post(process.env.REACT_APP_ROOT_API + `/email/verify`, mail, config)
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
            if (res.data.message.includes("already")) {
              presentAlert({
                header: 'Mail Verification',
                message: 'This email is already in use, please use a different email.',
                buttons: ['OK'],
              })
            }
            else if (res.data.message.includes("invalid")) {
              presentAlert({
                header: 'Mail Verification',
                message: 'This email is invalid. Please enter a valid @iodigital email address.',
                buttons: ['OK'],
              })
            }
          }
          dismiss();
        })
        .catch(err => {
          dismiss();
          console.log(err)
        })
    }
  }

  function SetButton() {
    const checkbox = document.getElementById("myCheckbox");
    const button = document.getElementById("submit");

    if ((checkbox as HTMLInputElement)?.checked) {
      button?.classList.remove("btn-disabled");
      button?.classList.add("btn");
    }
    else {
      button?.classList.add("btn-disabled");
      button?.classList.remove("btn");
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitEmail();
    }
  };
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='form'>
          <i className="fa-solid fa-envelope fa-3x"></i>
          <h1>Enter your iO mail address:</h1>
          <input id='emailInput' type="email" placeholder='example@iodigital.com' className='textbox' onKeyDown={handleKeyDown} /> <br /><br /><br />
          <label className='checkcontainer'>I've read and accepted the <br /> <IonButton className='termsbtn' id="open-modal">terms and conditions</IonButton>
            <input type="checkbox" id="myCheckbox" onChange={SetButton} />
            <span className="checkmark"></span>
          </label>
          <div className='submit'>
            <button onClick={submitEmail} className='btn-disabled' id="submit"><b>CONFIRM EMAIL</b></button><br /><br />
            <label className="label">Verify your email address to prove that you are an iO digital staff member.</label>
          </div>
        </div>

        <IonModal ref={modal} trigger="open-modal" className='ionmodal'>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton style={{ color: "white", textDecoration: "underline" }} onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle className='ionmodal'>Terms & Conditions</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ionmodal'>
            <br />
            <p>(terms and conditions here)</p>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
}

export default MailConfirm;
