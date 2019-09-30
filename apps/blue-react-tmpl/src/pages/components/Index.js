import React, { useEffect } from 'react';
import $axios from '$axios';

function Index() {

	useEffect(() => {
		$axios.get(`/`)
	}, []);

	return (
		<div>
			<div className="bc-pd-14 bc-t-c">
				Components
			</div>
		</div>
	);
}

export default Index;