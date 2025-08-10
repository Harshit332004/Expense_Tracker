import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How can I verify the authenticity of handcrafted products on your platform?",
      answer: "We work closely with our artisans to ensure product authenticity. Each item comes with a certificate of authenticity, detailing the artisan's name, location, and crafting technique used. Additionally, we conduct regular quality checks and provide detailed product descriptions to highlight the handcrafted nature of each piece."
    },
    {
        question: "Do you offer customization options for artisanal products?",
        answer: `Yes, many of our artisans offer customization services. When browsing products, look for the "Customizable" tag. You can then communicate directly with the artisan through our platform to discuss your specific requirements, from size adjustments to personalized designs.`
      },
      {
        question: "What measures do you take to support fair trade and ethical practices?",
        answer: "We are committed to fair trade principles. Our platform ensures artisans receive fair compensation for their work, with transparent pricing structures. We also conduct regular audits of our artisan partners to ensure safe working conditions and sustainable practices. Additionally, we provide resources and training to help artisans grow their businesses ethically."
      },
      {
        question: "How do you handle shipping for fragile handcrafted items?",
        answer: "We understand the delicate nature of many handcrafted products. Our artisans are trained in proper packaging techniques specific to their craft. We also partner with specialized shipping providers experienced in handling fragile items. Each package is insured, and we have a dedicated team to assist with any shipping-related issues to ensure your handcrafted piece arrives safel"
      },
    // ... (other FAQ items)
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
      <p className="text-center text-gray-600 font-semibold text-muted-foreground mb-8">
        Get answers to the frequently asked questions about Karigar
      </p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;