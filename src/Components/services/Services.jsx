import './Services.css'

function Services() {
    return (
        <>
            <div className="services-body-container">
                <div className='services-context-container'>
                    <div className='tite-container'>
                        Services
                    </div>

                    <div className='context-container'>
                        <div className='context-paragraph'>
                            <span className='context-paragraph-title'>Personalized Recommendations</span>
                            <span className='context-paragraph-context'>
                            Book Store 123 employs knowledgeable staff who can provide personalized book recommendations based on individual customer preferences. 
                            This service helps customers discover new titles that align with their interests, creating a more tailored shopping experience.
                            </span>

                            <span className='context-paragraph-context'>
                            Staff Expertise: <br/>Knowledgeable employees can engage with customers to understand their reading preferences and recommend titles accordingly. 
                            For instance, if a customer enjoys strong character development, staff can suggest books that fit this criterion, as seen in personalized selections made for family members during gift-giving seasons.
                            </span>

                            <span className='context-paragraph-context'>
                            Algorithmic Recommendations: <br/>Our bookstore leverages technology to provide recommendations. 
                            For example, platforms like Bookclubs use algorithms to analyze users reading lists and ratings to suggest books they are likely to enjoy. 
                            This method can include features such as &quot;You may also like&quot; suggestions based on previous purchases.
                            </span>
                        </div>

                        <div className='context-paragraph'>
                            <span className='context-paragraph-title'>Online Services</span>
                            <span className='context-paragraph-context'>
                            We offer online shopping options, including mail orders and in-store pickup. 
                            This convenience allows customers to browse and purchase books from home while still benefiting from local services.
                            </span>

                            <span className='context-paragraph-context'>
                            Online Shopping Options: <br/>Our bookstore provides online shopping platforms where customers can browse and purchase books. Options typically include mail orders shipped directly to the customer&apos;s home or in-store pickup for items ordered online. 
                            </span>

                            <span className='context-paragraph-context'>
                            Inventory Management: <br/>Advanced online systems help manage stock efficiently, allowing bookstores to keep track of inventory and avoid selling out-of-stock items.
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Services;