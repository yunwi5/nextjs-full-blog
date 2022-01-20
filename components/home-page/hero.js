import React from 'react';
import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/max.png"
                    alt="Image Showing Photo!"
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I'm Max</h1>
            <p>I'm passionate about web development - especially frontend framework like React and Svelte.</p>
        </section>
    )
};

export default Hero;