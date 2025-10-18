import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';

export default function NavbarWrapper(props) {
   const [update, setUpdate] = useState(false);
    const location = useLocation();

    useEffect(() => {
        function getNavLinksArray() {
            return Array.from(document.getElementsByClassName("navbar__link"));
        }

        const navLinks = getNavLinksArray();
        const half = Math.floor(navLinks.length / 2);

        for (let i = 0; i < half; i++) {
            const firstHalfElement = navLinks[i];
            const secondHalfElement = navLinks[i + half];

            if (firstHalfElement.classList.contains("navbar__link--active")) {
                secondHalfElement.classList.remove("display-none");

            } else {
                secondHalfElement.classList.add("display-none");
            }

        }

        setUpdate(navLinks)
    }, []);

  return (
    <NavbarLayout>
      <NavbarContent />
    </NavbarLayout>
  );
}
