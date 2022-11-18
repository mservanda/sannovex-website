import React from 'react';
import PropTypes from 'prop-types';
import { ProductListPageTemplate } from '../../templates/product-list-page';

const ProductListPagePreview = ({ entry, getAsset }) => {
	const data = entry.getIn([ 'data' ]).toJS();

	if (data) {
		return <ProductListPageTemplate title={data.title} location={data.location} />;
	} else {
		return <div>Loading...</div>;
	}
};

ProductListPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func
	}),
	getAsset: PropTypes.func
};

export default ProductListPagePreview;
