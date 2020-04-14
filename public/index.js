$(function(){ //--> function is call when the page has been loaded

    let TodoList = $('#Todo-list')
    //add the fetched products into the list
    fetchTodos(function (todos){
        TodoList.empty();
        for(item of todos){
            TodoList.append(createTodoCard(item))
        }
    })

})
