import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ title, handleTitleChange, handlePublic, published, handleSave }) => {
  return (
    <header className='header-create'>
      <input value={title}
             onChange={handleTitleChange}
             className='input-title' name='title' type="text" placeholder='Enter title...' />
      <div className="buttons">
        <Link to='/' className="icon-back">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <button className='icon-save' onClick={ handleSave }>
          <i className="fas fa-save"></i>
        </button>
        <button className='btn-push' onClick={handlePublic}>
          { published ? 'Unpublish' : 'Publicize' }
        </button>
      </div>
    </header>
  );
};
