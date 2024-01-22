import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

//Formik - stays as parent element where you put all settings inside as a attributes
//Field - is instead of input, select, textarea and it has all the attributes inside (onBlur, onChange ... )
//Form - stays for form to put everything inside
//ErrorMessage - already knows what is inside of error object and shows it if you have an error

const MyTextInput = ({label, ...props}) => {

    const [field, meta] = useField(props); // two objects in array, field - props(onChange, onBlur...) meta - errors 

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} /* putting our props inside*/ /> 
            {meta.touched && meta.error ? ( // for error
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const MyCheckBox = ({children, ...props}) => {

    const [field, meta] = useField(props); // two objects in array, field - props(onChange, onBlur...) meta - errors 

    return (
        <>
            <label className='checkbox'>
                <input type="checkbox" {...props} {...field} /* putting our props inside*/ />
                {children}
            </label>
            {meta.touched && meta.error ? ( // for error
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const MyForm = () => {

    return (
        <Formik
            initialValues = {{ // values for forms
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {Yup.object({ // schema for all validation yup.object returns an object with validation to every value
                name: Yup.string()
                         .min(2, '2 symbols minimum')
                         .required('Required field'),
                email: Yup.string()
                          .email('Wrong email adress')
                          .required('Required field'),
                amount: Yup.number()
                           .min(5, 'No less than 5')
                           .required('Required field'),
                currency: Yup.string().required('Choose currency'),
                text: Yup.string()
                         .min(10, "No less than 10 characters"),
                terms: Yup.boolean()
                          .required('Agreement is needed')
                          .oneOf([true], 'Agreement is needed')
                             
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
            <h2>Send charity</h2>
            <MyTextInput
                label="Your name"
                id="name"
                name="name"
                type="text"
            />
            <MyTextInput
                label="Your email"
                id="email"
                name="email"
                type="email"
            />
            <MyTextInput
                label="Amount"
                id="amount"
                name="amount"
                type="number"
            />
            <label htmlFor="currency">Currency</label>
            <Field
                id="currency"
                name="currency"
                as="select"/*we render Field as select*/>
                    <option value="">Choose currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </Field>
            <ErrorMessage className="error" name="currency" component="div"/>
            <label htmlFor="text">Your message</label>
            <Field
                id="text"
                name="text"
                as="textarea"
            />
            <ErrorMessage className="error" name="text" component="div"/>
            <MyCheckBox
                name="terms">
                    Do you agree with policy?
            </MyCheckBox>
            <button type="submit">Send</button>
        </Form>
        </Formik>
    )
}

export default MyForm;