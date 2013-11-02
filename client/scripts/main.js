"use strict";

$(document).ready(

	function(){
		$("#goal_name_next").click(newGoal);
		window.goals = [];
	}
);

function newGoal(){
	var goalName = $("#goal_name").val();
	$("#subtasks>div>h1").html(goalName);
	window.currentGoal = new Goal(goalName);
	window.goals.append(currentGoal);

	addSubtask($("#subtask_form0"));
}

function updateDifficulty(){
	var sliderValue = $(this).val();
	var label = $("#difficulty_label");

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

function Goal(name){
	this.goalName = name;
	this.tasks = [];



	//form = target form to add the subtask to.
	function addSubtask(form){

		form.append('<div id="task_div'+n+'"></div>');
		var formContainer = $('#task_div'+n);

		formContainer.append('<label for="goal_name">Task Name</label>');
		formContainer.append('<input type="text" id="task_name'+n+'"/>');
	    formContainer.append('<label id="difficulty_label" for="difficulty">Task Difficulty: None</label>');
	    formContainer.append('<input id="difficulty'+n+'" class="ui-hidden-accessible" data-type="range" value="0" min="0" max="3" step="1" data-highlight="true">');
	    $("#difficulty").bind("change", updateDifficulty);
	}

}

function Task(name, value){

}
