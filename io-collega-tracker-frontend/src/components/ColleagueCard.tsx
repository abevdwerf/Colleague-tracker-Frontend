import './ColleagueCard.css';
import React from 'react';

interface ColleagueCardProps {
    name: string;
    location: string;
    status: string;
}

const ColleagueCard: React.FC<ColleagueCardProps> = ({name, location, status}) => {
    return (
        <div className='colleaguecard'>
            <h3>{name}</h3>
            <table>
                <tbody>
                    <tr>
                        <td width="50%">
                            <label className='colleaguelabel'>Location: {location}</label> <br />
                            <label className='colleaguelabel'>Status: {status}</label>
                        </td>
                        <td width= "20%">
                        <button className='togglebtn-active togglebtn'>kaassoufflee</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </div>
    );
}

export default ColleagueCard