
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

const QuizOfTheDay = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the current repo rate set by RBI as of the latest monetary policy?',
      options: ['6.0%', '6.5%', '7.0%', '5.5%'],
      correctAnswer: 1,
      explanation: 'The RBI has maintained the repo rate at 6.5% in the latest monetary policy review, focusing on balancing inflation control with economic growth.',
      difficulty: 'Easy',
      topic: 'Banking & Economy'
    },
    {
      id: '2',
      question: 'Which country recently signed a new trade corridor agreement with India for maritime routes?',
      options: ['Saudi Arabia', 'UAE', 'Japan', 'Singapore'],
      correctAnswer: 1,
      explanation: 'India and UAE have launched a new maritime trade corridor to enhance bilateral trade and reduce logistics costs between the two nations.',
      difficulty: 'Medium',
      topic: 'International Relations'
    },
    {
      id: '3',
      question: 'What is the target amount for climate financing that India aims to mobilize by 2030?',
      options: ['$1 trillion', '$2.5 trillion', '$500 billion', '$100 billion'],
      correctAnswer: 0,
      explanation: 'India aims to mobilize $1 trillion in climate financing by 2030 as part of its commitment to achieving net-zero emissions by 2070.',
      difficulty: 'Hard',
      topic: 'Environment & Climate'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: 'bg-green-500/20 text-green-300 border-green-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      Hard: 'bg-red-500/20 text-red-300 border-red-500/30',
    };
    return colors[difficulty as keyof typeof colors];
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <Card className="glass-card border-purple-400/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl font-bold text-white mb-4">
              {percentage}%
            </div>
            <p className="text-purple-100 text-lg">
              You scored {score} out of {questions.length} questions correctly!
            </p>
            
            <div className={`inline-block px-4 py-2 rounded-full ${
              percentage >= 80 ? 'bg-green-500/20 text-green-300' :
              percentage >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {percentage >= 80 ? '🏆 Excellent!' :
               percentage >= 60 ? '👍 Good Job!' :
               '📚 Keep Learning!'}
            </div>

            <Button
              onClick={resetQuiz}
              className="mt-4 bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Answer Review */}
        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={question.id} className="glass-card border-purple-400/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="text-white font-medium mb-2">{question.question}</p>
                    <p className="text-purple-100 text-sm">{question.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="glass-card border-purple-400/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              ❓ Quiz of the Day
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
              <span className="text-purple-300 text-sm">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-purple-800/40 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-coachify-purple-primary to-coachify-purple-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-coachify-purple-light text-sm font-medium">
                📚 {question.topic}
              </span>
            </div>
            <h3 className="text-white text-lg font-medium leading-relaxed">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-coachify-purple-primary/30 border-coachify-purple-primary text-white'
                    : 'bg-purple-800/20 border-purple-600/30 text-purple-100 hover:bg-purple-700/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white disabled:opacity-50"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizOfTheDay;
