
      var map;
      var i=0;
      var markers=[];
      var infoWindow;
        var losAngeles={
          lat:34.063380,
          lng:-118.358080
        }
         var directionsService;
         var directionsRenderer;
     function initMap(){
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        map=new google.maps.Map(document.getElementById('map'),{
          center:losAngeles,
          zoom:4
        });
        
        directionsRenderer.setMap(map)
        infoWindow=new google.maps.InfoWindow();
        
        searchStores();
  
      }
   
  function displayStore(stores){
    var storeH="";
    stores.forEach(function(store,index){
      const add=store.addressLines;
      const phone=store.phoneNumber;
      storeH+=`
           <div class="store-con">
              <div class="store-info">
                   <div class="store-address">
                    <span>${add[0]}</span>
                    ${add[1]}
                   </div>
                    <div class="mob">${phone}<i class="fas fa-phone" id="b" style="color:#000;"></i>
                    </div>
              </div>
              <div class="store-number-con">
                <div class="store-number">
                  ${index+1}
                </div>
              </div>
            </div>
      `
    });
    document.querySelector('.store-list').innerHTML=storeH;
  }
  
  function showStoreM(stores){
    var bounds=new google.maps.LatLngBounds();
    stores.forEach(function(store,index){
      var latlng=new google.maps.LatLng(
        store.coordinates.latitude,
        store.coordinates.longitude);
      var name=store.name;
      var statust=store.openStatusText;
      var address=store.addressLines[0];
      var num=store.phoneNumber;
      var laty=store.coordinates.latitude;
      var lngy=store.coordinates.longitude;
      bounds.extend(latlng);
      createM(latlng,name,address,num,laty,lngy,statust,index);
    });
    map.fitBounds(bounds);
  }
  
  
  
  
  function createM(latlng,name,address,num,laty,lngy,statust,index){
    var html=`
    <div class="marker-con">
    <div class="marker-name">
  <b>${name}</b><br>
  ${statust}<br>
  </div> <hr>
  <div class="option">
  <span id="e" onclick="direction()"><i class="fas fa-directions" id="d"></i>${address}</span><br>
  <i class="fas fa-phone-alt" id="c"></i><span>${num}</span>
  <div class="hide-direction>
  <span id="ll" style="position: absolute;
  visibility:hidden;font-size:3px;">
  ${laty}</span>
  <span id="ll1" style="position:absolute;
  visibility:hidden;font-size:3px;">
  ${lngy}</span>
  </div>
  </div>
</div>

    `
    var marker=new google.maps.Marker({
      map:map,
      position:latlng,
      
      icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAPfSURBVFiFtZZdbBRVFMd/d2ZnZ3e2bWi7LdJSqBKbQipiSUANkBYNSmIoMeGBVZMGEx99MIbUj4fGGI0aXkz1RWNixCaKRqSAUUx3bWK0D2ikJtgi0JZSW1taSnfLbnd2rw+ky3RnZ9jd4v/tnnPu+f/mzMcdQQGSLQcbUZT9SB4HaoG6030TAd2rLuqaiBo+td/vVbo2jZ08nW9PkZfx7tA2pHgHaMnO9YT/sdWXlWjzwTJvR9N4z4crApB79+rEKz8AecipNhfAkqoqfH8FK+T2+//+7oZTjeJovue5auIVvSCfvxOok6Zm4o3jk+krg/V7GgsCkC3tPpLpE8CjxRhbNTefLLv6rzg72HAwmDcAwvwY2L5S8yVFF5LGtanr/XkByNbQEyCfuVvmS5qeTdx3rmbfYVcA2dmpgHgruyj51C6iX7xH7OjbpDY3FA9xPd4Zbun0OALw0+BOoNm2M5lCxBNIv46586GiAaILpr9q6OwL1phneYnaBtK2Ufv+Zzy//kHskzcwH9lCan1NJret1LDV3xwaZ2CfbZAALCym2oHM92E5gJBP5vC/lZqLokxMk74niNxQZ4nP2WqNTXW22JLmY+Zm63r5LZDUO+4ElKERt3RGc+E/HXPxhKnnBJA7QuWA362xmgeAQHDxlaOO+VQaBja0ZUZ0ewIer55zR4EAsd8vk5y23xartIQstwMwPE2uJ9AiZWQcFpOOeQFceu1zV3MB6J4bQzYAEYmYwFXX3WYKddB5ConhKWLnr7i20HXFvHc4El9aZ72G9AEhtwa+rm7MLY0gbp1PYyWVAMjFJKPvHnc1BygxtFESt9dZb4G844+E9HoxdzSjDg2jnfmFCy9+xGxkAKXUT/Ka46mbkaErp6zr5QBVyWPAhCtAqUG6vgZZFsjEfOuCGBvXIrTsgS6X7lXTWqXxqjVmO+dl67MvgTzi2skitx+SbNWuNr7ZOnnyaWvMfhzLsfeB3/LumqdKDM/NCn/U9nzZAEQkYqLKA8Dk3TLXNDW9ZrWx3/r0OwIAiB+7L4HSBsys1NzrEbJujf/QxsvHf8iVd/wnFOHP+knJhxGcL9Y84Pck1tb6HmsaPfGpU40jAIDo675AWmtG8joQy9fYowpZU+0/s65WrW4aORV29ci3qWxpX4VIhoAOIHOYWN8Cn66kguX6MS3gOfzAxW/dP4mFAmRAdocOIMWXuQDW1wSOPDje83Ih/VxvQU71dn8F4lx2OOD3JGYatnYU2q5gAAESkX4zOx4s17taI53m/w4A2KZQ7NUXDZA9hWKvvmgAAHY1fA2yd1WpNlvs1QP8B4+1Q88sDikGAAAAAElFTkSuQmCC'
       });
      google.maps.event.addListener(marker,'click',function(){
      infoWindow.setContent(html);
      infoWindow.open(map,marker);
    });
    markers.push(marker);
  }
  
  
  
  
      

      function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        directionsService.route(
            {
              origin: {lat:parseInt(document.querySelector('#ll').innerHTML),
                lng:parseInt(document.querySelector('#ll1').innerHTML)
              },
              destination:{lat:34.0522,lng:-118},
              travelMode: 'DRIVING'
            },
            function(response, status) {
              if (status === 'OK') {
                directionsRenderer.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
      }
      
  function direction(){
    console.log('hey');
        calculateAndDisplayRoute(directionsService, directionsRenderer);
       
  }
  
  
  
  
  
  window.onload=function(){
  var h=window.innerWidth;
    var l=document.querySelector('.close');
  if(h>360){
    l.style.visibility='hidden';
  }else{
    l.style.visibility='visible';
  }
  }
  
  function setOnclickListener(stores){
    var storeElements=document.querySelectorAll('.store-con');
    storeElements.forEach(function (elem,index){
      elem.addEventListener('click',function(){
        google.maps.event.trigger(markers[index],'click')
      });
    });
  }
  
  function searchStores(){
    var foundStores=[];
    var zipcode=document.getElementById('input').value;
    if(zipcode){
    stores.forEach(function(store){
      var postalCode=store.address.postalCode.substring(0,5);
      if(zipcode==postalCode){
        foundStores.push(store);
      }
    });
    }
    else{
      foundStores=stores;
    }
    clearMarker();
    displayStore(foundStores);
    showStoreM(foundStores);
    setOnclickListener(foundStores);
  }
  
  function clearMarker(){
    infoWindow.close();
    for(i=0;i<markers.length;i++){
      markers[i].setMap(null)
    }
    markers.length=0;
  }
  
  function go(){
    const k=document.querySelector('.search-box')
    const l=document.querySelector('.close')
    const m=document.querySelector('.dis')
    
    if(i==0){
    k.style.visibility='hidden';
    l.className='dis';
    l.innerHTML=` <i class="fas fa-search" id="a" style="color:#fff"></i>`
    i=1;
    }
    else{
      k.style.visibility='visible';
      m.className='close';
      m.innerHTML=` <i class="fas fa-times-circle"></i> `
      i=0;
    }
  }
  