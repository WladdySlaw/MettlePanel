//Create var for object layout
var layouts = {
  "items": [

  ]
};
//Function for remove Layer
function removeLayer(){
    $('.layerRemove').on("click", function(){
        var index = $(this).parent().parent().parent().attr('id'); //Take index
        delete layouts.items[index]; //Delete layout in object
        $('.layerList #' + index).remove(); //Delete layout in page
    });
}
//Function for toggle settings of layout
$(document).on("click", '.layerProperties' ,function(){
    $(this).parent().parent().parent().children(".layerChangeForm").slideToggle('mid');
});
//Function with setTimeOut for addShadow
$(document).on("click", '.addShadow', function(){
    var element = $(this).parent().children(".dropChoose");
    element.addClass("active");
    setTimeout(function(){
        element.removeClass("active");
    }, 2000);
});
//Change name in real time
$(document).on("keyup", '.renameInput', function(){
    var newName = $(this).val();
    $(this).parent().parent().parent().children(".layerElement").children(".layerName").text(newName);
    var indexChange = $(this).parent().parent().parent().attr('id'); //take index
    layouts.items[indexChange].name = newName; //change name in object
});
//Switch for active layout
$(document).on("click", '.layerList li .layerElement', function(){
    $('.layerList li .layerElement').removeClass("active");
    $(this).addClass("active");
    var indexActive = $(this).parent().attr('id');
    layouts.items[indexActive].active = "active";
});
//Send response
$(document).on("click", '#sendComment', function(){
   alert("Thank you for comment!");
});
//Create var to track index
var listCount = -1;
//Function for add new layout
$('.layerAdd .send').on("click", function(){
    var nameValue = $('.layerAdd .text').val();
    $('.layerAdd .text').val(''); //Remove value in input
    var layoutCount = layouts.items.length;
    listCount = listCount+1; //index++/id++
    layouts.items.push({name: nameValue, visible: false, "active": "", liCount: listCount}); //push object
    $.each(layouts,function(key,data) { //append new layout in cycle
        $.each(data, function(index,value) {
            if (index == layoutCount){ //look for last object
                $('.layerList').append('<li id="'+ value['liCount'] +'"><div class="layerElement '+ value['active']+ '"><span class="layerName">'+value['name']+'</span><div class="layerChange"><a class="layerProperties"></a><a class="layerRemove"></a></div></div><form class="layerChangeForm"><div class="rename"><p>Rename to:</p><input type="text" class="renameInput" value="'+ value['name'] +'"></div><div class="visability"><p>Visability:</p><input type="checkbox"></div><div class="commentLayout"><input type="text" placeholder="Comment layout..."><a id="sendComment">send</a></div><div class="addShadow"><p>Add shadow: </p><a class="arrowDrop"></a></div><div class="dropChoose"><a class="blackColor">Shadow Added</a></div></form></li>');
            }
        });
    });
    removeLayer();
});
