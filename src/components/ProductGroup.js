import * as React from 'react';
import PropTypes from 'prop-types';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

const ProductGroup = ({ productList }) => (
	<div className="columns is-multiline">
		{productList.map((product) => (
			<a className="column is-one-quarter-desktop is-one-third-tablet" key={product.brandName}>
				<div className="card">
					<span className="tag is-danger is-small">{product.category}</span>
					<div className="card-image px-4">
						<figure className="image is-3by3">
							<PreviewCompatibleImage
								imageInfo={{
									image: product.image
								}}
							/>
							{/* <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" /> */}
						</figure>
					</div>
					<div className="card-content has-background-info-dark has-text-white">
						<div className="media">
							<div className="media-content">
								<p className="is-size-5 is-4">{product.brandName.toUpperCase()}</p>
								<p className="is-small is-italic">{product.genericName}</p>
							</div>
						</div>
						<div className="dropdown is-hoverable">
							<div className="dropdown-trigger">
								<button className="button is-small" aria-haspopup="true" aria-controls="dropdown-menu4">
									<span>Variants</span>
									<span className="icon is-small">
										<i className="fa fa-angle-down" aria-hidden="true" />
									</span>
									<i className="fa fa-angle-down" aria-hidden="true" />
								</button>
							</div>
							<div className="dropdown-menu" id="dropdown-menu4" role="menu">
								<div className="dropdown-content">
									<div className="dropdown-item">
										<p>
											You can insert <strong>any type of content</strong> within the dropdown
											menu.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		))}
	</div>
);

ProductGroup.propTypes = {
	gridItems: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
			text: PropTypes.string
		})
	)
};

export default ProductGroup;
