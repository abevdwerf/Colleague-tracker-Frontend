import { IonContent, IonPage } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MacCard from '../components/MacCard';
import './MacPage.css'

const MacPage: React.FC = () => {
    let addresslist = [] as any;
    let addresses = [];
    const [Addresses, setAddresses] = useState([]);
    
    const ListAddresses = () => {
    
        let config = {
            headers: {
                idToken: localStorage.getItem("token"),
            }
        }
    
        useEffect(() => {
            axios.get(process.env.REACT_APP_ROOT_API + `/status/get-all-colleagues`, config)
                .then(res => {
                    if (res.status === 200) {
                        setAddresses(res.data);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }, []);
    
        return Addresses;
    }
    
    //let APIcall = ListAddresses();
    for (let i = 0; i < 3; i++) {
        addresslist.push(<MacCard name="*device*" address="*address*" key={i} />);
        addresslist.push(<br key={i + "br"} />);
    }

    return (
        <IonPage>
            <IonContent fullscreen >
                <div className='content'>
                    <label className='mactitle'>Your Mac-Addresses</label> <Link className='addmacbtn' to="/addmac">+</Link>
                    <br /> <br /> <br />
                    <div>
                        {addresslist}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MacPage;
