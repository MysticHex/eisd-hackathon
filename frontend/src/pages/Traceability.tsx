import { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/badge-status';
import { motion } from 'framer-motion';

export default function Traceability() {
  const [search, setSearch] = useState('');

  const shipments = [
    { id: 'SHP-001', batchNo: 'BATCH-2024-001', supplier: 'Global Parts Inc', status: 'matched' as const, date: '2024-01-15' },
    { id: 'SHP-002', batchNo: 'BATCH-2024-002', supplier: 'Tech Components Ltd', status: 'matched' as const, date: '2024-01-15' },
    { id: 'SHP-003', batchNo: 'BATCH-2024-003', supplier: 'Precision Manufacturing', status: 'mismatch' as const, date: '2024-01-14' },
    { id: 'SHP-004', batchNo: 'BATCH-2024-004', supplier: 'Quality Supplies Co', status: 'matched' as const, date: '2024-01-14' },
    { id: 'SHP-005', batchNo: 'BATCH-2024-005', supplier: 'Industrial Materials', status: 'pending' as const, date: '2024-01-13' },
    { id: 'SHP-006', batchNo: 'BATCH-2024-006', supplier: 'Elite Components', status: 'mismatch' as const, date: '2024-01-13' },
  ];

  const filteredShipments = shipments.filter(
    (s) =>
      s.batchNo.toLowerCase().includes(search.toLowerCase()) ||
      s.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Supply Chain Traceability</h2>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Track and verify shipments across the entire supply chain
        </p>
      </div>

      {/* Search Bar */}
      <Card className="p-3 md:p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by batch number or supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 md:pl-10 text-sm md:text-base"
          />
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-3 md:p-4">
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Total Shipments</p>
          <p className="text-xl md:text-2xl font-bold text-foreground mt-1">342</p>
        </Card>
        <Card className="p-3 md:p-4">
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Verified</p>
          <p className="text-xl md:text-2xl font-bold text-status-success mt-1">285</p>
        </Card>
        <Card className="p-3 md:p-4">
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Mismatches</p>
          <p className="text-xl md:text-2xl font-bold text-status-error mt-1">39</p>
        </Card>
        <Card className="p-3 md:p-4">
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Pending</p>
          <p className="text-xl md:text-2xl font-bold text-status-pending mt-1">18</p>
        </Card>
      </div>

      {/* Shipments Table */}
      <Card className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Recent Shipments</h3>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Shipment ID</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Batch Number</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Supplier</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment, index) => (
                <motion.tr
                  key={shipment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-foreground">{shipment.id}</td>
                  <td className="py-3 px-3 md:px-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-xs md:text-sm text-foreground font-mono">{shipment.batchNo}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 md:px-4 text-xs md:text-sm text-foreground">{shipment.supplier}</td>
                  <td className="py-3 px-3 md:px-4">
                    <StatusBadge status={shipment.status} />
                  </td>
                  <td className="py-3 px-3 md:px-4 text-xs md:text-sm text-muted-foreground whitespace-nowrap">{shipment.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredShipments.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No shipments found matching your search</p>
          </div>
        )}
      </Card>
    </div>
  );
}
