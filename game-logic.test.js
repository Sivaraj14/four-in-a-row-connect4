const test=require('node:test');
const assert=require('node:assert/strict');
global.window=global;
require('./game-logic.js');
const {emptyBoard,play,result}=global.ConnectFourRules;

test('discs fall to the lowest open row without mutating the prior board',()=>{
  const initial=emptyBoard(),one=play(initial,3,'R'),two=play(one.board,3,'Y');
  assert.equal(one.row,5);assert.equal(two.row,4);assert.equal(initial[5][3],null);
});
test('rejects invalid columns and full columns',()=>{
  assert.equal(play(emptyBoard(),-1,'R'),null);assert.equal(play(emptyBoard(),7,'R'),null);
  const board=Array.from({length:6},()=>Array(7).fill(null));for(let r=0;r<6;r++)board[r][2]='R';assert.equal(play(board,2,'Y'),null);
});
for(const [name,moves] of [
  ['horizontal',[[5,0],[5,1],[5,2],[5,3]]],
  ['vertical',[[2,4],[3,4],[4,4],[5,4]]],
  ['diagonal rising',[[5,0],[4,1],[3,2],[2,3]]],
  ['diagonal falling',[[2,0],[3,1],[4,2],[5,3]]]
])test(`detects ${name} win`,()=>{const board=emptyBoard();for(const [r,c] of moves)board[r][c]='R';assert.equal(result(board,...moves.at(-1)).winner,'R')});
test('detects a full board draw',()=>{const board=Array.from({length:6},(_,r)=>Array.from({length:7},(_,c)=>((r%2)===0)===(c%4<2)?'R':'Y'));assert.equal(result(board,0,0).draw,true)});
