import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
export default function Home() {
	let [username, setUserName] = useState('');
	let [password, setPassword] = useState('');

	let [userType, setUserType] = useState('');
	let [tip, setTip] = useState('');
	const router = useRouter();
	const OnUsernameChange = (e) => {
		console.log(e.target.value);
		setUserName(e.target.value);
	};

	const OnPasswordChange = (e) => {
		console.log(e.target.value);
		setPassword(e.target.value);
	};
	const OnSubmit = (e) => {
		e.preventDefault();
		console.log(JSON.stringify({ userType, username, password }));
		e.preventDefault();
		fetch('/login', {
			method: 'POST',
			body: `userType=${userType}&userName=${username}&userPwd=${password}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then((res) => res.json())
			.then((res) => handle(res));

		// handle(res);
	};
	const handle = (res) => {
		console.log(res);
		switch (res.userType) {
			case 'stu':
			case 'tea':
				localStorage.setItem('user', JSON.stringify(res));
				router.push('/main');
				break;
			case 'none':
				setTip('wrong username or password');
				break;
			default:
				setTip('unknown error');
				break;
		}
	};
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<main className={styles.main}>
				<form className={styles.form}>
					<div>
						<input
							type={'radio'}
							name={'userType'}
							value={'stu'}
							id={'stu'}
							onChange={(e) => setUserType(e.target.value)}
							checked={userType === 'stu'}
						/>
						<label htmlFor={'stu'}>Student</label>
						<input
							id="tea"
							type={'radio'}
							name={'userType'}
							value={'tea'}
							onChange={(e) => setUserType(e.target.value)}
							checked={userType === 'tea'}
						/>
						<label htmlFor={'tea'}>Teacher</label>
					</div>
					<input
						className={styles.input}
						type="text"
						placeholder="username"
						name="userName"
						onChange={OnUsernameChange}
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="password"
						name="userPwd"
						onChange={OnPasswordChange}
					/>

					<p className={styles.message} style={{ color: 'red' }}>
						{tip}
					</p>
					<button className={styles.login} type="submit" onClick={OnSubmit}>
						Login
					</button>
				</form>
			</main>
		</>
	);
}
