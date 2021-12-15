import React from 'react';

export default function Friend(props){
    const {friend} = props;

    return(
        <div className="friend">
            <h2>{friend.first_name} {friend.last_name}</h2>
            <p>Email: {friend.email}</p>
            <p>Password: {friend.password}</p>
            <p>Agreed: {friend.tos}</p>
        </div>
    )
}