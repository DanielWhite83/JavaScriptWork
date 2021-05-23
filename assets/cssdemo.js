// constants

// resize constants
const MIDDLE_WIDTH = 30;
const MIN_WIDTH = 0;

// color themes
const BASE_THEME = {
    red: "#ef476f",
    blue: "#118ab2",
    primary: "#073b4c",
    secondary: "#ffd166",
    background: "#dddddd",
    text: "#1F1F1F",
    gray: "#353535",
}

const DARK_THEME = {
    red: "#e43f5a",
    blue: "#1f4068",
    primary: "#1b1b2f",
    secondary: "#162447",
    background: "#000000",
    text: "#e6e6e6",
    gray: "#5a5a56"
}

const MONO_THEME = {
    red: "#52b788",
    blue: "#95d5b2",
    primary: "#1b4332",
    secondary: "#b7e4c7",
    background: "#74c69d",
    text: "#081c15",
    gray: "#40916c"
}

const SOFT_THEME = {
    red: "#f28482",
    blue: "#84a59d",
    primary: "#f5cac3",
    secondary: "#f6bd60",
    background: "#f7ede2",
    text: "#3c6e71",
    gray: "#353535"
}


// runs after page loads
$(function(){
  // activate the resizing functionality
  activateResize();

});


// activates the ability to resize the windows
function activateResize(){
  $("#dragbar").css("width",MIDDLE_WIDTH + "px");

  // when clicked down on the dragbar
  $('#dragbar').on('mousedown', function(event){
      
      // while the mouse is held down resize the right panel based the mouse location
      $(document).on('mousemove', function(e){

        // cover the iframe with a clear div while dragging. The iframe interferes with the ability to drag.
        $("#iframecover").css("z-index",100);
        
        // the width of the right panel is the document width minus the mouse location
        // half of the middle panel's width should be subtracted as well
        start_right_width = $("#right_div").width();
        right_width = parseInt($(document).width() - e.pageX - MIDDLE_WIDTH/2);
        left_width = $("#left_div").width();
        
        if (left_width >= MIN_WIDTH || right_width < start_right_width){
            $("#right_div").css('width',right_width+'px');
        }
        
      });
  });

  // remove the mousemove listener when the mouse is up
  $(document).on('mouseup', function(event){
      $(document).off('mousemove');
      $("#iframecover").css("z-index",-100);
  });
}



// activates when the radio button is clicked
function clickTheme(theme){
  if (theme == "base"){
      setTheme(BASE_THEME);
  }
  else if (theme == "dark"){
      setTheme(DARK_THEME);
  }
  else if (theme == "mono"){
      setTheme(MONO_THEME);
  }
  else if (theme == "soft"){
      setTheme(SOFT_THEME);
  }
    //helper function sets the theme.
    function setTheme(theme){
      // iterate through the theme by keys
      for (var key in theme) {
          // set the color for that key
          if (theme.hasOwnProperty(key)) {           
              $(":root").css("--"+key, theme[key]);

              // this is to change the css within the iframe as well.
              $("#iframe").contents().find(":root").css("--"+key, theme[key]);

          }
      }
    }

}


