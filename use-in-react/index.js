import { useAxiosInReact } from './axios';
import { useAntdInReact } from './antd';

export function useInReact(React) {
	useAxiosInReact(React);
	useAntdInReact(React);
}