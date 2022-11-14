import './ColleagueCard.css';
import React from 'react';

interface ColleagueCardProps {
    first_name: string;
    last_name: string;
    location: string;
}

const ColleagueCard: React.FC<ColleagueCardProps> = ({first_name,last_name, location}) => {
    return (
        <div className='colleaguecard'>
            <h3>{first_name} {last_name}</h3>
            <table>
                <tbody>
                    <tr>
                        <td width="50%">
                            <label className='colleaguelabel'>Location: {location}</label> <br />
                            {/* <label className='colleaguelabel'>Status: {status}</label> */}
                        </td>
                        <td width= "20%">
                        {/* <button className='togglebtn-active togglebtn'>Notify</button> */}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </div>
    );
}

export default ColleagueCard