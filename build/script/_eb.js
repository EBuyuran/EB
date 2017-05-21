
"use strict";

var screenSm, screenMd, screenLg;

screenSm = 768;
screenMd = 900;
screenLg = 1200;



var EB = {

	init: function() {

		EB.Background.Gradient();
		EB.PageLayout.init();
		EB.Background.Stars.OnPageLoad();
		EB.Hamburger.init();
		EB.PageContent.init();

		window.addEventListener("resize", EB.ResizeFunctions.init);

	},

	ResizeFunctions: {

		init: function() {

			EB.Background.Gradient();
			EB.PageLayout.init();
			EB.Hamburger.init();
			EB.PageContent.init();

		}

	},

	CommonFunctions: {

		RandomNumber: function(min, max) {

			return Math.floor(Math.random()*(max-min+1)+min);

		}

	},

	ScreenSize: {

		Width: function() {

			var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			return screenWidth;

		},

		Height: function() {

			var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

			return screenHeight;

		}

	},

	Background: {

		Gradient: function() {

			var background, screenWidth, screenHeight;

			background = document.getElementById("background");
			screenWidth = EB.ScreenSize.Width();
			screenHeight = EB.ScreenSize.Height();

			if (screenWidth >= screenHeight) {

				background.style.width = "100vw";
				background.style.height = "100vw";

			} else {

				background.style.width = "100vh";
				background.style.height = "100vh";

			};

		},

		Stars: {

			OnPageLoad: function() {

				if ( EB.ScreenSize.Width() < screenSm ) {

					for (var i = 0; i < 6; i++)  { EB.Background.Stars.GenerateNew.init("small", "existing");  }
					for (var i = 0; i < 3; i++)  { EB.Background.Stars.GenerateNew.init("medium", "existing"); }
					for (var i = 0; i < 1; i++)  { EB.Background.Stars.GenerateNew.init("large", "existing");  }

				} else {

					for (var i = 0; i < 20; i++) { EB.Background.Stars.GenerateNew.init("small", "existing");  }
					for (var i = 0; i < 6; i++)  { EB.Background.Stars.GenerateNew.init("medium", "existing"); }
					for (var i = 0; i < 3; i++)  { EB.Background.Stars.GenerateNew.init("large", "existing");  }

				}

			},

			GenerateNew: {

				init: function(size, NewOrExisting) {

					// Create a new star

					var container, star;

					container = document.getElementById("stars");
					star = document.createElement("div");

					container.appendChild(star);
					star.classList.add(size);

					// Define the starting position of the star

					EB.Background.Stars.GenerateNew.DefineStartingPositions.init(star, size, NewOrExisting);

				},

				DefineStartingPositions: {

					init: function(star, size, NewOrExisting) {

						if (NewOrExisting == "existing") { 

							EB.Background.Stars.GenerateNew.DefineStartingPositions.New(star, size);

						} else {

							EB.Background.Stars.GenerateNew.DefineStartingPositions.Existing(star, size);

						}

					},

					New: function(star, size) {

						var posTop, posLeft;

						posTop = EB.CommonFunctions.RandomNumber(0, EB.ScreenSize.Height());
						posLeft = EB.CommonFunctions.RandomNumber(0, EB.ScreenSize.Width());

						star.style.top = posTop + "px";
						star.style.left = posLeft + "px";

						EB.Background.Stars.GenerateNew.AssignAnimations.init(star, size, posTop, posLeft);

					},

					Existing: function(star, size) {

						var posTop, posLeft;

						if (EB.CommonFunctions.RandomNumber(0, 9) < 5) {

							posTop = EB.ScreenSize.Height();
							posLeft = EB.CommonFunctions.RandomNumber(0, EB.ScreenSize.Width());

						} else {

							posTop = EB.CommonFunctions.RandomNumber(0, EB.ScreenSize.Height());
							posLeft = -100;

						}

						star.style.top = posTop + "px";
						star.style.left = posLeft + "px";

						EB.Background.Stars.GenerateNew.AssignAnimations.init(star, size, posTop, posLeft);

					}

				},

				AssignAnimations: {

					init: function(star, size, posTop, posLeft) {

						var screenWidth, randomizedNumber;

						screenWidth = EB.ScreenSize.Width();

						randomizedNumber = EB.CommonFunctions.RandomNumber(0, 20);

						// Randomly assign additional css animation

						if (randomizedNumber < 10) {

							animate1();

						} else if (randomizedNumber > 9 || randomizedNumber < 15) {

							animate2();

						} else if (randomizedNumber > 14 || randomizedNumber < 21) {

							animate3();

						};

						// Start the Animation

						function animate1() {

							var startJavascriptAnimation = setInterval(javascriptAnimation, 25);

							function javascriptAnimation() {

								posTop = posTop -= 1;
								posLeft = posLeft += 1;

								star.style.top = posTop + "px";
								star.style.left = posLeft + "px";

								if (posTop == -100 | posLeft == screenWidth) {

									clearInterval(startJavascriptAnimation);
									document.getElementById("stars").removeChild(star);
									EB.Background.Stars.GenerateNew.init(size, "");

								}

							};

						};

						function animate2() {

							var startJavascriptAnimation = setInterval(javascriptAnimation, 50);

							function javascriptAnimation() {

								posTop = posTop -= 1;
								posLeft = posLeft += 2;

								star.style.top = posTop + "px";
								star.style.left = posLeft + "px";

								if (posTop == -100 | posLeft == screenWidth) {

									clearInterval(startJavascriptAnimation);
									document.getElementById("stars").removeChild(star);
									EB.Background.Stars.GenerateNew.init(size, "");

								}

							};

						};

						function animate3() {

							var startJavascriptAnimation = setInterval(javascriptAnimation, 50);

							function javascriptAnimation() {

								posTop = posTop -= 2;
								posLeft = posLeft += 1;

								star.style.top = posTop + "px";
								star.style.left = posLeft + "px";

								if (posTop == -100 | posLeft > screenWidth) {

									clearInterval(startJavascriptAnimation);
									document.getElementById("stars").removeChild(star);
									EB.Background.Stars.GenerateNew.init(size, "");

								}

							};

						};

					}

				}

			}

		}

	},

	PageLayout: {

		init: function() {

			EB.PageLayout.MainPadding();
			EB.PageLayout.HeaderPadding();

		},

		MainPadding: function() {

			// Defining the padding value of the container of pages.

			if (EB.ScreenSize.Width() > EB.ScreenSize.Height()) {

				document.getElementsByTagName("main")[0].style.padding = "10vw";

			} else {

				document.getElementsByTagName("main")[0].style.padding = "10vh";

			}

		},

		HeaderPadding: function() {

			if (EB.ScreenSize.Width() > EB.ScreenSize.Height()) {

				document.getElementsByTagName("header")[0].style.top = "10vw";
				document.getElementsByTagName("header")[0].style.width = "100vw";
				document.getElementsByTagName("header")[0].style.paddingLeft = "10vw";
				document.getElementsByTagName("header")[0].style.paddingRight = "10vw";

			} else {

				document.getElementsByTagName("header")[0].style.top = "10vh";
				document.getElementsByTagName("header")[0].style.width = "100vw";
				document.getElementsByTagName("header")[0].style.paddingLeft = "10vh";
				document.getElementsByTagName("header")[0].style.paddingRight = "10vh";

			};

		}

	},

	Hamburger: {

		init: function() {

			if (EB.ScreenSize.Width() < screenSm) {

				var logo, closeHamburger;

				logo = document.getElementById("logo");
				closeHamburger = document.getElementById("closeHamburger");

				logo.addEventListener("click", function() {

					EB.Hamburger.Expand();

				});

				closeHamburger.addEventListener("click", function() {

					EB.Hamburger.Close();

				});

			}

		},

		Expand: function() {

			var hamburger, navigation, navSize;

			hamburger = document.getElementById("hamburger");
			navigation = hamburger.getElementsByClassName("nav")[0];
			navSize = navigation.offsetHeight;

			hamburger.style.height = navSize + "px";

		},

		Close: function() {

			var hamburger, navigation, navSize;

			hamburger = document.getElementById("hamburger");
			navigation = hamburger.getElementsByClassName("nav")[0];
			navSize = navigation.offsetHeight;

			hamburger.style.height = 0;

		}

	},

	PageSwitcher: {



	},

	PageContent: {

		init: function() {

			EB.PageContent.Home.init();
			EB.PageContent.Brands.init();

		},

		Home: {

			init: function() {

				var home, homeHeight, welcome, welcomeHeight, calculate;

				home = document.getElementById("home");
				homeHeight = home.offsetHeight;

				welcome = home.getElementsByClassName("welcome")[0];
				welcomeHeight = welcome.offsetHeight;

				calculate = (homeHeight / 2) - (welcomeHeight / 2)

				home.getElementsByClassName("content")[0].style.top = calculate + "px";

			}

		},

		Brands: {

			init: function() {

				var brands, brandsHeight, container, containerHeight, calculate;

				brands = document.getElementById("brands");
				brandsHeight = brands.offsetHeight;

				container = brands.getElementsByClassName("container")[0];
				containerHeight = container.offsetHeight;

				if (brandsHeight > containerHeight && EB.ScreenSize.Width() > screenSm) {

					calculate = (brandsHeight / 2) - (containerHeight / 2)

					container.style.top = calculate + "px";

				} else {

					container.setAttribute("style", "");

				}

			}

		}

	}

};

EB.init();