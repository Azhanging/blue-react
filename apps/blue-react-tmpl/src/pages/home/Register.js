import React, { useState } from 'react';
import BrLayoutView from '@components/public/BrLayoutView';
import BrHeader from '$components/BrHeader';
import { Formik, Field, Form } from 'formik';
import $axios from '$axios';

function RegisterField(props) {
  const { formItem } = props;
  return (
    <Field name={formItem.name} render={({ field }) => {
      return (
        <div className={"bc-pd-10"}>
          <label>
            {formItem.name}：<input type={formItem.type} {...field} className={"bc-input"}/>
          </label>
        </div>
      );
    }}/>
  );
}

function register(formData) {
  $axios.post(`/register`, formData).then(() => {

  });
}

function Register() {

  const formField = [{
    name: 'username',
    type: 'text'
  }, {
    name: 'password',
    type: 'password'
  }, {
    name: 'email',
    type: 'text'
  }];

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  return (
    <BrLayoutView>

      <BrHeader centerControl={{
        title: 'register'
      }}/>

      <div className={"bc-t-c"}>
        <Formik
          initialValues={formData}
          validate={(values) => {
            setFormData(values);
          }}
        >
          <Form>
            {formField.map((formItem, index) => (
              <RegisterField formItem={formItem} key={`field-${index}`}/>
            ))}
            <div className={"bc-t-c"}>
              <button className={"bc-btn bc-btn-primary"}>
                login
              </button>
              <button className={"bc-btn bc-btn-primary bc-mg-l-10"} onClick={() => {
                register(formData);
              }}>
                register
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </BrLayoutView>
  );
}

export default Register;