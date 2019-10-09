import React, { useState } from 'react';
import BrLayoutView from '@components/public/BrLayoutView';
import { Formik, Field, Form } from 'formik';
import $axios from '$axios';

function initFormData() {
  return {
    name: '',
    age: ''
  }
}

function FormikPage(props) {

  const [formData, setFormData] = useState(initFormData());

  return (
    <BrLayoutView routes={props.routes}>

      <div>
        name:{formData.name}
      </div>

      <div>
        age:{formData.age}
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
          const errors = {};
          if (!/.+/.test(values.name)) {
            errors.name = `name is empty`;
          }
          if (!/^\d+$/.test(values.age)) {
            errors.age = `error type number`;
          }
          return errors;
        }}

        render={(props) => {
          const {
            errors,
            touched
          } = props;
          //console.log(props);
          return (
            <Form className="bc-t-c">
              <Field name="name" type="text" render={({ field }) => (
                <div className="bc-pd-15rp">
                  <div>
                    <input className="bc-input" {...field} placeholder="name input"/>
                  </div>
                  <div className="bc-t-red">
                    {errors.name && touched.name && (
                      <div>
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>
              )}/>
              <Field type="radio" name="age" render={(props) => {
                const { field } = props;
                return (
                  <div className="bc-pd-15rp">
                    <div>
                      <input className="bc-input" {...field} placeholder="age input"/>
                    </div>
                    <div className="bc-t-red">
                      {errors.age && touched.age && (
                        <div>
                          {errors.age}
                        </div>
                      )}
                    </div>
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