(function(){

const btnLogout=document.getElementById('btnLogOut');

//add logout click event
btnLogOut.addEventListener('click',e=>{
    
    //get email end password
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
     window.location = 'SignUp.html'; 
    }, function(e) {
        // An error happened.
        console.log(e.message);
     });
});

$('#ckbxShowRegion').click(function(){
    if($(this).is(':checked')){
    	plotRegions();
    } else {
    	unplotRegions();
    }
 });

}());

var map;
var regions;
var plottedRegions=[];

function initMap() 
{
var pos;
var infoWindow = new google.maps.InfoWindow({map: map});
if (navigator.geolocation) 
   {
        navigator.geolocation.getCurrentPosition(function(position) {
            
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

        map = new google.maps.Map(document.getElementById('map'), 
                   {
                      zoom: 11,
                      center: pos,
                      styles:[{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
                   });

        var marker = new google.maps.Marker({
               position: pos,
               map: map
           });
           getRegions();
        });
    }
}


function getRegions()
{
    var counter=0;
    var database=firebase.database();
    var ref=database.ref('regions');
    ref.on('value',gotData,errData);

    function gotData(data)
    {
        regions=data.val();  
        plotRegions(); 
    }

    function errData(err){
    console.log('Error!');
    console.log(err);
  }
}

 function plotRegions()
{
  plottedRegions=[];
    $.each(regions, function(index, element) {
        plottedRegions.push(new google.maps.Polygon({
            paths: element,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
            }));
    $.each(plottedRegions, function(index, element) {
            element.setMap(map);
    });

        
    });
}

 function unplotRegions()
{
  $.each(plottedRegions, function(index, element) {
        element.setMap(null);
    });
}