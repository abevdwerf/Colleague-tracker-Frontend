import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cloneElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ColleagueCard from '../components/ColleagueCard';
import ExploreContainer from '../components/ExploreContainer';
import './Settings.css';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen >
                <div className='content'>
                    <h1>Settings</h1> <br />
                    <button className='settingsbtn'>Profile</button> <br />
                    <button className='settingsbtn'>Nofitications</button> <br />
                    <Link to="/macpage"><button className='settingsbtn'>MAC-Addresses</button></Link> <br />
                    <button className='settingsbtn'>Terms & Conditions</button> <br />               
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
