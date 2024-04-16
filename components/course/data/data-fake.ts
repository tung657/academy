export const dataCourses = [...Array(25)].map((_, index) => ({
	id: index + 1,
	thumbnail:
		'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
	title: 'Introduction to Linear Models and Matrix Algebra ' + (index + 1),
	description: `With Fjord Tours you can explore more of the magical fjord
	landscapes with tours and activities on and around the
	fjords of Norway`,
	time: '4 weeks long',

	overview: `<p>Build machine learning models in Python using popular machine learning libraries NumPy & scikit-learn
</p>
<p>
	Build & train supervised machine learning models for prediction & binary classification tasks, including linear regression & logistic regression
	
	</p>`,
	skills_gain: [
		'Linear Regression',
		'Logistic Regression for Classification',
		'Regularization to Avoid Overfitting',
		'Gradient Descent',
		'Supervised Learning',
	],
	who_need:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptatum eius minima dolores iste neque deleniti eum sed. Nam molestias ullam dicta numquam! Assumenda, molestias mollitia! Quod quam aliquam explicabo.',

	expertise: `<p >This course is part of the Machine Learning Specialization <br/> When you enroll in this course, you'll also be enrolled in this Specialization.</p><ul ><li><span>Learn new concepts from industry experts</span></li><li ><span >Gain a foundational understanding of a subject or tool</span></li><li ><span >Develop job-relevant skills with hands-on projects</span></li><li ><span >Earn a shareable career certificate</span></li></ul>`,
	module_des: `<div aria-hidden="true">
	<div style={{ whiteSpace: 'pre-wrap' }}>
		<p>
			In the first course of the Machine Learning
			Specialization, you will:
		</p>
		<p aria-hidden="false">
			• Build machine learning models in Python using popular
			machine learning libraries NumPy and scikit-learn.
			<br />• Build and train supervised machine learning
			models for prediction and binary classification tasks,
			including linear regression and logistic regression
			<br />
			<br /> The Machine Learning Specialization is a
			foundational online program created in collaboration
			between DeepLearning.AI and Stanford Online. In this
			beginner-friendly program, you will learn the
			fundamentals of machine learning and how to use these
			techniques to build real-world AI applications.
			<br />
			<br /> This Specialization is taught by Andrew Ng, an AI
			visionary who has led critical research at Stanford
			University and groundbreaking work at Google Brain,
			Baidu, and Landing.AI to advance the AI field.
			<br />
			<br /> This 3-course Specialization is an updated and
			expanded version of Andrew’s pioneering Machine Learning
			course, rated 4.9 out of 5 and taken by over 4.8 million
			learners since it launched in 2012. <br />
			<br /> It provides a broad introduction to modern
			machine learning, including supervised learning
			(multiple linear regression, logistic regression, neural
			networks, and decision trees), unsupervised learning
			(clustering, dimensionality reduction, recommender
			systems), and some of the best practices used in Silicon
			Valley for artificial intelligence and machine learning
			innovation (evaluating and tuning models, taking a
			data-centric approach to improving performance, and
			more.)
			<br />
			<br /> By the end of this Specialization, you will have
			mastered key concepts and gained the practical know-how
			to quickly and powerfully apply machine learning to
			challenging real-world problems. If you’re looking to
			break into AI or build a career in machine learning, the
			new Machine Learning Specialization is the best place to
			start.
		</p>
	</div>
</div>`,

	courses: [
		{
			id: 1,
			title: 'Week 1: Introduction to Machine Learning',
			sort_order: 1,
			description:
				"Welcome to the Machine Learning Specialization! You're joining millions of others who have taken either this or the original course, which led to the founding of Coursera, and has helped millions of other learners, like you, take a look at the exciting world of machine learning!",
			videos: [
				{
					title: 'Welcome to machine learning!',
					duration: 2,
				},
				{
					title: 'Applications of machine learning',
					duration: 4,
				},
				{
					title: 'What is machine learning?',
					duration: 5,
				},
				{
					title: 'Supervised learning part 1',
					duration: 6,
				},
				{
					title: 'Supervised learning part 2',
					duration: 7,
				},
				{
					title: 'Unsupervised learning part 1',
					duration: 8,
				},
				{
					title: 'Unsupervised learning part 2',
					duration: 3,
				},
			],
		},
		{
			id: 2,
			title: 'Week 2: Regression with multiple input variables',
			sort_order: 2,
			description:
				"This week, you'll extend linear regression to handle multiple input features. You'll also learn some methods for improving your model's training and performance, such as vectorization, feature scaling, feature engineering and polynomial regression. At the end of the week, you'll get to practice implementing linear regression in code.",
			videos: [
				{
					title: 'Multiple features',
					duration: 9,
				},
				{
					title: 'Vectorization part 1',
					duration: 6,
				},
				{
					title: 'Vectorization part 2',
					duration: 6,
				},
				{
					title: 'Gradient descent for multiple linear regression',
					duration: 7,
				},
				{
					title: 'Feature scaling part 1',
					duration: 6,
				},
				{
					title: 'Feature scaling part 2',
					duration: 7,
				},
			],
		},
	],

	instructor: {
		full_name: 'Sarah Taylor',
		avatar: 'https://tarn-react.envytheme.com/img/speaker/speaker1.jpg',
		master: 'Agile Project Expert',
		facebook: 'https://www.facebook.com',
		twitter: 'https://www.twitter.com',
		linkedin: 'https://www.linkedin.com',
		instagram: 'https://www.instagram.com',
		youtube: 'https://www.youtube.com',
	},
}));
