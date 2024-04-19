import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { BackToTopButton } from './elements';

const BackToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {showButton && (
                <BackToTopButton onClick={scrollToTop}>
                    <FaArrowUp />
                </BackToTopButton>
            )}
        </>
    );
};

export default BackToTop;
