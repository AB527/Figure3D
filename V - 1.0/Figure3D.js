class Figure3D { 

    #data = {
        animation: "Figure3D_Animation_Rotation",
        figure: null,
        figure_details: {
            width: 0,
            height: 0,
            sides: 0,
            texture: null,
            perspective: 60
        },
        figure_geometry: {
            rotation: {
                prev: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                now: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },
            faces: {
                width: 0,
                height: 0
            }
        },
        mouseDown: false
    }

    constructor(width, height, sides, texture, perspective = 60) {

        this.#data.figure_details.width = width;
        this.#data.figure_details.height = height;
        this.#data.figure_details.sides = sides;
        this.#data.figure_details.texture = texture;
        this.#data.figure_details.perspective = perspective;

        var data_standing = this.#data;

        var body = document.createElement("div");

        body.className = "object-box";
        body.appendChild(this.#createBarrel());

        body.onmousedown = function() {
            data_standing.mouseDown = true;
        }
        body.onmouseup = function() {
            data_standing.mouseDown = false;
        }

        body.onmousemove = (event) => {

            if (data_standing.mouseDown) {

                if (Math.abs(event.movementY) > 1) {
                    this.#data.figure_geometry.rotation.prev.y = this.#data.figure_geometry.rotation.now.y;
                    this.#data.figure_geometry.rotation.now.y -= event.movementY;
                }

                if (this.#data.figure_geometry.rotation.now.y <= 75 && this.#data.figure_geometry.rotation.now.y >= -75) {
                    this.#data.figure_geometry.rotation.prev.x = this.#data.figure_geometry.rotation.now.x;
                    this.#data.figure_geometry.rotation.now.x += event.movementX;
                } else {
                    this.#data.figure_geometry.rotation.prev.z = this.#data.figure_geometry.rotation.now.z;
                    this.#data.figure_geometry.rotation.now.z += event.movementX;
                }

                this.#animation_edit(this.#data.animation);

            }
        };

        this.#data.figure = body;
    }

    #createBarrel() {
        var barrel = this.#createTube(this.#data.figure_details.width, this.#data.figure_details.height, this.#data.figure_details.sides, this.#data.figure_details.texture);

        barrel.style.cssText = "width: " + (this.#data.figure_geometry.faces.width * 2).toFixed(2) + "px;height: " + (this.#data.figure_details.height + 25) + "px;";

        return barrel;
    }

    #createTube() {
        var tube = this.#createAssembly(),
            sideAngle = (Math.PI / this.#data.figure_details.sides) * 2,
            sideLen = this.#data.figure_details.width * Math.tan(Math.PI / this.#data.figure_details.sides),
            axis = { x: 0, y: 0, z: 0 },
            rotate = { x: 0, y: 0, z: 0 };

        this.#data.figure_geometry.faces.width = sideLen + 1;

        for (var i = 0; i < this.#data.figure_details.sides; i++) {
            axis.x = Math.sin(sideAngle * i) * this.#data.figure_details.width / 2;
            axis.z = Math.cos(sideAngle * i) * this.#data.figure_details.width / 2;
            rotate.y = Math.atan2(axis.x, axis.z);
            tube.appendChild(this.#createFace(sideLen + 1, this.#data.figure_details.height, axis, rotate, { src: this.#data.figure_details.texture, x: sideLen * i, y: 0 }));
        }

        return tube;
    }

    #createAssembly() {
        var assembly = document.createElement("div");

        assembly.className = "same_base object";

        return assembly;
    }

    #createFace(width, height, axis, rotate, img) {

        var face = document.createElement("div");

        face.className = "same_base face";
        face.style.cssText = "background: url(" + img.src + ") -" + img.x.toFixed(2) + "px " + img.y.toFixed(2) + "px;" +
            "width:" + width.toFixed(2) + "px;" +
            "height:" + height.toFixed(2) + "px;" +
            "margin-left: " + (width / 2).toFixed(2) + "px;" +
            "transform: translate3d(" + axis.x.toFixed(2) + "px," + axis.y.toFixed(2) + "px," + axis.z.toFixed(2) + "px)" +
            "rotateX(" + rotate.x.toFixed(2) + "rad) rotateY(" + rotate.y.toFixed(2) + "rad) rotateZ(" + rotate.z.toFixed(2) + "rad);";

        return face;
    }

    #animation_edit(animation_name) {

        var keyframes = this.#keyframesRule_find(animation_name);

        keyframes.deleteRule("to");

        keyframes.appendRule("from { transform: rotateX(" + this.#data.figure_geometry.rotation.prev.y + "deg) rotateY(" + this.#data.figure_geometry.rotation.prev.x + "deg) rotateZ(" + this.#data.figure_geometry.rotation.prev.z + "deg); }");

        keyframes.appendRule("to { transform: rotateX(" + this.#data.figure_geometry.rotation.now.y + "deg) rotateY(" + this.#data.figure_geometry.rotation.now.x + "deg) rotateZ(" + this.#data.figure_geometry.rotation.now.z + "deg); }");
    }

    #keyframesRule_find(keyframe_name) {
        var cssSheets = document.styleSheets;

        for (var i = 0; i < cssSheets.length; i++) {
            if (cssSheets[i].href.split("/")[cssSheets[i].href.split("/").length - 1] == "Figure3D.css") {
                for (var j = 0; j < cssSheets[i].cssRules.length; j++) {
                    if (cssSheets[i].cssRules[j].type == 7 && cssSheets[i].cssRules[j].name == keyframe_name)
                        return cssSheets[i].cssRules[j];
                }
            }
        }

        return null;
    }

    appendFigure(type, code, pos = { top: "0px", left: "0px" }, index = 0) {

        this.#data.figure.style.cssText = "width: " + (this.#data.figure_geometry.faces.width * 4) + "px;height: " + (this.#data.figure_details.height * 1.5) + "px;margin-top: " + pos.top + ";margin-left: " + pos.left + ";perspective: " + (this.#data.figure_details.perspective * 10) + "px;";

        switch (type) {
            case "tag":
                document.getElementsByTagName(code)[index].appendChild(this.#data.figure);
                break;
            case "class":
                document.getElementsByClassName(code)[index].appendChild(this.#data.figure);
                break;
            case "id":
                document.getElementById(code).appendChild(this.#data.figure);
                break;
            default:
                return 1;
        }

    }

    getPerspective() {
        return this.#data.figure_details.perspective;
    }

    setPerspective(perspective) {

        if (perspective <= 100 && perspective >= 0)
            this.#data.figure_details.perspective = perspective;

        this.#data.figure.style.perspective = (this.#data.figure_details.perspective * 10) + "px";
    }

}
