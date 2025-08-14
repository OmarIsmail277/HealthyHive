import { useState, useMemo } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaAngleDoubleDown,
  FaAngleDoubleUp,
} from "react-icons/fa";

const faqs = [
  {
    question: "What products do you offer?",
    answer:
      "We offer a wide range of healthy food, drinks, personal care products, and bakery items tailored to your wellness needs. Everything is selected to promote natural and sustainable wellness.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, we’ll send you a tracking number via email so you can follow your package every step of the way in real-time.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship within Egypt, but we’re actively working on expanding our delivery areas soon to serve more customers worldwide.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We accept returns within 14 days of delivery for unopened and unused products. Please contact our support team to initiate a refund or exchange, and we’ll guide you through the process smoothly.",
  },
  {
    question: "How do I contact customer service?",
    answer:
      "You can reach us via the contact form on our website, email us at support@healthyhive.com, or call our hotline during business hours. We’re here to help!",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or canceled within 2 hours of placement. Please contact customer service as soon as possible to make changes before the order is processed.",
  },
  {
    question: "Are your products organic and natural?",
    answer:
      "Yes, we carefully select products that are natural, organic, and sustainably sourced to ensure the highest quality and safety for our customers.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 2-4 business days within Egypt. You will receive notifications and tracking updates so you always know when to expect your order.",
  },
  {
    question: "Do you have a loyalty or rewards program?",
    answer:
      "Yes, we offer a loyalty program that rewards you with points for every purchase which you can redeem for discounts on future orders. Sign up today to start earning!",
  },
];

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-300 text-yellow-900 rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function AccordionItem({ question, answer, isOpen, onToggle, searchQuery }) {
  return (
    <div className="border border-green-300 rounded-xl shadow hover:shadow-md transition overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full px-5 py-4 bg-green-100 hover:bg-green-200 transition text-left focus:outline-none focus:ring-2 focus:ring-green-400 text-lg font-semibold text-green-800"
        aria-expanded={isOpen}
      >
        <span>{highlightMatch(question, searchQuery)}</span>
        {isOpen ? (
          <FaChevronUp className="text-green-600 transition-transform duration-300" />
        ) : (
          <FaChevronDown className="text-green-600 transition-transform duration-300" />
        )}
      </button>
      <div
        className={`px-5 text-green-900 text-base border-t border-green-200 leading-relaxed transition-[max-height,opacity,padding] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        {highlightMatch(answer, searchQuery)}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndices, setOpenIndices] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.trim().toLowerCase();
    return faqs.filter(
      ({ question, answer }) =>
        question.toLowerCase().includes(q) || answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleIndex = (index) => {
    setOpenIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  const expandAll = () => {
    setOpenIndices(new Set(filteredFaqs.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenIndices(new Set());
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-24 select-none">
     <h1 className="max-w-4xl mx-auto text-5xl font-bold text-green-700 mb-10 text-center drop-shadow-lg">
  <span className="relative inline-block">
    <span className="relative z-10">FAQs</span>
    <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300 opacity-70 rounded-full transform rotate-1"></span>
  </span>
</h1>
      {/* Search & Controls */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-12">
        <div className="relative flex-grow min-w-0">
          <input
            type="search"
            placeholder="Search FAQs..."
            aria-label="Search FAQs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-green-400 rounded-lg px-5 py-4 pl-12 text-green-800 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-lg bg-white"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />
        </div>

        <div className="flex gap-3">
          <button
            onClick={expandAll}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg shadow transition focus:ring-2 focus:ring-green-500"
          >
            <FaAngleDoubleDown /> Expand All
          </button>
          <button
            onClick={collapseAll}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg shadow transition focus:ring-2 focus:ring-gray-400"
          >
            <FaAngleDoubleUp /> Collapse All
          </button>
        </div>
      </div>

      {/* Centered Accordion */}
      <section className="max-w-3xl mx-auto space-y-6">
        {filteredFaqs.length === 0 ? (
          <p className="text-center text-green-700 text-lg font-semibold mt-20">
            No results found for "{searchQuery}"
          </p>
        ) : (
          filteredFaqs.map(({ question, answer }, i) => (
            <AccordionItem
              key={i}
              question={question}
              answer={answer}
              isOpen={openIndices.has(i)}
              onToggle={() => toggleIndex(i)}
              searchQuery={searchQuery}
            />
          ))
        )}
      </section>
    </main>
  );
}
