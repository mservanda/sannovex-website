import React from 'react';
import PropTypes from 'prop-types';
import { AboutPageTemplate } from '../../templates/about-page';

const AboutPagePreview = ({ entry, getAsset, widgetFor }) => {
	const data = entry.getIn([ 'data' ]).toJS();
	return (
		<AboutPageTemplate
			image={getAsset(data.image)}
			title={data.title}
			subtitle={data.subtitle}
			content={widgetFor('body')}
		/>
	);
};

AboutPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func
	}),
	getAsset: PropTypes.func,
	widgetFor: PropTypes.func
};

export default AboutPagePreview;
