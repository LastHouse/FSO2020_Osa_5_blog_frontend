import React from 'react';

const Footer = () => {
  const footerStyle = {
    color: 'grey',
    fontSize: 14,
  };

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Blog app by Weird Beard {new Date().getFullYear()}
        {'.'}
      </p>
    </div>
  );
};

export default Footer;
