import { Link } from 'react-router-dom';
import { formatDate } from '../../../shared/utils/formatDate';
import './Card.css'

export const CardForm = ({ form, onDelete }) => {
  return (
    <>
      <div className="card border-0">
        <div className="position-relative text-white">
          <div className="card-img-overlay three">
            <span className="badge badge-light text-uppercase">Form</span>
            <span onClick={ () => { onDelete(form) } } 
            className="badge badge-light text-uppercase delete">Click to delete <i className="fa-solid fa-trash"></i></span>
          </div>

          <div className="card-smooth-caption">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-auto">
                <h5 className="card-title text-white">{ form.title }</h5>
                <h6 className="card-subtitle text-white">Creado: { formatDate(form.created_at) }</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <p className="card-text">
            Total de preguntas: { form.questions?.length || 0 }
          </p>
        </div>

        <div className="card-footer">
          <div className="media align-items-center">
            <div className="media-body">
              <Link to={ '/play/' + form.id } className="card-link text-primary read-more">
                Click to play
              </Link>
              <Link to={ '/create/' + form.id } className="card-link text-primary read-more">
                Edit form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
