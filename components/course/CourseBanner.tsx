import classes from './scss/course.module.scss';
import Image from 'next/image';

export function CourseBanner() {
	return (
		<>
			<div
				className={`${classes.historyArea}  ${classes.ptb100} ${classes.bgFafafb}`}
			></div>
			<div className={classes.container}>
				<div className={classes.sectionTitle}>
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
						Our History
					</span>
					<h2>History Begins in 2010</h2>
				</div>
				<ol className={`${classes.timeline} ${classes.historyTimeline}`}>
					<li className={classes.timelineBlock}>
						<div className={classes.timelineDate}>
							<span>2010</span>
							<br></br>
							February 20
							<sup>th</sup>
						</div>
						<div className={classes.timelineIcon}>
							<span className={classes.dotBadge}></span>
						</div>
						<div className={classes.timelineContent}>
							<div className={`${classes.row} ${classes.alignItemsCenter}`}>
								<div className={`${classes.colLg7} ${classes.colMd12}`}>
									<div className={classes.content}>
										<h3>Founded</h3>
										<p>
											Real innovations and a positive customer experience are
											the heart of successful communication. Lorem ipsum dolor
											sit amet, sectetur adipiscing elit, tempor incididunt ut
											labore et dolore magna.
										</p>
									</div>
								</div>
								<div className={`${classes.colLg5} ${classes.colMd12}`}>
									<div className={classes.image}>
										<Image
											className={classes.img}
											alt="image"
											loading="lazy"
											width="282"
											height="244"
											decoding="async"
											data-nimg="1"
											src="/history1.jpg"
											style={{ color: 'transparent' }}
										/>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li className={classes.timelineBlock}>
						<div className={classes.timelineDate}>
							<span>2023</span>
							<br></br>
							January 14
							<sup>th</sup>
						</div>
						<div className={classes.timelineIcon}>
							<span className={classes.dotBadge}></span>
						</div>
						<div className={classes.timelineContent}>
							<div className={`${classes.row} ${classes.alignItemsCenter}`}>
								<div className={`${classes.colLg7} ${classes.colMd12}`}>
									<div className={classes.content}>
										<h3>Global Success</h3>
										<p>
											Real innovations and a positive customer experience are
											the heart of successful communication. Lorem ipsum dolor
											sit amet, sectetur adipiscing elit, tempor incididunt ut
											labore et dolore magna.
										</p>
									</div>
								</div>
								<div className={`${classes.colLg5} ${classes.colMd12}`}>
									<div className={classes.image}>
										<Image
											className={classes.img}
											alt="image"
											loading="lazy"
											width="282"
											height="244"
											decoding="async"
											data-nimg="1"
											src="/history2.jpg"
											style={{ color: 'transparent' }}
										/>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li className={classes.timelineBlock}>
						<div className={classes.timelineDate}>
							<span>2016</span>
							<br></br>
							March 25
							<sup>th</sup>
						</div>
						<div className={classes.timelineIcon}>
							<span className={classes.dotBadge}></span>
						</div>
						<div className={classes.timelineContent}>
							<div className={`${classes.row} ${classes.alignItemsCenter}`}>
								<div className={`${classes.colLg7} ${classes.colMd12}`}>
									<div className={classes.content}>
										<h3>Founded Data Center</h3>
										<p>
											Real innovations and a positive customer experience are
											the heart of successful communication. Lorem ipsum dolor
											sit amet, sectetur adipiscing elit, tempor incididunt ut
											labore et dolore magna.
										</p>
									</div>
								</div>
								<div className={`${classes.colLg5} ${classes.colMd12}`}>
									<div className={classes.image}>
										<Image
											className={classes.img}
											alt="image"
											loading="lazy"
											width="282"
											height="244"
											decoding="async"
											data-nimg="1"
											src="/history3.jpg"
											style={{ color: 'transparent' }}
										/>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li className={classes.timelineBlock}>
						<div className={classes.timelineDate}>
							<span>2023</span>
							<br></br>
							December 10
							<sup>th</sup>
						</div>
						<div className={classes.timelineIcon}>
							<span className={classes.dotBadge}></span>
						</div>
						<div className={classes.timelineContent}>
							<div className={`${classes.row} ${classes.alignItemsCenter}`}>
								<div className={`${classes.colLg7} ${classes.colMd12}`}>
									<div className={classes.content}>
										<h3 className={classes.h3}>International Award</h3>
										<p>
											Real innovations and a positive customer experience are
											the heart of successful communication. Lorem ipsum dolor
											sit amet, sectetur adipiscing elit, tempor incididunt ut
											labore et dolore magna.
										</p>
									</div>
								</div>
								<div className={`${classes.colLg5} ${classes.colMd12}`}>
									<div className={classes.image}>
										<Image
											className={classes.img}
											alt="image"
											loading="lazy"
											width="282"
											height="244"
											decoding="async"
											data-nimg="1"
											src="/history4.jpg"
											style={{ color: 'transparent' }}
										/>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ol>
			</div>
		</>
	);
}
