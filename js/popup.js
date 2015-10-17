$("#slider").roundSlider({
  value: 50,
  radius: 43,
  width: 6,
  handleSize: "10,8",
  handleShape: "square",
  sliderType: "min-range",
  mouseScrollAction: true,
  editableTooltip: false,
  tooltipFormat: "changeTooltip"
});

var btn = $('#active').famultibutton({
	classes: ['fa-4x'],
	icon: 'fa-bolt',
  onColor: '#000',
  offColor: '#ffffff',
  onBackgroundColor: '#3498DB',
  offBackgroundColor: '#bbb',
  mode: 'toggle',
  toggleOn: function() {
    chrome.storage.sync.set({'active': true});
  },
  toggleOff: function() {
    chrome.storage.sync.set({'active': false});
  }
});

$("#save").click(function() {
  var sWhitelist = $("#whitelist").val();
  sWhitelist = sWhitelist.replace(/ /g, '').split(',');

  if (sWhitelist === undefined) {
    sWhitelist = [];
  }
  chrome.storage.sync.set({'whitelist': sWhitelist});
});

chrome.storage.sync.get(['active', 'whitelist'], function(data) {
  if (data.active) {
    btn.setOn();
  } else {
    btn.setOff();
  }

  if (data.whitelist) {
    $("#whitelist").val(data.whitelist.join(", "));  
  }
});
