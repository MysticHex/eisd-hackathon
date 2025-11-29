import { useState } from 'react';
import { Upload, FileText, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/badge-status';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function OCR() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const documents = [
    { id: 'DOC-2401', name: 'Invoice_Q4_2024.pdf', status: 'verified' as const, date: '2024-01-15' },
    { id: 'DOC-2402', name: 'PO_12345.pdf', status: 'processed' as const, date: '2024-01-15' },
    { id: 'DOC-2403', name: 'Delivery_Note_789.pdf', status: 'pending' as const, date: '2024-01-14' },
    { id: 'DOC-2404', name: 'Contract_2024.pdf', status: 'verified' as const, date: '2024-01-14' },
    { id: 'DOC-2405', name: 'Receipt_98765.pdf', status: 'pending' as const, date: '2024-01-13' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast.success(`Uploading ${files.length} document(s)...`);
      // Simulate upload
      setTimeout(() => {
        toast.success('Documents uploaded successfully!');
      }, 1500);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">OCR Document Processing</h2>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Upload, process, and verify documents with AI-powered OCR
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="p-6 md:p-8 border-2 border-dashed border-border hover:border-primary transition-colors">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4">
            <div className="p-3 md:p-4 bg-primary/10 rounded-full">
              <Upload className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-base md:text-lg font-medium text-foreground">
                Drop files here or click to upload
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Supports PDF, JPG, PNG files up to 10MB
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </label>
      </Card>

      {/* Documents List */}
      <Card className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Recent Documents</h3>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">ID</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Document</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Date</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-foreground">{doc.id}</td>
                  <td className="py-3 px-3 md:px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-xs md:text-sm text-foreground truncate max-w-[150px] md:max-w-none">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 md:px-4">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="py-3 px-3 md:px-4 text-xs md:text-sm text-muted-foreground whitespace-nowrap">{doc.date}</td>
                  <td className="py-3 px-3 md:px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDoc(doc.id)}
                      className="text-xs md:text-sm"
                    >
                      <Eye className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                      <span className="hidden md:inline">View</span>
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Verifier Modal (Simple version) */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">Document Verifier</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Image Preview */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Document Preview</h4>
                <div className="bg-muted/30 rounded-lg aspect-[3/4] flex items-center justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>

              {/* Extracted Data Form */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Extracted Data</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Invoice Number</label>
                    <input
                      type="text"
                      defaultValue="INV-2024-001"
                      className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Amount</label>
                    <input
                      type="text"
                      defaultValue="$1,250.00"
                      className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Vendor</label>
                    <input
                      type="text"
                      defaultValue="Acme Corp"
                      className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Date</label>
                    <input
                      type="text"
                      defaultValue="2024-01-15"
                      className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success('Document verified!');
                      setSelectedDoc(null);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-xs md:text-sm">Approve & Verify</span>
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      toast.error('Document rejected');
                      setSelectedDoc(null);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    <span className="text-xs md:text-sm">Reject</span>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-xs md:text-sm"
                  onClick={() => setSelectedDoc(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
