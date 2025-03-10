import './Loading.css'

export const Loading = ({ show }) => {
  return (
    show && <div className="lmask"></div>
  );
};
