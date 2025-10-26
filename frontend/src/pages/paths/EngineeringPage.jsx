import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import engineeringImage from '../../assets/images/engineering.jpg';

// Hardcoded Data for Engineering
const pathData = {
  pathName: "Engineering",
  overview: "Engineering involves designing, building, and maintaining engines, machines, structures, and systems using scientific principles. It's a vast field with numerous specializations crucial for India's infrastructure and technological growth.",
  keyMilestones: ["Complete Class 12 (Science with PCM)", "Crack JEE Main/Advanced/State CETs/BITSAT", "B.Tech/B.E. Degree (4 years)", "Specialization/Internships", "M.Tech/MBA (Optional)", "Job Role (e.g., Software Engineer, Civil Engineer, Mechanical Engineer)"],
  eligibilityCriteria: "Class 12 pass with Physics, Chemistry, and Mathematics (PCM) mandatory. Minimum aggregate percentage varies (often 50-60%+).",
  entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "SRMJEEE", "State CETs (e.g., MHTCET, KCET, COMEDK)"],
  topCollegesIndia: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur", "BITS Pilani", "NIT Trichy", "VIT Vellore", "IIIT Hyderabad"],
  coreSubjects: ["Mathematics", "Physics", "Chemistry", "Basic Electrical/Electronics", "Computer Programming", "Mechanics", "Thermodynamics", "Specialization Subjects (e.g., Data Structures, Concrete Technology, Fluid Mechanics)"],
  careerOpportunities: ["Software Developer/Engineer", "Data Scientist", "Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Electronics Engineer", "Chemical Engineer", "Aerospace Engineer", "Project Manager"],
  salaryExpectationsINR: "Approx. ₹4 LPA - ₹15 LPA+ (Varies hugely by college, specialization, and company)",
  skillsRequired: ["Problem-Solving", "Analytical Thinking", "Mathematical Aptitude", "Technical Proficiency", "Creativity", "Teamwork", "Communication"]
};

const EngineeringPage = () => {
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
            <img src={engineeringImage} alt="Engineering" className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
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

export default EngineeringPage;
