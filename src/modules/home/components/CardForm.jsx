import './Card.css'

export const CardForm = ({ form }) => {
  return (
    <>
      <div class="card border-0">
        <div class="position-relative text-white">
          <div class="card-img-overlay three">
            <span class="badge badge-light text-uppercase">Form</span>
          </div>

          <div class="card-smooth-caption">
            <div class="d-flex justify-content-between align-items-center">
              <div class="mr-auto">
                <h5 class="card-title text-white">{ form.title }</h5>
                <h6 class="card-subtitle text-white">Creado: { form.date }</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body">
          <p class="card-text">
            Total de preguntas: { form.total }
          </p>
        </div>

        <div className="card-footer">
          <div className="media align-items-center">
            <div className="media-body">
              <a className="card-link text-primary read-more" href="javascript://">
                Click to start
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
