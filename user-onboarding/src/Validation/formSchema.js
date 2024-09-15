import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('You forgot to put in your name!')
        .min(3, 'You got too short of a name choose a different one!'),
    email: yup
        .string()
        .email('You have to enter an email.')
        .required('Enter the email now you chump.'),
    password: yup
        .string()
        .trim()
        .required('You forgot to enter a password!')
        .min(7, 'Please enter a password that is at least 7 characters long.'),
    tos: yup.boolean().oneOf([true], 'You have no choice. Accept our Terms of Service!'),
});

export default schema;