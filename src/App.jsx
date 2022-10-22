import { useState } from 'react';

export const App = () => {
  const [isGameStart, setisGameStart] = useState(false);
  const [board, setBoard] = useState([]);
  const [dummy, setDummy] = useState(true);
  const [SIZE, setSIZE] = useState();
  const [style, setStyle] = useState({});

  const lifeCycle = () => {
    const temp = [];
    board.forEach((el) => {
      let aliveCount = 0;
      if (board.find(item => item.column === el.column - 1 && item.row === el.row - 1 && item.status === 'alive')) aliveCount++;
      if (board.find(item => item.column === el.column && item.row === el.row - 1 && item.status === 'alive')) aliveCount++;
      if (board.find(item => item.column === el.column + 1 && item.row === el.row - 1 && item.status === 'alive')) aliveCount++;
      if (board.find(item => item.column === el.column - 1 && item.row === el.row && item.status === 'alive')) aliveCount++;
      if (board.find(item => item.column === el.column + 1 && item.row === el.row && item.status === 'alive')) aliveCount++;
      if (board.find(item => item.column === el.column - 1 && item.row === el.row + 1 && item.status === 'alive')) aliveCount++;
      if (board.find(item => item.column === el.column && item.row === el.row + 1 && item.status === 'alive')) aliveCount++;
      if (board.find(item => item.column === el.column + 1 && item.row === el.row + 1 && item.status === 'alive')) aliveCount++;
      if (el.status === 'dead' && aliveCount === 3) temp.push({ id: el.id, status: 'alive' })
      else if (el.status === 'alive' && !(aliveCount === 2 || aliveCount === 3)) temp.push({ id: el.id, status: 'dead' })
    })

    temp.forEach((el) => {
      board[el.id].status = el.status;
    })

    setDummy(prevState => !prevState);
  }

  const handleStartGame = () => {
    setisGameStart(true);
    setInterval(lifeCycle, 1000);
  }

  const handleSizeChange = (e) => {
    setSIZE(e.target.value);
  }

  const handleNextScreen = (e) => {
    setStyle({
      gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
      width: `${SIZE * 20}px`,
      height: `${SIZE * 20}px`,
    });

    e.target.closest('.screen').classList.add('up');

    const tempBoard = [];
    for (let i = 0; i < SIZE ** 2; i++) {
      const el = {
        id: i,
        row: Math.floor(i / SIZE) + 1,
        column: (i % SIZE) + 1,
        status: 'dead',
      }
      tempBoard[i] = el;
    }
    setBoard(tempBoard);
    console.log(board)
  }

  const blockClickHandler = (e) => {
    if (!isGameStart) {
      board[e.target.id].status === 'dead' ? board[e.target.id].status = 'alive' : board[e.target.id].status = 'dead';
      setDummy(!dummy);
    }
  }

  return (
    <>
      <div className="screen">
        <h2 className="title">Игра Жизнь</h2>
        <input value={SIZE} onChange={handleSizeChange} type="number" placeholder='Введите размер стороны поля' />
        <button onClick={handleNextScreen} className='startBtn'>Перейти к старту</button>
      </div>
      <div className="screen second">
        <div className="container">
          <div style={style} className="board" id='board'>
            {board.map(el => {
              return <div onClick={blockClickHandler} id={el.id} key={el.id} className={el.status + " block " + isGameStart}></div>
            })}

          </div>
          <button onClick={handleStartGame} hidden={isGameStart} className='startBtn second'>Начать игру</button>
        </div>
      </div>

    </>
  );
}
