function fetchTodos(done){
    $.get('/api/todos',function(data){  //--> AJAX get req.(page won't load completely again)
        done(data)                      //--> returns the fetched data[{},{}] array of prds. for the product calls GET:/api/products
    })
} 

function addTodo(id,title,description,duedate,status,priority){
    $.post('/api/todos',{
        id:id,
        title:title,
        description:description,
        duedate:duedate,
        status:status,
        priority:priority
    },function(data){
        done(data)
    })
}


function createTodoCard(todo){ //--> creates a new card element
    return $(`        
    <div class="col-4 card mx-2 p-4">
            <div class="title">${todo.title}</div>
            <div class="duedate">${todo.duedate}</div>
            <div class="description">${todo.description}</div>
            <div class="status">${todo.status}</div>
            <div class="Priority">${todo.priority}</div>

     </div>
    `)
}