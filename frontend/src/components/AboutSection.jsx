import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-black text-center uppercase text-light-text dark:text-white">
          About <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">Gyan Vistara</span>
        </h2>

        <div className="mt-12 space-y-10 text-lg text-gray-900 dark:text-gray-300 text-left md:text-justify">
          <div>
            <h3 className="text-2xl font-bold text-light-text dark:text-white mb-3">Our Mission</h3>
            <p>
              Gyan Vistara empowers every learner to make confident, informed academic and career decisions. Our vision is to unravel the complexities of India's educational landscape and provide students with crystal-clear, personalized roadmaps for success.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-light-text dark:text-white mb-3">What We Do</h3>
            <p>
              Gyan Vistara is a next-generation educational guidance platform that maps out your journey from high school to college and beyond. Our intelligent system analyzes your current educational standing and recommends the best course options, career paths and critical milestones, tailored to your goals and the Indian education system.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-light-text dark:text-white mb-3">How Gyan Vistara Works</h3>
            <ul className="space-y-4 list-inside">
              <li>
                <strong className="text-light-text dark:text-white">Personalized Discovery:</strong> Register and share your education profile. Our platform curates relevant courses and career streams from engineering and medicine to arts, law and design.
              </li>
              <li>
                <strong className="text-light-text dark:text-white">Stepwise Roadmaps:</strong> Explore each path in detail, including important milestones, entrance exams, eligibility, career opportunities, salary expectations and top Indian colleges.
              </li>
              <li>
                <strong className="text-light-text dark:text-white">Continuous Support:</strong> Track your exploration progress, save your favorite paths and access instant assistance through our built-in chatbot.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-light-text dark:text-white mb-3">Our Principles</h3>
            <p>
              Inspired by the Sanskrit phrase meaning "Expansion of Knowledge," Gyan Vistara stands for inclusivity, empowerment and a future without academic confusion. We are dedicated to building a brighter tomorrow—one personalized guide at a time.
            </p>
          </div>
          
          <p className="text-center font-bold text-xl pt-6 text-light-text dark:text-white">
            Begin your journey with Gyan Vistara. Discover, plan, and achieve your educational dreams—step by step.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;