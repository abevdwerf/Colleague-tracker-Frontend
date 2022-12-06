import { IonDatetimeButton, IonContent, IonPage, IonDatetime, IonPopover } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Profile.css"

const LocationSetting: React.FC = () => {

  const [Status, SetStatus] = useState("unkown");

  const [StartTime, SetStartTime] = useState(
    useEffect(() => {

      if (StartTime !== undefined) {
        document.getElementById("endtime")?.setAttribute('min', StartTime);
      }
      if (StartTime !== undefined && EndTime !== undefined) {
        CheckTimes();
      }
    })
  );

  const [EndTime, SetEndTime] = useState(
    useEffect(() => {

      if (EndTime !== undefined) {
        document.getElementById("starttime")?.setAttribute('max', EndTime);
      }
      if (StartTime !== undefined && EndTime !== undefined) {
        CheckTimes();
      }
    })
  );

  useEffect(() => {
    GetStatus();

    if (Status == "Office") {
      SetYesButtonActive();
    }
    else {
      SetNoButtonActive();
    }
  }, [Status]);

  function CheckTimes() {
    var start = Date.parse(StartTime as unknown as string);
    var end = Date.parse(EndTime as unknown as string);
    if (end < start) {
      (document.getElementById("badtime") as HTMLLabelElement).hidden = false;
      // (document.getElementById("tab-bar") as HTMLElement).hidden = true;
    }
    else {
      (document.getElementById("badtime") as HTMLLabelElement).hidden = true;
      // (document.getElementById("tab-bar") as HTMLElement).hidden = false;
      //Do DB Stuff
    }
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
        if (err.response.status === 401) {
          window.location.href= "/googlelogin";
        }
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
                <IonDatetime id="starttime" presentation="time" locale="nl-NL" onIonChange={(e: any) => SetStartTime(e.target.value)}></IonDatetime>
              </IonPopover>
            </div>
            <div className='timecolumnright'>
              <label>End:</label>
              <IonDatetimeButton datetime="endtime" />

              <IonPopover keepContentsMounted={true} className="test3">
                <IonDatetime id="endtime" presentation="time" locale="nl-NL" onIonChange={(e: any) => SetEndTime(e.target.value)}></IonDatetime>
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
