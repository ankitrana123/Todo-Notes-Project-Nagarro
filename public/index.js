$(document).ready(function(){
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    $('#duedate').val(output)
})

$('#form-create-task').submit(function() {
    var obj = $('#btnTodoAdd').serializeJSON();
    console.log("adding a new todo");
    $.ajax({
        type: "POST",
        url: "http://localhost:2223/api/todos/",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType : "application/json",
        success: function(data){
            console.log(data)
        }
        
    });
})


