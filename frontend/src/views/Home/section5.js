import React from 'react';

export default function Section5 () {
    return(
        <section className="my-5">
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-lg-6 my-5">
                        <h3 className="fs-1 fw-bold lh-1 mb-5">Funding thanks to EcoBots</h3>
                        <p className="fs-5 fw-normal lh-base mb-4">EcoBots is featuring options for NGOs, companies, and also individuals who want to benefit the environment. Explain your project to EcoBots, and see what funding opportunities are available to you!</p>
                        <a href="/chat" className="btn btn-success btn-lg mx-1" data-controller="track" data-track-category="Signup" data-track-action="Signup Redirect" data-action="track#send">Try it now</a>
                    </div>
                    <div className="col col-12 col-lg-6">
                        <div className="c-faq__entry bg-white rounded-3 shadow-sm u-hover-lift mb-2">
                            <button className="btn border-0 c-faq__entry-question px-3 pe-5 py-3 w-100 d-block text-start bg-white rounded-md" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false">
                                How does EcoBots help the environment?
                            </button>
                            <div className="collapse" id="collapse1">
                                <div className="fs-6 fw-normal lh-base px-3 pe-5 overflow-auto">
                                    <p>EcoBots develops artificial intelligence models for ecology. We are currently featuring 3 different ai models: EcoTeacher, EcoFunding and a custom model for our users to use ecobots with their own data. <br/><br/>
                                    1. EcoTeacher is our default conversational model that teaches you about ecological steps to take in your daily life and about current environmental concerns. <br/><br/>
                                    2. Ecofunding is a custom model for user within the EU to apply to ecological funing programs proposed by the EU, by their county, region, or city. <br/><br/> 
                                    3. Our custom model is made for users and companies that want to use the ecobots models with their own data.</p>
                                </div>
                            </div>
                        </div>

                        <div className="c-faq__entry bg-white rounded-3 shadow-sm u-hover-lift mb-2">
                            <button className="btn border-0 c-faq__entry-question px-3 pe-5 py-3 w-100 d-block text-start bg-white rounded-md" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false">
                                How can I get funding thanks to Ecobots?
                            </button>
                            <div className="collapse" id="collapse2">
                                <div className="fs-6 fw-normal lh-base px-3 pe-5 overflow-auto">
                                    <p>EcoBots proposes different AI models one of them being the EcoFunding. This model allows users to enter information about their current project, company, organization and for the model to give information about the open grants wihtin the EU, or their respective country, region or city. This applies to ecological companies, software, hardware, tech, farmers, and many more types of companies.</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="c-faq__entry bg-white rounded-3 shadow-sm u-hover-lift mb-2">
                            <button className="btn border-0 c-faq__entry-question px-3 pe-5 py-3 w-100 d-block text-start bg-white rounded-md" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false">
                                What types of funding can I get?
                            </button>
                            <div className="collapse" id="collapse3">
                                <div className="fs-6 fw-normal lh-base px-3 pe-5 overflow-auto">
                                    <p>EcoBots gives information about funding for: Agriculture & Rural Development, Culture & Media, Research & Innovation, Environment & Energy, Transport & Infrastructure, Regional & Urban Development, Employment & Social Innovation, Digital & Technology, Education & Training, Humanitarian Aid & Civil Protection, Health, Justice & Home Affairs, Youth, Fisheries & Maritime Affairs, External Relations & Foreign Affairs, Development & Cooperation, Enterprise & Industry.</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="c-faq__entry bg-white rounded-3 shadow-sm u-hover-lift mb-2">
                            <button className="btn border-0 c-faq__entry-question px-3 pe-5 py-3 w-100 d-block text-start bg-white rounded-md" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false">
                                What's the difference between EcoBots, EcoTeacher and EcoFunding
                            </button>
                            <div className="collapse" id="collapse4">
                                <div className="fs-6 fw-normal lh-base px-3 pe-5 overflow-auto">
                                    <p>EcoBots is the name of our association. We are a group of people who develop AI models for ecology. <br/><br/>
                                    EcoTeacher is a model we developed and that is teacher users about ecological issues and gives plans on actions to take to fight the ecological problems.<br/><br/>
                                    EcoFunding is another model of ours that is showing users within the EU what grants and funding opportunities they have.</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="c-faq__entry bg-white rounded-3 shadow-sm u-hover-lift mb-2">
                            <button className="btn border-0 c-faq__entry-question px-3 pe-5 py-3 w-100 d-block text-start bg-white rounded-md" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false">
                                Can I use EcoBots with my personal/company data?
                            </button>
                            <div className="collapse" id="collapse5">
                                <div className="fs-6 fw-normal lh-base px-3 pe-5 overflow-auto">
                                    <p>Ecobots features an AI model that allows users to use the other with their custom data. You can use this feature by getting in touch with the Ecobots team. You can do so by writing a message to contact.at.ecobots.ai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}