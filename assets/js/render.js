import utils from 'blue-utils';

//处理renderProps
export function renderProps(opts = {}) {
  const { render, props = {} } = opts;
  if (utils.isFunction(render)) {
    return render(props);
  }
  return render;
}

//渲染css class
export function renderClassName(css) {
  if (utils.isArray(css)) {
    return css.filter((cssName) => {
      if (cssName && utils.isStr(cssName)) return cssName;
    }).join(' ');
  } else if (utils.isPlainObject(css)) {
    return utils.each(css, (cssCondition, cssName) => {
      if (cssCondition) return cssName;
    }, true).filter((cssName) => {
      if (cssName && utils.isStr(cssName)) return cssName;
    }).join(' ');
  }
}

