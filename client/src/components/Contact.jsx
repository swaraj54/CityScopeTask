import './Styles/Contact.css'

const Contact = () => {
    return (
        <>
            <section className=" container">
                <div className="card-container contact flex ">
                    <div className="card">
                        <div className='cardAlign'>
                            <p>REACT US AT</p>
                            <div className="content">
                                <p>Support@KickUp.com</p>
                                <p>for any technical support </p>
                            </div>
                            <div className="content">
                                <p>info@KickUp.com</p>
                                <p>for more information</p>
                            </div>
                            <div className="content">
                                <p>feedback@KickUp.com</p>
                                <p>to send your feedback</p>
                            </div>
                            <div className="content">
                                <p>jobs@KickUp.com</p>
                                <p>to work with us</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="touch flex">
                    <div className="social">
                        <p>Stay in Touch</p>
                        <div className="icons flex">
                            <i class="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-facebook"></i>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Contact;
