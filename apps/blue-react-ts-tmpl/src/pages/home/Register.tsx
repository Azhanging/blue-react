import React, {useState} from 'react';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';
import {Formik, Field, Form} from 'formik';
import $axios from '$axios';

function RegisterField ( props: any ) {
	const {formItem} = props;
	return (
		<Field name={formItem.name} render={( {field}: { field: any } ) => {
			return (
				<div className={"ba-pd-10"}>
					<label>
						{formItem.name}：<input type={formItem.type} {...field} className={"ba-input"}/>
					</label>
				</div>
			);
		}}/>
	);
}

function register ( formData: any ) {
	$axios.post(`/register`, formData).then(() => {

	});
}

function Register () {

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
		<BrView>

			<BrHeader centerControl={{
				title: 'register'
			}}/>

			<div className={"ba-t-c"}>
				<Formik
					initialValues={formData}
					validate={( values ) => {
						setFormData(values);
					}}
					onSubmit={()=>{}}
				>
					<Form>
						{formField.map(( formItem, index ) => (
							<RegisterField formItem={formItem} key={`field-${index}`}/>
						))}
						<div className={"ba-t-c"}>
							<button className={"ba-btn ba-btn-primary"}>
								login
							</button>
							<button className={"ba-btn ba-btn-primary ba-mg-l-10"} onClick={() => {
								register(formData);
							}}>
								register
							</button>
						</div>
					</Form>
				</Formik>
			</div>
		</BrView>
	);
}

export default Register;