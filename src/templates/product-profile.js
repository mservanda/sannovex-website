import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

// eslint-disable-next-line
export const ProductProfileTemplate = ({ product, location }) => {
	const {
		productName,
		brandName,
		genericName,
		category,
		subcategory,
		strength,
		indication,
		preparation,
		unit,
		packaging,
		image
	} = product.frontmatter;

	const params = new URLSearchParams(location.search);
	const [ selectedCategory, setSelectedCategory ] = useState(params.get('category'));

	return (
		<section className="section is-medium">
			<div className="columns">
				<div className="column is-10 is-offset-1">
					{selectedCategory ? (
						<nav className="breadcrumb">
							<ul>
								<li>
									<a href="/products">Products</a>
								</li>
								<li>
									<a href={`/products?category=${selectedCategory}`}>{selectedCategory}</a>
								</li>
								<li className="is-active">
									<a href="#">{productName}</a>
								</li>
							</ul>
						</nav>
					) : null}
					<div className="box mt-3">
						<div className="columns">
							<div className="column is-6 has-text-centered">
								<div className="block is-size-2 generic-name">{genericName}</div>
								<div className="block has-text-weight-bold">
									<h1 className="is-size-2 title has-text-info-dark">{brandName}</h1>
									<h2 className="subtitle has-text-danger-dark">{strength}</h2>
								</div>
								<div className="block is-size-5">{preparation}</div>
								<div className="block is-size-5 has-text-weight-bold">{subcategory || category}</div>
								<div className="block has-text-left">
									<p>{indication}</p>
								</div>
							</div>
							<div className="column is-6">
								<PreviewCompatibleImage
									imageInfo={{
										image: image
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

// ProductProfileTemplate.propTypes = {
//   content: PropTypes.node.isRequired,
//   contentComponent: PropTypes.func,
//   description: PropTypes.string,
//   title: PropTypes.string,
//   helmet: PropTypes.object,
// };

const ProductProfile = ({ data, location }) => {
	const { markdownRemark: product } = data;

	return (
		<Layout>
			<ProductProfileTemplate product={product} location={location} />
		</Layout>
	);
};

// ProductProfile.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.object,
//   }),
// };

export default ProductProfile;

export const pageQuery = graphql`
	query($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			frontmatter {
				productName
				brandName
				genericName
				category
				subcategory
				strength
				indication
				preparation
				unit
				packaging
				image {
					childImageSharp {
						gatsbyImageData(quality: 100, layout: FULL_WIDTH)
					}
				}
			}
		}
	}
`;
