import './MacCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

interface MacCardProps {
    name: string;
    address: string;
}

const MacCard: React.FC<MacCardProps> = ({ name, address }) => {
    return (
        <div className="maccard">
            <Link to="/editmac" className='link'><div className='row'>
                <div className='columnleft'>
                    <label className='devicename'>{name}</label> <br />
                    <label className='addresstext'>{address}</label>
                </div>
                <div className='columnright'>
                    <input className='viewbtn' value=">" disabled />
                </div>
            </div></Link>

        </div>
    )
}

export default MacCard;