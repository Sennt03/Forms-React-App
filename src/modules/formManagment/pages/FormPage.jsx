import { Link } from 'react-router-dom'
import './Form.css'

export const FormPage = () => {
  
  return (
    <>
      <div className="sidebar open">
        <div className="logo-details">
          {/* <i className="far fa-file-alt icon"></i> */}
          <div className="logo_name">Questions</div>
          {/* <i className="bx bx-menu" id="btn" onClick={onMenuToggle}></i> */}
        </div>
        <ul className="nav-list">
          <li className='add-btn question'>
              <p>Question 1</p>
              <p className='type'><i className="fas fa-check-circle"></i> Select</p>
          </li>
          <li className='add-btn add'>
              <div className="icon-add">
                <i className="fas fa-plus"></i>
              </div>
              <p>Add Question</p>
          </li>
        </ul>
      </div>

      <section className="home-section">

        <header className='header-create'>
          <input className='input-title' name='title' type="text" placeholder='Enter title...' />
          <div className="buttons">
            <Link to='/' className="icon-back">
              <i className="fas fa-arrow-left"></i>
            </Link>
            <button className='icon-save'>
              <i className="fas fa-save"></i>
            </button>
            {/* <button className='btn-push'>Publicize</button> */}
            <button className='btn-push'>Unpublish</button>
          </div>
        </header>


      </section>
    </>
  )
}
