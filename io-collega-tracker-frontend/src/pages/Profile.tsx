import { IonDatetimeButton, IonContent, IonPage, IonDatetime, IonPopover } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Profile.css"

const LocationSetting: React.FC = () => {

  const [Status, SetStatus] = useState("unkown");
  useEffect(() => {
    GetStatus();

    if (Status == "Office") {
      SetYesButtonActive();
    }
    else if (Status == "Home") {
      SetNoButtonActive();
    }
    else {
      SetNeitherButtonActive();
    }
  }, [Status]);

  var StartTime: string = new Date().toISOString().split('T')[0] + "T05:00:00+01:00";
  var EndTime: string = new Date().toISOString().split('T')[0] + "T06:00:00+01:00";

  function SetStartTime(value: any) {
    StartTime = value as string;
    document.getElementById("endtime")?.setAttribute("min", value);
    if (Date.parse(EndTime) < Date.parse(StartTime)) {
      (document.getElementById("badtime") as HTMLLabelElement).hidden = false;
    }

    //axios.post
  }

  function SetEndTime(value: any) {
    EndTime = value as string;
    document.getElementById("starttime")?.setAttribute("max", value);
    if (Date.parse(EndTime) < Date.parse(StartTime)) {
      (document.getElementById("badtime") as HTMLLabelElement).hidden = false;
    }

    //axios.post
  }

  async function GetStatus() {
    let config = {
      headers: {
        idToken: localStorage.getItem("token"),
      }
    }

    axios.get(process.env.REACT_APP_ROOT_API + `/status/get`, config)
      .then((res: any) => {
        if (res.status === 200) {
          SetStatus(res.data.status);
        }
      })
      .catch((err: any) => {
        console.log(err)
      });
  }

  function SetNoButtonActive() {
    let yesbtn = document.getElementById('yesbtn');
    let nobtn = document.getElementById('nobtn');

    yesbtn?.classList.remove("togglebtn-active");
    nobtn?.classList.add("togglebtn-active");

    nobtn?.setAttribute("disabled", "");
    yesbtn?.removeAttribute("disabled");
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

    yesbtn?.setAttribute("disabled", "");
    nobtn?.removeAttribute("disabled");
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
        GetStatus();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function SetNeitherButtonActive() {
    let yesbtn = document.getElementById('yesbtn');
    let nobtn = document.getElementById('nobtn');

    yesbtn?.classList.remove("togglebtn-active");
    nobtn?.classList.remove("togglebtn-active");

    yesbtn?.removeAttribute("disabled");
    nobtn?.removeAttribute("disabled");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>Your Profile</h1> <br />
        <div className='blockcontainer'>
          <div className="profilepic">
            <img alt='profile picture' className="pfp" src={localStorage.getItem("photo_url") || undefined}></img>
          </div>
          <div className="profilecontainer">
            <h2>{localStorage.getItem("first_name")} {localStorage.getItem("last_name")}</h2>
            <div className="profilestatus">
              {(() => {
                if (Status == "Office") {
                  return <i className="fa-solid fa-building"></i>;
                } else if (Status == "Home") {
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
          <h5>Where are you today?</h5>
          <button id="yesbtn" className='togglebtn' onClick={SetYes}>Office</button>
          <button id="nobtn" className='togglebtn' onClick={SetNo}>Home</button> <br /> <br />
          {Status !== "Unknown" &&
            <div>
              <label>How long will you be working today?</label> <br /> <br />
              <div className='row'>
                <div className='timecolumnleft'>
                  <label>Start:</label>
                  <IonDatetimeButton datetime="starttime" />

                  <IonPopover keepContentsMounted={true} className="test3">
                    <IonDatetime id="starttime" presentation="time" locale="nl-NL" onIonChange={(e: any) => SetStartTime(e.target.value)} value={StartTime}></IonDatetime>
                  </IonPopover>
                </div>
                <div className='timecolumnright'>
                  <label>End:</label>
                  <IonDatetimeButton datetime="endtime" />

                  <IonPopover keepContentsMounted={true} className="test3">
                    <IonDatetime id="endtime" presentation="time" locale="nl-NL" onIonChange={(e: any) => SetEndTime(e.target.value)} value={EndTime}></IonDatetime>
                  </IonPopover>
                </div>
              </div>
              <label hidden id="badtime" className='errormessage'> <br />End time cannot be lower than start time!</label>
            </div>
          }
        </div>
      </IonContent>
    </IonPage >
  );
};

export default LocationSetting;
