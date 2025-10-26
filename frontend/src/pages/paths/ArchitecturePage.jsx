import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import architectureImage from '../../assets/images/architecture.jpg';

// Hardcoded Data for Architecture
const pathData = {
  pathName: "Architecture",
  overview: "Architecture involves the design, planning, and construction of buildings and physical structures. It combines art, science, and technology to create functional and aesthetically pleasing spaces.",
  keyMilestones: ["Complete Class 12 (Science with PCM)", "Crack Architecture Entrance Exams", "B.Arch Degree (5 years)", "Internship/Practical Training", "Registration as Architect", "Specialization or Master's"],
  eligibilityCriteria: "Class 12 pass with Physics, Chemistry, and Mathematics (PCM) mandatory. Minimum aggregate percentage varies (often 50-60%+).",
  entranceExams: ["NATA (National Aptitude Test in Architecture)", "JEE Main Paper 2", "JEE Advanced (Architecture Aptitude Test)", "State Architecture Entrance Exams"],
  topCollegesIndia: ["Indian Institute of Technology (IIT) Kharagpur", "National Institute of Technology (NIT) Trichy", "School of Planning and Architecture (SPA) Delhi", "CEPT University Ahmedabad", "Jawaharlal Nehru Architecture and Fine Arts University (JNAFAU)", "Sir JJ College of Architecture Mumbai", "Chandigarh College of Architecture", "Rizvi College of Architecture Mumbai", "Manipal School of Architecture and Planning"],
  coreSubjects: ["Architectural Design", "Building Construction", "Structural Design", "Building Services", "Urban Planning", "Landscape Architecture", "History of Architecture", "Computer-Aided Design (CAD)", "Sustainable Architecture"],
  careerOpportunities: ["Architect", "Urban Planner", "Interior Designer", "Landscape Architect", "Project Manager", "Construction Manager", "Real Estate Developer", "Academician", "Consultant"],
  salaryExpectationsINR: "Approx. ₹4 LPA - ₹12 LPA+ (Varies by experience, specialization, and location)",
  skillsRequired: ["Creativity", "Technical Drawing", "Spatial Awareness", "Problem-Solving", "Communication", "Project Management", "Attention to Detail", "Software Proficiency (AutoCAD, Revit)"]
};

const ArchitecturePage = () => {
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
            <img src={architectureImage} alt="Architecture" className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
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

export default ArchitecturePage;
