function listing(sortId) {
    $('.myclass').empty()
    console.log(sortId)
    $.getJSON('http://localhost:2223/api/todos', function (data) {
        if (sortId == 1) {
            data.sort(function (a, b) {
                return new Date(b.duedate) - new Date(a.duedate);
            });
        } else if (sortId == 2) {
            data.sort(function (a, b) {
                return new Date(a.duedate) - new Date(b.duedate);
            });
        } else if (sortId == 3) {
            var sortOrder = ['High', 'Medium', 'Low'];   
            data.sort(
                function (a, b) {                              // Pass a function to the sort that takes 2 elements to compare
                    if (a.priority == b.priority) {                    // If the elements both have the same `type`,
                        return a.Title.localeCompare(b.title); 
                    } else {                                   
                        return sortOrder.indexOf(a.priority) - sortOrder.indexOf(b.priority); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
                    }
                }
            );
        } else if (sortId == 4) {
            var sortOrder = ['incomplete', 'complete'];   // Declare a array that defines the order of the elements to be sorted.
            data.sort(
                function (a, b) {                              // Pass a function to the sort that takes 2 elements to compare
                    if (a.status == b.status) {                    // If the elements both have the same `type`,
                        return a.title.localeCompare(b.title); // Compare the elements by `name`.
                    } else {                                   // Otherwise,
                        return sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
                    }
                }
            );
        }


        console.log(data)
        data.forEach(element => {
            var text = `
            <a href="#collapse${element.Id}" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapse${element.Id}" 
                class="list-group-item list-group-item-action flex-column align-items-start" id="${element.Id}">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${element.title}</h5>
                    <small>Priority: ${element.priority}</small>
                </div>
                <p class="mb-1">${element.description}</p>
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="">State: ${element.status}</h6>
                    <small>Due Date: ${element.duedate.substring(0, 10)}</small>
                </div>
            </a>
            <div class="collapse" id="collapse${element.id}">
                
            </div>
            `
            $(".myclass").append(text);
        });
    })
} 