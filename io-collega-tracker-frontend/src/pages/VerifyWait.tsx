import { IonContent, IonPage, } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './VerifyWait.css';

const VerifyWait: React.FC = () => {

  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);

  (document.getElementById("tab-bar") as HTMLElement).hidden = true;

  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 1e3)

    if (count % 3 === 0) {
      let config = {
        headers: {
          idToken: localStorage.getItem("token"),
        }
      }
      axios.get(process.env.REACT_APP_ROOT_API + `/user/is-verified`, config)
        .then(res => {
          console.log(res.data);
          if (res.data.statusCode === 200) {
            clearTimeout(timer)
            window.location.href = "/loginSuccess"
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    return () => clearTimeout(timer)
  }, [count, ticking])

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content'>
          <h1>A verification mail has been sent to this email address:</h1> <br />
          <label className="mail">{localStorage.getItem("mail")}</label> <br />
          <i className="fa-solid fa-envelope-open-text fa-5x"></i>
          <div className='submit'>
            <label className="label">Please verify your entered mail address by clicking on the link in the sent verification mail.</label> <br />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default VerifyWait;
