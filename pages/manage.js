import React, { useEffect, useState } from 'react';
import style from '../styles/manage.module.css';
const Students = () => {
	let [students, setStudents] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch('/getStus', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => {
				setStudents(data);
				setIsLoading(false);
			});
	}, []);
	const Student = ({ item }) => {
		let [name, setName] = useState(item.stuName);
		let [pwd, setPwd] = useState(item.stuPwd);
		let stuId = item.stuId;
		const OnNameChange = (e) => {
			e.preventDefault();
			setName(e.target.value);
		};
		const OnPwdChange = (e) => {
			e.preventDefault();
			setPwd(e.target.value);
		};
		const OnUpdate = (e) => {
			e.preventDefault();
			fetch('/updateStu', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `stuName=${name}&stuPwd=${pwd}&stuId=${stuId}`,
			});
		};
		const OnDelete = (e) => {
			e.preventDefault();
			fetch('/deleteStu', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `id=${stuId}`,
			});
			setStudents(students.filter((item) => item.stuId !== stuId));
		};
		return (
			<div className={style.flexRow}>
				<input type="text" value={name} onChange={OnNameChange} />
				<input type="text" value={pwd} onChange={OnPwdChange} />
				<button onClick={OnUpdate}>修改</button>
				<button onClick={OnDelete}>删除</button>
			</div>
		);
	};
	const items = students.map((item, index) => {
		return <Student item={item} key={index} />;
	});
	const NewItem = () => {
		let [name, setName] = useState('');
		let [pwd, setPwd] = useState('');
		const OnNameChange = (e) => {
			// e.preventDefault();
			setName(e.target.value);
		};
		const OnPwdChange = (e) => {
			// e.preventDefault();
			setPwd(e.target.value);
		};
		const OnAdd = (e) => {
			e.preventDefault();
			fetch('/addStu', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `stuName=${name}&stuPwd=${pwd}`,
			})
				.then((res) => res.text())
				.then((data) => {
					setStudents([
						...students,
						{
							stuId: data,
							stuName: name,
							stuPwd: pwd,
						},
					]);
				});
		};
		return (
			<div className={style.flexRow}>
				<input type="text" value={name} onChange={OnNameChange} />
				<input type="text" value={pwd} onChange={OnPwdChange} />
				<button onClick={OnAdd}>新增</button>
			</div>
		);
	};
	if (isLoading) {
		return <div>loading...</div>;
	}
	return (
		<div>
			<div>
				<span className={style.title}>学生姓名</span>
				<span className={style.title}>学生密码</span>
			</div>
			{items}
			<NewItem />
		</div>
	);
};
const Teachers = () => {
	let [teachers, setTeachers] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch('/getTeas', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => {
				setTeachers(data);
				setIsLoading(false);
			});
	}, []);
	const Teacher = ({ item }) => {
		let [name, setName] = useState(item.teaName);
		let [pwd, setPwd] = useState(item.teaPwd);
		let teaId = item.teaId;
		const OnNameChange = (e) => {
			e.preventDefault();
			setName(e.target.value);
		};
		const OnPwdChange = (e) => {
			e.preventDefault();
			setPwd(e.target.value);
		};
		const OnUpdate = (e) => {
			e.preventDefault();
			fetch('/updateTea', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `teaName=${name}&teaPwd=${pwd}&stuId=${teaId}`,
			});
		};
		const OnDelete = (e) => {
			e.preventDefault();
			fetch('/deleteTea', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `teaName=${item.teaName}`,
			});
			setTeachers(teachers.filter((item) => item.teaId !== teaId));
		};
		return (
			<div className={style.flexRow}>
				<input type="text" value={name} onChange={OnNameChange} />
				<input type="text" value={pwd} onChange={OnPwdChange} />
				<button onClick={OnUpdate}>修改</button>
				<button onClick={OnDelete}>删除</button>
			</div>
		);
	};
	const items = teachers.map((item, index) => {
		return <Teacher item={item} key={index} />;
	});
	const NewItem = () => {
		let [name, setName] = useState('');
		let [pwd, setPwd] = useState('');
		const OnNameChange = (e) => {
			// e.preventDefault();
			setName(e.target.value);
		};
		const OnPwdChange = (e) => {
			// e.preventDefault();
			setPwd(e.target.value);
		};
		const OnAdd = (e) => {
			e.preventDefault();
			fetch('/addTea', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `teaName=${name}&teaPwd=${pwd}`,
			})
				.then((res) => res.text())
				.then((data) => {
					setTeachers([
						...teachers,
						{
							teaId: data,
							teaName: name,
							teaPwd: pwd,
						},
					]);
				});
		};
		return (
			<div className={style.flexRow}>
				<input type="text" value={name} onChange={OnNameChange} />
				<input type="text" value={pwd} onChange={OnPwdChange} />
				<button onClick={OnAdd}>新增</button>
			</div>
		);
	};
	if (isLoading) {
		return <div>loading...</div>;
	}
	return (
		<div>
			<div>
				<span className={style.title}>教师姓名</span>
				<span className={style.title}>教师密码</span>
			</div>{' '}
			{items}
			<NewItem />
		</div>
	);
};
const Courses = () => {
	let [courses, setCourses] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch('/allCourse', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => {
				setCourses(data);
				setIsLoading(false);
			});
	}, []);
	const Course = ({ item }) => {
		console.log(item);
		let [name, setName] = useState(item.courseName);
		let [time, setTime] = useState(item.courseTime);
		let [teaName, setTeaName] = useState(item.teaName);
		let [address, setAddress] = useState(item.courseAddress);
		let courseId = item.courseId;
		const OnNameChange = (e) => {
			e.preventDefault();
			setName(e.target.value);
		};
		const OnTimeChange = (e) => {
			e.preventDefault();
			setTime(e.target.value);
		};
		const OnAddressChange = (e) => {
			e.preventDefault();
			setAddress(e.target.value);
		};
		const OnTeaNameChange = (e) => {
			e.preventDefault();
			setTeaName(e.target.value);
		};
		const OnUpdate = (e) => {
			e.preventDefault();
			fetch('/updateCourse', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `courseName=${name}&courseTime=${time}&courseId=${courseId}&teaName=${teaName}&address=${address}`,
			});
		};
		const OnDelete = (e) => {
			e.preventDefault();
			fetch('/deleteCourseById', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `id=${courseId}`,
			});
			setCourses(courses.filter((item) => item.courseId !== courseId));
		};
		return (
			<div className={style.flexRow}>
				<input
					type="text"
					className={style.input}
					value={name}
					onChange={OnNameChange}
				/>

				<input
					type="text"
					className={style.input}
					value={time}
					onChange={OnTimeChange}
				/>
				<input
					type="text"
					className={style.input}
					value={address}
					onChange={OnAddressChange}
				/>
				<input
					type="text"
					className={style.input}
					value={teaName}
					onChange={OnTeaNameChange}
				/>
				<button className={style.login} onClick={OnUpdate}>
					修改
				</button>
				<button className={style.login} onClick={OnDelete}>
					删除
				</button>
			</div>
		);
	};
	const items = courses.map((item, index) => {
		return <Course item={item} key={index} />;
	});
	const NewItem = () => {
		let [name, setName] = useState('');
		let [time, setTime] = useState('');
		let [teaName, setTeaName] = useState('');
		let [address, setAddress] = useState('');
		const OnNameChange = (e) => {
			// e.preventDefault();
			setName(e.target.value);
		};
		const OnTimeChange = (e) => {
			// e.preventDefault();
			setTime(e.target.value);
		};
		const OnAddressChange = (e) => {
			// e.preventDefault();
			setAddress(e.target.value);
		};
		const OnTeaNameChange = (e) => {
			// e.preventDefault();
			setTeaName(e.target.value);
		};
		const OnAdd = (e) => {
			e.preventDefault();
			fetch('/addCourse', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `courseName=${name}&courseTime=${time}&teaName=${teaName}&courseAddress=${address}`,
			})
				.then((res) => res.text())
				.then((data) => {
					setCourses([
						...courses,
						{
							courseId: data,
							courseName: name,
							courseTime: time,
							teaName: teaName,
							courseAddress: address,
						},
					]);
				});
		};
		return (
			<div className={style.flexRow}>
				<input
					type="text"
					className={style.input}
					value={name}
					onChange={OnNameChange}
				/>
				<input
					type="text"
					className={style.input}
					value={time}
					onChange={OnTimeChange}
				/>
				<input
					type="text"
					className={style.input}
					value={address}
					onChange={OnAddressChange}
				/>
				<input
					type="text"
					className={style.input}
					value={teaName}
					onChange={OnTeaNameChange}
				/>
				<button className={style.login} onClick={OnAdd}>
					新增
				</button>
			</div>
		);
	};
	if (isLoading) {
		return <div>loading...</div>;
	}
	return (
		<div>
			<div>
				<span className={style.title}>课程名称</span>
				<span className={style.title}>课程时间</span>
				<span className={style.title}>课程地点</span>
				<span className={style.title}>教师姓名</span>
			</div>
			{items}
			<NewItem />
		</div>
	);
};
const Selects = () => {
	let [selects, setSelects] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch('/getStuCourse', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => {
				setSelects(data);
				setIsLoading(false);
			});
	}, []);
	const Select = ({ item }) => {
		let [stuId, setStuId] = useState(item.stuId);
		let [courseId, setCourseId] = useState(item.courseId);
		const OnStuChange = (e) => {
			e.preventDefault();
			setStuId(e.target.value);
		};
		const OnCourseChange = (e) => {
			e.preventDefault();
			setCourseId(e.target.value);
		};
		const OnUpdate = (e) => {
			e.preventDefault();
			fetch('/updateStuCourse', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `stuId=${stuId}&courseId=${courseId}&m_stuId=${item.stuId}&m_courseId=${item.courseId}`,
			});
		};
		const OnDelete = (e) => {
			e.preventDefault();
			fetch('/deleteStuCourse', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `stuId=${stuId}&courseId=${courseId}`,
			});
			setSelects(
				selects.filter(
					(item) => item.stuId !== stuId && item.courseId !== courseId
				)
			);
		};
		return (
			<div className={style.flexRow}>
				<input type="text" value={stuId} onChange={OnStuChange} />
				<input type="text" value={courseId} onChange={OnCourseChange} />
				<button onClick={OnUpdate}>修改</button>
				<button onClick={OnDelete}>删除</button>
			</div>
		);
	};
	const items = selects.map((item, index) => {
		return <Select item={item} key={index} />;
	});
	const NewItem = () => {
		let [stuId, setStuId] = useState('');
		let [courseId, setCourseId] = useState('');
		const OnStuChange = (e) => {
			// e.preventDefault();
			setStuId(e.target.value);
		};
		const OnCourseChange = (e) => {
			// e.preventDefault();
			setCourseId(e.target.value);
		};
		const OnAdd = (e) => {
			e.preventDefault();
			fetch('/selectCourse', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `stuId=${stuId}&courseId=${courseId}`,
			})
				.then((res) => res.json())
				.then((data) => {
					setSelects([...selects, data]);
				});
		};
		return (
			<div className={style.flexRow}>
				<input type="text" value={stuId} onChange={OnStuChange} />
				<input type="text" value={courseId} onChange={OnCourseChange} />
				<button onClick={OnAdd}>新增</button>
			</div>
		);
	};
	if (isLoading) {
		return <div>loading...</div>;
	}
	return (
		<div>
			<div>
				<span className={style.title}>学生ID</span>
				<span className={style.title}>课程ID</span>
			</div>
			{items}
			<NewItem />
		</div>
	);
};
export default function Manager() {
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>welcome to manage system</h1>
			<p>students management</p>
			<Students />
			<p>teachers management</p>
			<Teachers />
			<p>courses management</p>
			<Courses />
			<p>selects management</p>
			<Selects />
		</div>
	);
}
