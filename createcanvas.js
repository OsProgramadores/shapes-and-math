var canvasContainer = null;

function loadCanvas(id) {
    // save container id on first load
    canvasContainer = id;

    //div will point to where Canvas will be created on document
    div = document.getElementById(id);

    // remove old canvas if already exists
    oldCanvas = document.getElementById("TheCanvas");
    if (oldCanvas) div.removeChild(oldCanvas);

    //Creates the Canvas elemement
    var canvas = document.createElement('canvas');    

    //Defines Canvas id and size it.
    var size = window.innerWidth;

    canvas.id = "TheCanvas";
    canvas.height = (9/16) * size; // ration 16:9
    
    //Defines Canvas Border size
    canvas.style.border = "1px solid";
    
    //Appends Canvas do div container
    div.appendChild(canvas);
}

// reload canvas on window resize
window.addEventListener("resize", function () {
    loadCanvas(canvasContainer);
});
