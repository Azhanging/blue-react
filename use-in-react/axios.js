import axios from 'axios';
import config from '@config';
import router from '@router';

const $axios = axios.create({
	timeout: config.axios.timeout,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	}
});

//拦截器request
$axios.interceptors.request.use((config) => {
	console.log(router);
	return config;
});

//拦截器response
$axios.interceptors.response.use((res) => {
	return res.data;
});

//在react中扩展
export function useAxiosInReact(React) {
	React.Component.prototype.$axios = $axios;
}

export default $axios;
