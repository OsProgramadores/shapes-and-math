let canvasContainer = null;

const loadCanvas = (id) => {
    // save container id on first load
    canvasContainer = id;

    //div will point to where Canvas will be created on document
    div = document.getElementById(id);
    //Creates the Canvas elemement
    const canvas = document.createElement('canvas');    

    //Defines Canvas id and size it.
    let size = 0.9 * window.innerWidth;

    canvas.id = "canvas";
    canvas.width = size
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
