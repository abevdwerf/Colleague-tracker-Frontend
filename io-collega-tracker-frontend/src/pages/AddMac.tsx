import { IonContent, IonPage } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AddMac: React.FC = () => {
    function goback() {
        window.location.href = "/macpage"
    }

    let addresslist = [] as any;
    let addresses = [];
    const [Addresses, setAddresses] = useState([]);

    const AddAddress = () => {

        let address = (document.getElementById("addressinp") as HTMLInputElement).value
        let config = {
            headers: {
                idToken: localStorage.getItem("token")
            }
        }

        axios.post(process.env.REACT_APP_ROOT_API + `/add-mac-address`, {macAddress: address},  config)
            .then(res => {
                if (res.status === 200) {
                    setAddresses(res.data);
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <IonPage>
            <IonContent fullscreen >
                <div className='addmacaddress'>
                    <h1>Add MAC-Address</h1> <br />
                    <label className='addmactext'>Device Name: </label> <br />
                    <input type="text" className="textbox" placeholder='Device Name...' /> <br /> <br />
                    <label className='addmactext'>Address: </label> <br />
                    <input type="text" className="textbox" id="addressinp" placeholder='e.g: 00:1B:44:11:3A:B7' />
                </div> <br />
                <button className='btn' onClick={AddAddress}>Add MAC-Address</button>
            </IonContent>
            <div className='closediv'>
                <input type="button" className='closebtn' onClick={goback} value="< Back" />
            </div>
        </IonPage>
    );
};

export default AddMac;
