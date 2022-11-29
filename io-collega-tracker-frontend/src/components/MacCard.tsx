import './MacCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

interface MacCardProps {
    name: string;
    address: string;
    index: string;
}

const MacCard: React.FC<MacCardProps> = ({ name, address, index }) => {
    return (
        <div className="maccard">
            <Link to="/editmac" className='link' onClick={() => localStorage.setItem("addressid", index)}><div className='row'>
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