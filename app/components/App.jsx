import React from 'react';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';


var App = React.createClass({
	getInitialState() {
	  var notes = NoteStore.getState();
	   return {
	   		notes:notes.notes
	   }
	},
	componentDidMount:function() {
		NoteStore.listen(this.storeChanged);
	},
	componentWillUnmount:function() {
		NoteStore.unlisten(this.storeChanged);
	},
	render:function() {
		 console.log()
		const notes = this.state.notes;
		return (
			<div>
			<button className="add-note" onClick={this.addNote}>+</button>
			<Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote} />


			</div>
			);
	},
	storeChanged:function(state)  {
    	this.setState(state);
  	},
	addNote:function(){
		NoteActions.create({task: 'New task'});
	},
	deleteNote:function(id){
		 NoteActions.delete(id);
	},
	editNote:function(id,task){
		if(!task.trim()) {
			return;
		}
		NoteActions.update({id, task});
	}
});

module.exports = App;