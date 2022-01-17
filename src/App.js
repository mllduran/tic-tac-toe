import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Games</h1>
      <nav
       style={{
         borderBottom: "solid 1px",
         paddingBottom: "1rem"
       }}
      >
        <Link to="/tik-tac-toe">Tic-Tac-Toe</Link> | { " " }
        <Link to="/game2">Game 2</Link>
      </nav>
    </div>
  )
};

export default App;