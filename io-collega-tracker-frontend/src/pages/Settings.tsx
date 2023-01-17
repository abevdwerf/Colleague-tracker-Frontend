import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

const Settings: React.FC = () => {
    const modal = useRef<HTMLIonModalElement>(null);

    return (
        <IonPage>
            <IonContent fullscreen >
                <h1>Settings</h1> <br />
                <Link to="/macpage"><button className='settingsbtn'>MAC-Addresses</button></Link> <br />
                <button className='settingsbtn' id="open-modal">Terms & Conditions</button> <br />

                <IonModal ref={modal} trigger="open-modal" className='ionmodal'>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton style={{ color: "white", textDecoration: "underline" }} onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle className='ionmodal'>Terms & Conditions</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className='ionmodal'>
                        <br />
                        <p>(terms and conditions here)</p>
                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default Settings;
