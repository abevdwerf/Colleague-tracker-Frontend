import './NotificationCard.css';
import React from 'react';

interface NotificationCardProps {
    header: string,
    text: string,
}

const NotificationCard: React.FC<NotificationCardProps> = ({ header, text }) => {
    return (
        <div className='notifcard'>
            <label className='notifcardheader'>{header}</label> <br />
            <label>{text}</label>
            {/* <table style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "90%" }}>
                        <label className='notifcardheader'>{header}</label> <br />
                        <label>{text}</label>
                        </td>
                        <td style={{ width: "10%" }}>
                            <i className="fa-solid fa-angle-up icon"></i>
                        </td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
}

export default NotificationCard;