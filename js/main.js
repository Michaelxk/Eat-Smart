
AOS.init();


//SCRIPT WELCOME SECTION (READ MORE BUTTON) //
let i = 0;
function readMore() {
  if(!i) {
    document.getElementById('more').style.display = "inline";
    document.getElementById('read').innerHTML = "Read Less";
    i=1; 
  } else{
    document.getElementById('more').style.display = "none";
    document.getElementById('read').innerHTML = "Read More";
    i=0; 
  }
};


////







function salmon(evt, recipe) {

	var i, tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}


	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}


	document.getElementById(recipe).style.display = "block";
	evt.currentTarget.className += " active";

}


////////// recipe recomendation ///////////

var $cell = $('.card__cell'),
    $body = $('body'),
    $prev = null,
    $current = null;

// Full width of container.
var $fullWidth = function(el) {
    var width = $('.container').width();
    el.css('width', width);
};

// Find distance from containers left side.
var $distFromLeft = function(el, target) {
    var $left,
        $pad = 15,
        $elPos = el.offset().left,
        $coPos = $('.card__cell').offset().left + $pad;

    $left = $coPos - $elPos;

    target.css('margin-left', $left);
};

// Set the height of an expanded element.
var getExpandHeight = function(current, height) {
    var currentOffset = current.offset().top;

    $($cell).each(function() {
        var thisOffset = $(this).offset().top;

        // Is the previous opend element is at the same level as the current.
        if (currentOffset === thisOffset) {
            $(this).find('.card--expand').css('height', height);
        }
    });
};

// Retrive the position relative to the document and return needed offset 
// for the current accordion.
var getOffset = function($prev, $current) {
    var currentOffset = $current.offset().top,
        padding = 30;

    if ($prev) {
        var prevOffset = $prev.offset().top;

        // Is the previous opend element above the current.
        if (prevOffset < currentOffset) {
            // Return the current offset ( minus the previous text height plus 
            // one 1px border, that is removed when accordion is not active).
            return currentOffset - ($prev.closest('.card__cell').outerHeight() - $prev.find('a').outerHeight());
        }
    }
    return currentOffset - padding;
};

// Set class if no card is expanded.
var $cardColor = function(elem) {
    $cell.removeClass('is-not-selected');
    if ($cell.filter($('.is-expanded')).length) {
        $cell.not(elem).addClass('is-not-selected');
    } else {
        $cell.removeClass('is-not-selected');
    }
};
$cardColor();

// Close card expanded.
var expandClose = function() {
    $cell.find('.expand__close').on('click', function() {
        var $thisCell = $(this).closest('.card__cell');
        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
        $cell.find('.card--expand').css('height', 0);
        $cardColor();
    });
};
expandClose();

// Bind click event.
$cell.find('.card--basic').on('click', function() {
    var $thisCell = $(this).closest('.card__cell');
    var $expanded = $(this).next('.card--expand');

    // Set card--expanded to fullwidth.
    $fullWidth($expanded);

    // Set distance from container left. 
    $distFromLeft($(this), $expanded);

    // This is where the magic happends. Control wether a card will have "is-collapsed"
    // or "is-expanded"
    if ($thisCell.hasClass('is-collapsed')) {
        $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed');
        $cell.not($thisCell).find('.card--expand').css('height', 0);
        $thisCell.removeClass('is-collapsed').addClass('is-expanded');

        var $expandHeight = $thisCell.find('.card--expand__container').outerHeight();
        $thisCell.find('.card--expand').css('height', $expandHeight);
        $cardColor($thisCell);
    } else {
        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
        $cell.find('.card--expand').css('height', 0);
        $cardColor();
    }

    // Set previous accordion to the current.
    $prev = $current;
    // Set new current accordion to this.
    $current = $(this);

    // When the clicked accordion is not active, get the offset, hide the
    // previous accordion, show this accordion and animate to the offset.
    var offset = getOffset($prev, $current);

    getExpandHeight($current, $expandHeight);

    // Scroll to top.
    $body.animate({
        scrollTop: offset
    });
});



/////////////////// recipe cards ///////


let lightImg = document.querySelector(".light-img");
let viewBtn = document.querySelectorAll(".view-btn");

viewBtn.forEach(el => {
  el.addEventListener("click", () => {
    document.body.classList.add("effect");
    let imgSrc = el.getAttribute("data-src");
    lightImg.src = imgSrc;
  });
});

window.addEventListener("click", event => {
  if(event.target.className == "box-wrapper" || event.target.className == "close-btn") {
    document.body.classList.remove("effect");
  }
})