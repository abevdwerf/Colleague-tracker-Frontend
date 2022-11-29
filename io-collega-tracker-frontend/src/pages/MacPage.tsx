import { IonContent, IonPage } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MacCard from '../components/MacCard';
import './MacPage.css';

const MacPage: React.FC = () => {
    let addresslist = [] as any;
    const [Addresses, setAddresses] = useState([]);

    const ListAddresses = () => {

        let config = {
            headers: {
                idToken: localStorage.getItem("token"),
            }
        }
        useEffect(() => {
            axios.get(process.env.REACT_APP_ROOT_API + `/get-mac-addresses`, config)
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

    ListAddresses();

    function goback() {
        window.location.href = "/settings"
    }

    //let APIcall = ListAddresses();
    for (let i = 0; i < Addresses.length; i++) {
        addresslist.push(<MacCard name="*device*" address={Addresses[i]["addressValue"]} key={i} index={Addresses[i]["id"]} />);
        addresslist.push(<br key={i + "br"} />);
    }

    return (
        <IonPage>
            <IonContent fullscreen >
                <br />
                    <label className='mactitle'>Your Mac-Addresses</label> <Link className='addmacbtn' to="/addmac">+</Link>
                    <br /> <br /> <br />
                    <div>
                        {addresslist}
                    </div>
            </IonContent>
            <div className='closediv'>
                <input type="button" className='closebtn' onClick={goback} value="< Back"/>
            </div>
        </IonPage>
    );
};

export default MacPage;
