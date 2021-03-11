import * as antd from './index';

export function useAntdInReact(React){
  React.$antd = React.Component.prototype.$antd = antd;
}