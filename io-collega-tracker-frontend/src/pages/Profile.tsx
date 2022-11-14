import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import "./Profile.css"

const LocationSetting: React.FC = () => {

  //profiel data ophalen

  function SetNo() {
    let yesbtn = document.getElementById('yesbtn');
    let nobtn = document.getElementById('nobtn');

    yesbtn?.classList.remove("togglebtn-active");
    nobtn?.classList.add("togglebtn-active");

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
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function SetYes() {
    let yesbtn = document.getElementById('yesbtn');
    let nobtn = document.getElementById('nobtn');

    yesbtn?.classList.add("togglebtn-active");
    nobtn?.classList.remove("togglebtn-active");

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
        console.log(res)
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
            <h4>{localStorage.getItem("first_name")} {localStorage.getItem("last_name")}</h4>
            {/* <h5>Role(s):</h5>
            <label>*ROLES*</label> */}
            <h5>Are you at the office today?</h5>
            <button id="yesbtn" className='togglebtn togglebtn-active' onClick={SetYes}>Yes</button>
            <button id="nobtn" className='togglebtn' onClick={SetNo}>No</button> <br /> <br />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LocationSetting;
