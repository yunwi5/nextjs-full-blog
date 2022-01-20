import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetails) {
    const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Request went wrong!");
    }
}

function ContactForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [errMessage, setErrMessage] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setErrMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus])

    async function sendMessageHandler(event) {
        event.preventDefault();

        // client-side validation

        setRequestStatus("pending");
        try {
            await sendContactData({ email, name, message });
            setRequestStatus("success");
            setEmail('');
            setName('');
            setMessage('');
        } catch (err) {
            setRequestStatus("error");
            setErrMessage(err.message);
        }
    }

    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on its way!"
        };
    } else if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message was sent successfully!"
        };
    } else if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Error!",
            message: errMessage
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help yoU?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        rows="5"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {/* {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />} */}
            {notification && <Notification {...notification} />}
        </section>
    );
}

export default ContactForm;
