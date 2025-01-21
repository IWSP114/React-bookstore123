import './About.css'

function About() {
    return (
        <>
            <div className="about-body-container">
                <div className="about-context-container">
                    <span className="about-context">
                        This project is made by Wong Sin Pun. A Polyu SPEED Year 2 student.
                    </span>

                    <span className="about-context">
                        <br />
                        This project is my first time practicing the React library, which may 
                        contain many bugs/flaws. In this project, I have learned many ways to 
                        achieve new technology like hooks. While doing this project, I 
                        encountered many difficulties, like understanding the useMemo and 
                        useCallback hooks. Through learning some example codes from 
                        YouTube tutorials and AI, I roughly understand those hooks usage.
                    </span>
                </div>
            </div>
        </>
    );
}

export default About;