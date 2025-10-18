setTimeout(() => {
	if (window.location.href.includes("dev/pageEditor")) {
		let components = document.querySelectorAll(".component");
		let canvas = document.getElementById("preview");

		const marker = document.createElement("hr");
		marker.style.border = "1px solid red";
		marker.className = "marker";

		function getComponents(name) {
			let component

			switch (name) {
				case "Card":
					component = document.createElement("div");;
					component.className = "manualContainer card";
					component.setAttribute("data-name", "Card");
					component.innerHTML = `
						<a href="https://google.com" class="cardLink">
							<img class="containerHead" src="/img/logo.svg" alt="Card Image" />
							<div class="containerBody">
								<div class="Text"><span data-editable="true">Some Body Text</span></div>
								<button><span data-editable="true">Some BTN Text</span></button>
							</div>
						</a>
					`;

					component.addEventListener("click", (e) => {
						e.preventDefault();
						function openContextMenufor(component) {

							contextMenue = document.createElement("div");
							contextMenue.className = "contextMenue";
							contextMenue.innerHTML = `
								<button class="delete">Delete</button>
								<button class="src">SRC</button>
								<button class="linkTo">linkTo</button>
							`;

							document.querySelectorAll(".contextMenue").forEach(el => el.remove());
							component.insertAdjacentElement("beforebegin", contextMenue);

							contextMenue.querySelector(".delete").onclick = function() {
								component.remove();
								contextMenue.remove();
							};

							contextMenue.querySelector(".src").onclick = function() {
								let src = prompt("Enter Link/SRC from /img/ folder");

								if (src) {
									let img = component.querySelector("img");
									img.src = "/img/" + src;
								}
								contextMenue.remove();
							};

							contextMenue.querySelector(".linkTo").onclick = function() {
								let link = prompt("Enter id to Link to ");

								if (link) {
									component.querySelector("a").href = link;
								}
								contextMenue.remove();
							};
						};

						openContextMenufor(component);

					});


				break;

				// add Marker to images
				case "Image":
					component = document.createElement("img");
					component.className = " Image";
					component.src = "/img/logo.svg";


					component.addEventListener("click", (e) => {
						e.preventDefault();
						function openContextMenufor(component) {

							contextMenue = document.createElement("div");
							contextMenue.className = "contextMenue";
							contextMenue.innerHTML = `
								<button class="delete">Delete</button>
								<button class="SRC">SRC</button>
							`;

							document.querySelectorAll(".contextMenue").forEach(el => el.remove());
							component.insertAdjacentElement("beforebegin", contextMenue);

							contextMenue.querySelector(".delete").onclick = function() {
								component.remove();
								contextMenue.remove();
							};

							contextMenue.querySelector(".SRC").onclick = function() {
								let src = prompt("Enter Link/SRC from /img/ folder");

								if (src) {
									component.src = "/img/" + src;
								}
								contextMenue.remove();
							};

						};

						openContextMenufor(component);

					});
				break;

				case "Title":
					component = document.createElement("div");
					component.className = "headderTitle title";
					component.innerHTML = `
						<h3> <span data-editable="true"> Title </span> </h3>
						<hr />
					`;

					component.addEventListener("click", (e) => {
						e.preventDefault();
						function openContextMenufor(component) {

							contextMenue = document.createElement("div");
							contextMenue.className = "contextMenue";
							contextMenue.innerHTML = `
								<button class="delete">Delete</button>
							`;

							document.querySelectorAll(".contextMenue").forEach(el => el.remove());
							component.insertAdjacentElement("beforebegin", contextMenue);

							contextMenue.querySelector(".delete").onclick = function() {
								component.remove();
								contextMenue.remove();
							};

						};

						openContextMenufor(component);

					});
				break;

				case "text":
					component = document.createElement("p");
					component.className = "text";
					component.innerHTML = `
						<p data-editable="true"> This is some text. Click to edit. </p>
					`;

					component.addEventListener("click", (e) => {
						e.preventDefault();
						function openContextMenufor(component) {

							contextMenue = document.createElement("div");
							contextMenue.className = "contextMenue";
							contextMenue.innerHTML = `
								<button class="delete">Delete</button>
							`;

							document.querySelectorAll(".contextMenue").forEach(el => el.remove());
							component.insertAdjacentElement("beforebegin", contextMenue);

							contextMenue.querySelector(".delete").onclick = function() {
								component.remove();
								contextMenue.remove();
							};


						};

						openContextMenufor(component);

					});
				break

				case "cardLink":
					component = document.createElement("article");
					component.className = "cardLink";
					component.innerHTML = `
						<a class="card " href=/>
							<h2 title="Container"><span data-editable="true">This is cardLink Title</span></h2>
						</a>
					`;
					component.addEventListener("click", (e) => {
						e.preventDefault();
						function openContextMenufor(component) {

							contextMenue = document.createElement("div");
							contextMenue.className = "contextMenue";
							contextMenue.innerHTML = `
								<button class="delete">Delete</button>
								<button class="linkTo">linkTo</button>

							`;

							document.querySelectorAll(".contextMenue").forEach(el => el.remove());
							component.insertAdjacentElement("beforebegin", contextMenue);

							contextMenue.querySelector(".delete").onclick = function() {
								component.remove();
								contextMenue.remove();
							};

							contextMenue.querySelector(".linkTo").onclick = function() {
								let link = prompt("Enter id to Link to ");

								if (link) {
									component.querySelector("a").href = link;
								}
								contextMenue.remove();
							};
						};

						openContextMenufor(component);

					});

				break;

				case "ColorBoxes":
					component = document.createElement("div");
					component.className = "logofarben";
					component.innerHTML = `
					<div data-firstdiv>
						<div>
							<span>Pantone: <i data-editable="true"> 228 </i></span>
							<span>CMYK: <i data-editable="true"> 100 </i> | <i data-editable="true"> 66 </i> | <i data-editable="true"> 0 </i> | <i data-editable="true"> 0 </i></span>
							<span data-color>Web: #<i data-editable="true">00ffff</i></span>
							<span>RGB: rgb(<i data-editable="true">0</i>, <i data-editable="true">85</i>, <i data-editable="true">163</i>)</span>
						</div>
						<h3 data-editable="true">Cyan</h3>
					</div>
					`;

					component.addEventListener("click", (e) => {
						e.preventDefault();
						function openContextMenufor(component) {

							contextMenue = document.createElement("div");
							contextMenue.className = "contextMenue";
							contextMenue.innerHTML = `
								<button class="delete">Delete</button>

							`;

							document.querySelectorAll(".contextMenue").forEach(el => el.remove());
							component.insertAdjacentElement("beforebegin", contextMenue);

							contextMenue.querySelector(".delete").onclick = function() {
								component.remove();
								contextMenue.remove();
							};
						};

						openContextMenufor(component);

					});


					const colorEditable = component.querySelector('[data-color] i');

					function loaddata() {
						let firstdiv = component.querySelector('[data-firstdiv]');
						const colorText = colorEditable.textContent.trim();
						const gradient = `linear-gradient(to bottom, #${colorText}, #fff)`;
						firstdiv.style.background = gradient;




						textcolor = colorText;
						if (colorText == 'fff' ||colorText == 'ffffff') {
							font = '#000000'
							textcolor = '000000'
						} else {
							font = colorText
						}

						firstdiv.style.color = textcolor;
						firstdiv.style.border = `1px solid ${font}`;
					}

					colorEditable.addEventListener("blur", () => {
						loaddata();
					});

					loaddata();



					break;

				case "ImgCardLink":
					component = document.createElement("a");
					component.className = "DisplayElements";
					component.innerHTML = `
						<img class="icon" src=/img/logo.svg />
						<div class="Text">
							<h3><span data-editable="true">Title Text</span></h3>
							<span data-editable="true">Some Text</span>
						</div>
					`;

					component.addEventListener("click", (e) => {
						e.preventDefault();
						function openContextMenufor(component) {

							contextMenue = document.createElement("div");
							contextMenue.className = "contextMenue";
							contextMenue.innerHTML = `
								<button class="delete">Delete</button>
								<button class="SRC">SRC</button>
							`;

							document.querySelectorAll(".contextMenue").forEach(el => el.remove());
							component.insertAdjacentElement("beforebegin", contextMenue);

							contextMenue.querySelector(".delete").onclick = function() {
								component.remove();
								contextMenue.remove();
							};

							contextMenue.querySelector(".SRC").onclick = function() {
								let src = prompt("Enter new SRC URL:");
								if (src) {
									component.querySelector("img").src = "/img/" + src;
								}
								contextMenue.remove();
							};

						};

						openContextMenufor(component);

					});

				break;

				case "Grid":
					component = document.createElement("div");
					component.className = "container";
					component.setAttribute("data-type", "Container");
					component.innerHTML = `
						<div class="row">
							<div class="col-md-6 col-sm-12" data-grid="true">
								<hr />
							</div>
							<div class="col-md-6 col-sm-12" data-grid="true">
								<hr />
							</div>
						</div>
					`;



					component.addEventListener("click", (e) => {
						e.preventDefault();
						function openContextMenufor(component) {

							contextMenue = document.createElement("div");
							contextMenue.className = "contextMenue";
							contextMenue.innerHTML = `
								<button class="delete">Delete</button>
								<button class="col-amount">Col Amount</button>
							`;

							document.querySelectorAll(".contextMenue").forEach(el => el.remove());
							component.insertAdjacentElement("beforebegin", contextMenue);

							contextMenue.querySelector(".delete").onclick = function() {
								component.remove();
								contextMenue.remove();
							};

							contextMenue.querySelector(".col-amount").onclick = function() {
								let cols = prompt("Enter amount of Cols (1-12)");
								let currentCols = component.querySelectorAll('[data-grid="true"]').length;
								row = component.querySelector(".row");

								console.log(currentCols, cols);


								if (currentCols > cols) {
									while (currentCols > cols) {
										row.removeChild(row.lastChild);
										currentCols--;
									}
								} else {
									for (let i = 0; i < (cols - currentCols); i++) {
										col = document.createElement("div");
										col.className = "col-md-" + (12 / cols);
										col.setAttribute("data-grid", "true");
										col.innerHTML = "<hr />";
										row.appendChild(col);
									}
								}

								redistributeClasses = row.querySelectorAll('[data-grid="true"]');
								let totalCols = redistributeClasses.length;
								redistributeClasses.forEach(col => {
									col.removeAttribute("class");
									col.className = "col-md-" + (12 / totalCols);
								});

							}

						};

						openContextMenufor(component);

					});
				break;

			}

			if (component) {
				component.querySelectorAll('[data-editable="true"]').forEach(el => {
					el.setAttribute("contenteditable", "true");
				});


				if (name !== "Grid") {

					component.addEventListener("click", (e) => {
						component.addEventListener("mousedown", (e) => {
							e.preventDefault();


							let DragComponent = component;

							canvas.addEventListener("mouseup", (ev) => {
								let marker = canvas.querySelectorAll(".marker")
								marker.forEach(el => {
									DragComponent.style.opacity = "1";
									el.insertAdjacentElement("beforebegin", DragComponent);
									el.remove();
								});
							}, { once: true });
						});
					},{ once: true });
				}
			}

			return component;
		}

		components.forEach(component => {
			let name = component.getAttribute("data-name");
			component.addEventListener("mousedown", (e) => {
				e.preventDefault();
				let allComponents = canvas.children;

				Array.from(allComponents).forEach(item => {

					if( item.getAttribute("data-type") !== "Container" ) {
						item.addEventListener("mousemove", (ev) => {
							let rect = item.getBoundingClientRect();
							let y = ev.clientY - rect.top;
							let half = rect.height / 2;

							if (y < half) {
								if (item.previousSibling !== marker) {
									item.insertAdjacentElement("beforebegin", marker);
								}
							} else {
								if (item.nextSibling !== marker) {
									item.insertAdjacentElement("afterend", marker);
								}
							}
						});
					} else {
						item.querySelectorAll('[data-grid="true"]').forEach(col => {

							col.addEventListener("mousemove", (ev) => {
								col.appendChild(marker);
							});
						});
					}
					canvas.addEventListener("mouseup", () => {
							marker.insertAdjacentElement("beforebegin", getComponents(name));
							marker.remove();
					}, { once: true });
				});
			});
		});

	}
}, 1000);


