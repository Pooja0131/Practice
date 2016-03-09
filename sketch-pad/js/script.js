$(document).ready(function() {
  var eventCheck;
  var eventT;

  // https://bgrins.github.io/spectrum/
  $("#custom").spectrum({
    color: "#f00",
    showButtons: false,
    change: function(color) {
      pickedcolor = color.toHexString();
    }
  });
  // Show the custom color box only when random color checkbox is deselected
  $("#color-box").hide();

  //First time page load will display this grid conatiner
  for (var i = 0; i < 1024; i++) {
    $(".grid-container").append('<div class="square-div border" id="square-div"></div>');
  }

  //Event delegations
  $(".sp-hue").on("click", changeColor);
  $(".sp-val").on("click", changeColor);
  $("#grid-size-input").on("keyup", createCanvas);
  $("#clear-btn").on("click", clearCanvas);
  $(".square-div").on("mouseenter", colorCanvas);
  $("#grid-border").on("click", gridBorderHideShow);
  $("#hover").on("click", setColor);
  $("#random-color").on("click", setColor);
  $("#trail").on("click", trail);
});

// check if the picked color is too dark, then change the "pick color" text to white and vise versa.
function changeColor() {
  if ($("#random-color").prop("checked") === false) {
    var rgb = $('#custom').spectrum('get').toRgb();
    var luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b; // per ITU-R BT.709
    if (luma < 40) { //if background-color is too black, change the text color to white
      $("#pick-color-tab").css("color", "white");
    } else {
      $("#pick-color-tab").css("color", "black");
    }
    var color = $('#custom').spectrum('get').toHexString();
    $("#pick-color-tab").css("background-color", color);
  }
}

//Update canvas grid size
function createCanvas() {
  var gridSize = $("#grid-size-input").val();
  var divString = "";
  var squareSize = 512 / gridSize;
  $(".grid-container").empty();
  for (var i = 0; i < gridSize; i++) {
    divString += "<div class='square-div border' id='square-div'></div>";
  }
  for (i = 0; i < gridSize; i++) {
    $(".grid-container").append(divString);
  }
  //Update squares height and width
  $(".square-div").css({
    "width": squareSize,
    "height": squareSize
  });
  setColor();
}

//Clear the canvas
function clearCanvas() {
  $(".square-div").css("background-color", "rgba(255,255,255,.7)");
}

//Color canvas with random colors(default setting when app is loaded)
function colorCanvas() {
  pickedcolor = pickedcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  $(this).css("background", pickedcolor);
}

//Show or hide the grid border
function gridBorderHideShow() {
  if ($("#grid-border").prop("checked") === false) {
    $(".square-div").toggleClass("border noBorder");
  } else {
    $(".square-div").toggleClass("noBorder border");
  }
}

//Currently not included in the app(to include uncomment the continous line checkbox in html, its not working properly)
//Returns the event type (click or hover)
function drawTypeChange() {
  $(".square-div").off("mouseenter", colorCanvas);
  if ($("#hover").prop("checked") === false) {
    eventCheck = "click";
  } else {
    eventCheck = "mouseenter";
  }
  return eventCheck;
}

//Sets the pen color to either random or custom color from custom color box
//
function setColor() {
  $(".square-div").off("click", colorCanvas);
  eventT = drawTypeChange();
  if ($("#random-color").prop("checked") === true) {
    $("#color-box").hide();
    $(".square-div").on(eventT, function() {
      pickedcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      $(this).css("background", pickedcolor);
    });
  } else {
    $("#color-box").show();
    $("#pick-color-tab").css("background-color", $('#custom').spectrum('get').toHexString());
    $(".square-div").on(eventT, function() {
      pickedcolor = $('#custom').spectrum('get').toHexString();
      $("#pick-color-tab").css("background-color", pickedcolor);
      $(this).css("background", pickedcolor);
    });
  }
}

//Set the pen pointer to trail type
function trail() {
  if ($("#trail").prop("checked") === true) {
    $(".square-div").hover(function() {
      $(this).css("opacity", 0);
    }, function() {
      $(this).fadeTo('fast', 1);
    });
  } else {
    $(".square-div").hover(function() {
      $(this).css("opacity", 1);
    });
  }
}
