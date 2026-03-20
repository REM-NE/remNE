import { Link } from 'react-router-dom';

function PathButton({ path, text }) {
  return (
    <div className="item">
      {/* {user?.logged && ( */}
      <Link className="w-100" to={path}>
        <div className="botao-noticias btn">{text}</div>
      </Link>
      {/* )} */}
    </div>
  );
}

export default PathButton;