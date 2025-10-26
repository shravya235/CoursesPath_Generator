import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import medicalImage from '../../assets/images/medical.jpg';

// Hardcoded Data for Medical
const pathData = {
  pathName: "Medical",
  overview: "The medical field focuses on the diagnosis, treatment, and prevention of diseases and injuries. It encompasses a wide range of specialties and is essential for maintaining public health and advancing medical science.",
  keyMilestones: ["Complete Class 12 (Science with PCB)", "Crack NEET UG", "MBBS Degree (5.5 years including internship)", "Specialization (MD/MS) or Practice", "Further Specialization (DM/MCh) if needed", "Medical Practice or Research"],
  eligibilityCriteria: "Class 12 pass with Physics, Chemistry, and Biology (PCB) mandatory. Minimum aggregate percentage varies (often 50-60%+).",
  entranceExams: ["NEET UG", "AIIMS MBBS", "JIPMER MBBS", "State CETs (e.g., MHTCET, KCET, COMEDK)"],
  topCollegesIndia: ["AIIMS Delhi", "AIIMS Mumbai", "Christian Medical College (CMC) Vellore", "JIPMER Puducherry", "King George's Medical University (KGMU)", "Maulana Azad Medical College (MAMC)", "Grant Medical College", "Armed Forces Medical College (AFMC)", "St. John's Medical College"],
  coreSubjects: ["Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology", "Forensic Medicine", "Community Medicine", "Clinical Subjects (Medicine, Surgery, Pediatrics, etc.)"],
  careerOpportunities: ["General Physician", "Surgeon", "Pediatrician", "Gynecologist", "Cardiologist", "Neurologist", "Radiologist", "Anesthesiologist", "Medical Researcher"],
  salaryExpectationsINR: "Approx. ₹6 LPA - ₹20 LPA+ (Varies by specialization, experience, and location)",
  skillsRequired: ["Empathy", "Attention to Detail", "Critical Thinking", "Communication", "Stamina", "Ethical Judgment", "Continuous Learning"]
};

const MedicalPage = () => {
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
            <img src={medicalImage} alt="Medical" className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
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

export default MedicalPage;
