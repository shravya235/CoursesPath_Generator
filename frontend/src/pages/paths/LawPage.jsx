import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import lawImage from '../../assets/images/law.jpg';

// Hardcoded Data for Law
const pathData = {
  pathName: "Law",
  overview: "Law is the system of rules that a society or government develops to deal with crime, business agreements, and social relationships. It encompasses various branches like criminal law, civil law, corporate law, and more.",
  keyMilestones: ["Complete Class 12 (Any Stream)", "Crack CLAT/AILET/LSAT India", "LLB Degree (3-5 years)", "Internships at Law Firms", "Enroll as Advocate", "Specialization or Higher Studies (LLM)"],
  eligibilityCriteria: "Class 12 pass from any stream. Minimum aggregate percentage varies (often 45-50%+).",
  entranceExams: ["CLAT (Common Law Admission Test)", "AILET (All India Law Entrance Test)", "LSAT India", "State Law Entrance Tests"],
  topCollegesIndia: ["National Law School of India University (NLSIU) Bangalore", "National Academy of Legal Studies and Research (NALSAR) Hyderabad", "Jindal Global Law School (JGLS)", "Gujarat National Law University (GNLU)", "Symbiosis Law School Pune", "Faculty of Law, University of Delhi", "ILS Law College Pune", "Government Law College Mumbai", "Amity Law School"],
  coreSubjects: ["Constitutional Law", "Criminal Law", "Civil Law", "Contract Law", "Tort Law", "Family Law", "Property Law", "Administrative Law", "Legal Research and Writing"],
  careerOpportunities: ["Advocate/Lawyer", "Corporate Lawyer", "Judge", "Legal Consultant", "Public Prosecutor", "Legal Advisor", "Law Professor", "Legal Journalist", "Policy Analyst"],
  salaryExpectationsINR: "Approx. ₹3 LPA - ₹15 LPA+ (Varies by experience, specialization, and sector)",
  skillsRequired: ["Analytical Thinking", "Communication", "Research Skills", "Ethical Judgment", "Negotiation", "Attention to Detail", "Persuasion", "Time Management"]
};

const LawPage = () => {
  return (
    <div className="bg-light-bg dark:bg-[#0a0f23] min-h-screen text-light-text dark:text-gray-100 pt-20 md:pt-24">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
          {pathData.pathName}
        </h1>

        <div className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 md:p-10 border border-gray-200 dark:border-cyan-700/50 shadow-2xl max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300">{pathData.overview}</p>
            <img src={lawImage} alt="Law" className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Key Milestones</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {pathData.keyMilestones.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Eligibility Criteria</h2>
            <p className="text-gray-700 dark:text-gray-300">{pathData.eligibilityCriteria}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Entrance Exams</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {pathData.entranceExams.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Top Colleges in India</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {pathData.topCollegesIndia.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Core Subjects</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {pathData.coreSubjects.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Career Opportunities</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {pathData.careerOpportunities.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Salary Expectations (INR)</h2>
            <p className="text-gray-700 dark:text-gray-300">{pathData.salaryExpectationsINR}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Skills Required</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {pathData.skillsRequired.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>

          <div className="text-center pt-6">
            <Link to="/dashboard" className="text-cyan-500 hover:underline">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawPage;
