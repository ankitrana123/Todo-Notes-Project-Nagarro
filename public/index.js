$(document).ready(function(){
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    $('#duedate').val(output)

    $('a.list-group-item').click(function() { 
        var id1 = $(this).attr('id');
        var collapseid = '#collapse' + id1
        
        $(collapseid).empty()

        //adding notes under each todo collapsed item
        var input = `<div class="input-group">
        <input type="text" class="form-control" id="task${id1}" placeholder="Enter Note to Create" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-primary note-create" id="${id1}" type="button" onclick="createNote(this.id)">Create</button>
            </div>
        </div>`
    $(collapseid).append(input)
       
    //append list item to collapse
        const url = 'http://localhost:2223/api/todos/' + id1 + '/notes'
        console.log(url)
        $.getJSON(url, function(data) {
            data.forEach(element => {
                
                var text = `<li class="list-group-item list-group-item-success">${element.note}</li>`
    
                $(collapseid).append(text);
            })
        });
    })

    $('#editTodo').click(function(){
        window.alert("edit btn clicked");
    })
})

function createNote(id){
    const taskid = "task"+id;
    var notes = document.getElementById(taskid).value;
    var item = {}
    item["note"] = notes;
    item["id"] = id;
    //console.log(item);
    const url = 'http://localhost:2223/api/todos/' + id + '/notes'
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(item),
        dataType: "json",
        contentType : "application/json",
        success: function(data){
            console.log(data)
        }

    });
    var collapseid = '#collapse' + id
    var text = `<li class="list-group-item list-group-item-success">${notes}</li>`
    $(collapseid).append(text);


}

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




