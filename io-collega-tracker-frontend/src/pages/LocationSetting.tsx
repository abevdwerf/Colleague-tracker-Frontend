import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import "./LocationSetting.css"

const LocationSetting: React.FC = () => {
    function SetNo() {
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
                    <h1>Set your location:</h1> <br />
                    <div className='blockcontainer'>
                        <h4>Are you at the office today?</h4>
                        <button id="yesbtn" className='togglebtn' onClick={SetYes}>Yes</button>
                        <button id="nobtn" className='togglebtn' onClick={SetNo}>No</button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LocationSetting;
