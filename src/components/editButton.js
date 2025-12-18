import { Link } from 'react-router-dom';

function EditButton({ path }) {
  return (
    <div className="item">
      {/* {user?.logged && ( */}
      <Link to={path}>
        <div className="edit-btn">Editar</div>
      </Link>
      {/* )} */}
    </div>
  );
}

export default EditButton;