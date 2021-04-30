class Figure3D {

    #data = {
        animation: "Figure3D_Animation_Rotation",
        figure: null,
        figure_details: {
            width: 0,
            height: 0,
            sides: 0,
            texture: {
                texture: null,
                is_image: false
            },
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
        mouseDown: false,
        keyboard: {
            allow: false,
            keyset: {
                x: {
                    a: {
                        key: "ArrowUp",
                        code: 38 
                    },
                    b: {
                        key: "ArrowDown",
                        code: 40
                    }
                },
                y: {
                    a: {
                        key: "ArrowLeft",
                        code: 37 
                    },
                    b: {
                        key: "ArrowRight",
                        code: 39
                    }
                },
                z: {
                    a: {
                        key: "ArrowLeft",
                        code: 37 
                    },
                    b: {
                        key: "ArrowRight",
                        code: 39
                    }
                }
            }
        }
    }

    constructor(width, height, sides, texture, perspective = 60) {

        this.#data.figure_details.width = width;
        this.#data.figure_details.height = height;
        this.#data.figure_details.sides = sides;
        this.#data.figure_details.texture = { is_image: !this.#isValidColor(texture), texture: texture };
        this.#data.figure_details.perspective = perspective;

        var data_standing = this.#data;

        var body = document.createElement("div");

        body.className = "Figure3D-Figure";
        body.appendChild(this.#createBarrel());

        body.onmousedown = function() {
            data_standing.mouseDown = true;
        }
        body.onmouseup = function() {
            data_standing.mouseDown = false;
        }

        body.onmousemove = (event) => {
            this.#objectFigure(event,data_standing);
        };

        document.onkeydown = (event) => { 
            var pressKey = {key: event.key}, data_standing = {mouseDown: true};

            if(this.#data.keyboard.allow) {
                if(pressKey.key == this.#data.keyboard.keyset.x.a.key)
                    this.#objectFigure({movementX: 0, movementY: -10}, data_standing);
                else if(pressKey.key == this.#data.keyboard.keyset.x.b.key) 
                    this.#objectFigure({movementX: 0, movementY: 10}, data_standing);
                else {
                    
                    if (this.#data.figure_geometry.rotation.now.x % 180 <= 75 && this.#data.figure_geometry.rotation.now.x % 180 >= -75) {
        
                        if(this.#data.figure_geometry.rotation.prev.x / 180 >= 0) {
                            if(Math.abs(parseInt(this.#data.figure_geometry.rotation.prev.x / 180)) % 2 == 0) 
                                if(pressKey.key == this.#data.keyboard.keyset.y.a.key)
                                    this.#objectFigure({movementX: -10, movementY: 0}, data_standing);
                                else if(pressKey.key == this.#data.keyboard.keyset.y.b.key)
                                    this.#objectFigure({movementX: 10, movementY: 0}, data_standing);   
                            else 
                                if(pressKey.key == this.#data.keyboard.keyset.y.a.key)
                                    this.#objectFigure({movementX: 10, movementY: 0}, data_standing);
                                else if(pressKey.key == this.#data.keyboard.keyset.y.b.key)
                                    this.#objectFigure({movementX: -10, movementY: 0}, data_standing);
                        }
                        else {

                            if(Math.abs(parseInt(this.#data.figure_geometry.rotation.prev.x / 180)) % 2 == 1) 
                                if(pressKey.key == this.#data.keyboard.keyset.y.a.key)
                                    this.#objectFigure({movementX: 10, movementY: 0}, data_standing);
                                else if(pressKey.key == this.#data.keyboard.keyset.y.b.key)
                                    this.#objectFigure({movementX: -10, movementY: 0}, data_standing);   
                            else 
                                if(pressKey.key == this.#data.keyboard.keyset.y.a.key)
                                    this.#objectFigure({movementX: -10, movementY: 0}, data_standing);
                                else if(pressKey.key == this.#data.keyboard.keyset.y.b.key)
                                    this.#objectFigure({movementX: 10, movementY: 0}, data_standing);
                        }
        
                    } else {    

                        if(this.#data.figure_geometry.rotation.prev.x / 180 >= 0) {
                            if(Math.abs(parseInt(this.#data.figure_geometry.rotation.prev.x / 180)) % 2 == 0) 
                                if(pressKey.key == this.#data.keyboard.keyset.z.a.key)
                                    this.#objectFigure({movementX: -10, movementY: 0}, data_standing);
                                else if(pressKey.key == this.#data.keyboard.keyset.z.b.key)
                                    this.#objectFigure({movementX: 10, movementY: 0}, data_standing);   
                            else 
                                if(pressKey.key == this.#data.keyboard.keyset.z.a.key)
                                    this.#objectFigure({movementX: 10, movementY: 0}, data_standing);
                                else if(pressKey.key == this.#data.keyboard.keyset.z.b.key)
                                    this.#objectFigure({movementX: -10, movementY: 0}, data_standing);
                        }
                        else {

                            if(Math.abs(parseInt(this.#data.figure_geometry.rotation.prev.x/ 180)) % 2 == 0) 
                                if(pressKey.key == this.#data.keyboard.keyset.z.a.key)
                                    this.#objectFigure({movementX: 10, movementY: 0}, data_standing);
                                else if(pressKey.key == this.#data.keyboard.keyset.z.b.key)
                                    this.#objectFigure({movementX: -10, movementY: 0}, data_standing);   
                            else 
                                if(pressKey.key == this.#data.keyboard.keyset.z.a.key)
                                    this.#objectFigure({movementX: -10, movementY: 0}, data_standing);
                                else if(pressKey.key == this.#data.keyboard.keyset.z.b.key)
                                    this.#objectFigure({movementX: 10, movementY: 0}, data_standing);
                        }
                    }
                }
            }

        };

        this.#data.figure = body;

    }

    #objectFigure(event, data_standing) {

        if (data_standing.mouseDown) {

            if (Math.abs(event.movementY) > 1) {
                this.#data.figure_geometry.rotation.prev.x = this.#data.figure_geometry.rotation.now.x;
                this.#data.figure_geometry.rotation.now.x -= event.movementY;
            }

            if (this.#data.figure_geometry.rotation.now.x % 180 <= 75 && this.#data.figure_geometry.rotation.now.x % 180 >= -75) {

                this.#data.figure_geometry.rotation.prev.y = this.#data.figure_geometry.rotation.now.y;

                if(this.#data.figure_geometry.rotation.prev.x / 180 >= 0) {
                    if(Math.abs(parseInt(this.#data.figure_geometry.rotation.prev.x / 180)) % 2 == 0) 
                        this.#data.figure_geometry.rotation.now.y += event.movementX;                  
                    else this.#data.figure_geometry.rotation.now.y -= event.movementX;
                }
                else {
                    if(Math.abs(parseInt(this.#data.figure_geometry.rotation.prev.x / 180)) % 2 == 1) 
                        this.#data.figure_geometry.rotation.now.y -= event.movementX;
                    else this.#data.figure_geometry.rotation.now.y += event.movementX;
                }

            } else {    
                this.#data.figure_geometry.rotation.prev.z = this.#data.figure_geometry.rotation.now.z;
                
                if(this.#data.figure_geometry.rotation.prev.x / 180 >= 0) {
                    if(Math.abs(parseInt(this.#data.figure_geometry.rotation.prev.x / 180)) % 2 == 0) this.#data.figure_geometry.rotation.now.z -= event.movementX;                        
                    else this.#data.figure_geometry.rotation.now.z += event.movementX;
                }
                else {
                    if(Math.abs(parseInt(this.#data.figure_geometry.rotation.prev.x / 180)) % 2 == 1) this.#data.figure_geometry.rotation.now.z -= event.movementX;
                    else this.#data.figure_geometry.rotation.now.z += event.movementX;
                }
            }

            this.#animation_edit(this.#data.animation);
        }
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
            tube.appendChild(this.#createFace(sideLen + 1, this.#data.figure_details.height, axis, rotate, this.#data.figure_details.texture.is_image ? { src: this.#data.figure_details.texture.texture, x: sideLen * i, y: 0 } : this.#data.figure_details.texture.texture));
        }

        return tube;
    }

    #createAssembly() {
        var assembly = document.createElement("div");

        assembly.className = "Figure3D-Figure-Style-Base Figure3D-Figure-Main";

        return assembly;
    }

    #createFace(width, height, axis, rotate, texture) {

        var face = document.createElement("div");

        face.className = "Figure3D-Figure-Style-Base Figure3D-Figure-Main-Face";
        face.style.cssText = "background: " + (texture.src != undefined ? "url(" + texture.src + ") -" + texture.x.toFixed(2) + "px " + texture.y.toFixed(2) + "px" : texture) + ";" + 
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

        keyframes.appendRule("from { transform: rotateX(" + this.#data.figure_geometry.rotation.prev.x + "deg) rotateY(" + this.#data.figure_geometry.rotation.prev.y + "deg) rotateZ(" + this.#data.figure_geometry.rotation.prev.z + "deg); }");

        keyframes.appendRule("to { transform: rotateX(" + this.#data.figure_geometry.rotation.now.x + "deg) rotateY(" + this.#data.figure_geometry.rotation.now.y + "deg) rotateZ(" + this.#data.figure_geometry.rotation.now.z + "deg); }");
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

    #isValidColor(color) {
        var object = new Option().style;
        object.color = color;
        return object.color == color;
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

    setBorder(arr) {
        arr.forEach(element => {
            if(typeof element[1] == "number") {
                var children = this.#data.figure.childNodes[0].childNodes;
                if(element[0] == "top") {
                    children.forEach(child => {
                        child.style.cssText += "border-top: " + element[1] + "px solid " + (element[2] == undefined ? "black" : element[2]) + ";";  
                    }); 
                }
                else if(element[0] == "bottom") {
                    children.forEach(child => {
                        child.style.cssText += "border-bottom: " + element[1] + "px solid " + (element[2] == undefined ? "black" : element[2]) + ";"; 
                    }); 
                }
                else if(element[0] == "side") {
                    children.forEach(child => { 
                        child.style.cssText += "box-shadow: inset " + element[1] + "px 0px " + (element[2] == undefined ? "black" : element[2]) + ";"; 
                    }); 
                }
            }   
        });
    }

    setKeyboardKeys(keyset) {

        // Top Bottom
        if(keyset.x != undefined) {
            if(keyset.x.a != undefined) {
                // Key
                if(isNaN(keyset.x.a)) {
                    this.#data.keyboard.keyset.x.a.key = keyset.x.a.substring(0, 1);
                    this.#data.keyboard.keyset.x.a.code = keyset.x.a.charCodeAt(0);
                }
                // Keycode
                else {
                    this.#data.keyboard.keyset.x.a.code = keyset.x.a;
                    this.#data.keyboard.keyset.x.a.key = String.fromCharCode(keyset.x.a);
                }
            }
            if(keyset.x.b != undefined) {
                if(isNaN(keyset.x.b)) {
                    this.#data.keyboard.keyset.x.b.key = keyset.x.b.substring(0, 1);
                    this.#data.keyboard.keyset.x.b.code = keyset.x.b.charCodeAt(0);
                }
                else {
                    this.#data.keyboard.keyset.x.b.code = keyset.x.b;
                    this.#data.keyboard.keyset.x.b.key = String.fromCharCode(keyset.x.b);
                }
            }
        }

        // Start Left-Right
        if(keyset.y != undefined) {
            if(keyset.y.a != undefined) {
                this.#data.keyboard.keyset.y.a.code = isNaN(keyset.y.a) ? keyset.y.a.charCodeAt(0) : keyset.y.a;
                this.#data.keyboard.keyset.y.a.key = isNaN(keyset.y.a) ? keyset.y.a.substring(0, 1) : String.fromCharCode(keyset.y.a);
            }
            if(keyset.y.b != undefined) {
                if(isNaN(keyset.y.b)) {
                    this.#data.keyboard.keyset.y.b.key = keyset.y.b.substring(0, 1);
                    this.#data.keyboard.keyset.y.b.code = keyset.y.b.charCodeAt(0);
                }
                else {
                    this.#data.keyboard.keyset.y.b.code = keyset.y.b;
                    this.#data.keyboard.keyset.y.b.key = String.fromCharCode(keyset.y.b);
                }
            }
        }
        
        // Center Point - LeftRight
        if(keyset.z != undefined) { 
            if(keyset.z.a != undefined) {
                if(isNaN(keyset.z.a)) {
                    this.#data.keyboard.keyset.z.a.key = keyset.z.a.substring(0, 1);
                    this.#data.keyboard.keyset.z.a.code = keyset.z.a.charCodeAt(0);
                }
                else {
                    this.#data.keyboard.keyset.z.a.code = keyset.z.a;
                    this.#data.keyboard.keyset.z.a.key = String.fromCharCode(keyset.z.a);
                }
            } 
            if(keyset.z.b != undefined) {
                if(isNaN(keyset.z.b)) {
                    this.#data.keyboard.keyset.z.b.key = keyset.z.b.substring(0, 1);
                    this.#data.keyboard.keyset.z.b.code = keyset.z.b.charCodeAt(0);
                }
                else {
                    this.#data.keyboard.keyset.z.b.code = keyset.z.b;
                    this.#data.keyboard.keyset.z.b.key = String.fromCharCode(keyset.z.b);
                }
            } 
        }
        
    }

    allowKeyboardKeys(allowance = true) {
        this.#data.keyboard.allow = allowance;
    }


}