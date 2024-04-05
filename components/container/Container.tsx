import classes from './scss/container.module.scss';
import Image from 'next/image';

export function Container() {
	return (
		<div
			className={`${classes.scientistArea} ${classes.pt100} ${classes.pb70}`}
		>
			<div className={classes.container}>
				<div
					className={`${classes.sectionTitle} ${classes.aosInit} ${classes.aosAnimate}`}
				>
					<span className={classes.subTitle}>
						<Image
							className={classes.img}
							alt="image"
							loading="lazy"
							width="32"
							height="34"
							decoding="async"
							data-nimg="1"
							src="/star-icon.png"
							style={{ color: 'transparent' }}
						/>
						Team Members
					</span>
					<h2>Our Awesome Team</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna.
					</p>
				</div>
				<div className={classes.row}>
					<div
						className={`${classes.colLg3} ${classes.colSm6} ${classes.aosInit} ${classes.aosAnimate}`}
					>
						<div className={classes.singleScientistItemBox}>
							<div className={classes.image}>
								<Image
									className={classes.img}
									alt="image"
									loading="lazy"
									width="580"
									height="580"
									decoding="async"
									src="/team1.jpg"
									style={{ color: 'transparent' }}
								/>
								<ul>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
								</ul>
							</div>
							<div className={classes.content}>
								<h3>Merv Adrian</h3>
								<span>CEO & Founder</span>
							</div>
						</div>
					</div>
					<div
						className={`${classes.colLg3} ${classes.colSm6} ${classes.aosInit} ${classes.aosAnimate}`}
					>
						<div className={classes.singleScientistItemBox}>
							<div className={classes.image}>
								<Image
									className={classes.img}
									alt="image"
									loading="lazy"
									width="580"
									height="580"
									decoding="async"
									src="/team1.jpg"
									style={{ color: 'transparent' }}
								/>
								<ul>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
								</ul>
							</div>
							<div className={classes.content}>
								<h3>Merv Adrian</h3>
								<span>CEO & Founder</span>
							</div>
						</div>
					</div>
					<div
						className={`${classes.colLg3} ${classes.colSm6} ${classes.aosInit} ${classes.aosAnimate}`}
					>
						<div className={classes.singleScientistItemBox}>
							<div className={classes.image}>
								<Image
									className={classes.img}
									alt="image"
									loading="lazy"
									width="580"
									height="580"
									decoding="async"
									src="/team1.jpg"
									style={{ color: 'transparent' }}
								/>
								<ul>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
								</ul>
							</div>
							<div className={classes.content}>
								<h3>Merv Adrian</h3>
								<span>CEO & Founder</span>
							</div>
						</div>
					</div>
					<div
						className={`${classes.colLg3} ${classes.colSm6} ${classes.aosInit} ${classes.aosAnimate}`}
					>
						<div className={classes.singleScientistItemBox}>
							<div className={classes.image}>
								<Image
									className={classes.img}
									alt="image"
									loading="lazy"
									width="580"
									height="580"
									decoding="async"
									src="/team1.jpg"
									style={{ color: 'transparent' }}
								/>
								<ul>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
									<li className={classes.social}>
										<a
											href="https://www.facebook.com/"
											className={classes.dBlock}
											target="_blank"
										>
											<i className={`${classes.bx} ${classes.bxlFacebook}`}></i>
										</a>
									</li>
								</ul>
							</div>
							<div className={classes.content}>
								<h3>Merv Adrian</h3>
								<span>CEO & Founder</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
