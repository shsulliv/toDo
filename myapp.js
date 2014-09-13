$(document).ready(function(){
    
    Appbase.credentials("todo-list", "f16e7108df370dc9320eeb59d88a714c");
    
    var abref = Appbase.create('ToDo', 'List');
    abref.on('edge_added', function(err, ref, snap) {
        var onPage = snap.name();
        $("#taskHere").append("<li>" + onPage + "</li>");
    });
    
    
    var newText;
    var counter = 0;
    
    $("#clickHere").click(function(hello) {
        hello.preventDefault(); //Prevents browser default behavior, i.e. submitting form, from happening
        console.log("clicked");
        
     
        var answer = $("#myTask");
        newText = answer.val();
        counter = counter+1; 

        abref.setEdge(Appbase.create('misc', Appbase.uuid()), newText);
        
        answer.val(""); //makes text in input box disappear after being submitted

        //--> Make li editable text feilds upon right click 

        $('li').mousedown(function(event) { //Adds a form on a right click
            if (event.which === 3) 
                $(this).replaceWith("<li><form><input type=\'text\' id=\'newForm\'></form></li>");
            });

            // --> Get rid of the text box when leaving the form
            
        $('li').click(function() {
            $(this).css("background","#DDC1FF"); //makes background-color of li lilac after single click
        });
    });
    
    $("#taskHere").dblclick(function(event) { //removes task item from list on double click
        $(event.toElement).fadeOut("slow", function() {});
        $(event.toElement).remove();
        });
});