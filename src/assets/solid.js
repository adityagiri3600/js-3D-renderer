// Variables and Constants
var camerax = 0
var cameray = -6
var cameraz = -3
var zoom = 100
var lightPos = [-.5, 0, 1]
var lightPower = .003
var theta = 0
var phi = 0

let colorList = [[150, 194, 145], [255, 219, 170], [255, 183, 183], [39, 55, 77], [82, 109, 130],
             [25, 183, 183], [39, 155, 77], [82, 109, 10], [150, 14, 145], [255, 219, 70],
             [105, 183, 83], [39, 155, 177], [182, 109, 10], [150, 14, 245], [255, 19, 170]]


class Solid {

    // initialises a solid with an ID and a list of faces (each face is a list of 4 points)
    constructor(id, faces) {
        this.faces = faces;
        this.id = id;

        var randColor = colorList[Math.floor(Math.random() * colorList.length)];
        this.color = randColor;
        colorList.splice(colorList.indexOf(randColor), 1);
    
        const cube = document.createElement(`div`);
        cube.className = 'cube';
        cube.id = `cube-${id}`;

        for (let j = 0; j < faces.length; j++) {
            var face = document.createElement('div');
            face.classList.add('face');
            face.id = `cube-face-${id}-${j}`;
            face.style.backgroundColor = `rgb(${randColor[0]},
                                              ${randColor[1]},
                                              ${randColor[2]})`
            cube.appendChild(face);
        }

        document.body.appendChild(cube);
    }

    // returns a list of paths which can be used as a clip-path in css for each face
    clippingPath() {

        var path_list = [];

        for (let i = 0; i < this.faces.length; i++) {
            path_list.push(`polygon(
                ${project(this.faces[i][0][0], this.faces[i][0][1], this.faces[i][0][2], theta)[0]}% ${project(this.faces[i][0][0], this.faces[i][0][1], this.faces[i][0][2], theta)[1]}%,
                ${project(this.faces[i][1][0], this.faces[i][1][1], this.faces[i][1][2], theta)[0]}% ${project(this.faces[i][1][0], this.faces[i][1][1], this.faces[i][1][2], theta)[1]}%,
                ${project(this.faces[i][2][0], this.faces[i][2][1], this.faces[i][2][2], theta)[0]}% ${project(this.faces[i][2][0], this.faces[i][2][1], this.faces[i][2][2], theta)[1]}%,
                ${project(this.faces[i][3][0], this.faces[i][3][1], this.faces[i][3][2], theta)[0]}% ${project(this.faces[i][3][0], this.faces[i][3][1], this.faces[i][3][2], theta)[1]}%)`)
        }

        return path_list;

    }

    // rotates the solid by theta radians
    rotate(theta) {
        for (let i = 0; i < this.faces.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.faces[i][j][0] = rot(this.faces[i][j][0], this.faces[i][j][1], theta)[0]
                this.faces[i][j][1] = rot(this.faces[i][j][0], this.faces[i][j][1], theta)[1]
            }
            
        }
    }
    
    // translates the solid by (x,y,z)
    translate(x, y, z) {
        for (let i = 0; i < this.faces.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.faces[i][j][0] += x
                this.faces[i][j][1] += y
                this.faces[i][j][2] += z
            }

        }
    }

    // scales the solid by (x,y,z)
    scale(x, y, z) {
        for (let i = 0; i < this.faces.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.faces[i][j][0] *= x
                this.faces[i][j][1] *= y
                this.faces[i][j][2] *= z
            }
        }
    }

    getFaceElement(index){
        return document.getElementById(`cube-face-${this.id}-${index}`)
    }
    
    // calculates the color of each face based on the light source
    calculateColor(){
        for(let i = 0; i < this.faces.length; i++){
            let face = this.faces[i]
            var a = face[0]
            var b = face[1]
            var c = face[2]
            var d = face[3]
            var u = [b[0]-a[0], b[1]-a[1], b[2]-a[2]]
            var v = [c[0]-a[0], c[1]-a[1], c[2]-a[2]]
            var normal = [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]]
            var dot = normal[0]*lightPos[0]+normal[1]*lightPos[1]+normal[2]*lightPos[2]
            var mag = Math.sqrt(normal[0]*normal[0]+normal[1]*normal[1]+normal[2]*normal[2])
            var mag2 = Math.sqrt(lightPos[0]*lightPos[0]+lightPos[1]*lightPos[1]+lightPos[2]*lightPos[2])
            dot = (dot/(mag*mag2) + 1)/2.
            var color = [255, 255, 255]
            color[0] = color[0]*dot*lightPower
            color[1] = color[1]*dot*lightPower
            color[2] = color[2]*dot*lightPower
            this.getFaceElement(i).style.backgroundColor = `rgb(${color[0]*this.color[0]},
                                                                                              ${color[1]*this.color[1]},
                                                                                              ${color[2]*this.color[2]})`
        }
    }
    changeColor() {

        var randColor = colorList[Math.floor(Math.random() * colorList.length)];
        colorList.splice(colorList.indexOf(randColor), 1);
        this.color = randColor;

    }

    resetColorList() {
        colorList = [[150, 194, 145], [255, 219, 170], [255, 183, 183], [39, 55, 77], [82, 109, 130],
             [25, 183, 183], [39, 155, 77], [82, 109, 10], [150, 14, 145], [255, 219, 70],
             [105, 183, 83], [39, 155, 177], [182, 109, 10], [150, 14, 245], [255, 19, 170]]
    }
}

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

/**
 * CURRENTLY NOT WORKING AND NOT FIXED:
 * document.addEventListener('keydown', function (event) {
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
 * 
 */