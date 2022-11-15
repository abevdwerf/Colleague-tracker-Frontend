import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import "./Profile.css"

const LocationSetting: React.FC = () => {

  const [Status, SetStatus] = useState("unkown");

  useEffect(() => {
    GetStatus();
    if (Status == "Office")
    {
      SetYesButtonActive();
    }
    else{
      SetNoButtonActive();
    }
  }, []);

  //profiel data ophalen
  function GetStatus() {
    let config = {
      headers: {
        idToken: localStorage.getItem("token"),
      }
    }

    axios.get(process.env.REACT_APP_ROOT_API + `/status/get`, config)
      .then((res : any) => {
        if (res.status === 200) {
          SetStatus(res.data.status);
        }
      })
      .catch((err : any) => {
        console.log(err)
      });
  }
  
  function SetNoButtonActive() {
    let yesbtn = document.getElementById('yesbtn');
    let nobtn = document.getElementById('nobtn');

    yesbtn?.classList.remove("togglebtn-active");
    nobtn?.classList.add("togglebtn-active");
  }

  function SetNo() {
    SetNoButtonActive();

    let config = {
      headers: {
        idToken: localStorage.getItem("token"),
      },
      params: {
        status: "Home",
        expirationTime: "1701282375"
      }
    }

    axios.post(process.env.REACT_APP_ROOT_API + `/status/set`, null, config)
      .then(res => {
        console.log(res);
        GetStatus();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function SetYesButtonActive() {
    let yesbtn = document.getElementById('yesbtn');
    let nobtn = document.getElementById('nobtn');

    yesbtn?.classList.add("togglebtn-active");
    nobtn?.classList.remove("togglebtn-active");
  }

  function SetYes() {
    SetYesButtonActive();

    let config = {
      headers: {
        idToken: localStorage.getItem("token"),
      },
      params: {
        status: "Office",
        expirationTime: "1701282375"
      }
    }

    axios.post(process.env.REACT_APP_ROOT_API + `/status/set`, null, config)
      .then(res => {
        console.log(res);
        GetStatus();
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content'>
          <h1>Your Profile</h1> <br />
          <div className='blockcontainer'>
            <div className="profilepic">
              <img alt='profile picture' src={localStorage.getItem("photo_url") || undefined}></img>
            </div>
            <div className="profilecontainer">
              <h2>{localStorage.getItem("first_name")} {localStorage.getItem("last_name")}</h2>
              <div className="profilestatus">
                {(() => {
                  if (Status == "Office") {
                    return <i className="fa-solid fa-building"></i>;
                  } else if (Status == "Home"){
                    return <i className="fa-solid fa-house"></i>;
                  } else {
                    return <i className="fa-solid fa-location-pin-lock"></i>;
                  }
                })()}
                <p>{Status}</p>
              </div>
            </div>
            {/* <h5>Role(s):</h5>
            <label>*ROLES*</label> */}
            <h5>Are you at the office today?</h5>
            <button id="yesbtn" className='togglebtn togglebtn-active' onClick={SetYes}>YES</button>
            <button id="nobtn" className='togglebtn' onClick={SetNo}>NO</button> <br /> <br />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LocationSetting;
