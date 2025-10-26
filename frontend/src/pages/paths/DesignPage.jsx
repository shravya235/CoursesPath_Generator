import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import designImage from '../../assets/images/design.jpg';

// Hardcoded Data for Design
const pathData = {
  pathName: "Design",
  overview: "Design encompasses creative fields like graphic design, UX/UI design, fashion design, and industrial design. It involves conceptualizing and creating visual solutions to communicate ideas and solve problems.",
  keyMilestones: ["Complete Class 12 (Any Stream)", "Bachelor's in Design (B.Des) or Fine Arts", "Build Portfolio", "Internships", "Specialization or Freelance Work", "Advanced Degrees or Certifications"],
  eligibilityCriteria: "Class 12 pass from any stream. Some institutes may require a portfolio or entrance exam. Minimum aggregate percentage varies (often 50%+).",
  entranceExams: ["NID DAT", "NIFT Entrance Exam", "UCEED", "CEED", "MIT DAT", "Srishti Entrance Exam"],
  topCollegesIndia: ["National Institute of Design (NID) Ahmedabad", "National Institute of Fashion Technology (NIFT) Delhi", "Indian Institute of Technology (IIT) Bombay (Design)", "Srishti Institute of Art, Design and Technology", "MIT Institute of Design Pune", "Pearl Academy", "Symbiosis Institute of Design", "UID Ahmedabad", "DJ Academy of Design"],
  coreSubjects: ["Visual Communication", "Typography", "Color Theory", "Drawing and Illustration", "Digital Tools (Adobe Suite)", "User Experience Design", "Product Design", "Fashion Design", "Design Thinking"],
  careerOpportunities: ["Graphic Designer", "UX/UI Designer", "Product Designer", "Fashion Designer", "Art Director", "Creative Director", "Design Consultant", "Freelancer", "Design Educator"],
  salaryExpectationsINR: "Approx. ₹3 LPA - ₹12 LPA+ (Varies by specialization, experience, and location)",
  skillsRequired: ["Creativity", "Visual Thinking", "Technical Proficiency", "Communication", "Problem-Solving", "Attention to Detail", "Adaptability", "Portfolio Development"]
};

const DesignPage = () => {
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
            <img src={designImage} alt="Design" className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
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

export default DesignPage;
