Appbase.credentials('todo_list', 'eccae9f4e7cbd42d6c18cd0c206e91de');
var taskListRef = Appbase.ns('taskList').v('list1');

$(document).ready(function() {
  taskListRef.on('edge_added', function(error, vRef, eSnap) {
    vRef.once('properties', function(error, ref, vSnap) {
      $("#tasks").append("<li id=" + vRef.name() +  ">" + vSnap.properties().todo + "</li>"); //adds task items to the page as list
    })
  });
  
  taskListRef.on('edge_removed', function(error, vRef) {
    $("#" + vRef.name()).fadeOut("slow", function() {});
    $("#" + vRef.name()).remove();
  });
  
  $("#submit").click(function(element) {
    element.preventDefault(); //Prevents browser default behavior, i.e. submitting form, from happening  

    var newTask = $("#newTask");
    
    var id = Appbase.uuid();
    var taskRef =  Appbase.ns('task').v(id);
    taskRef.setData({
      todo: newTask.val()
    }, function() {
      taskListRef.setEdge(id, taskRef);
    });
    
    newTask.val(""); //makes text in input box disappear after being submitted
  });
  
  $("#tasks").dblclick(function(event) { //removes task item from list on double click
    taskListRef.removeEdge(event.toElement.id, function() {
      Appbase.ns('task').v(event.toElement.id).destroy(console.log.bind(console));
    });
  });
});