<a href="#">
    <img src="<%= geek.get('avatar') ? geek.get('avatar').url : 'images/avatar-dark.png' %>"/>

    <h3><%= geek.escape('username') %></h3>

    <p><%= geek.escape('fullName') %></p>

    <p class="ui-li-aside"><%= userLocation.createdAt %></p>
</a>
