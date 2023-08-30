camerax = 0
cameray = -6
cameraz = -3
zoom = 100
theta = 0
phi = 0
colorList = [[150, 194, 145], [255, 219, 170], [255, 183, 183], [39, 55, 77], [82, 109, 130],
             [25, 183, 183], [39, 155, 77], [82, 109, 10], [150, 14, 145], [255, 219, 70],
             [105, 183, 83], [39, 155, 177], [182, 109, 10], [150, 14, 245], [255, 19, 170]]



//Solid class: structure for constructing and manipulating 3d objects by storing their faces as a list of 4 3d points
class Solid {
    constructor(faces) {
        //faces>>face>>point>>x,y,z
        this.faces = faces
    }
    clippingPath() {
        //path_list is a list of paths
        //paths are strings which can be used as a clip-path in css for each face
        var path_list = [];
        for (let i = 0; i < this.faces.length; i++) {
            path_list.push(`polygon(
                ${project(this.faces[i][0][0], this.faces[i][0][1], this.faces[i][0][2], theta)[0]}% ${project(this.faces[i][0][0], this.faces[i][0][1], this.faces[i][0][2], theta)[1]}%,
                ${project(this.faces[i][1][0], this.faces[i][1][1], this.faces[i][1][2], theta)[0]}% ${project(this.faces[i][1][0], this.faces[i][1][1], this.faces[i][1][2], theta)[1]}%,
                ${project(this.faces[i][2][0], this.faces[i][2][1], this.faces[i][2][2], theta)[0]}% ${project(this.faces[i][2][0], this.faces[i][2][1], this.faces[i][2][2], theta)[1]}%,
                ${project(this.faces[i][3][0], this.faces[i][3][1], this.faces[i][3][2], theta)[0]}% ${project(this.faces[i][3][0], this.faces[i][3][1], this.faces[i][3][2], theta)[1]}%)`)
        }
        return path_list
    }
    rotate(theta) {
        for (let i = 0; i < this.faces.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.faces[i][j][0] = rot(this.faces[i][j][0], this.faces[i][j][1], theta)[0]
                this.faces[i][j][1] = rot(this.faces[i][j][0], this.faces[i][j][1], theta)[1]
            }

        }
    }
    translate(x, y, z) {
        for (let i = 0; i < this.faces.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.faces[i][j][0] += x
                this.faces[i][j][1] += y
                this.faces[i][j][2] += z
            }

        }
    }
    scale(x, y, z) {
        for (let i = 0; i < this.faces.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.faces[i][j][0] *= x
                this.faces[i][j][1] *= y
                this.faces[i][j][2] *= z
            }

        }
    }
}





const cube1 = new Solid([
    [[0, 0, 0], [0, 0, 1], [1, 0, 1], [1, 0, 0]],
    [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]],
    [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 0, 1], [1, 1, 1], [1, 1, 0]]
])

const cube2 = new Solid([
    [[2, 0, 0], [2, 0, 1], [3, 0, 1], [3, 0, 0]],
    [[2, 0, 0], [2, 0, 1], [2, 1, 1], [2, 1, 0]],
    [[2, 0, 1], [3, 0, 1], [3, 1, 1], [2, 1, 1]],
    [[2, 1, 0], [2, 1, 1], [3, 1, 1], [3, 1, 0]],
    [[3, 0, 0], [3, 0, 1], [3, 1, 1], [3, 1, 0]]
])
const plane1 = new Solid([
    [[-5, -5, 0], [-5, 5, 0], [5, 5, 0], [5, -5, 0]]
])





let solids = [plane1, cube1, cube2]





//creates divs for each face of each solid
function createDivs() {
    for (let i = 0; i < solids.length; i++) {

        let solid = solids[i]
        randColor = colorList[Math.floor(Math.random() * colorList.length)];
        colorList.splice(colorList.indexOf(randColor), 1);

        const cube = document.createElement(`div`);
        cube.id = `cube-${i}`;

        for (let j = 0; j < solid.faces.length; j++) {
            var div = document.createElement('div');
            div.className = 'threeD';
            div.id = `cube-face-${i}-${j}`;
            div.style.backgroundColor = `rgb(${randColor[0] - j * 20},${randColor[1] - j * 20},${randColor[2] - j * 20})`
            cube.appendChild(div);
        }

        document.body.appendChild(cube);
    }
}

function createDivsForSingleSolid(solid) {

    randColor = colorList[Math.floor(Math.random() * colorList.length)];
    colorList.splice(colorList.indexOf(randColor), 1);
    
    const cube = document.createElement(`div`);
    cube.id = `cube-${solids.length - 1}`;

    for (let j = 0; j < solid.faces.length; j++) {
        var div = document.createElement('div');
        div.className = 'threeD';
        div.id = `cube-face-${solids.length - 1}-${j}`;
        div.style.backgroundColor = `rgb(${randColor[0] - j * 20},${randColor[1] - j * 20},${randColor[2] - j * 20})`
        cube.appendChild(div);
    }
    document.body.appendChild(cube);
}





cube1.rotate(0.5)
cube1.translate(-0.5, -0.5, 0)
plane1.scale(2, 2, 0)
plane1.translate(0, 7, -3)




//rotates (x,y) around the origin by theta radians
function rot(x, y, theta) {
    return [x * Math.cos(theta) - y * Math.sin(theta), x * Math.sin(theta) + y * Math.cos(theta)]
}
//projects (x,y,z) onto the screen
function project(x, y, z, theta) {
    z = -z
    x -= camerax
    y -= cameray
    z -= cameraz
    x = rot(x, y, theta)[0]
    y = rot(x, y, theta)[1]
    y = rot(y, z, phi)[0]
    z = rot(y, z, phi)[1]
    return [zoom * (x * (window.screen.height / window.screen.width) / y + 0.5), zoom * (z / y)]
}
//DOM manipulation
function render() {

    for (let i = 0; i < solids.length; i++) {

        let solid = solids[i]

        var clippingPath = solid.clippingPath()
        var faces = solid.faces

        for (let j = 0; j < faces.length; j++) {

            ele = document.getElementById(`cube-face-${i}-${j}`);
            ele.style.clipPath = clippingPath[j];

            //sets the z-index of each face to the average z-index of its points
            avgzIndex = (faces[j][0][1] + faces[j][1][1] + faces[j][2][1] + faces[j][3][1]) / 4
            ele.style.zIndex = `${-Math.floor(avgzIndex * 100)}`;
        }
    }



}



time = 0
createDivs()
setInterval(function () {

    //runs each frame
    time += 0.01;
    cube2.rotate(0.01);
    cube1.rotate(-0.01);
    render();

}, 10);





function addCube() {
    cube = new Solid([
        [[0, 0, 0], [0, 0, 1], [1, 0, 1], [1, 0, 0]],
        [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]],
        [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]],
        [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]],
        [[1, 0, 0], [1, 0, 1], [1, 1, 1], [1, 1, 0]]
    ])
    solids.push(cube)
    createDivsForSingleSolid(cube)
    document.addEventListener('keydown', function (event) {
        if (event.key == "w") {
            cube.translate(0, 0.1, 0)
        }
        if (event.key == "s") {
            cube.translate(0, -0.1, 0)
        }
        if (event.key == "a") {
            cube.translate(-0.1, 0, 0)
        }
        if (event.key == "d") {
            cube.translate(0.1, 0, 0)
        }
        if (event.key == "r") {
            cube.rotate(0.1)
        }
    })
}

function removeButton() {
    if (solids.length <= 2)
        return;
    document.body.removeChild(document.getElementById(`cube-${solids.length - 1}`))
    solids.pop();
}
