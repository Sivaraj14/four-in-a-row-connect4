(() => {
  const ROWS=6,COLS=7;
  function emptyBoard(){return Array.from({length:ROWS},()=>Array(COLS).fill(null))}
  function play(board,column,player){if(!Number.isInteger(column)||column<0||column>=COLS||!['R','Y'].includes(player))return null;for(let row=ROWS-1;row>=0;row--)if(!board[row][column]){const next=board.map(r=>r.slice());next[row][column]=player;return {board:next,row,column}}
    return null}
  function result(board,row,column){const player=board[row][column],directions=[[0,1],[1,0],[1,1],[1,-1]],cells=[];for(const [dr,dc] of directions){let line=[[row,column]];for(const sign of [-1,1]){let r=row+dr*sign,c=column+dc*sign;while(r>=0&&r<ROWS&&c>=0&&c<COLS&&board[r][c]===player){line.push([r,c]);r+=dr*sign;c+=dc*sign}}if(line.length>=4)return {winner:player,cells:line.slice(0,4)}}if(board.every(r=>r.every(Boolean)))return {draw:true,cells:[]};return null}
  window.ConnectFourRules={ROWS,COLS,emptyBoard,play,result};
})();
