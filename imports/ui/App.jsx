import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';

export const App = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [hideCompleted, setHideCompleted] = useState(false);

	const hideCompletedFilter = { isChecked: { $ne: true } };

	const pendingTasksCount = useTracker(() => TasksCollection.find(hideCompletedFilter).count());

	const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})` : ''}`;

	// * load data from DB
	const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());

	// * delete task function
	const deleteTask = ({ _id }) => {
		TasksCollection.remove(_id);
		alert('Are you sure you want to delete task?');
	};

	// * toggle check
	const toggleChecked = ({ _id, isChecked }) => {
		TasksCollection.update(_id, {
			$set: {
				isChecked: !isChecked,
			},
		});
	};

	return (
		<div className='app'>
			<header>
				<div className='app-bar'>
					<div className='app-header'>
						<h1>
							<span>Todo App</span>
							<span className='span-2'>Pending Tasks: {pendingTasksTitle}</span>
						</h1>
					</div>
				</div>
			</header>

			<div className='main'>
				<TaskForm />

				<div className='filter'>
					<button onClick={() => setHideCompleted(!hideCompleted)}>{hideCompleted ? 'Show All Tasks' : 'Hide Completed Tasks'}</button>
				</div>

				<ul className='tasks'>
					{!isLoading && tasks.length === 0 ? (
						<p className='no-task-found'>No task found! Please add a task.</p>
					) : (
						<>
							{tasks.map((task) => (
								<Task
									key={task._id}
									task={task}
									onCheckboxClick={toggleChecked}
									onDeleteClick={deleteTask}
								/>
							))}
						</>
					)}
				</ul>
			</div>
		</div>
	);
};
