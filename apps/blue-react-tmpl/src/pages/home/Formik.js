import React, { useState, useEffect } from 'react';
import BrView from '$components/BrView';
import BrFormikError from '$components/BrFormikError';
import { Formik, Field, Form } from 'formik';
import $axios from '$axios';
import * as Yup from 'yup';

function initFormData() {
  return {
    name: '',
    age: '',
    radio: ''
  };
}

const validateFormData = Yup.object().shape({
  name: Yup.string().required(`name has error`).matches(/.+/, `name has error`),
  age: Yup.number().required(`age has error`),
  radio: Yup.number().required(`radio has error`)
});

function FormikPage(props:any) {

  const [formData, setFormData] = useState(initFormData());

  useEffect(() => {
    React.$axios.get('/mock/form').then((res) => {
      setFormData(res.data);
    });
  }, []);

  return (
    <BrView routes={props.routes}>

      <div className={"bz-t-c"}>
        <div>
          name:{formData.name}
        </div>
        <div>
          age:{formData.age}
        </div>
        <div>
          radio:{formData.radio}
        </div>
      </div>

      <Formik

        enableReinitialize={true}

        initialValues={formData}

        onSubmit={() => {
          $axios.post(`/mock/data`, formData).then((data) => {
            console.log(data);
          });
        }}

        onReset={() => {
          const formData = initFormData();
          setFormData(formData);
        }}

        validate={(values) => {
          setFormData(values);
        }}

        validationSchema={() => {
          return validateFormData;
        }}

        render={(props:any) => {
          const {
            errors,
            touched
          } = props;
          return (
            <Form className="bz-t-c">
              <Field name="name" render={({ field }) => (
                <div className="bz-pd-15rp">
                  <div>
                    <input className="bz-input" {...field} placeholder="name input"/>
                  </div>

                  {/*错误组件处理*/}
                  <BrFormikError errors={errors} touched={touched} name="name">
                    <div className="bz-t-red">
                      {errors.name}
                    </div>
                  </BrFormikError>

                </div>
              )}/>
              <Field name="age" render={(props:any) => {
                const { field } = props;
                return (
                  <div className="bz-pd-15rp">
                    <div>
                      <input className="bz-input" {...field} placeholder="age input"/>
                    </div>

                    {/*错误组件处理*/}
                    <BrFormikError errors={errors} touched={touched} name="age">
                      <div className="bz-t-red">
                        {errors.age}
                      </div>
                    </BrFormikError>

                  </div>
                );
              }}/>
              <Field name="radio" render={({ field }) => (
                <div className="bz-pd-15rp">
                  <div>
                    <label>
                      <input type={"radio"} {...field} checked={(field.value === 1 || field.value === "1")} value={1}/>
                      <span>radio</span>
                    </label>
                  </div>

                  {/*错误组件处理*/}
                  <BrFormikError errors={errors} touched={touched} name="radio">
                    <div className="bz-t-red">
                      {errors.radio}
                    </div>
                  </BrFormikError>

                </div>
              )}/>
              <div className="bz-pd-14rp bz-t-c">
                <button type="submit" className="bz-btn bz-btn-primary">submit</button>
                <button type="reset" className="bz-btn bz-btn-primary">reset</button>
              </div>
            </Form>
          );
        }}/>
    </BrView>
  );
}

export default FormikPage;