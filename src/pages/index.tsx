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
  //0はなし,1は左,2は旗,3は?,4はボムを触った
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
  //-1:未開封, 0:空, 1~8:隣接するボムの数, 9:疑問マーク, 10:旗マーク, 11:ボム
  const isPlaying = bombMap.some((row) => row.includes(1));
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );
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

  //周りのボムの数の探索
  const check8 = (x: number, y: number) => {
    if (board[y] !== undefined && board[y][x] !== undefined && board[y][x] === -1) {
      let bombCount = 0;
      for (const direction of directions) {
        const newX = x + direction[0];
        const newY = y + direction[1];
        if (
          bombMap[newY] !== undefined &&
          bombMap[newY][newX] !== undefined &&
          bombMap[newY][newX] === 1
        ) {
          bombCount += 1;
        }
      }
      if (bombMap[y][x] !== 1) {
        board[y][x] = bombCount;
      }
      if (bombCount === 0) {
        for (const direction of directions) {
          const newX = x + direction[0];
          const newY = y + direction[1];
          check8(newX, newY);
        }
      }
    }
  };
  //bombMapの走査
  const checkBoard = () => {
    for (let x = 0; x < bombMap.length; x++) {
      for (let y = 0; y < bombMap[x].length; y++) {
        if (newUserInputs[y][x] === 1) {
          check8(x, y);
        }
      }
    }
  };
  //１から9をランダムに生成する
  const getRandom = () => Math.floor(Math.random() * 9);
  //ボム生成
  const bombRandom = () => {
    const newX = getRandom();
    const newY = getRandom();
    if (newBombMap[newY][newX] === 1) {
      bombRandom();
    } else {
      newBombMap[newY][newX] = 1;
    }
  };

  const onClick = (x: number, y: number) => {
    newUserInputs[y][x] = 1;
    setUserInputs(newUserInputs);
    //1回目の処理
    if (isPlaying === false) {
      newBombMap[y][x] = 1;
      for (let n = 0; n < 10; n++) {
        bombRandom();
      }
      newBombMap[y][x] = 0;
      setBombMap(newBombMap);
      //ボムは正常に配置可能
      checkBoard();
      // boardUpdate();
    }
    console.log('x,y', x, y);
    //ゲームが終了しているかの確認
  };

  const handleContextMenu = (x: number, y: number) => (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isFailure) {
      if (event.button === 2) {
        if (userInputs[y][x] === 0) {
          console.log('a');
          newUserInputs[y][x] = 2;
        } else if (userInputs[y][x] === 2) {
          console.log('b');
          newUserInputs[y][x] = 3;
        } else if (userInputs[y][x] === 3) {
          console.log('c');
          newUserInputs[y][x] = 0;
        }
      }
      setUserInputs(newUserInputs);
    }
  };

  const finishCheck = () => {
    console.log('game over');
    bombMap.map((row, y) => {
      row.map((value, x) => {
        if (value === 1) {
          board[y][x] = 11;
        }
      });
    });
  };

  // 都度boardを更新;
  const boardUpdate = () => {
    if (isFailure) {
      finishCheck();
    }
    userInputs.map((row, y) => {
      row.map((value, x) => {
        if (value === 2) {
          board[y][x] = 10;
        } else if (value === 3) {
          board[y][x] = 9;
        }
      });
    });
  };

  checkBoard();
  boardUpdate();
  // console.table(bombMap);
  console.table(board);
  console.table(userInputs);
  console.log(isPlaying);
  // console.log(newBombMap.flat().filter(Boolean).length);

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {board.map((row, y) =>
          row.map((num, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={isFailure ? () => finishCheck() : () => onClick(x, y)}
              onContextMenu={handleContextMenu(x, y)}
              style={
                num === -1
                  ? { boxShadow: '4px 4px 3px #fff inset, -4px -4px 3px #808080 inset' }
                  : isPlaying && (num === 9 || num === 10)
                  ? { boxShadow: '4px 4px 3px #fff inset, -4px -4px 3px #808080 inset' }
                  : { boxShadow: '0 0' }
              }
            >
              {/* {board[y][x]} */}
              {isPlaying && (
                <div
                  className={styles.sign}
                  style={{
                    backgroundPositionX: 30 * (1 - num),
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
