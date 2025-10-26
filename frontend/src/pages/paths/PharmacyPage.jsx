import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import pharmacyImage from '../../assets/images/pharmacy.jpg';

// Hardcoded Data for Pharmacy
const pathData = {
  pathName: "Pharmacy",
  overview: "Pharmacy involves the science and practice of preparing, dispensing, and reviewing drugs and providing additional clinical services. Pharmacists ensure safe and effective use of medications.",
  keyMilestones: ["Complete Class 12 (Science with PCB)", "Crack Pharmacy Entrance Exams", "B.Pharm Degree (4 years)", "Internship/Registration", "M.Pharm or Pharm.D for Specialization", "Practice or Research"],
  eligibilityCriteria: "Class 12 pass with Physics, Chemistry, and Biology/Mathematics (PCB/PCM) mandatory. Minimum aggregate percentage varies (often 50-60%+).",
  entranceExams: ["GPAT (Graduate Pharmacy Aptitude Test)", "BITSAT", "State Pharmacy Entrance Exams", "JEE Main (for some institutes)"],
  topCollegesIndia: ["National Institute of Pharmaceutical Education and Research (NIPER)", "Jamia Hamdard", "Panjab University", "Birla Institute of Technology and Science (BITS) Pilani", "Manipal College of Pharmaceutical Sciences", "JSS College of Pharmacy", "Delhi Institute of Pharmaceutical Sciences and Research", "Bombay College of Pharmacy", "L.M. College of Pharmacy"],
  coreSubjects: ["Pharmaceutical Chemistry", "Pharmacology", "Pharmaceutics", "Pharmacognosy", "Pharmaceutical Analysis", "Clinical Pharmacy", "Biochemistry", "Microbiology", "Drug Regulatory Affairs"],
  careerOpportunities: ["Community Pharmacist", "Hospital Pharmacist", "Clinical Pharmacist", "Pharmaceutical Researcher", "Drug Inspector", "Medical Representative", "Regulatory Affairs Specialist", "Pharmacy Educator", "Quality Control Analyst"],
  salaryExpectationsINR: "Approx. ₹3 LPA - ₹10 LPA+ (Varies by role, experience, and sector)",
  skillsRequired: ["Attention to Detail", "Analytical Thinking", "Communication", "Ethical Judgment", "Technical Proficiency", "Problem-Solving", "Continuous Learning"]
};

const PharmacyPage = () => {
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
            <img src={pharmacyImage} alt="Pharmacy" className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
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

export default PharmacyPage;
