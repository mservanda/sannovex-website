import React from 'react';
import PropTypes from 'prop-types';
import { ProductProfileTemplate } from '../../templates/product-profile';

const ProductProfilePreview = ({ entry, getAsset }) => {
	return (
		<ProductProfileTemplate
			productName={entry.getIn([ 'data', 'productName' ])}
			brandName={entry.getIn([ 'data', 'brandName' ])}
			genericName={entry.getIn([ 'data', 'genericName' ])}
			category={entry.getIn([ 'data', 'category' ])}
			subcategory={entry.getIn([ 'data', 'subcategory' ])}
			indication={entry.getIn([ 'data', 'indication' ])}
			route={entry.getIn([ 'data', 'route' ])}
			preparation={entry.getIn([ 'data', 'preparation' ])}
			strength={entry.getIn([ 'data', 'strength' ])}
			unit={entry.getIn([ 'data', 'unit' ])}
			packaging={entry.getIn([ 'data', 'packaging' ])}
			image={getAsset(entry.getIn([ 'data', 'image' ]))}
			portraitImage={getAsset(entry.getIn([ 'data', 'portraitImage' ]))}
			location={entry.getIn([ 'data', 'location' ])}
		/>
	);
};

ProductProfilePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func
	}),
	getAsset: PropTypes.func
};

export default ProductProfilePreview;
