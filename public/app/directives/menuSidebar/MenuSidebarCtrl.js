(function() {
  angular.module('dashboard').controller('MenuSidebarCtrl', ['$scope', function($scope) {

    var vm = this;

    vm.menuItens = [
      {
        "icon": "dashboard",
        "label": "Dashboard",
        "href": "/",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "computer",
        "label": "UI Elements",
        "hasSubmenu": true,
        "submenu": [
          {
            "label": "Buttons",
            "href": "/buttons"
          },
          {
            "label": "Forms",
            "href": "/forms"
          },
          {
            "label": "Tables",
            "href": "/tables"
          },
          {
            "label": "Notifications",
            "href": "/notifications"
          }
        ]
      },
      {
        "icon": "chat_bubble_outline",
        "label": "Modals",
        "href": "/modals",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "pie_chart",
        "label": "Reports",
        "hasSubmenu": true,
        "submenu": [
          {
            "label": "Report #1",
            "href": "/report1"
          },
          {
            "label": "Report #2",
            "href": "/report2"
          }
        ]
      },
      {
        "icon": "web_asset",
        "label": "Pages",
        "hasSubmenu": true,
        "submenu": [
          {
            "label": "Login",
            "href": "/login"
          },
          {
            "label": "Blank",
            "href": "/blank"
          },
          {
            "label": "Forgot",
            "href": "/forgot"
          },
          {
            "label": "Register",
            "href": "/register"
          }
        ]
      }
    ];

  }]);
}());
