import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState} from 'react'
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './GoogleLogin.css';

declare var google:any;

const GoogleLogin: React.FC = () => {

  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('')
  const [data, setData] = useState('')
  

  useEffect(() => {
    async function handleCallbackResponse(response:any) {
      let isLoggedIn = false
      setToken(response.credential)
      console.log(response.credential)
      let config = {
        headers: {
          idToken: response.credential,
        }
      }
  
  
      axios.get(process.env.REACT_APP_ROOT_API + `/user/register`, config)
        .then(res => {
          if (res.status === 200) {
            isLoggedIn = true;
            console.log(isLoggedIn)
            localStorage.setItem("token", response.credential)
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
            window.location.href="/locationSetting"
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
  
    google.accounts.id.initialize({
      client_id:"733509514183-sa302u6f1fhqc7a93j789daqmgr63ckv.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })


    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { 
      theme: "filled_blue", 
      size: "large",
      shape: "rectangular",
      width: 150,
    }
    );

  }, [])




  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content'>
          <h1>Please log in with a valid Google account to continue.</h1> <br />
          <label className='label'>If you have never logged in before, you will be prompted to verify your role as an iO employee by entering your iO email address.</label>
          <br />
            <div id="signInDiv"/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GoogleLogin;
