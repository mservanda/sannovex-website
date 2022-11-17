import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import Slider from 'react-slick';

import Layout from '../components/Layout';
import Features from '../components/Features';
import BlogRoll from '../components/BlogRoll';
import FullWidthImage from '../components/FullWidthImage';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

// eslint-disable-next-line
export const IndexPageTemplate = ({ title, subtitle, carouselImages }) => {
	// const heroImage = getImage(image) || image;

	const sliderSettings = {
		customPaging: function(index) {
			return (
				<a>
					<PreviewCompatibleImage
						imageInfo={{
							image: carouselImages[index].image
						}}
						imageStyle={{ height: '50px' }}
						objectFit={'contain'}
					/>
				</a>
			);
		},
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
		cssEase: 'linear',
		pauseOnHover: true,
		dotsClass: 'slick-dots slick-thumb'
	};

	return (
		<div>
			{/* <FullWidthImage img={heroImage} title={title} subtitle={subtitle} /> */}

			<Slider {...sliderSettings}>
				{carouselImages.map((item) => (
					<div>
						<PreviewCompatibleImage
							imageInfo={{
								image: item.image
							}}
							imageStyle={{ height: '400px' }}
							objectFit={'scale-down'}
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

IndexPageTemplate.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	carouselImages: PropTypes.array
};

const IndexPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<IndexPageTemplate
				title={frontmatter.title}
				subtitle={frontmatter.subtitle}
				carouselImages={frontmatter.carouselImages}
			/>
		</Layout>
	);
};

IndexPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object
		})
	})
};

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
			frontmatter {
				title
				subtitle
				carouselImages {
					label
					image {
						childImageSharp {
							gatsbyImageData(quality: 100)
						}
					}
				}
			}
		}
	}
`;
