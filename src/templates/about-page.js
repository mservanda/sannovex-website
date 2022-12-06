import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import FullWidthImage from '../components/FullWidthImage';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const toHTML = (value) => {
	return unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(value);
};

// eslint-disable-next-line
export const AboutPageTemplate = ({
	title,
	subtitle,
	image,
	mission,
	vision,
	business,
	operations,
	partners,
	contentComponent
}) => {
	const heroImage = getImage(image) || image;
	const PageContent = contentComponent || Content;
	const [ missionHTML, setMissionHTML ] = useState(null);
	const [ visionHTML, setVisionHTML ] = useState(null);
	const [ businessHTML, setBusinessHTML ] = useState(null);
	const [ operationsHTML, setOperationsHTML ] = useState(null);
	const [ partnersHTML, setPartnersHTML ] = useState(null);

	useEffect(() => {
		(async () => {
			setMissionHTML(await toHTML(mission));
			setVisionHTML(await toHTML(vision));
			setBusinessHTML(await toHTML(business));
			setOperationsHTML(await toHTML(operations));
			setPartnersHTML(await toHTML(partners));
		})();
	}, []);

	return (
		<div>
			<FullWidthImage img={heroImage} title={title} subtitle={subtitle} />
			<section className="section section--gradient">
				<div className="container">
					<div className="columns">
						<div className="column is-10 is-offset-1">
							<div className="section">
								<div className="tile is-ancestor">
									<div className="tile is-vertical is-8">
										<div className="tile">
											<div className="tile is-parent is-vertical">
												<article className="tile is-child">
													{businessHTML ? (
														<PageContent className="content" content={businessHTML} />
													) : null}
												</article>
												<article className="tile is-child">
													{operationsHTML ? (
														<PageContent className="content" content={operationsHTML} />
													) : null}
												</article>
												<article className="tile is-child">
													{partnersHTML ? (
														<PageContent className="content" content={partnersHTML} />
													) : null}
												</article>
											</div>
										</div>
									</div>
									<div className="tile is-vertical">
										<div className="tile">
											<div className="tile is-parent is-vertical">
												<article className="tile is-child box">
													{missionHTML ? (
														<PageContent className="content" content={missionHTML} />
													) : null}
												</article>
												<article className="tile is-child box">
													{visionHTML ? (
														<PageContent className="content" content={visionHTML} />
													) : null}
												</article>
											</div>
										</div>
									</div>
								</div>
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
				mission={post.frontmatter.mission}
				vision={post.frontmatter.vision}
				business={post.frontmatter.business}
				operations={post.frontmatter.operations}
				partners={post.frontmatter.partners}
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
			frontmatter {
				title
				subtitle
				mission
				vision
				business
				operations
				partners
				image {
					childImageSharp {
						gatsbyImageData(quality: 100, layout: FULL_WIDTH)
					}
				}
			}
		}
	}
`;
