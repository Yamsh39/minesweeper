import { useState } from 'react';
import styles from './index.module.css';
const normalBoard: 0[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const Home = () => {
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>(normalBoard);
  const newUserInputs: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(userInputs));
  //0はなし,1は左,2は旗,3は?
  const [bombMap, setBombMap] = useState<(0 | 1)[][]>(normalBoard);
  const newBombMap: (0 | 1)[][] = JSON.parse(JSON.stringify(bombMap));
  //1がボム,0が安置
  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  //-1はあけられてない状態、0が空白,1~8が数,9は?、10は旗
  //-1:未開封, 0:空, 1~8:隣接するボムの数, 9:疑問マーク, 10:旗マーク, 11:ボム
  //いったん保存
  // [1, 2, 3, 4, 5, 6, 7, 8, 9],
  // [10, 11, 12, 13, 14, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],

  const isPlaying = bombMap.some((row) => row.includes(1));
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );
  const updatedBoard = bombMap.map((row, y) =>
    row.map((input, x) => (input === 1 ? 10 : board[y][x]))
  );
  // let zeroList: { x: number; y: number }[];
  // let playCount = 0;
  const directions = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  //空白連鎖
  const check8 = (x: number, y: number) => {
    let bombCount = 0;
    for (const direction of directions) {
      const newX = x + direction[0];
      const newY = y + direction[1];
      if (
        bombMap[newY] !== undefined &&
        bombMap[newY][newX] !== undefined &&
        bombMap[newY][newX] === 0
      ) {
        board[newY][newX] = 0;
        check8(newX, newY);
      }
    }
    return bombCount;
  };
  //x,yの周りのボムの数
  const checkBombNum = () => {
    for (let x = 0; x < bombMap.length; x++) {
      for (let y = 0; y < bombMap[x].length; y++) {
        if (newUserInputs[y][x] === 1 && board[y][x] === 0) {
          for (let direction of directions) {
            const bombCount = check8(x, y);
            board[y][x] = bombCount;
          }
        }
      }
    }
  };
  //１から9をランダムに生成する
  const getRandom = () => Math.floor(Math.random() * 9);
  //ボム生成
  const bombRandom = () => {
    let newX = getRandom();
    let newY = getRandom();
    if (newBombMap[newY][newX] === 1) {
      bombRandom();
    } else {
      newBombMap[newY][newX] = 1;
      board[newY][newX] = 10;
    }
  };
  //computed→計算値
  const onClick = (x: number, y: number) => {
    //1回目の処理
    if (isPlaying === false) {
      newBombMap[y][x] = 1;
      for (let n = 0; n < 10; n++) {
        bombRandom();
      }
      newBombMap[y][x] = 0;
      setBombMap(newBombMap);
    }
    console.log('x,y', x, y);
    //ゲームが終了しているかの確認
    if (bombMap[y] !== undefined && bombMap[y][x] !== undefined && isFailure) {
      console.log('game over');
    }
    newUserInputs[y][x] = 1;
    setUserInputs(newUserInputs);
    checkBombNum();
    console.table(newBombMap);
    console.table(board);
    console.log(newBombMap.flat().filter((n) => n === 1).length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {board.map((row, y) =>
          row.map((num, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={() => onClick(x, y)}
              style={
                isPlaying
                  ? {
                      boxShadow:
                        0 > num && num > 8
                          ? '4px 4px 3px #fff inset, -4px -4px 3px #808080 inset'
                          : '0 0',
                    }
                  : { boxShadow: '4px 4px 3px #fff inset, -4px -4px 3px #808080 inset' }
              }
            >
              {isPlaying && (
                <div
                  className={styles.sign}
                  style={{
                    backgroundPosition: 30 * (1 - num),
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
