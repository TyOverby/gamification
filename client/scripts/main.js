"use strict";

$(document).ready(

	function(){
		$("#goal_name_next").bind("click", newGoal);
		$("#difficulty").bind("change", updateDifficulty);
		$("#add_subtask").bind("change", addSubtask);

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

function Goal(name, number, num){
	this.goalName = name;
	this.pageform = this.pageform = $('subtask_form'+num);
	this.subtasks = [];
}

function Task(name, difficulty){
	this.taskName = name;
	this.difficulty = difficulty;

	this.render = render;
	function render(){
		$('subtasks').append("<div><h2>"+this.taskName+"</h2><h3>Difficulty: "+this.difficulty+"</h3></div>");
	}
}

function addSubtask(){
	var taskName = $('task_name').val();
	var difficulty = $('difficulty').val();
	var currentTask = new Task(taskName, difficulty);
	currentParent.subtasks.push(currentTask);
	currentTask.render();
}

function addChildren(newParent){
	$('subtasks').html("");
	$("#subtask_page>div>h1").html(newParent.taskName);
	window.currentParent = newParent;
	$.mobile.changePage("#subtask_page", allowSamePageTransition="true");

	for(var i; i < newParent.subtasks.length; i++){
		newParent.subtasks[i].render;
	}
}
	// var n = window.currentGoal.subtask.length;
	// var form = document.createElement("form");
	// form.id = 
	// form.append('<div id="task_div'+n+'"></div>');
	// var formContainer = $('#task_div'+n);

	// formContainer.append('<label for="task_name">Task Name</label>');
	// formContainer.append('<input type="text" class="task_name"/>');
 //    formContainer.append('<label class="difficulty_label" for="difficulty">Task Difficulty: None</label>');
 //    formContainer.append('<input class="difficulty" class="ui-hidden-accessible" data-type="range" value="0" min="0" max="3" step="1" data-highlight="true">');
