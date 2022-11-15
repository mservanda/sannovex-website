import React from 'react';

import { Link, useStaticQuery, graphql } from 'gatsby';
import logo from '../img/logo.svg';

export default function Navbar() {
	const [ active, setActive ] = React.useState(false);
	const [ navBarActiveClass, setNavBarActiveClass ] = React.useState('');

	const data = useStaticQuery(graphql`
		query {
			markdownRemark(frontmatter: { templateKey: { eq: "product-list-page" } }) {
				frontmatter {
					categories {
						label
					}
				}
			}
		}
	`);

	const { frontmatter } = data.markdownRemark;

	const productMenuItems = [
		{ label: 'Antibiotics', route: '/product-list?category=Antibiotics' },
		{ label: 'Corticosteroids', route: '/product-list?category=Corticosteroids' }
	];

	const toggleHamburger = () => {
		setActive(!active);

		if (active) {
			setNavBarActiveClass('is-active');
		} else {
			setNavBarActiveClass('');
		}
	};

	return (
		<nav className="navbar is-fixed-top" role="navigation" aria-label="main-navigation">
			<div className="container">
				<div className="navbar-brand">
					<Link to="/" className="navbar-item" title="Logo">
						<img src={logo} alt="Sannovex" style={{ width: '200px', maxHeight: '40px' }} />
					</Link>
					{/* Hamburger menu */}
					<div
						className={`navbar-burger burger ${navBarActiveClass}`}
						data-target="navMenu"
						role="menuitem"
						tabIndex={0}
						onKeyPress={toggleHamburger}
						onClick={toggleHamburger}
					>
						<span />
						<span />
						<span />
					</div>
				</div>
				<div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
					<div className="navbar-end has-text-centered">
						<Link className="navbar-item" to="/">
							Home
						</Link>
						<Link className="navbar-item" to="/about">
							Who We Are
						</Link>
						<div className={`navbar-item has-dropdown is-hoverable`}>
							<a className="navbar-link is-arrowless" href="/product-list">
								Our Products
							</a>
							<div className="navbar-dropdown is-boxed">
								{/* {productMenuItems.map((item) => (
									<a key={item.label} className="navbar-item" href={`${item.route}`}>
										{item.label}
									</a>
								))} */}
								{frontmatter.categories.map((category) => (
									<a
										key={category.label}
										className="navbar-item"
										href={`/product-list?category=${category.label}`}
									>
										{category.label}
									</a>
								))}
							</div>
						</div>

						{/* <Link className="navbar-item" to="/blog">
								Blog
							</Link> */}
						{/* <Link className="navbar-item" to="/contact">
							Contact Us
						</Link> */}
						{/* <Link className="navbar-item" to="/contact/examples">
								Form Examples
							</Link> */}
					</div>
				</div>
			</div>
		</nav>
	);
}
