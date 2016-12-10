function showNumberAnimation(i,j,randNum){
    var numberCell = $('#number-cell-'+i+"-"+j);
    numberCell.css('background-color',getNumberBackgroundColor(randNum));
    numberCell.css('color',getNumberColor(randNum));
    numberCell.text(randNum);
    numberCell.animate({
    	width:"100px",
    	height:"100px",
    	top:getPosTop(i,j),
    	left:getPosLeft(i,j)
    },50)
}


function showMoveAnimation(fromx,fromy,tox,toy){
     var numberCell = $('#numberCell-'+'fromx'+'-'+'fromy');
     numberCell.animate({
     	top: getPosTop(tox,toy),
     	left: getPosLeft(tox,toy),
     });


}