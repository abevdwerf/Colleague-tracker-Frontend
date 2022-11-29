
import { IonDatetimeButton, IonContent, IonPage, IonDatetime, IonPopover } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Profile.css"

const LocationSetting: React.FC = () => {

  const [Status, SetStatus] = useState("unkown");

  var StartTime: string = new Date().toISOString().split('T')[0] + "T09:00:00+01:00";
  var EndTime: string = new Date().toISOString().split('T')[0] + "T17:00:00+01:00";

  function SetStartTime(value: any) {
    StartTime = value as string;
    document.getElementById("endtime")?.setAttribute("min", value);
    if (Date.parse(EndTime) < Date.parse(StartTime)) {
      (document.getElementById("badtime") as HTMLLabelElement).hidden = false;
    }
    console.log(StartTime);
    if (Status == "Office") {
      SetYes();
    }
    else if (Status == "Home") {
      SetNo();
    }
  }

  function SetEndTime(value: any) {
    EndTime = value as string;
    document.getElementById("starttime")?.setAttribute("max", value);
    if (Date.parse(EndTime) < Date.parse(StartTime)) {
      (document.getElementById("badtime") as HTMLLabelElement).hidden = false;
    }
    console.log(EndTime);
    if (Status == "Office") {
      SetYes();
    }
    else if (Status == "Home") {
      SetNo();
    }
  }

  useEffect(() => {
    GetStatus();
    if (Status == "Office") {
      SetYesButtonActive();
    }
    else if (Status == "Home") {
      SetNoButtonActive();
    }
    else{
      
    }
  }, [Status]);

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
          // var startdate = new Date(res.data.beginTime * 1000).toISOString().split('T')[1].split('.')[0];
          // StartTime = new Date(res.data.beginTime * 1000).toISOString().split('T')[0] + 'T' + startdate + "+01:00";
          // var enddate = new Date(res.data.expirationTime * 1000).toISOString().split('T')[1].split('.')[0];
          // EndTime = new Date(res.data.expirationTime * 1000).toISOString().split('T')[0] + 'T' + enddate + "+01:00";
          // console.log(EndTime)
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
        beginTime: new Date(StartTime).getTime() / 1000,
        expirationTime: new Date(EndTime).getTime() / 1000
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
        beginTime: new Date(StartTime).getTime() / 1000,
        expirationTime: new Date(EndTime).getTime() / 1000
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
      </IonContent>
    </IonPage >
  );
};

export default LocationSetting;