const path = require('path');

function resolve(_path) {
	return path.join(__dirname, '..', _path);
}

const reactConfig = {
	resolve: {
		alias: {
			'$config': resolve('config'),
			'$use-in-react': resolve('use-in-react'),
			'$store': resolve('config/store'),
			'$assets': resolve('assets'),
			'$axios': resolve('use-in-react/axios')
		}
	}
};

module.exports = reactConfig;