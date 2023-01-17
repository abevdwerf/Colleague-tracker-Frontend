import { IonContent, IonPage, useIonAlert } from '@ionic/react';
import axios from 'axios';

function goback() {
    localStorage.removeItem("addressid");
    window.location.href = "/macpage"
}

const EditMac: React.FC = () => {

    let id: number;
    const [presentAlert] = useIonAlert();

    const GetAddress = () => {

        let config = {
            headers: {
                idToken: localStorage.getItem("token"),
            }
        }

        axios.get(process.env.REACT_APP_ROOT_API + `/get-mac-addresses`, config)
            .then(res => {
                if (res.status === 200) {
                    for (let i = 0; i < res.data.length; i++)
                    {
                        if (res.data[i]["id"] == localStorage.getItem("addressid"))
                        {
                            id = res.data[i]["id"];
                            (document.getElementById("addressinp") as HTMLInputElement).value = res.data[i]["addressValue"];
                            (document.getElementById("labelinp") as HTMLInputElement).value = res.data[i]["label"];
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    GetAddress();

    function Save() {
        let config = {
            headers: {
                idToken: localStorage.getItem("token"),
            },
            params: {
                newLabel: (document.getElementById("labelinp") as HTMLInputElement).value.toString(),
                newMACAddress: (document.getElementById("addressinp") as HTMLInputElement).value,
                oldMACAddressID: id
            }
        }

        axios.put(process.env.REACT_APP_ROOT_API + `/change-mac-address`, null, config)
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem("addressid");
                    goback();
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.message.includes("already present")) {
                    presentAlert({
                        header: 'MAC-Address',
                        message: "You didn't change either field. If you don't want to change anything here, please go back to the previous page.",
                        buttons: ['Ok'],
                      })
                }
            })   
    }

    function Delete() {
        let config = {
            headers: {
                idToken: localStorage.getItem("token"),
            },
            params: {
                macAddressID: id
            }
        }

        axios.delete(process.env.REACT_APP_ROOT_API + `/delete-mac-address`, config)
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem("addressid");
                    goback();
                }
            })
            .catch(err => {
                console.log(err)
                presentAlert({
                    header: 'An error has occured',
                    buttons: ['Ok'],
                  })
            })
    }

    return (
        <IonPage>
            <IonContent fullscreen >
                <div className='addmacaddress'>
                    <h1>Edit MAC-Address</h1> <br />
                    <label className='addmactext'>Device Name: </label> <br />
                    <input type="text" className="textbox" placeholder='Device Name...' id="labelinp"/> <br /> <br />
                    <label className='addmactext'>Address: </label> <br />
                    <input type="text" className="textbox" id="addressinp" placeholder='e.g: 00:1B:44:11:3A:B7' />
                </div> <br />
                <button className='btn savebtn' onClick={Save}>Save Changes</button> <br />
                <button className='del btn' onClick={Delete}>Delete MAC-Address</button>
            </IonContent>
            <div className='closediv'>
                <input type="button" className='closebtn' onClick={goback} value="< Back" />
            </div>
        </IonPage>
    );
};

export default EditMac;
