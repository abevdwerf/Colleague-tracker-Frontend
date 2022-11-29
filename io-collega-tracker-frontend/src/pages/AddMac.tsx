import { IonContent, IonPage, IonAlert } from '@ionic/react';
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
        console.log(address);
        let config = {
            headers: {
                idToken: localStorage.getItem("token")
            },
            params: {
                macAddress: address
            }
        }
        axios.post(process.env.REACT_APP_ROOT_API + `/add-mac-address`, null, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.href = "/macpage";
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.message.includes("already present")) {
                    DisplayError();
                }
            })
    }

    async function DisplayError() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Error';
        alert.subHeader = 'Could not add MAC-Address';
        alert.message = 'This MAC-Address has already been added by someone else.';
        alert.buttons = ['OK'];

        document.body.appendChild(alert);
        await alert.present();
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
