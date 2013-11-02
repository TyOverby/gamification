var store = require('../store');
var _ = require('lodash');

exports.testAddUser = function (test) {
  var s = store();
  var NAME = "Ty Overby";
  var user = s.addUser(NAME);

  test.equals(user.name,NAME);
  test.deepEqual(user.top_level_tasks, []);
  test.deepEqual(user.all_tasks, []);
  test.ok(_.has(s.__users, NAME));

  var bad = s.addUser(NAME);
  test.ok(_.has(bad, 'error'));

  var pulledUser = s.getUser(NAME);
  test.deepEqual(user, pulledUser);

  var badUser = s.getUser("sdfsdfa");
  test.ok(_.has(badUser, 'error'));

  test.done();
}

exports.testTask = function(test) {
  var s = store();
  var NAME = "Ty Overby";

  s.addUser(NAME);

  var goal;
  var task;

  (function(){
    var GOAL_NAME = "Fitness";
    var GOAL_DESC = "Get fit";
    var WEIGHT = 0;
    var OUTOF = 0;
    var PARENTID = null;

    goal = s.addTask(NAME, GOAL_NAME, GOAL_DESC, WEIGHT, OUTOF, PARENTID);

    test.equals(goal.name, GOAL_NAME);
    test.equals(goal.id, 1);
    test.equals(goal.description, GOAL_DESC);
    test.ok(goal.children.length == 0);

    var user = s.getUser(NAME);
    test.ok(user.top_level_tasks.length == 1);
    test.ok(user.all_tasks.length == 1);
    test.equals(user.all_tasks[0].id, goal.id);
    test.equals(user.top_level_tasks[0].id, goal.id);
  })();


  var TASK_NAME = "Pushups";
  var TASK_DESC = "Do 10 pushups";
  var WEIGHT = 5;
  var OUTOF = 10;
  var PARENTID = goal.id;

  task = s.addTask(NAME, TASK_NAME, TASK_DESC, WEIGHT, OUTOF, PARENTID);

  test.equals(task.name, TASK_NAME);
  test.equals(task.description, TASK_DESC);
  test.equals(task.weight, WEIGHT);
  test.equals(task.progress, 0 / 1);

  var user = s.getUser(NAME);

  test.equals(user.top_level_tasks.length, 1);
  test.equals(user.all_tasks.length, 2);

  goal = s.getTask(goal.id);
  test.equals(goal.children.length, 1);
  test.equals(goal.children[0].id, task.id);
  console.log(goal);
  test.equals(goal.progress, 0/1);

  test.done();
};
