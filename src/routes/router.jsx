import { Link, Route, Routes } from 'react-router-dom';
import { HomePage } from '../modules/home';
import { FormPage } from '../modules/formManagment';

export const Router = () => {
  const onMenuToggle = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');

    menuBtnChange();
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('#btn');

    if (sidebar.classList.contains('open')) {
      closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<FormPage />} />
      </Routes>
    </>
  );
};
