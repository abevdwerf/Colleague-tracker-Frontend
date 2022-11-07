import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import "./LocationSetting.css"

const LocationSetting: React.FC = () => {
    function SetNo() {
        
    }

    function SetYes() {

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
