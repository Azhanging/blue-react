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
				<div className={"bz-pd-10"}>
					<label>
						{formItem.name}：<input type={formItem.type} {...field} className={"bz-input"}/>
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

			<div className={"bz-t-c"}>
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
						<div className={"bz-t-c"}>
							<button className={"bz-btn bz-btn-primary"}>
								login
							</button>
							<button className={"bz-btn bz-btn-primary bz-mg-l-10"} onClick={() => {
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