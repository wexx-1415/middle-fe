import { rest } from 'msw';
export const handlers = [
	rest.post('/login', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				userType: 'stu',
				userName: '1',
				userId: 1,
			})
		);
	}),
	rest.post('/selectCourse', (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.post('/CourseByStu', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					courseId: 1,
					courseName: '香袋',
					courseTime: '1-1',
					teaName: '1',
					courseAddress: '208',
				},
				{
					courseId: 45,
					courseName: 'xx',
					courseTime: '1-2',
					teaName: '2',
					courseAddress: '908',
				},
				{
					courseId: 46,
					courseName: '1',
					courseTime: '2',
					teaName: '4',
					courseAddress: '33',
				},
				{
					courseId: 47,
					courseName: 'xx',
					courseTime: '1-2',
					teaName: '2',
					courseAddress: '908',
				},
				{
					courseId: 48,
					courseName: 'nmsi',
					courseTime: '6-1',
					teaName: null,
					courseAddress: '',
				},
				{
					courseId: 49,
					courseName: '12',
					courseTime: '7-3',
					teaName: null,
					courseAddress: '',
				},
				{
					courseId: 50,
					courseName: '12',
					courseTime: '7-3',
					teaName: null,
					courseAddress: '',
				},
			])
		);
	}),
	rest.post('/CourseByTea', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					courseId: 1,
					courseName: '香袋',
					courseTime: '1-1\n',
					teaName: '1',
					courseAddress: '208',
				},
				{
					courseId: 45,
					courseName: 'xx',
					courseTime: '1-2',
					teaName: '2',
					courseAddress: '908',
				},
				{
					courseId: 46,
					courseName: '1',
					courseTime: '2',
					teaName: '4',
					courseAddress: '33',
				},
				{
					courseId: 47,
					courseName: 'xx',
					courseTime: '1-2',
					teaName: '2',
					courseAddress: '908',
				},
				{
					courseId: 48,
					courseName: 'nmsi',
					courseTime: '6-1',
					teaName: null,
					courseAddress: '',
				},
				{
					courseId: 49,
					courseName: '12',
					courseTime: '7-3',
					teaName: null,
					courseAddress: '',
				},
				{
					courseId: 50,
					courseName: '12',
					courseTime: '7-3',
					teaName: null,
					courseAddress: '',
				},
			])
		);
	}),
	rest.get('/course', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					courseId: 1,
					courseName: '香袋' + req.url.search,
					courseTime: '1-1',
					teaName: '1',
					courseAddress: '208',
				},
			])
		);
	}),
	rest.get('/allCourse', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					courseId: 1,
					courseName: '香袋',
					courseTime: '1-1',
					teaName: '1',
					courseAddress: '208',
				},
				{
					courseId: 45,
					courseName: 'xx',
					courseTime: '1-2',
					teaName: '2',
					courseAddress: '908',
				},
				{
					courseId: 46,
					courseName: '1',
					courseTime: '2',
					teaName: '4',
					courseAddress: '33',
				},
				{
					courseId: 47,
					courseName: 'xx',
					courseTime: '1-2',
					teaName: '2',
					courseAddress: '908',
				},
				{
					courseId: 48,
					courseName: 'nmsi',
					courseTime: '6-1',
					teaName: null,
					courseAddress: '',
				},
				{
					courseId: 49,
					courseName: '12',
					courseTime: '7-3',
					teaName: null,
					courseAddress: '',
				},
				{
					courseId: 50,
					courseName: '12',
					courseTime: '7-3',
					teaName: null,
					courseAddress: '',
				},
			])
		);
	}),
];
