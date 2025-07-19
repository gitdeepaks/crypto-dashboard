import React from 'react';
import { Link } from 'react-router';


export const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Page Not Found</p>
      <Link to="/" style={styles.link}> Go to Home</Link>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontSize: '24px',
    color: '#333',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.5',
  },
  title: {
    fontSize: '72px',
    marginBottom:'20px'

  },
  message:{
    fontSize:'18px',
    marginBottom:'20px'
  },
  link: {
    textDecoration: 'underline',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  }
}
