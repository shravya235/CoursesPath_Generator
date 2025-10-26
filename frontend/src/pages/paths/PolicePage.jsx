import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import policeImage from '../../assets/images/police.jpg';

// Hardcoded Data for Police
const pathData = {
  pathName: "Police",
  overview: "A career in police service involves maintaining law and order, preventing crime, and ensuring public safety. It includes various roles from constable to officer positions in state and central police forces.",
  keyMilestones: ["Complete Class 12 (Any Stream)", "Physical Fitness and Training", "Clear Police Entrance Exams", "Basic Training", "Specialization (CID, Traffic, etc.)", "Career Advancement"],
  eligibilityCriteria: "Class 12 pass from any stream. Age limits apply (usually 18-25 years). Physical fitness standards mandatory.",
  entranceExams: ["State Police Constable Exams", "SSC CPO (Central Police Organization)", "UPSC Civil Services (for IPS)", "State SI Exams"],
  topCollegesIndia: ["Police Training Colleges (e.g., Sardar Vallabhbhai Patel National Police Academy)", "State Police Academies", "Central Police Training Institutes", "National Police Academy Hyderabad"],
  coreSubjects: ["Criminal Law", "Constitutional Law", "Forensic Science", "Investigation Techniques", "Traffic Management", "Community Policing", "Physical Training", "Firearms Training"],
  careerOpportunities: ["Police Constable", "Sub-Inspector", "Inspector", "DSP", "SP", "DIG", "IGP", "DGP", "CID Officer"],
  salaryExpectationsINR: "Approx. ₹3 LPA - ₹15 LPA+ (Varies by rank, state, and central services)",
  skillsRequired: ["Physical Fitness", "Discipline", "Integrity", "Communication", "Problem-Solving", "Crisis Management", "Attention to Detail", "Teamwork"]
};

const PolicePage = () => {
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
            <img src={policeImage} alt="Indian Police Officer in uniform interacting respectfully with a civilian on a typical street in India, conveying professionalism and community service" className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
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

export default PolicePage;
