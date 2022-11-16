import * as React from 'react';
import PropTypes from 'prop-types';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import FullWidthImage from '../components/FullWidthImage';

const ProductCategories = ({ categories, setSelectedCategory }) => (
	<div className="columns is-multiline">
		{categories.map((category) => (
			<div key={category.label} className="column is-4">
				<section>
					<a className="box has-text-centered" onClick={() => setSelectedCategory(category.label)}>
						<div
							style={{
								width: '240px',
								display: 'inline-block'
							}}
						>
							<h2 className="title has-text-info is-size-6">{category.label}</h2>
							<PreviewCompatibleImage
								imageInfo={{
									image: category.image
								}}
								imageStyle={{ height: '100px' }}
								objectFit={'cover'}
							/>
						</div>
					</a>
				</section>
			</div>
		))}
	</div>
);

ProductCategories.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
			label: PropTypes.string
		})
	)
};

export default ProductCategories;
