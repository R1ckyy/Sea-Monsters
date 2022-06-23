import React from "react";

export const Header = (props) => {
    const {title} = props;
    return(
        <header className='bg-primary p-4 text-center'>
            <h1 className='display-2 text-white'>{title}</h1>
        </header>
    );
}