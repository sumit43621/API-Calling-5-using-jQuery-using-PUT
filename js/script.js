var bookid = ''

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var myurlobj = {
    url : 'https://fakerestapi.azurewebsites.net',
    type : 'GET',
}

document.querySelector('.s_getdata').addEventListener('click',function(){
    // alert('okok')
    // swal("Good job!", "You clicked the button!", "success");
    // toastr.success("Are you the 6 fingered man?")
    $.ajax({
        ...myurlobj,
        url:myurlobj.url + '/api/v1/Books',
        beforeSend:function(){

        },
        success:function(result,status,xhr){
            console.log(result);
            var tr = ``;
            result.forEach(element => {
                console.log(element);
                tr += `<tr>
                            <td>`+ element.id +`</td>
                            <td>`+ element.title +`</td>
                            <td>`+ element.description +`</td>
                            <td>`+ element.excerpt +`</td>
                            <td>`+ element.pageCount +`</td>
                            <td>`+ element.publishDate +`</td>
                            <td>
                                <button class="btn btn-sm btn-success s_viewbtn" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>
                                <button class="btn btn-sm btn-info s_editbtn" data-bs-toggle="modal" data-bs-target="#exampleModal2">Edit</button>
                                <button class="btn btn-sm btn-danger s_delbtn">Delete</button>
                            </td>
                        </tr>`
            });
            document.querySelector('table > tbody').innerHTML = tr;
        },
        error:function(){

        },
        complete:function(){

        },
    })
})

document.addEventListener('click',function(e){
    if(e.target.classList.contains('s_editbtn')){
        bookid = e.target.closest('tr').querySelector('td:first-child').innerHTML;
        let title = e.target.closest('tr').querySelector('td:nth-child(2)').innerHTML;
        let description = e.target.closest('tr').querySelector('td:nth-child(3)').innerHTML;
        let excerpt = e.target.closest('tr').querySelector('td:nth-child(4)').innerHTML;
        let pageCount = e.target.closest('tr').querySelector('td:nth-child(5)').innerHTML;

        document.querySelector('.s_title').value = title;
        document.querySelector('.s_description').value = description;
        document.querySelector('.s_excerpt').value = excerpt;
        document.querySelector('.s_pageCount').value = pageCount;
    }

})

document.querySelector('.s_update').addEventListener('click',function(e){
    // alert('okkk')
    e.preventDefault();
    let title = document.querySelector('.s_title').value ;
    let description = document.querySelector('.s_description').value ;
    let excerpt = document.querySelector('.s_excerpt').value ;
    let pageCount = document.querySelector('.s_pageCount').value ;

    var mydata = {
            "id": bookid,
            "title": title,
            "description": description,
            "pageCount": pageCount,
            "excerpt": excerpt,
            "publishDate": "2024-06-07T10:39:47.316Z"
        }

    $.ajax({
        ...myurlobj,
        url:myurlobj.url + '/api/v1/Books/' + bookid,
        type: "PUT",
        data: JSON.stringify(mydata),
        dataType: "json",
        contentType: "application/json",
        success:function(result,status,xhr){
            swal("Good job!", "Book information Updated Successfully", "success")
        }
    })
})