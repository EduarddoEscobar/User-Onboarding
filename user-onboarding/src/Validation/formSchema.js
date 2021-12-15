import * as yup from 'yup';

const schema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required('You forgot to put in your first name!')
        .min(3, 'You got too short of a first name choose a different one!'),
    last_name: yup
        .string()
        .trim()
        .required('You forgot to put in your last name!')
        .min(3, 'You got too short of a last name choose a different one!'),
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