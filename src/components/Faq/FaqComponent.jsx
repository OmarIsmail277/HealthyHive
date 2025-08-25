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
      "Once your order ships, we’ll give you a tracking number that you can follow your package status with it.",
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
      "Orders can be modified or canceled as long as they are not out for delievery.",
  },
  {
    question: "Are your products organic and natural?",
    answer:
      "Yes, we carefully select products that are natural, organic, and sustainably sourced to ensure the highest quality and safety for our customers.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes one hour. You will receive notifications and tracking updates so you always know when to expect your order.",
  },
  {
   question: "Who is your delivery service courier provider?",
answer: "Our delivery service is handled by Full Speed Services for Delivery, based in Alexandria.",
  },
  {question: "Who cooks your bakery and meals?",
answer: "We work with a professional cloud kitchen based in Alexandria, ensuring that every item meets our high quality and safety standards.",
}
];

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-green-200 text-green-900 rounded px-1 font-semibold"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function AccordionItem({ question, answer, isOpen, onToggle, searchQuery }) {
  return (
    <div className="border border-green-200 rounded-2xl shadow-md hover:shadow-lg transition bg-white/90 backdrop-blur-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full px-6 py-5 bg-white hover:bg-green-50 transition text-left focus:outline-none focus:ring-2 focus:ring-green-400 text-lg font-semibold text-green-800"
        aria-expanded={isOpen}
      >
        <span>{highlightMatch(question, searchQuery)}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <FaChevronUp className="text-green-600" />
          ) : (
            <FaChevronDown className="text-green-600" />
          )}
        </span>
      </button>
      <div
        className={`px-6 text-green-900 text-base leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100 py-5" : "max-h-0 opacity-0 py-0"
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
    <main className="min-h-screen relative py-20 px-6 md:px-12 lg:px-24 select-none overflow-hidden">
      {/* Animated Logo Background */}
      <div
        className="absolute inset-0 opacity-10 animate-[moveBg_60s_linear_infinite]"
        style={{
          backgroundImage: "url('/images/logo.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "120px",
        }}
      ></div>

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative z-10">
        {/* Title */}
        <div className="text-center pb-12">
          <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800">
            Frequently <span className="text-primary">Asked Questions</span>
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        {/* Search & Controls */}
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-14">
          <div className="relative flex-grow min-w-0">
            <input
              type="search"
              placeholder="Search FAQs..."
              aria-label="Search FAQs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-green-300 rounded-xl px-5 py-4 pl-12 text-green-800 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-lg bg-white shadow-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={expandAll}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md transition transform hover:scale-105"
            >
              <FaAngleDoubleDown /> Expand All
            </button>
            <button
              onClick={collapseAll}
              className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 px-5 py-3 rounded-xl shadow-md transition transform hover:scale-105"
            >
              <FaAngleDoubleUp /> Collapse All
            </button>
          </div>
        </div>

        {/* Accordion */}
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
      </div>

      {/* Background animation keyframes */}
      <style>{`
        @keyframes moveBg {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 1000px; }
        }
      `}</style>
    </main>
  );
}
