import React, { useState } from 'react';
import BrLayoutView from '@components/public/BrLayoutView';
import BrFormikError from '$components/BrFormikError';
import { Formik, Field, Form } from 'formik';
import $axios from '$axios';
import * as Yup from 'yup';

function initFormData() {
  return {
    name: '',
    age: ''
  };
}

const validateFormData = Yup.object().shape({
  name: Yup.string().required(`name has error`).matches(/.+/, `name has error`),
  age: Yup.number().required(`age has error`)
});

function FormikPage(props) {

  const [formData, setFormData] = useState(initFormData());

  return (
    <BrLayoutView routes={props.routes}>

      <div className={"bc-t-c"}>
        <div>
          name:{formData.name}
        </div>
        <div>
          age:{formData.age}
        </div>
      </div>

      <Formik

        initialValues={formData}

        onSubmit={() => {
          $axios.post(`/mock/data`, formData).then((data) => {
            console.log(data);
          });
        }}

        onReset={() => {
          const formData = initFormData();
          setFormData(formData);
          // Formik源码中读取initialValues的值，在setState在nextTick执行，
          // 所以需要返回Promise处理formData数据
          return Promise.resolve(() => formData);
        }}

        validate={(values) => {
          setFormData(values);
        }}

        validationSchema={() => {
          return validateFormData;
        }}

        render={(props) => {
          const {
            errors,
            touched
          } = props;
          return (
            <Form className="bc-t-c">
              <Field name="name" type="text" render={({ field }) => (
                <div className="bc-pd-15rp">
                  <div>
                    <input className="bc-input" {...field} placeholder="name input"/>
                  </div>

                  {/*错误组件处理*/}
                  <BrFormikError errors={errors} touched={touched} name="name">
                    <div className="bc-t-red">
                      {errors.name}
                    </div>
                  </BrFormikError>

                </div>
              )}/>
              <Field type="radio" name="age" render={(props) => {
                const { field } = props;
                return (
                  <div className="bc-pd-15rp">
                    <div>
                      <input className="bc-input" {...field} placeholder="age input"/>
                    </div>

                    {/*错误组件处理*/}
                    <BrFormikError errors={errors} touched={touched} name="age">
                      <div className="bc-t-red">
                        {errors.age}
                      </div>
                    </BrFormikError>

                  </div>
                );
              }}/>
              <div className="bc-pd-14rp bc-t-c">
                <button type="submit" className="bc-btn bc-btn-primary">submit</button>
                <button type="reset" className="bc-btn bc-btn-primary">reset</button>
              </div>
            </Form>
          );
        }}/>
    </BrLayoutView>
  );
}

export default FormikPage;