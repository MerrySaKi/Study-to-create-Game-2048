function getPosTop(i, j) {
	return 20 + i * 120;
}

function getPosLeft(i, j) {
	return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
	switch (number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
	}
	return "black"

}

function getNumberColor(e) {
	if (e <= 4)
		return "#776e65";
	return "white"
}

function nospace(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0)
				return false;
		};
	};
	return true;
}

//判断是否能够向左移动；
function canMoveLeft(board) {
	for (var i = 0; i < 4; i++)
		for (var j = 1; j < 4; j++)
			if (board[i][j] != 0)
				if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
					return true;

	return false;
}
//判断是否ij 和ik之间有没有障碍物有则return true； 有障碍物则返回 false；
function canMoveRight(board) {
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 3; j++)
			if (board[i][j] != 0)
				if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1])
					return true;
	return false;
}

function canMoveTop(board) {
	for (var i = 1; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (board[i][j] != 0)
				if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j])
					return true;
	return false;
}

function canMoveDown(board) {
	for (var i = 2; i >=0; i--)
		for (var j = 0; j < 4; j++)
			if(board[i][j]!=0)
                if(board[i+1][j]==0||board[i][j]==board[i+1][j])
                	return true;
    return false;
}


function noBlockHorizontalX(row, coll, coll2, board) {
	for (var i = coll + 1; i < coll2; i++)
		if (board[row][i] != 0)
			return false;
	return true;
}



function noBlockHorizontalY(row, row2, coll, board) {
	for (var i = row + 1; i < row2; i++)
		if (board[i][coll] != 0)
			return false;
	return true;
}

function upDataScroe(){
	$('#scroe').text(scroe);
}