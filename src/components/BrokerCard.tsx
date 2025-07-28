import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { Broker } from "@/lib/data";
import { Link } from "react-router-dom";

interface BrokerCardProps {
  broker: Broker;
}

export function BrokerCard({ broker }: BrokerCardProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden">
      <CardContent className="p-6">
        {/* Header with name */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{broker.name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-lg font-medium text-gray-600">{broker.rating}</span>
              <span className="text-gray-400">/</span>
              <span className="text-lg font-medium text-gray-600">4.5</span>
              <Star weight="fill" className="text-blue-500 mr-1" size={20} />
            </div>
          </div>
        </div>

        {/* Trust indicator */}
        <div className="mb-6">
          <Badge className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-700 py-3 rounded-xl font-medium text-sm border-0 hover:bg-green-100">
            <CheckCircle size={16} />
            شركة موثوقة
          </Badge>
        </div>

        {/* Regulatory info */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-medium">التراخيص</span>
            <span className="text-gray-600">{broker.regulation && Array.isArray(broker.regulation) ? broker.regulation.join(', ') : 'مرخص'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-medium">حساب اسلامي</span>
            <span className="text-gray-600">موجود</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium py-3 flex items-center justify-center gap-2"
            asChild
          >
            <a href={broker.website} target="_blank" rel="noopener noreferrer">
              <ArrowRight size={16} />
              زيارة {broker.name}
            </a>
          </Button>
          <Button 
            variant="outline"
            className="px-6 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50"
            asChild
          >
            <Link to={`/broker/${broker.id}`}>
              ملف الشركة
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}