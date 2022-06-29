import './Error.css';

function Error(props) {
  let error;
  if (props.type === '403') {
    error = 'You dont have permissions to access to this page';
  } else {
    error = "This page doesn't exists";
  }
  return (
    <div className="error-container">
      <p>{error}</p>
    </div>
  );
}

export default Error;
