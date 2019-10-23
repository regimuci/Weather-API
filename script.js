var key  = 'a3f6e2ae7bb5f17e77bb6ee99f6c4a0a';
var interval = null;

$(document).ready(function(){
    $("#getWeather").click(function(){
        clearInterval(interval);
        $("#switch").prop("checked",false);
        request();
    });

    $("#switch").click(function () {
        if(document.getElementById("switch").checked ){
            interval = setInterval(request,600000);
        }
        else {
            clearInterval(interval);
        }
    })
});

function request() {
    var city = $("#city").val();
    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather',
        dataType:'json',
        type:'GET',
        data:{q:city, appid: key, units: 'metric'},
        success: function(data){
            getInfo(data);
        },
        error: function () {
            clearInterval(interval);
            $("#switch").prop("checked",false);
            var errorMessage = '<p style="color: blue"><b>No weather information for <i style="color: black">' + city + '</i></b></p>';
            $("#showWeather").html(errorMessage);
        }
    })
}

function getInfo(data){
    console.log("success");
    var succesDetails = '<p><b>' + data.name + "</b><img src=images/"+ data.weather[0].icon + ".png></p>"+ data.main.temp + '&deg;C ' +
        ' | ' + data.weather[0].main + ", " + data.weather[0].description;
    $("#showWeather").html(succesDetails);
}

// function getInfo(data){
//     var localStorageKey = JSON.stringify(data.id);
//     if(localStorage.getItem(localStorageKey)){
//         $("#showWeather").html(localStorage.getItem(localStorageKey));
//     }
//     else{
//         var succesDetails = '<p><b>' + data.name + "</b><img src="+ data.weather[0].icon + ".png></p>"+ data.main.temp + '&deg;C ' +
//             ' | ' + data.weather[0].main + ", " + data.weather[0].description;
//         localStorage.setItem(localStorageKey,succesDetails);
//         $("#showWeather").html(succesDetails);
//     }
// }

