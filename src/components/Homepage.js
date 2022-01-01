import React from 'react'

const Homepage = () => {

    //grab all divs with className of banner-img
    let slides = document.getElementsByClassName("banner-images");


    const showSlides = () => {
        //cycle through the slides and set the display property to none
        //so they are hidden by default
        for(let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        currentSlide++;

        if (currentSlide > slides.length) {
            currentSlide = 1
        }

        if (slides[currentSlide-1]) {
            slides[currentSlide-1].style.display = "block";
        }

        //change image every 5 seconds
        setTimeout(showSlides, 5000);
    }

    /** slideshow */
    let currentSlide = 0;
    showSlides();

    return (
        <div id="homepage">
            <div id="center-container" className='center'>
                <div id="banner">
                    <div className="banner-images">
                        <img className='img-width' src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"/>
                    </div>
                    <div className="banner-images">
                        <img className='img-width' src="https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"/>
                    </div>
                    <div className="banner-images">
                        <img className='img-width' src="https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"/>
                    </div>
                    <div className="banner-images">
                        <img className='img-width' src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
