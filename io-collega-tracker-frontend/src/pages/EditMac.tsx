import { IonContent, IonPage } from '@ionic/react';
import axios from 'axios';
import { useEffect } from 'react';

function goback() {
    localStorage.removeItem("addressid");
    window.location.href = "/macpage"
}

const EditMac: React.FC = () => {

    let id: number;

    const GetAddress = () => {

        let config = {
            headers: {
                idToken: localStorage.getItem("token"),
            }
        }
        axios.get(process.env.REACT_APP_ROOT_API + `/get-mac-addresses`, config)
            .then(res => {
                if (res.status === 200) {
                    console.log(localStorage.getItem("addressid"))
                    for (let i = 0; i < res.data.length; i++)
                    {
                        console.log(res.data[i]["id"])
                        if (res.data[i]["id"] == localStorage.getItem("addressid"))
                        {
                            id = res.data[i]["id"];
                            (document.getElementById("addressinp") as HTMLInputElement).value = res.data[i]["addressValue"];
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
                newMACAddress: (document.getElementById("addressinp") as HTMLInputElement).value,
                oldMACAddressID: id
            }
        }

        axios.put(process.env.REACT_APP_ROOT_API + `/change-mac-address`, null, config)
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem("addressid");
                    console.log(res);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    async function DisplayError() {
        window.alert("test");
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
                    console.log(res);
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
                    <h1>Edit MAC-Address</h1> <br />
                    <label className='addmactext'>Device Name: </label> <br />
                    <input type="text" className="textbox" placeholder='Device Name...' /> <br /> <br />
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
