$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/restaurants/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});



if (window.location.pathname === '/restaurants') {

  fetch('/api/v1/Restaurant/?sort=createdate').then(function(res) {
    res.json().then(function(restaurants) {
      console.log('restaurants', restaurants);
      var tbody = document.getElementById('table-body');
      restaurants.forEach(function(restaurant) {
        tbody.insertAdjacentHTML('beforeend', '<tr> <td><img src="'+ restaurant.photo + '" style="width:200px"></td> <td>  <a href="/restaurants/' + restaurant._id + '">' + restaurant.name + '</a></td> <td> ' + restaurant.address + '</td> <td>' + restaurant.cuisine + ' </td> <td><a href="'+ restaurant.zomato + '" target="_blank">' + restaurant.zomato + ' </td> </tr>');

      });
    })
  });

  fetch('api/v1/Restaurant/count').then(function(res) {
    res.json().then(function(restaurants) {
      console.log('restaurants', restaurants);
      var count = document.getElementById('count');
      
        count.insertAdjacentHTML('beforeend', '<strong>Total number of Restaurants:  '+restaurants.count+'<strong>');

      
    })
  });

  fetch('api/v1/Restaurant?sort=createdate').then(function(res) {
    res.json().then(function(restaurants) {
      console.log('restaurants', restaurants);
      

      
    })
  });

}