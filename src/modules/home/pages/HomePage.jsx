import { Link } from 'react-router-dom';
import './Home.css'
import { CardForm } from '../components/CardForm';

export const HomePage = () => {

  const forms = [
    {id: '123e', title: 'Prueba title', date: '10 May 2025', total: 10},
    {id: '123e', title: 'Prueba title', date: '10 May 2025', total: 10},
    {id: '123e', title: 'Prueba title', date: '10 May 2025', total: 10},
  ]

  return (
    <>

      <header className='header'>
        <h1 className='header-title'>Forms Created</h1>

        <Link to='/create' className='btn-create'>
          <i className="fas fa-plus"></i>
          <p>Create</p>
        </Link>
      </header>
      {/* <hr /> */}

      {/* <div className="forms">
        {
          forms.map(form => (
            <CardForm key={form.id} form={ form } />
          ))
        }
      </div> */}

      <div className="empty">
        <p>There are no forms</p>
        <p>Create one!</p>
      </div>


    </>
  )
  
};
