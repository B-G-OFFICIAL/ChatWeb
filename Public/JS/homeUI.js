document.addEventListener('DOMContentLoaded', () => {



  // setting popup show and hide code start
  var settingdot = document.getElementById('settingdot');
  var settingpopup = document.getElementById('settingpopup');
  settingdot.addEventListener('click', () => {
      if (settingpopup.style.display === 'none') {
          settingpopup.style.display = 'block';
      } else {
          settingpopup.style.display = 'none';
      }
  })
  // setting popup show and hide code end
  
  // checkbox show and hide code start
  var selectmsgiconDiv = document.getElementById('selectmsgicon');
  var checkboxes = document.getElementsByClassName('msg-checkbox');

  selectmsgiconDiv.addEventListener('click', () => {
    for (var i = 0; i < checkboxes.length; i++) {
      var checkBox = checkboxes[i];
      var computedCheckBoxStyle = window.getComputedStyle(checkBox);
      if(computedCheckBoxStyle.display === 'none'){
        checkBox.style.display = 'block';
        settingpopup.style.display = 'none';
      }
      else{
        checkBox.style.display = 'none';
        settingpopup.style.display = 'none';
      }
    }
  });
  // checkbox show and hide code end
  
  // main part of chat on all page click hide setting box code start
  var chatmainpart = document.getElementById('chatmainpart');
  chatmainpart.addEventListener('click', () => {
      settingpopup.style.display = 'none';
  })
  // main part of chat on all page click hide setting box code end

});