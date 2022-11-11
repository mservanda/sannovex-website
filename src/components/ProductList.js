import * as React from 'react';
import PropTypes from 'prop-types';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { graphql, Link, useStaticQuery } from 'gatsby';

const ProductList = ({ selectedCategory }) => {
	const data = useStaticQuery(graphql`
		query {
			allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "product-profile" } } }) {
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
									gatsbyImageData(width: 526, quality: 92, layout: CONSTRAINED)
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
		<div className="columns is-multiline">
			{productList
				.filter(({ node: product }) => product.frontmatter.category === selectedCategory)
				.map(({ node: product }) => (
					<Link
						className="column is-one-quarter-desktop is-one-third-tablet"
						key={product.id}
						to={`${product.fields.slug}?category=${selectedCategory}`}
					>
						<div className="card">
							<span className="tag is-danger is-small">
								{product.frontmatter.subcategory || product.frontmatter.category}
							</span>
							<div className="card-image px-4">
								<figure className="image is-3by3">
									<PreviewCompatibleImage
										imageInfo={{
											image: product.frontmatter.image
										}}
									/>
								</figure>
							</div>
							<div className="card-content has-background-info-dark has-text-white">
								<div className="media">
									<div className="media-content">
										<p className="is-size-5 is-4">{product.frontmatter.productName}</p>
										<p className="is-small is-italic">{product.frontmatter.genericName}</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
		</div>
	);
};

export default ProductList;
