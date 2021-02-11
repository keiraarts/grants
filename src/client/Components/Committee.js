import React from 'react';
import { Link } from "react-router-dom";

import '../styles.scss';

export default function Committee() {
  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Genesis Grants Committee
      </div>
      <div className='text-s margin-top-s text-desc'>
        Our shared love of art, music, and design
      </div>
      <div className='page-container margin-top'>
        <div className='text-m'>Committee Members</div>
        <div className='text-s'>Tim Kang / illestrater</div>
      </div>
    </div>
  );
}