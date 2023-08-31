const plane = new Plane();
plane.addSolid([
    [[0, 0, 0], [0, 0, 1], [1, 0, 1], [1, 0, 0]],
    [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]],
    [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 0, 1], [1, 1, 1], [1, 1, 0]]
]);


plane.addSolid([
    [[2, 0, 0], [2, 0, 1], [3, 0, 1], [3, 0, 0]],
    [[2, 0, 0], [2, 0, 1], [2, 1, 1], [2, 1, 0]],
    [[2, 0, 1], [3, 0, 1], [3, 1, 1], [2, 1, 1]],
    [[2, 1, 0], [2, 1, 1], [3, 1, 1], [3, 1, 0]],
    [[3, 0, 0], [3, 0, 1], [3, 1, 1], [3, 1, 0]]
]);



function addCube() {
    plane.addSolid([
        [[2, 0, 0], [2, 0, 1], [3, 0, 1], [3, 0, 0]],
        [[2, 0, 0], [2, 0, 1], [2, 1, 1], [2, 1, 0]],
        [[2, 0, 1], [3, 0, 1], [3, 1, 1], [2, 1, 1]],
        [[2, 1, 0], [2, 1, 1], [3, 1, 1], [3, 1, 0]],
        [[3, 0, 0], [3, 0, 1], [3, 1, 1], [3, 1, 0]]
    ]);
}

function removeCube() {
    plane.removeLastSolid();
}

var paused = false;

function toggleRendering() {
   plane.toggleRendering();
   document.getElementById("toggleRenderingButton").innerHTML = paused ? `<svg fill="#5F5F5F" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"  style="width: 50%;" ><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>`: `<svg fill="#5F5F5F"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="width: 60%;"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
   paused = !paused;
}

function rainbow() {
    plane.changeAllColor();
}