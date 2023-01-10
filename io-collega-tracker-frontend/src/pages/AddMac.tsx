import { IonContent, IonPage, useIonAlert } from '@ionic/react';
import axios from 'axios';

const AddMac: React.FC = () => {
    function goback() {
        window.location.href = "/macpage";
    }

    const [presentAlert] = useIonAlert();

    const AddAddress = () => {

        let address = (document.getElementById("addressinp") as HTMLInputElement).value
        let label = (document.getElementById("labelinp") as HTMLInputElement).value
        let config = {
            headers: {
                idToken: localStorage.getItem("token")
            },
            params: {
                label: label,
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
                    if (err.response.data.message.includes("already present")) {
                        presentAlert({
                            header: 'MAC-Address',
                            message: "This MAC-Address has already been added by either you or someone else before. Please enter a different MAC-Address.",
                            buttons: ['Ok'],
                        })
                    }
                }
            })
    }

    return (
        <IonPage>
            <IonContent fullscreen >
                <div className='addmacaddress'>
                    <h1>Add MAC-Address</h1> <br />
                    <label className='addmactext'>Device Name: </label> <br />
                    <input type="text" className="textbox" placeholder='Device Name...' id="labelinp" /> <br /> <br />
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
