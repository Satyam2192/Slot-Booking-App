import React from 'react';

function Footer() {
  return (
    <footer className="py-4 bg-white dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300 border-t">
      <p>© {new Date().getFullYear()} Slot Booking Application</p>
    </footer>
  );
}

export default Footer;
