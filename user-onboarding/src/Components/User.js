import React from 'react';

export default function User(props){
    const {user} = props;

    return(
        <div className="user">
            <h2>{user.first_name} {user.last_name}</h2>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Agreed: {user.tos? 'yes': 'no'}</p>
        </div>
    )
}