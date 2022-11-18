import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

// ProductProfileTemplate.propTypes = {
//   content: PropTypes.node.isRequired,
//   contentComponent: PropTypes.func,
//   description: PropTypes.string,
//   title: PropTypes.string,
//   helmet: PropTypes.object,
// };

export const ProductProfileTemplate = ({
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
	image,
	portraitImage,
	location
}) => {
	let defaultCategory = null;
	if (location) {
		const params = new URLSearchParams(location.search);
		defaultCategory = params.get('category');
	}

	const [ selectedCategory, setSelectedCategory ] = useState(defaultCategory);

	return (
		<section className="section is-medium">
			<div className="columns">
				<div className="column is-10 is-offset-1">
					{selectedCategory ? (
						<nav className="breadcrumb">
							<ul>
								<li>
									<a href="/product-list">Products</a>
								</li>
								<li>
									<a href={`/product-list?category=${selectedCategory}`}>{selectedCategory}</a>
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
										image: portraitImage || image
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

const ProductProfile = ({ data, location }) => {
	const { markdownRemark: product } = data;
	return (
		<Layout>
			<ProductProfileTemplate
				productName={product.frontmatter.productName}
				brandName={product.frontmatter.brandName}
				genericName={product.frontmatter.genericName}
				category={product.frontmatter.category}
				subcategory={product.frontmatter.subcategory}
				strength={product.frontmatter.strength}
				indication={product.frontmatter.indication}
				preparation={product.frontmatter.preparation}
				unit={product.frontmatter.unit}
				packaging={product.frontmatter.packaging}
				image={product.frontmatter.image}
				portraitImage={product.frontmatter.portraitImage}
				location={location}
			/>
		</Layout>
	);
};

ProductProfile.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object
	})
};

export default ProductProfile;

export const pageQuery = graphql`
	query ProductProfileByID($id: String!) {
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
				portraitImage {
					childImageSharp {
						gatsbyImageData(quality: 100, layout: FULL_WIDTH)
					}
				}
			}
		}
	}
`;
