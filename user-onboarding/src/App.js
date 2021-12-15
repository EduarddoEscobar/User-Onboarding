import './App.css';
import Form from './Components/Form';
import User from './Components/User';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from './Validation/formSchema';

const data = [
  {first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com', password: 'password123', tos: true},
  {first_name: 'Johny', last_name: 'Doey', email: 'johnydoey@example.com', password: 'password123', tos: true},
]

function App() {
  
  const initialFormValues = {first_name:'', last_name:'', email:'', password:'', tos:false};
  const initialFormErrors = {first_name:'', last_name:'', email:'', password:'', tos:''};
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: ''});
        console.log(formErrors);
      }).catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}));
  }

  const formUpdate = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]:value});
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users]);
      }).catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues));
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos
    }

    postNewUser(newUser);
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues])

  useEffect(() => {setUsers(data)}, []);

  return (
    <div className="App">
      <Form values={formValues} submit={formSubmit} update={formUpdate} disabled={disabled} errors={formErrors}/>
      {users.map((user, index)=> (<User key={index} user={user}/> ))}
    </div>
  );
}

export default App;
