import React from 'react';
import style from '../styles/modal.module.css';
export default function Modal({ children, close, setClose }) {
	const OnCloseClick = () => {
		setClose(false);
	};
	return (
		<div className={close ? '' : style.close}>
			<div className={style.bg} onClick={OnCloseClick}></div>
			<div className={style.content}>{children}</div>
		</div>
	);
}
