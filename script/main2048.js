var board = new Array();
var scroe = 0;
/**
 * 设置一个游戏开始
 * @param  {[type]} ) {	newgame();} [description]
 * @return {[type]}   [description]
 */
$(document).ready(function() {
	newgame();
})

function newgame() {
	/*
	  初始化棋盘格
	 */
	init();
}


function init() {
	//初始化棋盘位置
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		};
	};
	// 设置board的数值为0
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
		};
	};
	//将board的数值传到前端；
	updateboardView();

	//初始化设置两个随机位置的随机数字；
	generateOneNumber();
	generateOneNumber();
	scroe = 0;
}

function updateboardView() {
	$('.number-cell').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var theNumberCell = $('#number-cell-' + i + '-' + j);
			/**
			 * 判断board为0时，NumberCell的样式
			 * 当board不为0时，NumberCell的样式 与显示样式；
			 */

			if (board[i][j] == 0) {
				theNumberCell.css('width', 0);
				theNumberCell.css('height', 0);
				theNumberCell.css('top', getPosTop(i, j) + 50);
				theNumberCell.css('left', getPosLeft(i, j) + 50);
			} else {
				theNumberCell.css('width', '100px');
				theNumberCell.css('height', '100px');
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		};
	};

}

function generateOneNumber() {
	//如果没有空位置，则false；有空余位置则产生随机位置的随机数；
	if (nospace(board)) {
		return false;
	} else {
		//产生随机位置
		var randx = parseInt(Math.floor(Math.random() * 4));
		var randy = parseInt(Math.floor(Math.random() * 4));
		while (true) {
			if (board[randx][randy] == 0)
				break;
			var randx = parseInt(Math.floor(Math.random() * 4));
			var randy = parseInt(Math.floor(Math.random() * 4));
		}
		//产生随机数字
		var randNum = parseInt(Math.random() < 0.5 ? 2 : 4);
		//在随机位置产生随机数字；
		board[randx][randy] = randNum;
		showNumberAnimation(randx, randy, randNum);
	}
}

$(document).keydown(function(event) {
	switch (event.keyCode) {
		case 37:
			if (moveLeft()) {
				generateOneNumber();
				isgameover();
			};
			break;
		case 38:
			if (moveUp()) {
				generateOneNumber();
				isgameover();
			};
			break;
		case 39:
			if (moveRight()) {
				generateOneNumber();
				isgameover();
			};
			break;
		case 40:
			if (moveDown()) {
				generateOneNumber();
				isgameover();
			}
			break;
		default:
			break;

	}
});

//向左侧移动
//MoveLeft
//判断移动时候左侧是否有空余位置，或者数值是否和移动的数值相等，
//如果移动物左侧有空闲位置或者两个数值相等，那么如果之间没有障碍物的话 就移动；
function moveLeft() {
	if (!canMoveLeft(board))
		return false;
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0 && noBlockHorizontalX(i, k, j, board)) {
						//Move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][j] == board[i][k] && noBlockHorizontalX(i, k, j, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;

						scroe+=board[i][k];
						upDataScroe();
						continue;
					}
				};
			}

		};
	};
	setTimeout('updateboardView();', 200)
	return true;
}

function moveRight() {
	if (!canMoveRight(board))
		return false;
	for (var i = 0; i < 4; i++)
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (board[i][k] == 0 && noBlockHorizontalX(i, j, k, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontalX(i, j, k, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						scroe+=board[i][k];
						upDataScroe();
						continue;
					}
				}
			}
		}
	setTimeout('updateboardView()', 200);
	return true;

}

function moveUp() {
	if (!canMoveTop(board))
		return false;
	for (var i = 1; i < 4; i++)
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (board[k][j] == 0 && noBlockHorizontalY(k, i, j, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][j] == board[k][j] && noBlockHorizontalY(k, i, j, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						scroe+=board[k][j];
						upDataScroe();
						continue;
					}
				}
			}
		}
	setTimeout('updateboardView()', 200);
	return true;

}

function moveDown() {
	if (!canMoveDown(board))
		return false;
	for (var i = 2; i >= 0; i--)
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {
					if (board[k][j] == 0 && noBlockHorizontalY(i, k, j, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[k][j] == board[i][j] && noBlockHorizontalY(i, k, j, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						scroe+=board[k][j];
						upDataScroe();
						continue;
					}
				}
			}
		}
	setTimeout('updateboardView()', 200);
	return true;
}

function isgameover() {
        if(nospace(board)&&noMove(board)){
        	gameOver();
        }
}
function noMove(board){
    if(canMoveLeft(board)||canMoveRight(board)||canMoveTop(board) ||canMoveDown(board))
      	return false;
    return true;
}
function gameOver(){
	window.alert('游戏结束，您的分数是:'+scroe);
}