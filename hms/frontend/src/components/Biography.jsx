import React from "react";

const Biography = ({ imageUrl }) => {
    return (
        <>
            <div className="container biography">
                <div className="banner">
                    <img src={imageUrl} alt="whoweare" />
                </div>
                <div className="banner">
                    <p>Biography</p>
                    <h3>Who We Are</h3>
                    <p>
                        ZeeCare Medical Institute is dedicated to providing top-quality healthcare
                        services using cutting-edge technology and a compassionate approach.Ex
                        magnam voluptatum consectetur reprehenderit fugiat recusandae autOur
                        skilled professionals are committed to personalized care, ensuring that every
                        magnam voluptatum consectetur reprehenderit fugiat recusandae aut
                        patient receives the attention they deserve.
                    </p>
                    <p>We are all in 2024!</p>
                    <p>We are working on a MERN STACK PROJECT.</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                        assumenda exercitationem accusamus sit repellendus quo optio dolorum
                        corporis corrupti. Quas similique vel minima veniam tenetur
                        obcaecati atque magni suscipit laboriosam! Veniam vitae minus nihil
                        cupiditate natus provident. Ex illum quasi pariatur odit nisi
                        voluptas illo qui ipsum mollitia. Libero, assumenda?
                    </p>
                    <p>Lorem ipsum dolor sit amet!</p>
                    <p>Coding is fun!</p>
                </div>
            </div>
        </>
    );
};

export default Biography;
