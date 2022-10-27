import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import FullWidthImage from '../components/FullWidthImage';

// eslint-disable-next-line
export const AboutPageTemplate = ({ title, subtitle, image, content, contentComponent }) => {
	const heroImage = getImage(image) || image;
	const PageContent = contentComponent || Content;

	return (
		<div>
			<FullWidthImage img={heroImage} title={title} subtitle={subtitle} />
			<section className="section section--gradient">
				<div className="container">
					<div className="columns">
						<div className="column is-10 is-offset-1">
							<div className="section">
								<PageContent className="content" content={content} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

AboutPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
	content: PropTypes.string,
	contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<AboutPageTemplate
				title={post.frontmatter.title}
				subtitle={post.frontmatter.subtitle}
				image={post.frontmatter.image}
				content={post.html}
				contentComponent={HTMLContent}
			/>
		</Layout>
	);
};

AboutPage.propTypes = {
	// data: PropTypes.object.isRequired
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object
		})
	})
};

export default AboutPage;

export const aboutPageQuery = graphql`
	query AboutPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			html
			frontmatter {
				title
				subtitle
				image {
					childImageSharp {
						gatsbyImageData(quality: 100, layout: FULL_WIDTH)
					}
				}
			}
		}
	}
`;
