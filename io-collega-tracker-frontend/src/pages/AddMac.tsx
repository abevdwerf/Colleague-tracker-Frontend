import { IonContent, IonPage } from '@ionic/react';

function goback() {
    window.location.href = "/macpage"
}

const AddMac: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen >
                <div className='addmacaddress'>
                    <h1>Add MAC-Address</h1> <br />
                    <label className='addmactext'>Device Name: </label> <br />
                    <input type="text" className="textbox" placeholder='Device Name...' /> <br /> <br />
                    <label className='addmactext'>Address: </label> <br />
                    <input type="text" className="textbox" placeholder='e.g: 00:1B:44:11:3A:B7' />
                </div> <br />
                <button className='btn'>Add MAC-Address</button>
            </IonContent>
            <div className='closediv'>
                <input type="button" className='closebtn' onClick={goback} value="< Back" />
            </div>
        </IonPage>
    );
};

export default AddMac;
