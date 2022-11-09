import * as React from 'react';
import PropTypes from 'prop-types';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

const ProductCategories = ({ categories, setSelectedCategory }) => (
	<div className="columns is-multiline">
		{categories.map((category) => (
			<div key={category.label} className="column is-4">
				<section className="section">
					<a class="level-item has-text-centered" onClick={() => setSelectedCategory(category.label)}>
						<div
							style={{
								width: '240px',
								display: 'inline-block'
							}}
						>
							<PreviewCompatibleImage
								imageInfo={{
									image: category.image
								}}
							/>
							<p className="title has-text-info is-size-5">{category.label}</p>
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
