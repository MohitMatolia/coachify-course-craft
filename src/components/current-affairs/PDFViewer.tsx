
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PDFDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  publishedDate: string;
  pageCount: number;
  isLocked: boolean;
  thumbnail: string;
}

const PDFViewer = () => {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const pdfDocuments: PDFDocument[] = [
    {
      id: '1',
      title: 'Weekly Current Affairs Digest - January 2025',
      description: 'Comprehensive weekly roundup covering major economic, political, and international developments.',
      category: 'Weekly Digest',
      publishedDate: '2025-01-15',
      pageCount: 24,
      isLocked: false,
      thumbnail: '/api/placeholder/300/400'
    },
    {
      id: '2',
      title: 'Budget 2025: Key Highlights & Analysis',
      description: 'In-depth analysis of Union Budget 2025 with exam-relevant points and sector-wise implications.',
      category: 'Special Report',
      publishedDate: '2025-02-01',
      pageCount: 32,
      isLocked: false,
      thumbnail: '/api/placeholder/300/400'
    },
    {
      id: '3',
      title: 'India-ASEAN Summit: Complete Coverage',
      description: 'Detailed coverage of India-ASEAN summit outcomes, agreements, and strategic partnerships.',
      category: 'International',
      publishedDate: '2025-01-20',
      pageCount: 18,
      isLocked: true,
      thumbnail: '/api/placeholder/300/400'
    },
    {
      id: '4',
      title: 'Environment & Climate: Monthly Review',
      description: 'Environmental policies, climate initiatives, and sustainability measures undertaken globally.',
      category: 'Environment',
      publishedDate: '2025-01-10',
      pageCount: 20,
      isLocked: false,
      thumbnail: '/api/placeholder/300/400'
    }
  ];

  const openPDFViewer = (pdfId: string) => {
    if (pdfDocuments.find(pdf => pdf.id === pdfId)?.isLocked) {
      // Handle locked PDF - could show subscription modal
      return;
    }
    setSelectedPDF(pdfId);
    setIsViewerOpen(true);
  };

  const closePDFViewer = () => {
    setIsViewerOpen(false);
    setSelectedPDF(null);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Weekly Digest': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Special Report': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'International': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Environment': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="space-y-6">
      {/* PDF Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfDocuments.map((pdf, index) => (
          <motion.div
            key={pdf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="glass-card border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
              <CardContent className="p-4">
                {/* Thumbnail */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg border border-purple-500/30 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-purple-300" />
                  </div>
                  
                  {pdf.isLocked && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <Lock className="w-8 h-8 text-yellow-400" />
                    </div>
                  )}

                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(pdf.category)}`}>
                      {pdf.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {pdf.title}
                  </h3>
                  
                  <p className="text-purple-100 text-sm leading-relaxed">
                    {pdf.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-purple-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(pdf.publishedDate).toLocaleDateString()}
                    </div>
                    <span>{pdf.pageCount} pages</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => openPDFViewer(pdf.id)}
                      disabled={pdf.isLocked}
                      className="flex-1 bg-coachify-purple-primary hover:bg-coachify-purple-secondary text-white disabled:opacity-50"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {pdf.isLocked ? 'Premium' : 'View'}
                    </Button>
                    
                    {!pdf.isLocked && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-300 border-purple-400/30 hover:bg-purple-700/30"
                        disabled
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* PDF Viewer Modal */}
      {isViewerOpen && selectedPDF && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closePDFViewer}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                {pdfDocuments.find(pdf => pdf.id === selectedPDF)?.title}
              </h3>
              <Button
                onClick={closePDFViewer}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </Button>
            </div>

            {/* PDF Content Area */}
            <div className="flex-1 p-4 bg-gray-100 overflow-auto">
              <div className="w-full h-full bg-white rounded border shadow-inner flex items-center justify-center">
                {/* Simulated PDF Content */}
                <div className="text-center text-gray-600">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">PDF Content</p>
                  <p className="text-sm">
                    This is a secure PDF viewer. Right-click and download are disabled.
                  </p>
                  <div className="mt-4 space-y-2 text-left max-w-2xl mx-auto">
                    <div className="bg-gray-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">Sample Content Preview:</h4>
                      <p className="text-sm leading-relaxed">
                        • Economic Survey highlights GDP growth projections<br/>
                        • Key policy announcements and their implications<br/>
                        • Sector-wise budget allocations and analysis<br/>
                        • International trade agreements and partnerships<br/>
                        • Environmental initiatives and climate commitments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg flex items-center justify-between">
              <div className="text-sm text-gray-600">
                🔒 Secure viewing mode - Download disabled
              </div>
              <div className="text-sm text-gray-600">
                Page 1 of {pdfDocuments.find(pdf => pdf.id === selectedPDF)?.pageCount}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PDFViewer;
