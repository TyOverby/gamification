var _ = require('lodash');

module.exports =  function () {
  var lastTaskID = 1;

  // name to user
  var users = Object.create(null);
  // taskid to task
  var tasks = Object.create(null);

  var env;
  return env = {
    __users: users,
    __tasks: tasks,
    addUser: function(username) {
      if(_.has(users, username)) {
        return {error: "User already exists with that name."};
      }

      var user = {
        name: username,
        top_level_tasks: [],
        all_tasks: []
      };

      users[user.name] = user;
      return user;
    },

    getUser: function(username) {
      if(_.has(users, username)) {
        var u = users[username];
        var userObj = {
          name: username,
          top_level_tasks: u.top_level_tasks.map(env.getTask),
          all_tasks: u.all_tasks.map(env.getTask)
        }

        return userObj;
      } else {
        return {error: "User: " + username + " does not exist."};
      }
    },

    addTask: function(username, name, description, weight, outOf, parentId) {
      if(outOf == 0) {
        outOf = 1;
      }

      var task = {
        name: name,
        id: lastTaskID++,
        description: description,
        children: [],
        progress: {num: 0, denom: outOf},
        weight: weight
      };
      if(!_.has(users, username)) {
        return {error: "User " + username + " does no exist." };
      }
      if(parentId) {
        var parentTask = tasks[parentId];
        if(parentTask) {
          parentTask.children.push(task.id);
        } else {
          return {error: "Taskid: " +
            parentId + " for parent does not exist."}
        }

      }

      users[username].all_tasks.push(task.id);
      if(!parentId) {
        users[username].top_level_tasks.push(task.id);
      }
      tasks[task.id] = task;
      return env.getTask(task.id);
    },

    getTask: function(id) {
      if(!_.has(tasks,id)) {
        return {error: "Taskid: " + id + " does not exist."};
      }

      function score(task) {
        if(task.children.length == 0) {
          var p = task.progress;
          return p.num / p.denom;
        } else {
          var computedChildren = task.children.map(env.getTask);
          var totalWeights = _.pluck(computedChildren, 'weight')
                              .reduce(function(a,b){return a + b;});
          var sum = computedChildren.map(function (t) {
            console.log("ww", t.weight);
            console.log("tw", totalWeights);
            var toReturn = score(tasks[t.id]) * (t.weight / totalWeights);
            console.log("tr", toReturn);
            return toReturn;
          }).reduce(function(a, b) {return a + b;});

          console.log("sm ",sum);
          return sum;
        }
      }
      var task = tasks[id];
      var tobj = {
        name: task.name,
        id: task.id,
        description: task.description,
        is_parent: task.children.length > 0,
        children: task.children.map(function(cid) {
          return env.getTask(cid);
        }),
        weight: task.weight,
        progress: score(task)
      };

      return tobj;
    }
  };
};
