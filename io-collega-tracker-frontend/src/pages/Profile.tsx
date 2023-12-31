import { IonDatetimeButton, IonContent, IonPage, IonDatetime, IonPopover } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Profile.css"
import Image from "../profile-icon-9.png"

const LocationSetting: React.FC = () => {

  const [Status, SetStatus] = useState("Unknown");

  const [StartTime, SetStartTime] = useState<string>();
  const [EndTime, SetEndTime] = useState<string>();

  useEffect(() => {
    GetStatus();
    if (Status == "Office") {
      SetYesButtonActive();
    }
    else if (Status == "Home") {
      SetNoButtonActive();
    }
    else { }
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
          if (res.data.status === "Unknown" && res.data.detectedAtOffice === false && res.data.active === false) {
            SetStatus("Unknown");
          }
          else if (res.data.status !== "Unknown" && res.data.detectedAtOffice == true && res.data.active == false) {
            SetStatus("Office");
          }
          else if (res.data.status !== "Unknown" && res.data.detectedAtOffice == true && res.data.active == true) {
            SetStatus(res.data.status);
          }
          else if (res.data.status !== "Unknown" && res.data.detectedAtOffice == true && res.data.active == false) {
            SetStatus("Unknown");
            if (Status == "Office") {
              SetYesButtonActive();
              console.log("ye");
            }
            else if (Status == "Home") {
              SetNoButtonActive();
            }
          }
          else if (res.data.status !== "Unknown" && res.data.detectedAtOffice == false && res.data.active == true) {
            SetStatus(res.data.status);
          }
          else if (res.data.status !== "Unknown" && res.data.detectedAtOffice == false && res.data.active == false) {
            SetStatus("Unknown");
            if (Status == "Office") {
              SetYesButtonActive();
              console.log("ye");
            }
            else if (Status == "Home") {
              SetNoButtonActive();
            }
          }
          if (res.data.beginTime !== null && res.data.expirationTime !== null) {
            var startdate = new Date(res.data.beginTime * 1000).toISOString().split('T')[1].split('.')[0];
            var updatedstartdate = (parseInt((startdate.substring(0, 2))) + 1).toString();
            if (updatedstartdate.length === 1) {
              updatedstartdate = "0" + updatedstartdate;
            }
            startdate = updatedstartdate + startdate.substring(2, startdate.length);
            SetStartTime(new Date(res.data.beginTime * 1000).toISOString().split('T')[0] + 'T' + startdate + "+01:00");

            var enddate = new Date(res.data.expirationTime * 1000).toISOString().split('T')[1].split('.')[0];
            var updatedenddate = (parseInt((enddate.substring(0, 2))) + 1).toString();
            if (updatedenddate.length === 1) {
              updatedenddate = "0" + updatedenddate;
            }
            enddate = updatedenddate + enddate.substring(2, enddate.length);
            SetEndTime(new Date(res.data.expirationTime * 1000).toISOString().split('T')[0] + 'T' + enddate + "+01:00");

            document.getElementById("starttime")?.setAttribute("max", EndTime as string);
            document.getElementById("endtime")?.setAttribute("min", StartTime as string);

            (document.getElementById("timeupdate") as HTMLButtonElement).hidden = true;

            var newDate = new Date().toISOString().split('T')[1].substring(0, 5).split(":");
            var newTime = parseInt(newDate[0] + newDate[1]) + 100;

            var bstartdate = new Date(res.data.beginTime * 1000).toISOString().split('T')[1].split('.')[0].substring(0, 5);
            var midstartdate = bstartdate.split(":");
            var newstartdate = parseInt(midstartdate[0] + midstartdate[1]) + 100;
            console.log()
            if (newstartdate > newTime) {
              (document.getElementById("time") as HTMLParagraphElement).innerHTML = "At " + res.data.status + " from " + startdate.substring(0, 5) + " - " + enddate.substring(0, 5);
            }
            else {
              (document.getElementById("time") as HTMLParagraphElement).innerHTML = startdate.substring(0, 5) + " - " + enddate.substring(0, 5);
            }
          }
          else {
            SetStartTime(new Date().toISOString().split('T')[0] + "T09:00:00+01:00");
            SetEndTime(new Date().toISOString().split('T')[0] + "T17:00:00+01:00");
            (document.getElementById("time") as HTMLParagraphElement).innerHTML = "No Time Set";
          }
        }
      })
      .catch((err: any) => {
        console.log(err)
        if (err.response.status === 401) {
          window.location.href = "/googlelogin";
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
    (document.getElementById("timeupdate") as HTMLButtonElement).hidden = true;
    let config = {
      headers: {
        idToken: localStorage.getItem("token"),
      },
      params: {
        status: "Home",
        beginTime: new Date(StartTime as string).getTime() / 1000,
        expirationTime: new Date(EndTime as string).getTime() / 1000
      }
    }

    if (StartTime === undefined || EndTime === undefined) {
      config.params.beginTime = new Date(new Date().toISOString().split('T')[0] + "T09:00:00+01:00").getTime() / 1000;
      config.params.expirationTime = new Date(new Date().toISOString().split('T')[0] + "T17:00:00+01:00").getTime() / 1000;
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
    (document.getElementById("timeupdate") as HTMLButtonElement).hidden = true;
    let config = {
      headers: {
        idToken: localStorage.getItem("token"),
      },
      params: {
        status: "Office",
        beginTime: new Date(StartTime as string).getTime() / 1000,
        expirationTime: new Date(EndTime as string).getTime() / 1000
      }
    }

    if (StartTime === undefined || EndTime === undefined) {
      config.params.beginTime = new Date(new Date().toISOString().split('T')[0] + "T09:00:00+01:00").getTime() / 1000;
      config.params.expirationTime = new Date(new Date().toISOString().split('T')[0] + "T17:00:00+01:00").getTime() / 1000;
    }

    axios.post(process.env.REACT_APP_ROOT_API + `/status/set`, null, config)
      .then(res => {
        GetStatus();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function SetStart(value: any) {
    SetStartTime(value);
    if (Status === "Office" || Status === "Home") {
      (document.getElementById("timeupdate") as HTMLButtonElement).hidden = false;
    }
  }

  function SetEnd(value: any) {
    SetEndTime(value);
    if (Status === "Office" || Status === "Home") {
      (document.getElementById("timeupdate") as HTMLButtonElement).hidden = false;
    }
  }

  function UpdateTime() {
    if (Status === "Office") {
      SetYes()
    }
    else if (Status === "Home") {
      SetNo();
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>Your Profile</h1> <br />
        <div className='blockcontainer'>
          <div className="profilepic">
            <img alt='profile picture' id='pfp' className="pfp" src={localStorage.getItem("photo_urls") || Image}></img>
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
              <p>{Status}</p> <br />
              <p id="time">No Time Set</p>
            </div>
          </div>
          {/* <h5>Role(s):</h5>
              <label>*ROLES*</label> */}
          <h5>Where are you working from today?</h5>
          <button id="yesbtn" className='togglebtn' onClick={SetYes}>Office</button>
          <button id="nobtn" className='togglebtn' onClick={SetNo}>Home</button> <br />
          <h5>And for how long?</h5>
          <div className='row'>
            <div className='timecolumnleft'>
              <label>Start:</label>
              <IonDatetimeButton datetime="starttime" />

              <IonPopover keepContentsMounted={true} className="test3">
                <IonDatetime id="starttime" presentation="time" locale="nl-NL" onIonChange={(e: any) => SetStart(e.target.value)} value={StartTime}></IonDatetime>
              </IonPopover>
            </div>
            <div className='timecolumnright'>
              <label>End:</label>
              <IonDatetimeButton datetime="endtime" />

              <IonPopover keepContentsMounted={true} className="test3">
                <IonDatetime id="endtime" presentation="time" locale="nl-NL" onIonChange={(e: any) => SetEnd(e.target.value)} value={EndTime}></IonDatetime>
              </IonPopover>
            </div>
          </div>
          <label hidden id="badtime" className='errormessage'> <br />End time cannot be lower than start time!</label>
          <button onClick={UpdateTime} hidden id="timeupdate" className='btn notifybtn'>Update Time</button>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default LocationSetting;