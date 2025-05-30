
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Clock, Users, Filter, CheckCircle } from 'lucide-react';
import { CourseData } from '../CourseBuilder';

interface StepThreeProps {
  courseData: CourseData;
  updateCourseData: (field: keyof CourseData, value: any) => void;
}

const StepThree = ({ courseData, updateCourseData }: StepThreeProps) => {
  const [filter, setFilter] = useState('all');

  const mentors = [
    {
      id: 'rajesh-kumar',
      name: 'Rajesh Kumar',
      speciality: 'Quantitative Aptitude',
      rating: 4.9,
      experience: '12 years',
      students: '15,000+',
      language: 'Hindi/English',
      image: '/placeholder.svg',
      subjects: ['qa'],
      achievements: ['IIM Alumnus', 'CAT 99.8%ile']
    },
    {
      id: 'priya-sharma',
      name: 'Priya Sharma',
      speciality: 'Verbal Ability & RC',
      rating: 4.8,
      experience: '10 years',
      students: '12,000+',
      language: 'English',
      image: '/placeholder.svg',
      subjects: ['varc'],
      achievements: ['Published Author', 'XLRI Alumna']
    },
    {
      id: 'amit-verma',
      name: 'Amit Verma',
      speciality: 'Logical Reasoning',
      rating: 4.9,
      experience: '15 years',
      students: '20,000+',
      language: 'Hindi/English',
      image: '/placeholder.svg',
      subjects: ['lrdi'],
      achievements: ['FMS Alumnus', 'CAT Topper']
    },
    {
      id: 'sneha-patel',
      name: 'Sneha Patel',
      speciality: 'Data Interpretation',
      rating: 4.7,
      experience: '8 years',
      students: '8,000+',
      language: 'English/Gujarati',
      image: '/placeholder.svg',
      subjects: ['lrdi'],
      achievements: ['IIMA Alumna', 'Industry Expert']
    },
    {
      id: 'rohit-singh',
      name: 'Rohit Singh',
      speciality: 'All Sections',
      rating: 4.9,
      experience: '18 years',
      students: '25,000+',
      language: 'Hindi/English',
      image: '/placeholder.svg',
      subjects: ['qa', 'varc', 'lrdi'],
      achievements: ['IIMB Alumnus', 'CAT 100%ile', 'Master Trainer']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Mentors' },
    { id: 'qa', label: 'Quant' },
    { id: 'varc', label: 'Verbal' },
    { id: 'lrdi', label: 'Reasoning' }
  ];

  const filteredMentors = filter === 'all' 
    ? mentors 
    : mentors.filter(mentor => mentor.subjects.includes(filter));

  const toggleMentor = (mentorId: string) => {
    const currentMentors = courseData.mentors;
    const newMentors = currentMentors.includes(mentorId)
      ? currentMentors.filter(id => id !== mentorId)
      : [...currentMentors, mentorId];
    
    updateCourseData('mentors', newMentors);
  };

  return (
    <div>
      <p className="text-purple-200 mb-6">
        Choose your mentors based on your focus areas. Each mentor brings unique expertise and teaching style.
      </p>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filterOption) => (
          <motion.button
            key={filterOption.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(filterOption.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === filterOption.id
                ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                : 'glass-card text-purple-200 hover:text-white border border-purple-400/30'
            }`}
          >
            <Filter className="w-3 h-3 inline mr-1" />
            {filterOption.label}
          </motion.button>
        ))}
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMentors.map((mentor, index) => {
          const isSelected = courseData.mentors.includes(mentor.id);
          
          return (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleMentor(mentor.id)}
              className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'glass-card-selected border-2 border-orange-400' 
                  : 'glass-card border border-purple-400/30 hover:border-purple-400/60'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{mentor.name}</h3>
                  <p className="text-purple-200 text-sm mb-2">{mentor.speciality}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{mentor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-purple-300" />
                      <span className="text-purple-200 text-sm">{mentor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-purple-300" />
                      <span className="text-purple-200 text-sm">{mentor.students}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {mentor.achievements.map((achievement, idx) => (
                      <span key={idx} className="bg-purple-600/30 text-purple-200 text-xs px-2 py-1 rounded-full">
                        {achievement}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-orange-400 font-bold text-sm">
                    ₹1,999 per mentor
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {courseData.mentors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-xl"
        >
          <p className="text-green-300 text-sm">
            ✅ Excellent! You've selected {courseData.mentors.length} mentor{courseData.mentors.length > 1 ? 's' : ''} for your journey.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StepThree;
