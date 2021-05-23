$(function (){
    // this will run when the document loads

    // get target image
    image = $("#animate-image");
    containerDiv = $("#container-div");
    tHeight = containerDiv.height();
    tWidth = containerDiv.width();
    animateImage(image, tWidth, tHeight);
});

function animateImage(image, tWidth, tHeight){

    // get the difference between the starting height and the target height
    heightDif = image.height() - tHeight;
    widthDif = image.width() - tWidth;

    // for the left, we need to shift it by half of the target image size so it fits in the container properly at the end
    leftBase = tWidth / 2;

    // this animates the height and width
    $(image).css({ height: image.height(), width: image.width() }).animate({
        height: tHeight,
        width: tWidth
    },
    // this this part shifts the left and top in a parabolic arch
    {
        duration: 1000,
        easing: "swing",
        step: function(t, fx){

            // the left value
            x = image.width() - tWidth;
            b = widthDif / 2;
            
            // the flatness of the arc, higher is more flat
            flatness = 1.5;
            tarLeft = ((-1*(x-b)**2 + b**2) / (b*flatness)) + leftBase;
            

            // the height value
            x = image.height() - tHeight;
            b = heightDif / 2;
            
            // the flatness of the arc, higher is more flat
            flatness = 4;
            tarTop = (-1*(x-b)**2 + b**2) / (b*flatness);

            // rotates the image slightly as it zooms
            rotate = (-1*(x-b)**2 + b**2) / (b*flatness);

            $(this).css({ left: tarLeft, top: tarTop, transform: "translate(-50%, 0%) rotate(" + rotate + "deg)" });
        }
    });
}

