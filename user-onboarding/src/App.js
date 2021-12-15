import './App.css';
import Form from './Components/Form';
import Friend from './Components/Friend';
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
  const [friends, setFriends] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setFriends(data);
  }, [])

  const update = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]:value});
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ''}))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}));
  }

  const postNewFriend = newFriend => {
    axios.post('https://reqres.in/api/users', newFriend)
      .then(res => {
        setFriends([res.data, ...friends]);
      }).catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues));
  }

  const submit = () => {
    const newFriend = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos
    }

    postNewFriend(newFriend);
  }

  return (
    <div className="App">
      <Form values={formValues} submit={submit} update={update} disabled={disabled}/>
      {friends.map((friend, index) => (<Friend key={index} friend={friend}/> ))}
    </div>
  );
}

export default App;
