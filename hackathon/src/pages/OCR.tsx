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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">OCR Document Processing</h2>
        <p className="text-muted-foreground mt-1">
          Upload, process, and verify documents with AI-powered OCR
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="p-8 border-2 border-dashed border-border hover:border-primary transition-colors">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-muted-foreground mt-1">
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
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Documents</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Document</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
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
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{doc.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{doc.date}</td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDoc(doc.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
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
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Document Verifier</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success('Document verified!');
                      setSelectedDoc(null);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve & Verify
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
                    Reject
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
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
