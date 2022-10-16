import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from '../components/modal';
import styles from '../styles/Home.module.css';
import style from '../styles/Main.module.css';
export default function Main() {
	const [date, setDate] = React.useState('');
	let [user, setUser] = useState({});
	const router = useRouter();
	useEffect(() => {
		let user = localStorage.getItem('user');
		let url, payload;
		JSON.parse(user).userType == 'stu'
			? (url = 'CourseByStu')
			: (url = 'courseByTea');
		JSON.parse(user).userType == 'stu'
			? (payload = `id=${JSON.parse(user).userId}`)
			: (payload = `teaName=${JSON.parse(user).userName}`);
		console.log(url, JSON.parse(user).userType);
		if (!user) {
			router.push('/index.html');
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: payload,
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setCourses(data);
				setLoading(true);
			});
		setUser(JSON.parse(user));
		console.log(user);
	}, []);

	let [data, setData] = React.useState([]);
	let [isLoading, setLoading] = useState(false);
	let [Courses, setCourses] = useState([]);

	const dates = [
		'1-1',
		'1-2',
		'1-3',
		'1-4',
		'1-5',
		'2-1',
		'2-2',
		'2-3',
		'2-4',
		'2-5',
		'3-1',
		'3-2',
		'3-3',
		'3-4',
		'3-5',
		'4-1',
		'4-2',
		'4-3',
		'4-4',
		'4-5',
		'5-1',
		'5-2',
		'5-3',
		'5-4',
		'5-5',
		'6-1',
		'6-2',
		'6-3',
		'6-4',
		'6-5',
		'7-1',
		'7-2',
		'7-3',
		'7-4',
		'7-5',
	];
	const OnCourseClick = (e) => {
		setDate(e.target.dataset.date);
		fetch(`/course?date=${e.target.dataset.date}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setClose(true);
			});
		// console.log(date);
	};
	const items = dates.map((date, index) => {
		return (
			<div
				data-date={date}
				key={index}
				className={style.item}
				onClick={OnCourseClick}
				style={{
					gridArea: `${date[2]}/${date[0]}/${+date[2] + 1}/${+date[0] + 1}`,
				}}
			>
				{
					Courses?.find((course) => course.courseTime.includes(date))
						?.courseName
				}
			</div>
		);
	});
	const Content = () => {
		if (!isLoading) {
			return <div>loading...</div>;
		}
		return <main className={style.main}>{items}</main>;
	};

	const [close, setClose] = React.useState(false);
	const OnSelectClick = (e) => {
		e.preventDefault();
		fetch('/selectCourse', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `courseId=${e.target.dataset.id}&stuId=${user.userId}`,
		});
		setCourses(
			Courses.concat({
				courseId: e.target.dataset.id,
				courseName: e.target.dataset.name,
				courseTime: date,
				teaName: e.target.dataset.tea,
				courseAddress: e.target.dataset.address,
			})
		);
		console.log(Courses);
	};
	const OnCancelClick = (e) => {
		e.preventDefault();
		fetch('/deleteStuCourse', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `courseId=${e.target.dataset.id}&stuId=${user.userId}`,
		});
		setCourses(Courses.filter((course) => course.courseTime !== date));
	};
	const Course = ({ courses, date, Courses }) => {
		console.log(courses);
		const had = Courses?.find((course) => course.courseTime === date);
		const course = courses.map((course, index) => {
			return (
				<>
					<div key={index} className={style.course}>
						<div style={{ gridArea: `${index + 1}/1/${index + 2}/2` }}>
							{course.courseName}
						</div>
						<div style={{ gridArea: `${index + 1}/2/${index + 2}/3` }}>
							{course.teaName}
						</div>
						<div style={{ gridArea: `${index + 1}/3/${index + 2}/4` }}>
							{course.courseAddress}
						</div>
						<button
							data-id={course.courseId}
							data-date={date}
							data-name={course.courseName}
							data-tea={course.teaName}
							data-address={course.courseAddress}
							onClick={OnSelectClick}
							disabled={had}
							style={{
								gridArea: `${index + 1}/4/${index + 2}/5`,
								maxWidth: '100px',
							}}
						>
							选课
						</button>
					</div>
				</>
			);
		});
		return (
			<div className={style.courses}>
				<div className={style.course}>
					<div style={{ gridArea: `1/1/2/2` }}>课程名称</div>
					<div style={{ gridArea: `1/2/2/3` }}>任课教师</div>
					<div style={{ gridArea: `1/3/2/4` }}>课程地址</div>
				</div>
				{course}
				{!had ? null : (
					<div className={style.course} key={had.courseId}>
						<div
							style={{
								gridArea: `${course.length + 2}/1/${course.length + 3}/2`,
							}}
						>
							{had.courseName}
						</div>
						<div
							style={{
								gridArea: `${course.length + 2}/2/${course.length + 3}/3`,
							}}
						>
							{had.teaName}
						</div>
						<div
							style={{
								gridArea: `${course.length + 2}/3/${course.length + 3}/4`,
							}}
						>
							{had.courseAddress}
						</div>
						<button
							data-id={had.courseId}
							data-date={date}
							data-name={had.courseName}
							data-tea={had.teaName}
							data-address={had.courseAddress}
							onClick={OnCancelClick}
							style={{
								gridArea: `${course.length + 2}/4/${course.length + 3}/5`,
								maxWidth: '100px',
							}}
						>
							退课
						</button>
					</div>
				)}
			</div>
		);
	};
	let courseName = '';
	let courseAddress = '';
	const OnCourseNameChange = (e) => {
		courseName = e.target.value;
	};
	const OnCourseAddressChange = (e) => {
		courseAddress = e.target.value;
	};
	const OnAddCourseClick = (e) => {
		e.preventDefault();
		fetch('/addCourse', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `courseName=${courseName}&courseAddress=${courseAddress}&teaId=${user.userId}&courseTime=${date}&teaName=${user.userName}`,
		})
			.then((res) => {
				res.text();
			})
			.then((res) => {
				setCourses(
					Courses.concat({
						courseId: res,
						courseName: courseName,
						courseTime: date,
						teaName: user.userName,
						courseAddress: courseAddress,
					})
				);
			});
		setClose(false);
	};
	const Teacher = ({ date }) => {
		const had = Courses?.find((course) => course.courseTime.includes(date));

		const AddCourse = () => {
			return (
				<div className={style.form} style={{ maxWidth: '240px' }}>
					<input
						className={styles.input}
						type="text"
						placeholder="课程名称"
						onChange={OnCourseNameChange}
					/>
					<input
						className={styles.input}
						type="text"
						placeholder="课程教室"
						onChange={OnCourseAddressChange}
					/>
					<button className={styles.login} onClick={OnAddCourseClick}>
						发布
					</button>
				</div>
			);
		};

		const ModifyCourse = () => {
			let [name, setName] = useState(had?.courseName || '');
			let [address, setAddress] = useState(had?.courseAddress || '');
			const OnUpdateNameChange = (e) => {
				setName(e.target.value);
			};
			const OnUpdateAddressChange = (e) => {
				setAddress(e.target.value);
			};
			const OnModifyClick = (e) => {
				e.preventDefault();
				fetch('/updateCourse', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: `courseId=${had.courseId}&teaName=${user.userName}&courseTime=${date}&courseName=${name}&courseAddress=${address}`,
				});
				setCourses(
					Courses.filter((course) => course.courseTime !== date).concat({
						courseId: Courses.length + 1,
						courseName: name,
						courseTime: date,
						teaName: user.userName,
						courseAddress: address,
					})
				);
				setClose(!close);
			};
			const OnDeleteCourseClick = (e) => {
				e.preventDefault();
				fetch('/deleteCourseById', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: `id=${had.courseId}`,
				});
				setClose(!close);
				console.log(date);
				setCourses(Courses.filter((course) => course.courseTime !== date));
			};
			return (
				<div className={style.form} style={{ maxWidth: '240px' }}>
					<input
						className={styles.input}
						type="text"
						value={name}
						onChange={OnUpdateNameChange}
					/>
					<input
						className={styles.input}
						type="text"
						value={address}
						onChange={OnUpdateAddressChange}
					/>
					<button className={styles.login} onClick={OnModifyClick}>
						修改
					</button>
					<button className={styles.login} onClick={OnDeleteCourseClick}>
						删除
					</button>
				</div>
			);
		};
		return (
			<div className={style.center}>
				{had ? <ModifyCourse /> : <AddCourse />}
			</div>
		);
	};
	const OnLogoutClick = (e) => {
		e.preventDefault();
		localStorage.removeItem('user');
		router.push('/index.html');
	};
	const deleteUrl = user.userType == 'stu' ? 'deleteStu' : 'deleteTea';
	const OnDeleteClick = (e) => {
		e.preventDefault();
		fetch(deleteUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `id=${user.userId}`,
		});
		localStorage.removeItem('user');
		router.push('/index.html');
	};
	const Student = ({ date }) => {
		return <Course courses={data} date={date} Courses={Courses} />;
	};
	let content =
		user.userType == 'stu' ? <Student date={date} /> : <Teacher date={date} />;
	return (
		<div style={{ position: 'relative' }}>
			<Head>
				<title>选课系统</title>
			</Head>
			<div className={style.header}>
				<h1 style={{ margin: 'auto' }}>welcome {user.userName}</h1>
				<div className={style.btn}>
					<button onClick={OnLogoutClick} className={styles.input}>
						退出登录
					</button>
					<button onClick={OnDeleteClick} className={styles.input}>
						注销
					</button>
				</div>
			</div>
			<Content />
			<Modal close={close} setClose={setClose}>
				{content}
			</Modal>
		</div>
	);
}
