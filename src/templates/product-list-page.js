import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout';
import Features from '../components/Features';
import BlogRoll from '../components/BlogRoll';
import FullWidthImage from '../components/FullWidthImage';
import ProductCategories from '../components/ProductCategories';
import ProductList from '../components/ProductList';

// eslint-disable-next-line
export const ProductListPageTemplate = ({ image, title, categories, location }) => {
	const heroImage = getImage(image) || image;

	let defaultCategory = null;
	if (location) {
		const params = new URLSearchParams(location.search);
		defaultCategory = params.get('category');
	}
	const [ selectedCategory, setSelectedCategory ] = useState(defaultCategory);

	const handleCategorySelection = (category) => {
		setSelectedCategory(category);
		window.location.replace(`/product-list?category=${category}`);
	};

	return (
		<div>
			<FullWidthImage img={heroImage} height={450} title={title} />
			<section className="section section--gradient">
				{selectedCategory ? (
					<div className="container">
						<div className="columns">
							<div className="column is-2 is-hidden-mobile">
								<div className="panel">
									{/* <p className="panel-heading has-background-grey has-text-light">Categories</p> */}
									{categories.map((category) => (
										<a
											key={category.label}
											className={
												'panel-block' +
												(selectedCategory === category.label
													? ' has-background-link-light has-text-success-dark'
													: '')
											}
											onClick={() => handleCategorySelection(category.label)}
										>
											{category.label}
										</a>
									))}
								</div>
							</div>
							<div className="column is-10 has-text-centered">
								{/* <div className="title has-text-success-dark">{selectedCategory}</div> */}
								<nav className="breadcrumb">
									<ul>
										<li>
											<a href="/product-list">Products</a>
										</li>
										<li className="is-active">
											<a href="/product-list?`${selectedCategory}`">{selectedCategory}</a>
										</li>
									</ul>
								</nav>
								<ProductList selectedCategory={selectedCategory} />
							</div>
						</div>
					</div>
				) : (
					<ProductCategories categories={categories} setSelectedCategory={handleCategorySelection} />
				)}
			</section>
		</div>
	);
};

ProductListPageTemplate.propTypes = {
	image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
	title: PropTypes.string,
	categories: PropTypes.array
};

const ProductListPage = ({ data, location }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<ProductListPageTemplate
				image={frontmatter.image}
				title={frontmatter.title}
				categories={frontmatter.categories}
				location={location}
			/>
		</Layout>
	);
};

ProductListPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object
		})
	})
};

export default ProductListPage;

export const pageQuery = graphql`
	query ProductListPageTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "product-list-page" } }) {
			frontmatter {
				title
				image {
					childImageSharp {
						gatsbyImageData(quality: 100, layout: FULL_WIDTH)
					}
				}
				categories {
					label
					image {
						childImageSharp {
							gatsbyImageData(width: 526, quality: 92, layout: CONSTRAINED)
						}
					}
				}
			}
		}
	}
`;
