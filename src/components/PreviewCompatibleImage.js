import * as React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';

const PreviewCompatibleImage = ({ imageInfo, imageStyle = { borderRadius: '5px' }, objectFit = 'cover' }) => {
	const { alt = '', childImageSharp, image } = imageInfo;

	if (!!image && !!image.childImageSharp) {
		return (
			<GatsbyImage
				image={image.childImageSharp.gatsbyImageData}
				style={imageStyle}
				objectFit={objectFit}
				alt={alt}
			/>
		);
	} else if (!!childImageSharp) {
		return (
			<GatsbyImage image={childImageSharp.gatsbyImageData} style={imageStyle} objectFit={objectFit} alt={alt} />
		);
		// for Netlify CMS
	} else if (image) {
		return <img style={{ imageStyle }} src={image} alt={alt} />;
	} else {
		return null;
	}
};

PreviewCompatibleImage.propTypes = {
	imageInfo: PropTypes.shape({
		alt: PropTypes.string,
		childImageSharp: PropTypes.object,
		image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]).isRequired,
		style: PropTypes.object
	}).isRequired
};

export default PreviewCompatibleImage;
