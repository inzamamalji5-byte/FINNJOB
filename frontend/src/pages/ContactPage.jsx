import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@finnjob.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+358 40 123 4567",
      description: "Mon-Fri, 9am-6pm EET",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Helsinki, Finland",
      description: "Kamppi, 00100",
    },
  ];

  const supportLinks = [
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find answers to common questions",
    },
    {
      icon: Book,
      title: "Help Center",
      description: "Detailed guides and tutorials",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
    },
  ];

  return (
    <main className="flex-1 pt-20" data-testid="contact-page">
      {/* Hero */}
      <section className="bg-white">
        <div className="container-finn py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-heading font-semibold text-5xl text-finn-slate-900 tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-finn-slate-600">
              Have questions? We're here to help. Reach out and our team will get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-finn-slate-50 py-12">
        <div className="container-finn">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-finn-slate-100 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-finn-slate-900 mb-1">
                  {info.title}
                </h3>
                <p className="font-medium text-finn-slate-700 mb-1">{info.value}</p>
                <p className="text-finn-slate-500 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Support */}
      <section className="section bg-white">
        <div className="container-finn">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-semibold text-3xl text-finn-slate-900 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-finn-slate-700 mb-2 block">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="h-12 rounded-xl border-finn-slate-200"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-finn-slate-700 mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="h-12 rounded-xl border-finn-slate-200"
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-finn-slate-700 mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="h-12 rounded-xl border-finn-slate-200"
                    data-testid="contact-subject-input"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-finn-slate-700 mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                    rows={6}
                    className="rounded-xl border-finn-slate-200 resize-none"
                    data-testid="contact-message-input"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-8 rounded-full bg-finn-slate-900 text-white hover:bg-finn-slate-800"
                  data-testid="contact-submit-button"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-semibold text-3xl text-finn-slate-900 mb-6">
                Support Resources
              </h2>
              <p className="text-finn-slate-600 mb-8">
                Need help faster? Check out these resources for quick answers.
              </p>

              <div className="space-y-4">
                {supportLinks.map((link) => (
                  <div
                    key={link.title}
                    className="flex items-start gap-4 p-4 bg-finn-slate-50 rounded-2xl hover:bg-finn-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                      <link.icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-finn-slate-900">{link.title}</h3>
                      <p className="text-finn-slate-600 text-sm">{link.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-finn-slate-100 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-finn-slate-400 mx-auto mb-2" />
                  <p className="text-finn-slate-500">Helsinki, Finland</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
