
import CourseBuilder from "@/components/CourseBuilder";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800" style={{
      background: 'linear-gradient(135deg, #0F0A2E 0%, #1E1B4B 50%, #6B46C1 100%)'
    }}>
      <CourseBuilder />
    </div>
  );
};

export default Index;
