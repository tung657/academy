export const dataCourses = [...Array(25)].map((_, index) => ({
	id: index + 1,
	thumbnail:
		'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
	title: 'Introduction to Linear Models and Matrix Algebra ' + (index + 1),
	description: `With Fjord Tours you can explore more of the magical fjord
	landscapes with tours and activities on and around the
	fjords of Norway`,
	time: '4 weeks long',
}));
