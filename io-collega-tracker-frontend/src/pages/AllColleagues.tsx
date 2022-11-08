import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cloneElement, useEffect } from 'react';
import ColleagueCard from '../components/ColleagueCard';
import ExploreContainer from '../components/ExploreContainer';
import './AllColleagues.css';

const AllColleagues: React.FC = () => {

    let colleaguelist;

    ListColleagues();

    function ListColleagues() {
        colleaguelist = [];

        //Haal Op

        for (let i = 0; i < colleaguelist.length; i++) {
            //zet in props
            colleaguelist.push(<ColleagueCard name={colleaguelist[i].props.name} location={colleaguelist[i].props.location} status={colleaguelist[i].props.status} />);
            colleaguelist.push(<br />);
        }

        /* for (let i = 0; i < 5; i++) {
            colleaguelist.push(<ColleagueCard name={i} location='Office' status='Available' />);
            colleaguelist.push(<br />);
        }*/
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='content'>
                     <h1>All Colleagues</h1> <br /> <br />
                    <div className='searchdiv'>
                        <input type="text" className='searchbox' placeholder='Search Colleagues...'></input> <input type='button' className='searchbtn' value='Search' />
                    </div> <br />
                    <div className='colleagues'>
                        {colleaguelist}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AllColleagues;
