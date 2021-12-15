import React from 'react';

export default function Form(props){
    const {values, disabled, change, submit, errors} = props;

    const onChange = event => {
        const {value, type, name, checked} = event.target;
        const valueToUse = type === 'checkbox' ? checked: value;
        change(name, valueToUse);
    }

    const onSubmit = event =>{
        event.preventDefault();
        submit();
    }

    return (
        <form onSubmit={onSubmit}>
            <label>First Name
                <input 
                    name='first_name'
                    value={values.first_name}
                    onChange={onChange}
                    type='text'

                />            
            </label>

            <label>Last Name
                <input 
                    name='last_name'
                    value={values.last_name}
                    onChange={onChange}
                    type='text'

                />
            </label>

            <label>Email
                <input 
                    name='email'
                    value={values.email}
                    onChange={onChange}
                    type='email'

                />
            </label>

            <label>Password
                <input 
                    name='password'
                    value={values.password}
                    onChange={onChange}
                    type='password'

                />
            </label>

            <label>Terms of Service
                <input 
                    name='tos'
                    checked={values.tos}
                    onChange={onChange}
                    type='checkbox'

                />
            </label>
            <button disabled={disabled}>Submit</button>
        </form>
    )
}