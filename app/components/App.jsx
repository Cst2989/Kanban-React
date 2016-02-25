import React from 'react';
import uuid from 'node-uuid';


import Notes from './Notes.jsx';


var App = React.createClass({
	getInitialState:function() {
		return {
			notes: [
			{
				id: uuid.v4(),
				task: 'Learn Webpack'
			},
			{
				id: uuid.v4(),
				task: 'Learn React'
			},
			{
				id: uuid.v4(),
				task: 'Do laundry'
			}
			]
			
		}
	},
	render:function() {
		const notes = this.state.notes;
		return (
			<div>
			<button className="add-note" onClick={this.addNote}>+</button>
			<Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote} />


			</div>
			);
	},
	addNote:function(){
		this.setState({
			notes: this.state.notes.concat([{
				id: uuid.v4(),
				task: 'New task'
			}])
		});
	},
	deleteNote:function(id){
		this.setState({
			notes: this.state.notes.filter(note => note.id !== id)
		});
	},
	editNote:function(id,task){
		if(!task.trim()) {
			return;
		}
		const notes = this.state.notes.map(note => {
			if(note.id === id && task) {
				note.task = task;
			}
			return note;
		});
		this.setState({notes});
	}
});

module.exports = App;