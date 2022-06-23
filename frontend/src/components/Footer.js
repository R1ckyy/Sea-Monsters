import React from "react";
import '../components-css/Footer.css';

export const Footer = (props) => {
    const {copyright} = props;
    let year = new Date().getFullYear();
    return(
        <footer className='bg-dark mt-3 p-3 text-center'>
            <p className='copyright'>&copy; { year } - { copyright.projectName } - authors: <b>{ copyright.authors }</b></p>
        </footer>
    );
}