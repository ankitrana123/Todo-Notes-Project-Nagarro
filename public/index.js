$(document).ready(function(){
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    $('#duedate').val(output)

    var flag = false;

    $('a.list-group-item').click(function() { 
        var id1 = $(this).attr('id');
        const collapseid = '#collapse' + id1
        const collapseid2 = 'collapse' + id1

        flag = !flag
        
        $(collapseid).empty()
         $('.editTag').empty()

        //adding notes under each todo collapsed item
        var input = `<div class="input-group">
        <input type="text" class="form-control" id="task${id1}" placeholder="Enter Note to Create" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-primary note-create" id="${id1}" type="button" onclick="createNote(this.id)">Create</button>
            </div>
        </div>`
    $(collapseid).append(input)
       
    //append list item to collapse
        const urlNotes = '/api/todos/' + id1 + '/notes'
        
        
        $.getJSON(urlNotes, function(data) {
            data.forEach(element => {
                
                var text = `<li class="list-group-item list-group-item-success">${element.note}</li>`
    
                $(collapseid).append(text);
            })
        });

        const urlTask = '/api/todos/'+id1

        $.getJSON(urlTask, function (data) {
            console.log("requested")
            const url = '/api/todos/' + data.id
            var editContent = `
            <div class="collapse ${flag ? "show" : ""}" id="${collapseid2}">
                <h4 class="text-center">Edit "${data.title}" Task</h4>
                <form class="form-inline">
                    <div class="form-check my-1 mr-sm-2">
                        <label class="form-check-label" for="stateTask">Is Completed? </label>
                        <input type="checkbox" style="margin-left: 8px;" value="" name="state" id="stateTask" class="form-check-input">
                    </div>
                    <input type="hidden" name="id" id="idTask" value="${data.id}">
                    <div>
                        <input class="form-control" type="date" id="duedateTask" name="duedate" value=${data.duedate.substring(0, 10)}>
                    </div>
                    <select class="custom-select my-1 mr-sm-2" id="priorityTask" name="priority">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button type="button" class="btn btn-primary my-1" onclick="updateTask(${data.id})">Update</button>
                </form>
                <hr>
            </div>
            `

            $('.editTag').append(editContent);
            $('select').val(data.priority).attr("selected", "selected")
            if (data.status == 'complete') {
                //document.getElementById('stateTask').checked = true;
                $('#stateTask').prop('checked', true);
            }
        });

    
})

})

function updateTask(id) {
    console.log(id)

    var Duedate = document.getElementById("duedateTask").value;
    var Priority = document.getElementById("priorityTask").value;
    var State = "Incomplete";
    if (document.getElementById('stateTask').checked) {
        taskStatus = "Complete";
    }
    $.ajax({
        datatype: 'json',
        url: '/api/todos/' + id,
        type: 'patch',
        data: { status: State, duedate: Duedate, priority: Priority },
        success: function (data) {
            console.log("successfully edited Task ");
        }

    });
    //reloadComponent;
    location.reload(true);
}

function createNote(id){
    const taskid = "task"+id;
    var notes = document.getElementById(taskid).value;
    var item = {}
    item["note"] = notes;
    item["id"] = id;
    //console.log(item);
    const url = '/api/todos/' + id + '/notes'
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
            url: "/api/todos/",
            data: JSON.stringify(obj),
            dataType: "json",
            contentType : "application/json",
            success: function(data){
                console.log(data)
            }
            
        });
        location.reload(true);
    })



