import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cloneElement, useEffect } from 'react';
import ColleagueCard from '../components/ColleagueCard';
import ExploreContainer from '../components/ExploreContainer';
import './MainPage.css';

const MainPage: React.FC = () => {

    let colleaguelist;

    knaker();

    function knaker() {
        colleaguelist = [];

        //Haal Shit Op en Voeg Toe

        for (let i = 0; i < colleaguelist.length; i++) {
            //zet shit in props
            colleaguelist.push(<ColleagueCard name={colleaguelist[i].props.name} location={colleaguelist[i].props.location} status={colleaguelist[i].props.status} />);
            colleaguelist.push(<br />);
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='content'>
                    <h1>Welcome</h1> <br />
                    <button className='btn'>View All Colleagues</button> <br /> <br />
                    <h2>Favorite Colleagues</h2>
                    <div className='colleagues'>
                        {colleaguelist}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MainPage;
