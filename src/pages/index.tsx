import { useState } from 'react';
import styles from './index.module.css';
const normalBorad: 0[][] = [
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
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>(normalBorad);
  const newUserInputs: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(userInputs));
  //0はなし,1は左,2は旗,3は?
  const [bombMap, setBombMap] = useState<(0 | 1)[][]>(normalBorad);
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
  let zeroList: { x: number; y: number }[];
  let playCount = 0;
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
  //x,yの周りのボムの数
  const check8 = (x: number, y: number) => {
    let bombCount = 0;
    for (const direction of directions) {
      let newX = x + direction[0];
      let newY = y + direction[1];
      if (
        bombMap[newY] !== undefined &&
        bombMap[newY][newX] !== undefined &&
        bombMap[newY][newX] === 1
      ) {
        bombCount += 1;
      }
    }
    return bombCount;
  };

  const checkBombNum = () => {
    let bombCount = 0;
    for (let x = 0; x < bombMap.length; x++) {
      for (let y = 0; y < bombMap[x].length; y++) {
        if (newUserInputs[y][x] === 1) {
          if (board[y][x] === 0) {
            for (let direction of directions) {
              let newX = x + direction[0];
              let newY = y + direction[1];
              board[newY][newX] = check8(newX, newY);
            }
          }
          board[y][x] = bombCount;
          bombCount = 0;
        }
      }
    }
  };
  //１から9をランダムに生成する
  const getRandom = () => Math.floor(Math.random() * 9);
  //ボム生成
  const firstRandom = () => {
    let newX = getRandom();
    let newY = getRandom();
    if (newBombMap[newY][newX] === 1) {
      firstRandom();
    } else {
      console.log('newxy', newX, newY);
      newBombMap[newY][newX] = 1;
    }
  };
  //computed→計算値
  const onClick = (x: number, y: number) => {
    //1回目の処理
    if (isPlaying === false) {
      newBombMap[y][x] = 1;
      for (let n = 0; n < 10; n++) {
        firstRandom();
      }
      newBombMap[y][x] = 0;
      setBombMap(newBombMap);
    }
    console.log('x,y', x, y);
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
