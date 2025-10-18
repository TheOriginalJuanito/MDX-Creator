window.onload = function () {
    setTimeout(() => {

        function getEnvVariable() {
            let customFields = window?.siteConfig?.customFields;
            let env = customFields?.APP_ENV;

            if (env == "dev") {
                return env;
            } else {
                return "prod";
            }

        }

		if (window.location.href.includes("/dev/") && getEnvVariable() != "dev" || localStorage.getItem("APP_ENV")  != "dev" && window.location.href.includes("/dev/")) {
			window.location.href = window.location.origin + "/";
		}

        if (window.location.href.includes("Marker-Creator")) {
            // Define Variables
            const imageCodeBlock = document.getElementById("imageCodeBlock");
            const copyButton = document.getElementById("copyButton");
            let imgElement = document.getElementById("mainImage");
            let imageinput = document.getElementById("imageUrlInput");
            let imgContainer = document.querySelector(".ImagemapContainer");
            let toggleMode = document.getElementById("toggleMode");

            let isDragging = false;
            let isResizing = false;
            let markermodeSelection = ["dotmarker", "squareMarker"];
            let markermode = "dotmarker";

            // Global functions

            // Markers
            function createDotMarker(x, y, index, link) {
                let dotmarker = document.createElement("div");
                dotmarker.style.top = y;
                dotmarker.style.left = x;
                dotmarker.classList.add("marker", "dotmarker");
                if (link !== undefined && link !== null && link !== "") {
                    dotmarker.setAttribute("data-link", link);
                }
                dotmarker.textContent = index;

                function deleteMarker(event) {
                    let markerindex = dotmarker.textContent;
                    event.preventDefault();
                    dotmarker.remove();

                    imgContainer
                        .querySelectorAll(".dotmarker")
                        .forEach((marker) => {
                            let othermarkerindex = marker.textContent;
                            if (othermarkerindex > markerindex) {
                                marker.textContent = othermarkerindex - 1;
                            }

                            handleCodeBlock();
                        });
                }

                // Look in to this function more closely (curently coppy)
                function dragAndDrop(event) {
                    let isDragging = false;

                    dotmarker.addEventListener("mousedown", function (event) {
                        event.preventDefault();
                        isDragging = true;
                        document.body.style.userSelect = "none";

                        // while dragging
                        function onMouseMove(event) {
                            if (!isDragging) return;

                            const rect = imgElement.getBoundingClientRect();
                            const imgWidth = rect.width;
                            const imgHeight = rect.height;

                            let x = ((event.clientX - rect.left) / imgWidth) * 100;
                            let y = ((event.clientY - rect.top) / imgHeight) * 100;

                            x = Math.max(0, Math.min(100, x));
                            y = Math.max(0, Math.min(100, y));

                            dotmarker.style.left = `${x.toFixed(2)}%`;
                            dotmarker.style.top = `${y.toFixed(2)}%`;

                            handleCodeBlock();
                        }

                        // stop dragging
                        function onMouseUp() {
                            isDragging = false;
                            document.body.style.userSelect = "";
                            document.removeEventListener("mousemove", onMouseMove);
                            document.removeEventListener("mouseup", onMouseUp);
                        }

                        document.addEventListener("mousemove", onMouseMove);
                        document.addEventListener("mouseup", onMouseUp);
                    });
                }

                dotmarker.addEventListener("contextmenu", deleteMarker);
                dotmarker.addEventListener("mousemove", dragAndDrop);
                imgContainer.appendChild(dotmarker);
            }

            function createSquareMarker(x, y, height, width, origin) {
                let squareMarker = document.createElement("div");
                squareMarker.className = "squareMarker";
                squareMarker.style.top = y;
                squareMarker.style.left = x;
                squareMarker.style.width = width;
                squareMarker.style.height = height;

                let resizeHandle = document.createElement("div");
                resizeHandle.className = "resizeHandle";
                resizeHandle.addEventListener("mousedown", resizeSquareMarker);
                squareMarker.appendChild(resizeHandle);

                // Resize
                function resizeSquareMarker(event) {
                    event.preventDefault();
                    if (isDragging) return; // Prevent resizing while dragging
                    isResizing = true;
                    document.body.style.userSelect = "none";

                    function onMouseMove(event) {
                        if (!isResizing) return;

                        const rect = imgElement.getBoundingClientRect();
                        const imgWidth = rect.width;
                        const imgHeight = rect.height;

                        let newWidth =
                            ((event.clientX - rect.left) / imgWidth) * 100 -
                            parseFloat(squareMarker.style.left);
                        let newHeight =
                            ((event.clientY - rect.top) / imgHeight) * 100 -
                            parseFloat(squareMarker.style.top);

                        // Maximum size
                        newWidth = Math.min(
                            100 - parseFloat(squareMarker.style.left),
                            newWidth
                        );
                        newHeight = Math.min(
                            100 - parseFloat(squareMarker.style.top),
                            newHeight
                        );

                        // Apply the new size
                        squareMarker.style.width = `${newWidth.toFixed(2)}%`;
                        squareMarker.style.height = `${newHeight.toFixed(2)}%`;

                        handleCodeBlock();
                    }

                    function onMouseUp() {
                        isResizing = false;
                        document.body.style.userSelect = "";
                        document.removeEventListener("mousemove", onMouseMove);
                        document.removeEventListener("mouseup", onMouseUp);
                    }

                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", onMouseUp);
                }

                // Drag and Drop
                function dragSquareAndDrop() {
                    squareMarker.addEventListener("mousedown", function (event) {
                        // Prevent drag if resizing is active or if the resize handle was clicked
                        if (isResizing || event.target === resizeHandle) return;
                        event.preventDefault();
                        isDragging = true;
                        document.body.style.userSelect = "none";

                        function onMouseMove(event) {
                            if (!isDragging) return;

                            const rect = imgElement.getBoundingClientRect();
                            const imgWidth = rect.width;
                            const imgHeight = rect.height;

                            let x = ((event.clientX - rect.left) / imgWidth) * 100;
                            let y = ((event.clientY - rect.top) / imgHeight) * 100;

                            // clamp 0–100
                            x = Math.max(0, Math.min(100, x));
                            y = Math.max(0, Math.min(100, y));

                            squareMarker.style.left = `${x.toFixed(2)}%`;
                            squareMarker.style.top = `${y.toFixed(2)}%`;

                            handleCodeBlock();
                        }

                        function onMouseUp() {
                            isDragging = false;
                            document.body.style.userSelect = "";
                            document.removeEventListener("mousemove", onMouseMove);
                            document.removeEventListener("mouseup", onMouseUp);
                        }

                        document.addEventListener("mousemove", onMouseMove);
                        document.addEventListener("mouseup", onMouseUp);
                    });
                }

                function deleteMarker(event) {
                    event.preventDefault();
                    squareMarker.remove();
                }

                squareMarker.addEventListener("contextmenu", deleteMarker);
                squareMarker.addEventListener("mousemove", dragSquareAndDrop);
                imgContainer.appendChild(squareMarker);
            }

            // Code block
            function handleCodeBlock(event) {
                imageCodeBlock.innerHTML = `<span class="code-tag">&lt;Image</span> <span class="code-attribute">imgSrc=</span><span class="code-value">"${imgElement.src.replace(
                    /^https?:\/\/[^\/]+/,
                    ""
                )}"</span><span class="code-tag">&gt;</span>\n`;

                imgContainer.querySelectorAll(".squareMarker").forEach((marker) => {
                    let x = marker.style.left;
                    let y = marker.style.top;
                    let width = marker.style.width;
                    let height = marker.style.height;
                    imageCodeBlock.innerHTML += `   <span class="code-tag">&lt;Markers</span> <span class="code-attribute">top=</span><span class="code-value">"${y}"</span> <span class="code-attribute">left=</span><span class="code-value">"${x}"</span> <span class="code-attribute">type=</span><span class="code-value">"square"</span> <span class="code-attribute">markerWidth=</span><span class="code-value">"${width}"</span> <span class="code-attribute">markerHeight=</span><span class="code-value">"${height}"</span><span class="code-tag">&gt;</span><span class="code-tag">&lt;/Markers&gt;</span>\n`;
                });

                imgContainer.querySelectorAll(".dotmarker").forEach((marker) => {
                    let x = marker.style.left;
                    let y = marker.style.top;
                    let index = marker.textContent;
                    let link = marker.getAttribute("data-link");

                    if (link == null || link === "" ) {
                        imageCodeBlock.innerHTML += `   <span class="code-tag">&lt;Markers</span><span class="code-attribute"> top=</span><span class="code-value">"${y}"</span><span class="code-attribute"> left=</span><span class="code-value">"${x}"</span><span class="code-tag">&gt;${index}</span><span class="code-tag">&lt;/Markers&gt;</span>\n`;
                    } else {
                        imageCodeBlock.innerHTML += `   <span class="code-tag">&lt;Markers</span><span class="code-attribute"> top=</span><span class="code-value">"${y}"</span><span class="code-attribute"> left=</span><span class="code-value">"${x}"</span><span class="code-attribute"> link=</span><span class="code-value">"${link}"</span><span class="code-tag">&gt;${index}</span><span class="code-tag">&lt;/Markers&gt;</span>\n`;
                    }

                });

                imageCodeBlock.innerHTML += `<span class="code-tag">&lt;/Image&gt;</span>`;
            }

            // Remove Eventlisteners

            function removeAllClickListenersFromImgElement() {
                const newImgElement = imgElement.cloneNode(true);
                imgElement.parentNode.replaceChild(newImgElement, imgElement);
                imgElement = newImgElement;
            }

            // Initial Load
            function initialLoad() {
                function loadCurentimage() {
                    function extractlinkfromURL() {
                        let url = window.location.href;
                        let urlParts = url.split("?");
                        let imgUrl = urlParts[1];
                        if (imgUrl) {
                            imgElement.src = imgUrl;
                            imageinput.value = imgUrl;
                        }
                        handleCodeBlock();
                    }

                    function handleImageInput() {
                        let imgUrl = imageinput.value;

                        if (imgUrl) {
                            imgElement.src = imgUrl;
                            imgContainer
                                .querySelectorAll(".dotmarker")
                                .forEach((marker) => marker.remove());
                        }
                    }

                    extractlinkfromURL();
                    imageinput.addEventListener("change", handleImageInput);
                }

                function loadMarkers() {
                    let url = window.location.href;
                    let urlParts = url.split("?");

                    function regularMarkers() {
                        let markerData = urlParts[2];
                        if (!markerData) return;
                        let markers = markerData.split(",+,");

                        markers.forEach((marker) => {
                            let [x, y, index, link] = marker.split(",");
                            if (link === "+" || link === undefined){
                                createDotMarker(x, y, index);
                            } else {
                                createDotMarker(x, y, index, link);
                            }
                        });
                    }

                    function squareMarker() {
                        let squaremarkerData = urlParts[3];
                        if (!squaremarkerData) return;
                        let squaremarkers = squaremarkerData.split(",+,");

                        squaremarkers.forEach((marker) => {
                            let [x, y, height, width, symbol] = marker.split(",");
                            createSquareMarker(x, y, width, height, "url");
                        });
                    }


                    regularMarkers();
                    squareMarker();
                    handleCodeBlock();
                }

                // load existing Markers from URL
                toggleMode.textContent = markermode;



                loadMarkers();
                loadCurentimage();
            }

            // Handel the of markers
            function markers() {
                // Remove previous click listeners to avoid stacking
                removeAllClickListenersFromImgElement();

                function addDotMarker() {
                    function handleClicks(event) {
                        function getClickCoordinates(event) {
                            let rect = imgElement.getBoundingClientRect();
                            let imgWidth = rect.width;
                            let imgHeight = rect.height;
                            let clickX = event.clientX - rect.left;
                            let clickY = event.clientY - rect.top;
                            clickX = (clickX / imgWidth) * 100;
                            clickY = (clickY / imgHeight) * 100;
                            return { x: clickX.toFixed(2), y: clickY.toFixed(2) };
                        }
                        function getNextIndex() {
                            let markers =
                                imgContainer.querySelectorAll(".dotmarker");
                            let nextIndex = 1;
                            markers.forEach((marker) => {
                                if (parseInt(marker.textContent) >= nextIndex) {
                                    nextIndex = parseInt(marker.textContent) + 1;
                                }
                            });
                            return nextIndex;
                        }
                        let coordinates = getClickCoordinates(event);
                        createDotMarker(
                            coordinates.x + "%",
                            coordinates.y + "%",
                            getNextIndex()
                        );
                    }
                    imgElement.addEventListener("mousedown", handleClicks);
                    handleCodeBlock();
                }

                function addSquareMarker() {
                    // getClickCoordinates
                    function getClickCoordinates(event) {
                        let rect = imgElement.getBoundingClientRect();
                        let imgWidth = rect.width;
                        let imgHeight = rect.height;
                        let clickX = event.clientX - rect.left;
                        let clickY = event.clientY - rect.top;
                        clickX = (clickX / imgWidth) * 100;
                        clickY = (clickY / imgHeight) * 100;
                        return { x: clickX.toFixed(2), y: clickY.toFixed(2) };
                    }

                    imgElement.addEventListener("mousedown", function (event) {
                        const coords = getClickCoordinates(event);
                        createSquareMarker(
                            coords.x + "%",
                            coords.y + "%",
                            "0%",
                            "0%",
                            "user"
                        );
                    });
                }

                switch (markermode) {
                    case "dotmarker":
                        addDotMarker();
                        break;
                    case "squareMarker":
                        addSquareMarker();
                        break;
                    default:
                        addDotMarker();
                        break;
                }
            }

            function main() {
                initialLoad();
                markers();
                imgElement.addEventListener("click", handleCodeBlock);
            }

            main();

            copyButton.addEventListener("click", function () {
                handleCodeBlock();
                const codeText = imageCodeBlock.textContent;
                navigator.clipboard.writeText(codeText);
            });

            toggleMode.addEventListener("click", function () {
                markermodeSelection.push(markermodeSelection.shift());
                markermode = markermodeSelection[0];
                toggleMode.textContent = markermode;
                markers();
            });
        }

        function swichURL() {

            if (getEnvVariable() === "dev" && !window.location.href.includes("/pageEditor")) {
                if (window.location.href.includes("Marker-Creator")) {
                } else {
                    function linkImagesTocreator() {
                        let allImages = document.querySelectorAll("img");

                        if (allImages.length === 0) {
                            setTimeout(linkImagesTocreator, 500);
                            return;
                        } else {
							if (localStorage.getItem("APP_ENV")  == "dev") {
								allImages.forEach((img) => {
									img.addEventListener("click", function () {
										const src = this.src;
										let MarkerData = [];
										let SquareMarkerData = [];
										this.parentNode
											.querySelectorAll('[data-marker="dotmarker"]')
											.forEach((marker) => {
												let x = marker.style.left;
												let y = marker.style.top;
												let index = marker.textContent.trim();
												let link = marker.getAttribute("data-link");
												MarkerData.push(x, y, index, link, "+");
											});
										this.parentNode
											.querySelectorAll(
												'[data-marker="squaremarker"]'
											)
											.forEach((marker) => {
												let x = marker.style.left;
												let y = marker.style.top;
												let width = marker.style.width;
												let height = marker.style.height;
												SquareMarkerData.push(x, y, width, height, "+");
											});

										window.location.href =
											window.location.origin +
											"/dev/Marker-Creator?" +
											src.slice(window.location.origin.length) +
											"?" +
											MarkerData + '?' + SquareMarkerData;
									});
								});
							} else {
								allImages.forEach((img) => {
									img.removeEventListener("click", function () {});
								});
							}
                        }
                    }
                    linkImagesTocreator();

                    window.addEventListener("hashchange", function () {
                        linkImagesTocreator();
                    });

					const envToggle = document.getElementById("env-toggle");
					let lastEnvToggleText = envToggle ? envToggle.textContent : "";

					if (envToggle) {
						const observer = new MutationObserver(() => {
							if (envToggle.textContent !== lastEnvToggleText) {
								lastEnvToggleText = envToggle.textContent;
								linkImagesTocreator();
							}
						});
						observer.observe(envToggle, { characterData: true, subtree: true, childList: true });
					}
                }
            } else if (getEnvVariable() === "prod") {
                return;
            }
        }

        url = window.location.href;
        setInterval(function() {
            if (window.location.href !== url ) {
                asignRelations();
                swichURL();
                url = window.location.href;
            }
        }, 500);

        // Marker Hilighting
        function asignRelations() {
            document.querySelectorAll('[data-link]').forEach(el => {
                el.removeEventListener('click', function() {});
                el.addEventListener('click', function() {
                    const linkId = this.getAttribute('data-link');

                    // Remove .marker-active from all elements
                    document.querySelectorAll('[data-link]').forEach(e => {
                        e.classList.remove('marker-active');
                    });
                    // Remove .marker-active after 1 second
                    setTimeout(() => {
                        document.querySelectorAll('[data-link].marker-active, [data-link].marker-active').forEach(e => {
                            e.classList.remove('marker-active');
                        });
                    }, 1000);
                    // Add .marker-active to corresponding elements
                    document.querySelectorAll(`[data-link="${linkId}"]`).forEach(e => {
                        e.classList.add('marker-active');
                    });
                });


                // add index to end of referance link

                let link = el.getAttribute('data-link');

                document.querySelectorAll(`[data-marker]`).forEach(m => {
                    let markerLink = m.getAttribute('data-link');

                    if (link === markerLink) {

                        if (!el.hasAttribute('data-marker')) {
                            el.after(`(${m.textContent.trim()})`);
                        }
                    }



                });
            });
        }

        function ReloadRelationsonURLchange() {
            asignRelations();
        }


        getEnvVariable();
        swichURL();
        ReloadRelationsonURLchange();


		setInterval(() => {
			swichURL();
		}, 2000);

    }, 500);
};

