import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, isPlatform, IonIcon, IonTabBar} from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';
import { useEffect, useState} from 'react'
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './GoogleLogin.css';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';



const register = () => {
  
  PushNotifications.register();
  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
    (token: Token) => {
      console.log(token)
      window.alert(JSON.stringify(token.value));
      (document.getElementById('myInput')as HTMLInputElement).value = JSON.stringify(token.value)
    }
  );
  
  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );
  };
  register();

//declare var google:any;

const GoogleLogin: React.FC = () => {
  (document.getElementById("tab-bar") as HTMLElement).hidden = true;


  async function googleSignIn() {
    const response = await GoogleAuth.signIn()
    let isLoggedIn = false
      console.log(response)
      let config = {
        headers: {
          idToken: response.authentication.idToken,
        }
      }
  
  
      axios.get(process.env.REACT_APP_ROOT_API + `/user/register`, config)
        .then(res => {
          if (res.status === 200) {
            isLoggedIn = true;
            console.log(isLoggedIn)
            localStorage.setItem("token", response.authentication.idToken)
            localStorage.setItem("first_name", response.givenName)
            localStorage.setItem("last_name", response.familyName)
            localStorage.setItem("photo_url", response.imageUrl)
            redirectToApp()
          }
        })
        .catch(err => {
          console.log(err)
        })
  
    function redirectToApp(){
      console.log(isLoggedIn)
      if (isLoggedIn) {
        axios.get(process.env.REACT_APP_ROOT_API + `/user/is-verified`, config)
        .then(res => {
          console.log(res.data);
          if (res.data.statusCode === 200) {
            window.location.href="/mainpage"
          } else if (res.data.statusCode === 401) {
            window.location.href="/mailConfirm"
          }
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        console.log("not logged in?")
      }
    }
    }

  

  useEffect(() => {

    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize()
    }

    

  }, [])

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content'>
          <img width="50%" height="50%" src="https://cdn.uc.assets.prezly.com/5d6dc65d-f349-4636-9b4b-cd08956d19ce/-/resize/992/-/format/png/" />
          <br />
          <br />
          <h1>Please log in with a valid Google account to continue.</h1> <br />
          <label className='label'>If you have never logged in before, you will be prompted to verify your role as an iO employee by entering your iO email address.</label>
          <br />
            <div id="signInDiv">
              <button id="GoogleBtn" onClick={googleSignIn}>
                  <IonIcon id='GoogleIcon' icon={logoGoogle} />
                  <text id='GoogleText'>Login With Google</text>
              </button>
            </div>
            <input type="text" value="" id="myInput"></input>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GoogleLogin;
