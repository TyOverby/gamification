"use strict";

$(document).ready(

	function(){

		$.mobile.changePage("#home");
		$("#goal_name_next").bind("click", newGoal);
		$("#difficulty").bind("change", updateDifficulty);
		$("#add_subtask").bind("click", addSubtask);

		window.goals = [];
	}
);

function newGoal(){
	var goalName = $("#goal_name").val();
	$("#subtask_page>div>h1").html(goalName);
	window.currentGoal = new Goal(goalName, window.goals.length);
	window.goals.push(currentGoal);
	window.currentParent = currentGoal;
}

//label = the label corresopnding to the slider
function updateDifficulty(){
	var sliderValue = $(this).val();
	var label = $('#difficulty_label');

	switch(sliderValue){

		case "1":
			label.html("Task Difficulty: Easy");
			break;

		case "2":
			label.html("Task Difficulty: Medium");
			break;

		case "3":
			label.html("Task Difficulty: Hard");
			break;

		default:
			label.html("Task Difficulty: None");
	}
}

function Goal(name, number){
	this.goalName = name;
	this.pageform = this.pageform = $('#subtask_form'+number);
	this.subtasks = [];
}

function Task(name, difficulty){
	this.taskName = name;
	this.difficulty = difficulty;
	this.subtasks = [];

	Task.prototype.render = render;

	function render(){
		var itemDisplay = $("<a>");
		itemDisplay.append("<h2>"+this.taskName+"</h2>");
		itemDisplay.append("<h3>Difficulty: "+this.difficulty+"</h3>");
		itemDisplay.attr("data-role", "button");
		itemDisplay.attr("data-icon", "arrow-r");
		itemDisplay.attr("data-iconpos", "right");
		itemDisplay.button();
		itemDisplay.bind("click", this.viewChildren);
		$('#subtasks').append(itemDisplay);
	}

	Task.prototype.viewChildren= viewChildren;

	function viewChildren(){

		//Reset the task display area.
		$('#subtasks').html("");
		$("#subtask_page>div>h1").html(this.taskName);

		//Set the current Parent to this task.
		window.currentParent = this;

		//Show screen transition.
		$.mobile.changePage("#subtask_page", {allowSamePageTransition: "true", transition: "slide"});

		//Display all children.
		for(var i; i < this.subtasks.length; i++){
			this.subtasks[i].render;
		}
	}
}

function addSubtask(){
	var taskName = $('#task_name').val();
	var difficulty = $('#difficulty').val();
	var currentTask = new Task(taskName, difficulty);
	currentParent.subtasks.push(currentTask);
	currentTask.render();
}


