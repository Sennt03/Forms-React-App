import { Link } from 'react-router-dom';
import './Home.css';
import { CardForm } from '../components/CardForm';
import useFetchForms from '../../../infra/services/useFetchForms';
import useDeleteForm from '../../../infra/services/useDeleteForm';

export const HomePage = () => {
  const { forms, loading, setForms } = useFetchForms();

  const { deleteForm } = useDeleteForm();

  const onDelete = (form) => {
    Swal.fire({
      title: 'Confirm delete',
      text: `Are you sure you want to delete '${form.title}' form?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then(async (result) => {
      if (result.isConfirmed) {
        toastr.info('Deleting...');

        const success = await deleteForm(form.id)

        if (success) {
          toastr.success('Form deleted successfully!')

          setForms(prevForm => {
            return prevForm.filter(f => f.id != form.id)
          })
        } else {
          toastr.error('Failed to delete the form')
        }
      }
    });
  };

  return (
    <>
      <header className="header">
        <h1 className="header-title">Forms Created</h1>

        <Link to="/create" className="btn-create">
          <i className="fas fa-plus"></i>
          <p>Create</p>
        </Link>
      </header>
      {/* <hr /> */}

      {forms.length <= 0 && !loading ? (
        <div className="empty">
          <p>There are no forms</p>
          <p>Create one!</p>
        </div>
      ) : (
        <div className="forms">
          {forms.map((form) => (
            <CardForm key={form.id} form={form} onDelete={onDelete} />
          ))}
        </div>
      )}
    </>
  );
};
