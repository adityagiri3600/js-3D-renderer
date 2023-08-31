// A Plane Class. A plane can contain a number of solids. The plane is rendered every frame. No more than one plane should be rendered at a time.

class Plane {

    solids = []; // list of the solids in the plane.
    time = 0; // amount of time that has been rendered since the plane was initialised. (For future use.)
    
    // intialises a plane with a color and an optional initial list of solids
    constructor (color, initialSolids = []) {

        // the surface of the plane is itself a solid
        const plane = new Solid(0, [
            [[-5, -5, 0], [-5, 5, 0], [5, 5, 0], [5, -5, 0]]
        ]);

        this.solids = initialSolids;
        this.solids.push(plane);

        const that = this;
        
        this.interval = setInterval(function () {

            that.time += 0.01;
            for (let i = 1; i < that.solids.length; i++) {
                that.solids[i].rotate(i == 1 ? -0.01 : 0.01);
            }

            that.render();
        
        }, 10);

    }

    // adds a solid to the plane. The solid is given a random color. A 3D list of points is passed in as solidDimensions.
    addSolid(solidDimensions) {
        // For performance reasons, no more than 8 solids can be added to the plane.
        if (this.solids.length >= 8)
            return;

        const solid = new Solid(this.solids.length, solidDimensions);

        if (this.solids.length == 1) {
            solid.rotate(0.5);
            solid.translate(-0.5, -0.5, 0);
        }

        this.solids.push(solid);
    }

    // removes a solid from the plane by its index
    removeSolid(solidIndex) {
        if (this.solids.length < 2) { // the plane must always have at least one solid (in addition to the plane solid)
            document.getElementById(`cube-${solidIndex}`).remove();
            this.solids.splice(solidIndex, 1);
        }
    }

    // removes the last solid added from the plane
    removeLastSolid() {
        if (this.solids.length > 2) {
            document.getElementById(`cube-${this.solids.length - 1}`).remove();
            this.solids.pop();
        }  
    }

    // returns the number of solids in the plane
    count() {
        return this.solids.length;
    }
    
    // renders the plane
    render() {

        for (let i = 0; i < this.solids.length; i++) {
    
            let solid = this.solids[i]
    
            var clippingPath = solid.clippingPath()
            var faces = solid.faces;
    
            for (let j = 0; j < faces.length; j++) {
    
                var ele = document.getElementById(`cube-face-${solid.id}-${j}`);
                ele.style.clipPath = clippingPath[j];
    
                //sets the z-index of each face to the average z-index of its points
                if (i > 0) {
                var avgzIndex = (faces[j][0][1] + faces[j][1][1] + faces[j][2][1] + faces[j][3][1]) / 4
                ele.style.zIndex = `${-Math.floor(avgzIndex * 100)}`;
                } else {
                    ele.style.zIndex = -999;
                }
            }
        }
        
    }

}