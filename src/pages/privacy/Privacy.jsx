import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './privacy.css';

function Privacy() {
    return (
        <div>
            <Navbar />

            <div className="privacy-container">
                <h1>Privacy Policy from Zina's Cars</h1>

                <h2>CONSUMER PRIVACY STATEMENT</h2>
                <p>
                    At Zina's Cars, we are committed to protecting your privacy. This privacy policy outlines how we collect, use, and
                    protect any personal information we may collect from you. Your privacy and 
                    data security are of utmost importance to our dealership. We want to assure you that we take this matter seriously.
                     Our privacy policy outlines how we handle and safeguard your personal information. By accepting this policy, you 
                     authorize our dealership to use your information to help you obtain the products and services you are seeking.
                     Please carefully review and consider this authorization and privacy statement before accepting it.
                </p>

                <h2>WHERE WE GET INFORMATION ABOUT YOU</h2>
                <p>
                    We collect information about you from various sources, including the details you provide on applications or 
                    forms. We also consider any representations you make to us, 
                    as well as information from your transactions with us, our affiliates, and our business partners. Additionally, we may obtain information
                     from consumer credit reporting agencies and insurance agents or brokers to verify and 
                    enhance the information provided. Our goal is to safeguard your privacy while assisting you in obtaining the desired products and services.
                </p>

                <h2>OUR DEALERSHIP DOES NOT SELL OR RENT INFORMATION ABOUT YOU TO OTHERS</h2>
                <p>
                    To provide you with the products and services you desire, we may share your information within our
                     company and affiliated companies. This includes sharing your financial information for the sole purpose of fulfilling your requests.
                      We may also share your financial information with our affiliates and third parties outside of our dealership for servicing, marketing,
                       or underwriting purposes. Additionally, we may share your information with financial institutions we have a contractual relationship with 
                       for offering financial products. We prioritize the protection of your information and do not disclose it to any other parties unless 
                       required by law. While you cannot prevent these disclosures, you can limit the sharing of your personal information with affiliated and 
                       non-affiliated third parties for marketing purposes. By signing this form, you authorize us to share your nonpublic personal information
                        with affiliated and non-affiliated third parties who may have valuable products or services for you. If you choose to opt-out of sharing
                         your information for marketing purposes, you may not receive offers for other beneficial products and services.
                </p>

                <h2>HOW WE PROTECT ANY NON-PUBLIC PERSONAL INFORMATION WE COLLECT ABOUT YOU</h2>
                <p>
                    We maintain strict safeguards to protect your personal information from unauthorized access. Only authorized individuals with a legitimate business need 
                    have access to it. We expect our vendors, affiliates, and partners to prioritize privacy and safeguard customer information. If a security breach occurs, 
                    we will promptly notify you. We comply with applicable state privacy laws to provide you with enhanced protection. 
                    By accepting our privacy statement, you authorize us to share your information with affiliated and non-affiliated organizations.
                </p>
            </div>

            <Footer />
        </div>
    );
}

export default Privacy;

