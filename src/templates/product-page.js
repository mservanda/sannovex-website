import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import FullWidthImage from '../components/FullWidthImage';

import ProductGroup from '../components/ProductGroup';
import ProductCategories from '../components/ProductCategories';

// eslint-disable-next-line
export const ProductPageTemplate = ({
	image,
	title,
	heading,
	description,
	intro,
	productList,
	main,
	testimonials,
	fullImage,
	pricing
}) => {
	const heroImage = getImage(image) || image;

	const [ selectedCategory, setSelectedCategory ] = useState(null);

	useEffect(
		() => {
			if (selectedCategory) {
				window.history.pushState({}, '', '/products/' + selectedCategory);
			}
		},
		[ selectedCategory ]
	);

	const categories = [
		{ label: 'Antibiotics', image: 'img/coffee.png' },
		{ label: 'Corticosteroids', image: 'img/coffee.png' },
		{ label: 'Gastrointestinal', image: 'img/coffee.png' },
		{ label: 'Diuretics', image: 'img/coffee.png' },
		{ label: 'Vitamins', image: 'img/coffee.png' },
		{ label: 'NSAID', image: 'img/coffee.png' },
		{ label: 'Analgesic / Antipyretic', image: 'img/coffee.png' }
	];

	return (
		<div>
			<FullWidthImage img={heroImage} title={title} />
			<section className="section section--gradient">
				<div className="container">
					{selectedCategory ? (
						<div className="columns">
							<div className="column is-2 is-hidden-mobile">
								<div className="panel">
									{/* <p className="panel-heading has-background-grey has-text-light">Categories</p> */}
									{categories.map((category) => (
										<a
											className={
												'panel-block' +
												(selectedCategory === category.label
													? ' has-background-link-light has-text-success-dark'
													: '')
											}
											onClick={() => setSelectedCategory(category.label)}
										>
											{category.label}
										</a>
									))}
								</div>
							</div>
							<div className="column is-10">
								<div className="title has-text-success-dark">{selectedCategory}</div>
								<ProductGroup productList={productList} />
							</div>
						</div>
					) : (
						<ProductCategories categories={categories} setSelectedCategory={setSelectedCategory} />
					)}
				</div>
			</section>
		</div>
	);
};

ProductPageTemplate.propTypes = {
	image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
	title: PropTypes.string,
	productList: PropTypes.array,
	heading: PropTypes.string,
	description: PropTypes.string,
	intro: PropTypes.shape({
		blurbs: PropTypes.array
	}),
	main: PropTypes.shape({
		heading: PropTypes.string,
		description: PropTypes.string,
		image1: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
		image2: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
		image3: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ])
	}),
	testimonials: PropTypes.array,
	fullImage: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
	pricing: PropTypes.shape({
		heading: PropTypes.string,
		description: PropTypes.string,
		plans: PropTypes.array
	})
};

const ProductPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<ProductPageTemplate
				image={frontmatter.image}
				title={frontmatter.title}
				productList={frontmatter.productList}
				heading={frontmatter.heading}
				description={frontmatter.description}
				intro={frontmatter.intro}
				main={frontmatter.main}
				testimonials={frontmatter.testimonials}
				fullImage={frontmatter.full_image}
				pricing={frontmatter.pricing}
			/>
		</Layout>
	);
};

ProductPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object
		})
	})
};

export default ProductPage;

export const productPageQuery = graphql`
	query ProductPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				image {
					childImageSharp {
						gatsbyImageData(quality: 100, layout: FULL_WIDTH)
					}
				}
				productList {
					brandName
					genericName
					category
					image {
						childImageSharp {
							gatsbyImageData(width: 526, quality: 92, layout: CONSTRAINED)
						}
					}
				}
				heading
				description
				intro {
					blurbs {
						image {
							childImageSharp {
								gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
							}
						}
						text
					}
					heading
					description
				}
				main {
					heading
					description
					image1 {
						alt
						image {
							childImageSharp {
								gatsbyImageData(width: 526, quality: 92, layout: CONSTRAINED)
							}
						}
					}
					image2 {
						alt
						image {
							childImageSharp {
								gatsbyImageData(width: 526, quality: 92, layout: CONSTRAINED)
							}
						}
					}
					image3 {
						alt
						image {
							childImageSharp {
								gatsbyImageData(quality: 72, layout: FULL_WIDTH)
							}
						}
					}
				}
				testimonials {
					author
					quote
				}
				full_image {
					childImageSharp {
						gatsbyImageData(quality: 100, layout: FULL_WIDTH)
					}
				}
				pricing {
					heading
					description
					plans {
						description
						items
						plan
						price
					}
				}
			}
		}
	}
`;
