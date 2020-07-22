import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/appHeader/appHeader';
import SearchPanel from './components/searchPanel/searchPanel';
import TodoList from './components/todoList/todoList';
import ItemStatusFilter from './components/itemStatusFilter/itemStatusFilter';
import ItemAddForm from './components/itemAddForm/itemAddForm';

import './index.css';
export default class App extends Component {
	constructor() {
		super();

		this.maxID = 100;

		this.createTodoItem = (label) => {
			return {
				label,
				important: false,
				done: false,
				id: this.maxID++,
			};
		};

		this.state = {
			todoData: [this.createTodoItem('Drink Coffe 1'), this.createTodoItem('Drink Coffe 2'), this.createTodoItem('Drink Coffe 3')],
		};

		this.deleteItem = (id) => {
			this.setState(({ todoData }) => {
				const index = todoData.findIndex((el) => el.id === id);
				const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

				return {
					todoData: newArray,
				};
			});
		};

		this.addItem = (text) => {
			// generate id
			const newItem = this.createTodoItem(text);

			//add element in array
			this.setState(({ todoData }) => {
				const newArray = [...todoData, newItem];

				return {
					todoData: newArray,
				};
			});
		};

		this.toggleProperty = (arr, id, propName) => {
			const index = arr.findIndex((el) => el.id === id);

			// update object
			const oldItem = arr[index];
			const newItem = { ...oldItem, [propName]: !oldItem[propName] };

			//construct new array

			// const newArray = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];

			return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
		};

		this.onToggleImportant = (id) => {
			this.setState(({ todoData }) => {
				return {
					todoData: this.toggleProperty(todoData, id, 'important'),
				};
			});
		};

		this.onToggleDone = (id) => {
			this.setState(({ todoData }) => {
				return {
					todoData: this.toggleProperty(todoData, id, 'done'),
				};
			});
		};
	}

	render() {
		const { todoData } = this.state;
		const doneCount = todoData.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter />
				</div>
				<TodoList todos={todoData} onDeleted={this.deleteItem} onImportant={this.onToggleImportant} onDone={this.onToggleDone} />
				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
