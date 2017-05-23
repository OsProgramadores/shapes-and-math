function loadCanvas(id) {
    var canvas = document.createElement('canvas');
    div = document.getElementById(id);
    var context = canvas.getContext('2d');
    canvas.id     = "TheCanvas";
    canvas.width  = 1224;
    canvas.height = 768;
    //context.canvas.width  = window.innerWidth/2;
    //context.canvas.height = window.innerHeight/2;
    canvas.style.zIndex   = 8;
    canvas.style.position = "absolute";
    canvas.style.border   = "4px solid";
    div.appendChild(canvas);

    //Connects 100 random dots
    connectDots(context, selectDots(100,context), get_random_color());
}
