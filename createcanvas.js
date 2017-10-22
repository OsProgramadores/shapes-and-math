function loadCanvas(id) {
    //Creates the Canvas elemement
    var canvas = document.createElement('canvas');
    div = document.getElementById(id);
    var context = canvas.getContext('2d');
    canvas.id = "TheCanvas";
    canvas.width = 1224;
    canvas.height = 768;
    //context.canvas.width  = window.innerWidth/2;
    //context.canvas.height = window.innerHeight/2;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "4px solid";
    //Appends Canvas do div container
    div.appendChild(canvas);
}
