import './ColleagueCard.css';
import React from 'react';
import axios from 'axios';

interface ColleagueCardProps {
    first_name: string;
    last_name: string;
    location: string;
    id: string;
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
                            <button className='btn notifybtn' onClick={() => Notify(id)}>Notify</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ColleagueCard