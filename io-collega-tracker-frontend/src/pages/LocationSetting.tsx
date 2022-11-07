import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import "./LocationSetting.css"

const LocationSetting: React.FC = () => {
    function ToggleLocation() {
        (document.getElementById("yesbtn") as HTMLButtonElement).disabled = !(document.getElementById("yesbtn") as HTMLButtonElement).disabled;
        (document.getElementById("nobtn") as HTMLButtonElement).disabled = !(document.getElementById("nobtn") as HTMLButtonElement).disabled;
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='content'>
                    <h1>Set your location:</h1> <br />
                    <div className='blockcontainer'>
                        <h4>Are you at the office today?</h4>
                        <button id="yesbtn" className='togglebtn' onClick={ToggleLocation}>Yes</button>
                        <button id="nobtn" className='togglebtn' disabled onClick={ToggleLocation}>No</button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LocationSetting;
