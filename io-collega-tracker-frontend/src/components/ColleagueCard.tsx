import './ColleagueCard.css';
import React from 'react';
import axios from 'axios';
import { useIonViewDidEnter } from '@ionic/react';

interface ColleagueCardProps {
    first_name: string;
    last_name: string;
    location: string;
    id: string;
    beginTime: string;
    expirationTime: string;
}

let AlertsList: any;

if (JSON.parse(window.localStorage.getItem("AlertSentTime") || '{}').length === 1 || window.localStorage.getItem("AlertSentTime") == null) {
    AlertsList = [{}]
}
else {
    AlertsList = JSON.parse(window.localStorage.getItem("AlertSentTime") || '{}');

    setInterval(function () {
        console.log(AlertsList.length)
        for (let index = 1; index < AlertsList.length; index++) {
            const d = new Date();
            const time = d.getTime() / 1000;
            if (AlertsList[index].AlertTimer > time) {
                (document.getElementById(AlertsList[index].userId) as HTMLButtonElement).disabled = true;
            }
            if (AlertsList[index].AlertTimer < time) {
                (document.getElementById(AlertsList[index].userId) as HTMLButtonElement).disabled = false;
                let NewList = [{}];
                for (let i = 1; i < AlertsList.length; i++) {
                    if(AlertsList[index].userId !== AlertsList[i].userId){
                        NewList.push({ userId: AlertsList[i].userId, AlertTimer: AlertsList[i].AlertTimer })
                    }
                }
                window.localStorage.setItem("AlertSentTime", JSON.stringify(NewList));
            }
            AlertsList = JSON.parse(window.localStorage.getItem("AlertSentTime") || '{}');
        }
    }, 1000)
}



function Notify(id: string) {
    console.log(id);
    console.log(typeof (id));

    let config = {
        headers: {
            idToken: localStorage.getItem("token")
        },
        params: {
            notifiedUserId: id
        }
    }

    axios.post(process.env.REACT_APP_ROOT_API + `/notification/notify`, null, config)
        .then(res => {
            if (res.status === 200) {
                console.log(res);
            }
        })
        .catch(err => {
            console.log(err)
        })


    const d = new Date();
    const time = d.getTime() / 1000;
    const timer = time + 300;
    console.log("btn time: "+time)
    AlertsList.push({ userId: id, AlertTimer: timer })
    window.localStorage.setItem("AlertSentTime", JSON.stringify(AlertsList));

    console.log(AlertsList)
    window.location.reload();
}

const ColleagueCard: React.FC<ColleagueCardProps> = ({ first_name, last_name, location, id }) => {
    return (
        <div className='colleaguecard'>
            <label className='name'>{first_name} {last_name}</label>
            <table>
                <tbody>
                    <tr>
                        <td width="50%">
                            <label className='colleaguelabel'>Location: {location}</label> <br />
                            {/* <label className='colleaguelabel'>Status: {status}</label> */}
                        </td>
                        <td width="20%">
                            <button className='btn notifybtn' id={id} onClick={() => Notify(id)}>Notify</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ColleagueCard