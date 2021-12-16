import './App.css';
import Form from './Components/Form';
import User from './Components/User';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from './Validation/formSchema';

const data = [
  {name: 'John Doe', email: 'johndoe@example.com', password: 'password123', tos: true},
  {name: 'Johny Doey', email: 'johnydoey@example.com', password: 'password123', tos: true},
]

function App() {
  
  const initialFormValues = {name:'', email:'', password:'', tos:false};
  const initialFormErrors = {name:'', email:'', password:'', tos:''};
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: ''});
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
      name: formValues.name.trim(),
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
      <div className="content">
        <Form values={formValues} submit={formSubmit} update={formUpdate} disabled={disabled} errors={formErrors}/>
        <div className="userList">
          {users.map((user, index)=> (<User key={index} user={user}/> ))}
        </div>
      </div>
    </div>
  );
}

export default App;
