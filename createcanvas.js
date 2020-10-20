function loadCanvas(id) {
    //div will point to where Canvas will be created on document
    div = document.getElementById(id);

    //Creates the Canvas elemement
    var canvas = document.createElement('canvas');    

    //Defines Canvas id and size it.
    var size = window.innerWidth;

    canvas.id = "TheCanvas";
    canvas.width = size;
    canvas.height = (9/16) * size;
    
    //Defines Canvas Border size
    canvas.style.border = "1px solid";
    
    //Appends Canvas do div container
    div.appendChild(canvas);
}
