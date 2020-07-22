import React from 'react';
import TodoListItem from '../todoListItem/todoListItem';

import './todoList.css';

const TodoList = ({ todos, onDeleted, onImportant, onDone }) => {
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item;

		return (
			// <li>
			// 	<TodoListItem label={item.label} important={item.important} />
			// </li>
			// <li key={item.id}>
			// 	<TodoListItem {...item} />
			// </li>
			<li key={item.id} className="list-group-item">
				<TodoListItem {...itemProps} onDeletedElement={() => onDeleted(id)} onToggleImportant={() => onImportant(id)} onToggleDone={() => onDone(id)} />
			</li>
		);
	});

	return <ul className="list-group todo-list">{elements}</ul>;
};
export default TodoList;
