$(function(){

    let id = $('#todo-id')
    let description = $('#description')
    let duedate = $('#duedate')
    let status = $('#status')
    let priority = $('#priority')
    let title = $('#title')
        $('#btnTodoAdd').click(function(){
            addTodo(
                id.val(),
                description.val(),
                duedate.val(),
                status.val(),
                priority.val(),
                title.val(),
                function (addedtodo){   //--> call back function
                    window.alert("Added todo with id"+addedtodo.id+"To database ")
                }
            )
        })
    

})
