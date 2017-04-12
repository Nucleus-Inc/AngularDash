// Vendor libraries
// jQuery
window.$ = window.jQuery = require('jquery')

// Tether (required by Bootstrap 4)
window.Tether = require('tether')

// Bootstrap 4
require('bootstrap')

// Simplebar
require('simplebar/dist/simplebar.min')

// Bootstrap Layout
require('bootstrap-layout')

// Bootstrap Layout Scrollable
require('bootstrap-layout-scrollable')

// Anchor.js
var AnchorJS = require('anchor-js');

var anchorsAlways = new AnchorJS({ visible: 'always' })
anchorsAlways.add('.layout-content h2')

var anchorsHover = new AnchorJS({ visible: 'hover' })
anchorsHover.add('.layout-content h3')

// show active tab on reload
if (location.hash !== '') {
	$('[data-toggle="pill"][href="' + location.hash + '"]').tab('show')
}

// remember the hash in the URL without jumping
$('[data-toggle="pill"]').on('shown.bs.tab', function (e) {
	var hash = $(e.target).attr('href')
	if (history.pushState) {
		return history.pushState(null, null, hash)
	}
	location.hash = hash
})