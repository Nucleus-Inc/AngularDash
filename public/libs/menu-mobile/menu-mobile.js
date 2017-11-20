jQuery(document).ready(function($) {
  screenMenuMobile();
});

jQuery(window).resize(function() {
  screenMenuMobile();
});

function screenMenuMobile() {
  /*var $screen = jQuery(window).width();

  if ($screen <= 767) {
    jQuery('.sidebar-submenu .sidebar-menu-button').click(function() {
      //.sidebar.sidebar-visible
      if (jQuery('.breakpoint-320 .sidebar').hasClass('sidebar-visible')) {
        jQuery('.breakpoint-320 .sidebar').removeClass('sidebar-visible');
      }
    });

    jQuery('.sidebar-menu-item').click(function() {
      //.sidebar.sidebar-visible

      var $this = jQuery(this);
      if ($this.parent('.sidebar-submenu')) {

        if ($this.children().length == 1) {
          if (jQuery('.breakpoint-320 .sidebar').hasClass('sidebar-visible')) {
            jQuery('.breakpoint-320 .sidebar').removeClass('sidebar-visible');
          }
        }

      }
    });
  } else {

  }
  */
}
