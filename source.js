$(document).ready(function() {
	var axisArray = new Array(),
	    radius = 250,
	    foods = $(".food"),
	    container = $("#container"),
	    width = container.width(),
	    height = container.height(),
	    angle = 0,
	    step = (2 * Math.PI) / foods.length;

	$("#1").addClass("newDim1");
	$("#textBox").addClass("textFade1");
	$("#infoBox").addClass("addTextFadeIn1");

	/* Place all food items in a circle*/
	$.each(foods, function(i) {
		var a = $(this).width(),
		    x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2),
		    y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);

		axisArray[i] = angle;
		$(this).css({
			left : x + 'px',
			top : y + 'px'
		});
		angle += step;

	});

	$(".food").click(function() {

		if (Number(this.id) != 1) {
			$(".food").removeClass("newDim1");
			$(".food").removeClass("newDim2");
			$(".food").removeClass("newDim3");
			$("#textBox").removeClass("textFade1");
			$("#textBox").removeClass("textFade2");
			$("#textBox").removeClass("textFade3");
			$("#infoBox").removeClass("addTextFadeIn1");
			$("#infoBox").removeClass("addTextFadeIn2");
			$("#infoBox").removeClass("addTextFadeIn3");

			clearTimeout(t);

			var arrLength = foods.length,
			    newArray = new Array(),
			    numberLength = Number(this.id - 1);

			for (var i = 0; i < arrLength; i++) {
				newArray[i] = foods[numberLength];

				if (numberLength < arrLength - 1) {
					numberLength++;
				} else {
					numberLength = 0;
				}
			}

			/* change array foods, so that clicked item is at index 0*/
			foods = newArray;
			var a = Number(this.id - 1),
			    loopLength = axisArray.length - a,
			    diffAngle = step / 20;

			$.each(foods, function(i) {
				/* reverse the rotation direction for items placed at the bottom part of the circle */
				if (loopLength > 3) {

					loopLength = axisArray.length - loopLength;
					diffAngle = diffAngle * (-1);
				}
				/* split angle to smaller points to have a smoother animation */
				var pointsX = [],
				    pointsY = [],
				    pointsTot = [];
				for (var j = 1; j <= loopLength * 20; j++) {

					var xNew = Math.round(width / 2 + radius * Math.cos(axisArray[a] + diffAngle * j) - $(this).width() / 2),
					    yNew = Math.round(height / 2 + radius * Math.sin(axisArray[a] + diffAngle * j) - $(this).height() / 2);
					pointsX[j] = xNew;
					pointsY[j] = yNew;
					pointsTot[j - 1] = [xNew, yNew];
				}

				$(this).animate({
					crSpline : $.crSpline.buildSequence(pointsTot)
				}, {
					duration : 400 * loopLength,
					easing : "easeOutSine"
				});

				a++;
				if (a > 6) {
					a = 0;
				}
				this.id = i + 1;

			});

			var textInfo = [{
				text : "Grains",
				image : '\\images/grains.jpg',
				source : "Plant seeds",
				benefit : "Rich in carbohydrates"
			}, {
				text : "Fruits",
				image : '\\images/images.jpg',
				source : "Plant flowers",
				benefit : "Rich in vitamins"
			}, {
				text : "Vegetables",
				image : '\\images/vegetables.jpg',
				source : "Plants",
				benefit : "Rich in fibre"
			}, {
				text : "Milk",
				image : '\\images/milk.jpg',
				source : "Animals",
				benefit : "Rich in calcium"
			}, {
				text : "Nuts",
				image : '\\images/nuts.jpg',
				source : "Plant seeds",
				benefit : "Rich in vitamin E"
			}, {
				text : "Poultry",
				image : '\\images/poultry.jpg',
				source : "Animals",
				benefit : "Rich in proteins"
			}, {
				text : "Pulses",
				image : '\\images/pulses.jpg',
				source : "Plant seeds",
				benefit : "Rich in proteins"
			}];

			var t = setTimeout(function() {
				$("#1").addClass("newDim" + loopLength);
				$("#textBox").addClass("textFade" + loopLength);
				$("#infoBox").addClass("addTextFadeIn" + loopLength);
				$.each(textInfo, function(x) {
					if (divText == textInfo[x].text) {
						addText = "<strong> Source: </strong> <span>" + textInfo[x].source + "</span></br><strong> Benefit: </strong><span>" + textInfo[x].benefit + "</span>";
						$("#infoBox").html(addText);
						$("#textBox").html(textInfo[x].text);

					}
				});
			}, 60);

			/* change background image based on the item clicked*/
			var divText = ($(this).html()).trim(),
			    addText = "";
			$.each(textInfo, function(x) {
				if (divText == textInfo[x].text) {
					$("#imgContainer").css({
						"background-image" : "url(" + textInfo[x].image + ")",
						"background-size" : "500px 500px",
						"background-repeat" : "no-repeat",
						"opacity" : ".5"

					});
				}
			});

		}
	});

});
