
"use strict";

// Responisive breaking points made avaible to whole document here.

var screenSm, screenMd, screenLg;

screenSm = 768;
screenMd = 900;
screenLg = 1200;



var EB = {

	init: function() {

		EB.Background.Gradient();
		EB.Background.Stars.OnPageLoad();
		EB.StaticDOMLayout.init();
		EB.Hamburger.init();
		EB.PageSwitcher.init();
		EB.Content.SwitchLanguage.init();

		window.addEventListener("resize", EB.ResizeFunctions.init);

	},

	ResizeFunctions: {

		init: function() {

			EB.Background.Gradient();
			EB.StaticDOMLayout.init();
			EB.PageLayout.Portfolio.init();

		}

	},

	CommonFunctions: {

		RandomNumber: function(min, max) {

			return Math.floor(Math.random()*(max-min+1)+min);

		},

		ArrayLister: function(array, tagName) {

			var list = "", arraySize;

			arraySize = array.length;

			for (var i = 0; i < arraySize; i++) {

				list += "<" + tagName + ">" + array[i] + "</" + tagName + ">";

			}

			return list;

		}

	},

	Content: {

		SwitchLanguage: {

			init: function() {

				var btn;

				btn = document.getElementsByClassName("langSwitch")[0].getElementsByClassName("btn")[0];

				btn.addEventListener("click", function() {

					if (this.classList.contains("switched")) {

						this.classList.remove("switched");
						EB.Content.Distribute.init("en", false);

					} else {

						this.classList.add("switched");
						EB.Content.Distribute.init("fr", false);

					}

				});

			}

		},

		Distribute: {

			init: function(lang, pageLoad) {

				var main = document.getElementsByTagName("main")[0], nav = document.getElementsByTagName("header")[0].getElementsByTagName("ul")[0];

				if (pageLoad == true) {

					EB.Content.Distribute.Translate(lang);

				} else {

					main.classList.add("fadeout");
					nav.classList.add("fadeout");

					setTimeout(function() {

						EB.Content.Distribute.Translate(lang);

					}, 550);

					setTimeout(function() {

						main.classList.remove("fadeout");
						nav.classList.remove("fadeout");

					}, 600);

				}

			},

			Translate: function(lang) {

				EB.Content.Distribute.Sections.static(lang);
				EB.Content.Distribute.Sections.home(lang);
				EB.Content.Distribute.Sections.brands(lang);
				EB.Content.Distribute.Sections.cv(lang); 
				EB.Content.Distribute.Sections.portfolio(lang);
				EB.Content.Distribute.Sections.contact(lang);

			},

			Sections: {

				static: function(lang) {

					// Populate hamburger navigation.

					var htmlDOM, hamburgerNav, navList, navSize;

					htmlDOM = document.getElementsByTagName("html")[0];
					hamburgerNav = document.getElementById("hamburger").getElementsByTagName("ul")[0];
					navList = content.web[lang].nav;
					navSize = navList.length;
					htmlDOM.setAttribute("lang", lang);

					for (var i = 0; i < navSize; i++) {

						var current = hamburgerNav.getElementsByTagName("li")[i].getElementsByTagName("span")[0];
						current.innerHTML = navList[i];

					}

					// Populating desktop navigation will be done manually because first DOM is an image instead of text.

					var desktopNav = document.getElementsByTagName("header")[0];

					desktopNav.getElementsByClassName("brands")[0].innerHTML = 	navList[1];
					desktopNav.getElementsByClassName("cv")[0].innerHTML = navList[2];
					desktopNav.getElementsByClassName("portfolio")[0].innerHTML = navList[3];
					desktopNav.getElementsByClassName("contact")[0].innerHTML = navList[4];

				},

				home: function(lang) {

					var holder;

					holder = document.getElementById("home").getElementsByClassName("content")[0];

					holder.getElementsByTagName("h1")[0].innerHTML = content.web[lang].home.h1;
					holder.getElementsByTagName("h2")[0].innerHTML = content.web[lang].home.h2;
					holder.getElementsByTagName("a")[0].innerHTML = content.web[lang].home.a;

				},

				brands: function(lang) {

					var holder, brandsList, brandsNumber, item, img, list = "";

					holder = document.getElementById("brands").getElementsByClassName("container")[0];
					brandsList = content.web.brands;
					brandsNumber = brandsList.length;

					for (var i = 0; i < brandsNumber; i++) {

						var list;

						list += "<div class='item'><img src='" + brandsList[i] + "'></div>";

					}

					holder.innerHTML = list;

				},

				cv: function(lang) {

					var holder, aboutBlock, skillsAndAcademicBlock, workXPBlock;

					holder = document.getElementById("cv");

					aboutBlock = holder.getElementsByClassName("block")[0];
					skillsAndAcademicBlock = holder.getElementsByClassName("block")[1];
					workXPBlock = holder.getElementsByClassName("block")[2];

					function about() {

						var blockContent = "";

						blockContent += "<h3>" + content.web[lang].cv.aboutTitle + "</h3>";
						blockContent += EB.CommonFunctions.ArrayLister(content.web[lang].cv.aboutText, "p");

						aboutBlock.innerHTML = blockContent;

					}

					about();

					function skillsAndAcademic() {

						var blockContent = "", academicList, academicListSize, academicListHTML = "";

						blockContent += "<h3>" + content.web[lang].cv.skillsTitle + "</h3>";
						blockContent += "<div class='list'>";
						blockContent += "<h4>" + content.web[lang].cv.frontendTitle + "</h4>";
						blockContent += "<ul class='listed'>";
						blockContent += EB.CommonFunctions.ArrayLister(content.web[lang].cv.frontendList, "li");
						blockContent += "</ul></div>";
						blockContent += "<div class='list'>";
						blockContent += "<h4>" + content.web[lang].cv.toolsTitle + "</h4>";
						blockContent += "<ul class='listed'>";
						blockContent += EB.CommonFunctions.ArrayLister(content.web[lang].cv.toolList, "li");
						blockContent += "</ul></div>";
						blockContent += "<div class='seperator'></div>";
						blockContent += "<h3>" + content.web[lang].cv.academicTitle + "</h3>";

						academicList = content.web[lang].cv.academicList;
						academicListSize = academicList.length;

						for (var i = 0; i < academicListSize; i++) {

							academicListHTML += "<div class='school'>";
							academicListHTML += "<div class='name'>" + academicList[i].schoolTitle + "</div>";
							academicListHTML += "<div class='container'>";
							academicListHTML += "<div class='type'>" + academicList[i].education + "</div>";
							academicListHTML += "<div class='timeframe'>" + academicList[i].timeframe + "</div>";
							academicListHTML += "</div></div>";

						}

						blockContent += academicListHTML;

						skillsAndAcademicBlock.innerHTML = blockContent;

					}

					skillsAndAcademic();

					function workXP() {

						var blockContent = "", workXPList, workXPListSize;

						workXPList = content.web[lang].cv.workList;
						workXPListSize = workXPList.length;

						blockContent += "<h3>" + content.web[lang].cv.workTitle + "</h3>";

						for (var i = 0; i < workXPListSize; i++) {

							blockContent += "<div class='job'>";
							blockContent += "<div class='info'>";
							blockContent += "<div class='company'>";
							blockContent += "<a href='" + workXPList[i].link + "' target='_blank'>" + workXPList[i].company + "</a>";
							blockContent += "</div>";
							blockContent += "<div class='title'>" + workXPList[i].title + "</div>";
							blockContent += "<div class='timeframe'>" + workXPList[i].timeframe + "</div>";
							blockContent += "</div>";
							blockContent += "<div class='logo'>";
							blockContent += "<img class='" + workXPList[i].imgClass + "' src='" + workXPList[i].logoURL + "'>";
							blockContent += "</div></div>";

						}

						workXPBlock.innerHTML = blockContent;

					}

					workXP();

				},

				portfolio: function(lang) {

					var holder, portfolio, portfolioSize, blockContent = "";

					holder = document.getElementById("portfolio").getElementsByClassName("container")[0];
					portfolio = content.web.portfolio;
					portfolioSize = portfolio.length;

					for (var i = 0; i < portfolioSize; i++) {

						blockContent += "<div class='item " + portfolio[i].size + "'>";
						blockContent += "<a href='" + portfolio[i].linkURL + "' target='_blank'>";
						blockContent += "<img src='" + portfolio[i].imgSRC + "'>";
						blockContent += "</a></div>";

					}

					holder.innerHTML = blockContent;

					// Arrange page layout only after AJAX content is properly placed.

					EB.PageLayout.Portfolio.init();

				},

				contact: function(lang) {

					document.getElementById("contact").getElementsByTagName("p")[0].innerHTML = content.web[lang].contact;

				}

			}

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

	StaticDOMLayout: {

		init: function() {

			EB.StaticDOMLayout.PageShape();
			EB.StaticDOMLayout.HeaderPadding();

		},

		RemoveOverlay: function() {

			var overlay = document.getElementById("overlay");

			overlay.style.opacity = "0";

			setTimeout(function() {

				overlay.style.display = "none";

			}, 350);
			
		},

		PageShape: function() {

			// Defining the padding value of the container of pages.

			if (EB.ScreenSize.Width() > EB.ScreenSize.Height()) {

				EB.StaticDOMLayout.Horizontal("home");
				EB.StaticDOMLayout.Horizontal("brands");
				EB.StaticDOMLayout.Horizontal("cv");
				EB.StaticDOMLayout.Horizontal("portfolio");
				EB.StaticDOMLayout.Horizontal("contact");

				document.getElementById("hamburgerBtn").style.top = "8vw";
				document.getElementById("hamburgerBtn").style.right = "8vw";

				if (EB.ScreenSize.Width() < screenSm) {

					document.getElementsByClassName("langSwitch")[0].style.marginRight = "calc(8vw + 40px)";

				} else {

					document.getElementsByClassName("langSwitch")[0].style.marginRight = "8vw";

				}

			} else {

				EB.StaticDOMLayout.Vertical("home");
				EB.StaticDOMLayout.Vertical("brands");
				EB.StaticDOMLayout.Vertical("cv");
				EB.StaticDOMLayout.Vertical("portfolio");
				EB.StaticDOMLayout.Vertical("contact");

				document.getElementById("hamburgerBtn").style.top = "8vh";
				document.getElementById("hamburgerBtn").style.right = "8vh";

				if (EB.ScreenSize.Width() < screenSm) {

					document.getElementsByClassName("langSwitch")[0].style.marginRight = "calc(8vh + 40px)";

				} else {

					document.getElementsByClassName("langSwitch")[0].style.marginRight = "8vh";

				}

			}

		},

		Horizontal: function (pageId) {

			document.getElementById(pageId).classList.remove("vertical");
			document.getElementById(pageId).classList.add("horizontal");

		},

		Vertical: function (pageId) {

			document.getElementById(pageId).classList.remove("horizontal");
			document.getElementById(pageId).classList.add("vertical");

		},

		HeaderPadding: function() {

			if (EB.ScreenSize.Width() > EB.ScreenSize.Height()) {

				if (EB.ScreenSize.Width() < screenSm) {

					document.getElementsByTagName("header")[0].style.top = "8vw";
					document.getElementsByTagName("header")[0].style.width = "100vw";
					document.getElementsByTagName("header")[0].style.paddingLeft = "8vw";
					document.getElementsByTagName("header")[0].style.paddingRight = "8vw";

				} else {

					document.getElementsByTagName("header")[0].style.top = "8vw";
					document.getElementsByTagName("header")[0].style.width = "100vw";
					document.getElementsByTagName("header")[0].style.paddingLeft = "8vw";
					document.getElementsByTagName("header")[0].style.paddingRight = "8vw";

				}

			} else {

				if (EB.ScreenSize.Width() < screenSm) {

					document.getElementsByTagName("header")[0].style.top = "8vh";
					document.getElementsByTagName("header")[0].style.width = "100vw";
					document.getElementsByTagName("header")[0].style.paddingLeft = "8vh";
					document.getElementsByTagName("header")[0].style.paddingRight = "8vh";

				} else {

					document.getElementsByTagName("header")[0].style.top = "8vh";
					document.getElementsByTagName("header")[0].style.width = "100vw";
					document.getElementsByTagName("header")[0].style.paddingLeft = "8vh";
					document.getElementsByTagName("header")[0].style.paddingRight = "8vh";

				}

			};

		}

	},

	PageLayout: {

		Portfolio: {

			init: function() {

				var portfolio, itemHeight, itemList, itemCount;

				portfolio = document.getElementById("portfolio");
				itemHeight = portfolio.getElementsByClassName("one")[0].offsetWidth;
				itemList = portfolio.getElementsByClassName("item");
				itemCount = itemList.length;

				for (var i = 0; i < itemCount; i++) {

					if (EB.ScreenSize.Width() > screenSm) {

						itemList[i].style.height = itemHeight + "px";

					} else {

						itemList[i].setAttribute("style", "");

					}

				}

			}

		}

	},

	Hamburger: {

		init: function() {

			var main, button;

			main = document.getElementsByTagName("main")[0];
			button = document.getElementById("hamburgerBtn");

			button.addEventListener("click", function() {

				if (button.classList.contains("expanded")) {

					EB.Hamburger.Collapse();

				} else {

					EB.Hamburger.Expand();

				}

			});

			// Collapse hamburger when clicked elsewhere.

			main.addEventListener("click", function() {

				EB.Hamburger.Collapse();

			});

		},

		Expand: function() {

			console.log("uieiue")

			var main, button, hamburger, navigation, navSize;

			main = document.getElementsByTagName("main")[0];
			button = document.getElementById("hamburgerBtn");
			hamburger = document.getElementById("hamburger");

			button.classList.add("expanded");
			main.classList.add("disabled");

			navigation = hamburger.getElementsByClassName("mobileNav")[0];
			navSize = navigation.offsetHeight;
			hamburger.style.height = navSize + "px";

		},

		Collapse: function() {

			var main, button, hamburger;

			main = document.getElementsByTagName("main")[0];
			button = document.getElementById("hamburgerBtn");
			hamburger = document.getElementById("hamburger");

			hamburger.style.height = 0;
			button.classList.remove("expanded");
			main.classList.remove("disabled");

		}

	},

	PageSwitcher: {

		init: function() {

			EB.PageSwitcher.AddListeners("home");
			EB.PageSwitcher.AddListeners("brands");
			EB.PageSwitcher.AddListeners("cv");
			EB.PageSwitcher.AddListeners("portfolio");
			EB.PageSwitcher.AddListeners("contact");

		},

		AddListeners: function(pageId) {

			var elements, size;

			elements = document.getElementsByClassName(pageId);
			size = elements.length;

			for (var i = 0; i < size; i++) {

				elements[i].addEventListener("click", function() {

					EB.PageSwitcher.Switch(pageId);

				});

			};

		},

		Switch: function(newPage) {

			var oldPage = EB.PageSwitcher.DetectOldPage();

			if (oldPage !== newPage) {

				EB.Hamburger.Collapse();
				EB.PageSwitcher.ChangePage(oldPage, newPage);

				// Mark new page as active page in hamburger menu.

				var hamburger, children, childrenSize;

				hamburger = document.getElementsByClassName("mobileNav")[0];
				hamburger = hamburger.getElementsByTagName("ul")[0];
				children = hamburger.children;
				childrenSize = children.length;

				// .35s timeout is there to ensure that the change doesn't trigger instantaneously before the collapse of hamburger.

				setTimeout(function() {

					for (var i = 0; i < childrenSize; i++) {

						if (children[i].classList.contains(oldPage)) {

							children[i].classList.remove("active");

						} else if (children[i].classList.contains(newPage)) {

							children[i].classList.add("active");

						}

					};

				}, 350);

			};

		},

		DetectOldPage: function() {

			var main, children, childrenSize;

			main = document.getElementsByTagName("main")[0];
			children = main.children;
			childrenSize = children.length;

			for (var i = 0; i < childrenSize; i++) {

				if (children[i].classList.contains("active")) {

					return children[i].getAttribute("id");

				};

			};

		},

		ChangePage: function(oldPage, newPage) {

			document.getElementById(oldPage).classList.remove("active");
			document.getElementById(newPage).classList.add("active");

		}

	}

};



var content, ajax = new XMLHttpRequest();

ajax.onreadystatechange = function() {

	if (this.readyState == 4 && this.status == 200) {

		content = JSON.parse(this.responseText);
		EB.init();
		EB.Content.Distribute.init("en", true);

	};

}

ajax.open("GET", "content.json", true);
ajax.send();

window.addEventListener("load", function() {

	// Show the website only when page fully loads.

	EB.StaticDOMLayout.RemoveOverlay();

});