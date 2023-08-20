import React from 'react';

const ContactUs = () => {
    return <div class="contianer-fuild pt-4" style={{ position: "relative" }}>
        <div class="mx-auto" style={{ width: "fit-content", fontSize: "25px", fontWeight: "600" }}>Contact Us</div>
        <div class="mx-auto mb-4" style={{ width: "250px", border: "1px solid gray" }} />
        <div class="row p-3 mx-5" style={{ position: "relative" }}>
            <form>
                <div class="input-group mb-3 w-75 p-2 mx-auto">
                    <span class="input-group-text" id="basic-addon1"><i class="fa fa-user" style={{ color: "gray", alignItems: "center" }}></i></span>
                    <input type="text" class="form-control" placeholder="Name" aria-label="Username" />
                </div>
                <div class="input-group mb-3 w-75 p-2 mx-auto">
                    <span class="input-group-text" id="basic-addon1"><i class="fa fa-envelope" style={{ color: "gray", alignItems: "center" }}></i></span>
                    <input type="text" class="form-control" placeholder="Email" aria-label="Username" />
                </div>
                <div class="input-group mb-3 w-75 p-2 mx-auto">
                    <span class="input-group-text" id="basic-addon1"><i class="fa fa-phone" style={{ color: "gray", alignItems: "center" }}></i></span>
                    <input type="text" class="form-control" placeholder="Contact" aria-label="Username" />
                </div>
                <div class="input-group mb-3 w-75 p-2 mx-auto">
                    <span class="input-group-text"><i class="fa fa-pencil" style={{ color: "gray", alignItems: "center" }}></i></span>
                    <textarea class="form-control" aria-label="With textarea" placeholder="Message"></textarea>
                </div>
            </form>
        </div>
    </div>;
};

export default ContactUs;
