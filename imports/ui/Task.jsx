import React from 'react';

export const Task = ({ task, onDeleteClick, onCheckboxClick }) => {
	return (
		<li>
			<input
				className='checked'
				type='checkbox'
				checked={!!task.isChecked}
				onClick={() => onCheckboxClick(task)}
				readOnly
			/>
			<span>{task.text}</span>
			<button className='update'>Update</button>
			<button onClick={() => onDeleteClick(task)}>Delete</button>
		</li>
	);
};
