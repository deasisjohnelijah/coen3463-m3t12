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

  fetch('api/v1/Restaurant').then(function(res) {
    res.json().then(function(restaurants) {
      console.log('restaurants', restaurants);
      var tbody = document.getElementById('table-body');
      restaurants.forEach(function(restaurant) {
        tbody.insertAdjacentHTML('beforeend', '<tr> <td>  <input type="checkbox" id="' + restaurant._id + '" />  </td>  <td>  <a href="/restaurants/#' + restaurant._id + '">' + restaurant.name + '</a></td> <td> ' + restaurant.address + '</td> <td>' + restaurant.description + ' </td> <td> ' + restaurant.cuisine + '</td><td> ' + restaurant.maplink + '</td><td> ' + restaurant.contact + '</td><td> ' + restaurant.zomato + '</td><td> ' + restaurant.photo + '</td><td> ' + restaurant.photoslink + '</td></tr>');

      });
    })
  });

}