import publicState from '$store/state';
import utils from 'blue-utils';

const state = utils.extend(publicState, {
  view: {
    tabBar: ''
  }
});

export default state;