



  // fetch('/api/v1/Restaurant/?sort=createdate').then(function(res) {
  //   res.json().then(function(restaurants) {
  //     console.log('restaurants', restaurants);
  //     var tbody = document.getElementById('table-body');
  //     restaurants.forEach(function(restaurant) {
  //       tbody.insertAdjacentHTML('beforeend', '<tr> <td><img src="'+ restaurant.photo + '" style="width:200px"></td> <td>  <a href="/restaurants/' + restaurant._id + '">' + restaurant.name + '</a></td> <td> ' + restaurant.address + '</td> <td>' + restaurant.cuisine + ' </td> <td><a href="'+ restaurant.zomato + '" target="_blank">' + restaurant.zomato + ' </td> </tr>');

  //     });
  //   })
  // });

  // fetch('api/v1/Restaurant/count').then(function(res) {
  //   res.json().then(function(restaurants) {
  //     console.log('restaurants', restaurants);
  //     var count = document.getElementById('count');
      
  //       count.insertAdjacentHTML('beforeend', '<strong>Total number of Restaurants:  '+restaurants.count+'<strong>');

      
  //   })
  // });

  // fetch('api/v1/Restaurant?query={"name":"~^('+restaurant.search+')"}').then(function(res) {
  //   res.json().then(function(restaurants) {
  //     console.log('restaurants', restaurants);
  //     var tbody = document.getElementById('table-body');
  //     restaurants.forEach(function(restaurant) {
  //       tbody.insertAdjacentHTML('beforeend', '<tr> <td><img src="'+ restaurant.photo + '" style="width:200px"></td> <td>  <a href="/restaurants/' + restaurant._id + '">' + restaurant.name + '</a></td> <td> ' + restaurant.address + '</td> <td>' + restaurant.cuisine + ' </td> <td><a href="'+ restaurant.zomato + '" target="_blank">' + restaurant.zomato + ' </td> </tr>');

  //     });
  //   })
  // });

 function getSearch() {
  localStorage.setItem("search", document.getElementById('search').value);
}

if (window.location.pathname === '/restaurants') {
  
  if (localStorage.getItem("search") === 'null' || localStorage.getItem("search") === null) {
      fetch('/api/v1/Restaurant/?sort=createdate').then(function(res) {
        res.json().then(function(restaurants) {
          console.log('restaurants', restaurants);
          var tbody = document.getElementById('table-body');
          restaurants.forEach(function(restaurant) {
            tbody.insertAdjacentHTML('beforeend', '<tr> <td><img src="'+ restaurant.photo + '" style="width:200px"></td> <td>  <a href="/restaurants/' + restaurant._id + '">' + restaurant.name + '</a></td> <td> ' + restaurant.address + '</td> <td>' + restaurant.cuisine + ' </td> <td><a href="'+ restaurant.zomato + '" target="_blank">' + restaurant.zomato + ' </td> </tr>');

          });
        })
      });

      fetch('/api/v1/Restaurant/count').then(function(res) {
        res.json().then(function(restaurants) {
          console.log('restaurants', restaurants);
          var count = document.getElementById('count');
          
            count.insertAdjacentHTML('beforeend', '<strong>Total number of Restaurants:  '+restaurants.count+'<strong>');
        })
      });
  }   

  else {

    fetch('/api/v1/Restaurant?query={"name":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
      res.json().then(function(result) {
        if (result.length === 0) {
          document.getElementById('findcount').innerHTML = " " + result.length +
        " restaurant found";
        }
        else if (result.length === 1) {
          document.getElementById('findcount').innerHTML = "There is " + result.length +
        " restaurant found";
        }
        else {
          document.getElementById('findcount').innerHTML = "There are " + result.length +
        " restaurants found";
        }

        var tbody = document.getElementById('table-body');
        result.forEach(function(result) {
         tbody.insertAdjacentHTML('beforeend', '<tr> <td><img src="'+ result.photo + '" style="width:200px"></td> <td>  <a href="/restaurants/' + result._id + '">' + result.name + '</a></td> <td> ' + result.address + '</td> <td>' + result.cuisine + ' </td> <td><a href="'+ result.zomato + '" target="_blank">' + result.zomato + ' </td> </tr>' );

        
  

        });

        localStorage.setItem("search", null);

      });

    });

  }

}