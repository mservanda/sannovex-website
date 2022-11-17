import * as React from 'react';
import PropTypes from 'prop-types';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { graphql, Link, useStaticQuery } from 'gatsby';

const ProductList = ({ selectedCategory }) => {
	const data = useStaticQuery(graphql`
		query {
			allMarkdownRemark(
				filter: { frontmatter: { templateKey: { eq: "product-profile" } } }
				sort: { order: ASC, fields: [frontmatter___productName] }
			) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							productName
							category
							subcategory
							brandName
							genericName
							strength
							preparation
							image {
								childImageSharp {
									gatsbyImageData(quality: 100, layout: CONSTRAINED)
								}
							}
						}
					}
				}
			}
		}
	`);

	const { edges: productList } = data.allMarkdownRemark;

	return (
		<div className="columns is-multiline has-background-light">
			{productList
				.filter(({ node: product }) => product.frontmatter.category === selectedCategory)
				.map(({ node: product }) => (
					<section key={product.id} className="column is-one-third-desktop is-one-third-tablet">
						<Link to={`${product.fields.slug}?category=${selectedCategory}`}>
							<div className="card">
								<div className="card-image">
									<PreviewCompatibleImage
										imageInfo={{
											image: product.frontmatter.image
										}}
										imageStyle={{ height: '150px', objectFit: 'fill' }}
									/>
								</div>

								<div className="card-content has-background-info-dark has-text-white has-text-centered">
									<p className="is-small generic-name">{product.frontmatter.genericName}</p>
									<p className="is-small has-text-weight-bold">{product.frontmatter.brandName}</p>
									<p className="is-small has-text-weight-bold">{product.frontmatter.strength}</p>
									<p className="has-text-weight-light is-italic product-preparation-text">
										{product.frontmatter.preparation}
									</p>

									<span className="tag is-danger is-small">
										{product.frontmatter.subcategory || product.frontmatter.category}
									</span>
								</div>
							</div>
						</Link>
					</section>
				))}
		</div>
	);
};

export default ProductList;
