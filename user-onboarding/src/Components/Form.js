import React from 'react';

export default function Form(props){
    const {values, disabled, update, submit, errors} = props;

    const onChange = event => {
        const {value, type, name, checked} = event.target;
        const valueToUse = type === 'checkbox' ? checked: value;
        update(name, valueToUse);
    }

    const onSubmit = event =>{
        event.preventDefault();
        submit();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-inputs">
                <label>Name
                    <input 
                        name='name'
                        value={values.name}
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
                <div className='form-submit'>
                    <button disabled={disabled}>Submit</button>
                    <div className='errors'>
                        <div>{errors.name}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        <div>{errors.tos}</div>
                    </div>
                </div>
            </div>
        </form>
    )
}