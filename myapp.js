$(document).ready(function(){
    Appbase.credentials("todo-list", "f16e7108df370dc9320eeb59d88a714c");
    var abref = Appbase.create('ToDo', 'List');
    abref.on('edge_added', function(err, ref, snap) {
        var taskId = snap.name();
        ref.on('properties', function(e, r, data) {
            ref.off();
            $("#taskHere").append("<li id="+ taskId +">"+ data.properties().task +"</li>");    
        })
    });
    var newText;
    var counter = 0;
    $("#clickHere").click(function(hello) {
        hello.preventDefault(); //Prevents browser default behavior, i.e. submitting form, from happening
        var answer = $("#myTask");
        newText = answer.val();
        counter = counter+1; 
        
        $("#taskHere").append("<li>" + newText + "</li>"); //adds task items to the page as list
        
        var taskId = Appbase.uuid();
        var taskRef = Appbase.create('misc', Appbase.uuid());
        taskRef.setData({
            task: newText
        })
        abref.setEdge(taskRef, taskId);
        answer.val(""); //makes text in input box disappear after being submitted
    });
     $("#taskHere").click(function(event) {
        $(event.toElement).css("background","#DDC1FF"); //makes background-color of li lilac after single click
    });
    $("#taskHere").dblclick(function(event) { //removes task item from list on double click
        abref.removeEdge($(event.toElement).attr('id'));
        $(event.toElement).remove();
    });
}); 