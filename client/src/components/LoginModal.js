import React, { PropTypes } from 'react';

const LoginModal = ({ onClick }) => {
  return (
    <div className="login-modal" onClick={() => onClick()}>
      <div className="card">
        <h3 className="card-header">Sign in with Twitter</h3>
        <div className="card-block">
          <a href="/auth/twitter" className="btn btn-secondary modal-btn">Sign in</a>
          <button
            className="btn btn-secondary modal-btn"
            onClick={() => onClick()}
          >Dismiss</button>
        </div>
      </div>
    </div>
  );
};
LoginModal.propTypes = {
  onClick: PropTypes.func,
};

export default LoginModal;
