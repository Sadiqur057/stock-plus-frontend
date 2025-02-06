"use client";

import { useState, type FormEvent, useRef } from "react";
import {
  Mail,
  Phone,
  Send,
  User,
  MessageSquare,
  Linkedin,
  Github,
  Facebook,
  Captions,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import ButtonLoader from "../shared/Loader/ButtonLoader";

type FormData = {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS environment variables");
      toast.error("Error sending message. Missing EmailJS configuration.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (formRef.current) {
        const result = await emailjs.sendForm(
          serviceId,
          templateId,
          formRef.current,
          { publicKey: publicKey }
        );
        if (result?.status === 200) {
          toast.success(
            "Message sent successfully! We'll get back to you soon"
          );
          setFormData({
            from_name: "",
            from_email: "",
            subject: "",
            message: "",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="container mx-auto py-20 lg:py-24">
      <div className="border mx-auto rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 lg:p-8 bg-gradient-to-br from-primary/10 to-secondary/10 md:rounded-l-lg flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
              <p className="mb-6 text-gray-700">
                We&apos;d love to hear from you. Whether you have a question
                about our inventory management and invoice solutions, need a
                demo, or anything else, our team is ready to answer all your
                questions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 hover:text-blue-800">
                  <Mail className="h-6 w-6" />
                  <a
                    href="mailto:sadiqur057@gmail.com"
                    className="hover:underline"
                  >
                    sadiqur057@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 hover:text-blue-800">
                  <Phone className="h-6 w-6" />
                  <a href="tel:+8801760521688" className="hover:underline">
                    +8801760521688
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-2">Follow Us</h3>
              <div className="flex gap-3 items-center">
                <a
                  target="_blank"
                  href="https://www.facebook.com/Sadiqur057"
                  aria-label="Visit my Facebook profile"
                  className="hover:text-blue-800"
                >
                  <Facebook size={20} />
                </a>
                <a
                  target="_blank"
                  href="https://www.github.com/Sadiqur057"
                  aria-label="Visit my GitHub profile"
                  className="hover:text-blue-800"
                >
                  <Github size={20} />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/sadiqur057"
                  aria-label="Visit my LinkedIn profile"
                  className="hover:text-blue-800"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          <CardContent className="p-6 lg:p-8">
            <CardTitle className="text-2xl font-semibold mb-3">
              Send Us a Message
            </CardTitle>
            <p className="mb-6 text-gray-700">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </p>
            <form ref={formRef} onSubmit={handleSubmit}>
              {" "}
              {/* Attach the ref to the form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="from_name"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="from_email"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Captions className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Your Subject"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" />
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="pl-10 w-full"
                      placeholder="Your message"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <ButtonLoader /> : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
