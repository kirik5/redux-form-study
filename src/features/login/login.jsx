import React from "react";
import styles from "./login.module.css";
import {Field, reduxForm} from "redux-form";


const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error, warning}
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function showResults(values) {
    await sleep(500); // simulate server latency
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};


const LoginForm = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props
    return (
        <form onSubmit={handleSubmit} className={styles.containerCenter}>

                <Field name="username" component={renderField} type="text" className={styles.one}/>

                <Field name="email" component={renderField} type="email"/>

                <Field name="age" component={renderField} type="number"/>
            <button type="submit" disabled={submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>reset</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
    validate,
    warn,
})(LoginForm)

const Login = () => {

    return (
        <>
            <h1>Авторизация на сайте...</h1>
            <div>
                <LoginReduxForm onSubmit={showResults}/>
            </div>

        </>
    )
}

export default Login