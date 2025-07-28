import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, TrendUp, ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { Broker } from "@/lib/data";

interface BrokerCardProps {
  broker: Broker;
  onCompare?: (broker: Broker) => void;
  isComparing?: boolean;
}

export function BrokerCard({ broker, onCompare, isComparing }: BrokerCardProps) {
  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-lg">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Popular badge for high rated brokers */}
      {broker.rating >= 4.5 && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-accent text-accent-foreground font-medium px-3 py-1">
            الأكثر شعبية
          </Badge>
        </div>
      )}

      <CardContent className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              {broker.logo}
            </div>
            <div>
              <h3 className="font-bold text-xl text-foreground mb-1">{broker.nameAr}</h3>
              <p className="text-sm text-muted-foreground font-medium">{broker.name}</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
            <Star weight="fill" className="text-accent" size={16} />
            <span className="font-bold text-sm">{broker.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({broker.reviewCount.toLocaleString('ar-SA')} تقييم)</span>
        </div>

        {/* Regulations */}
        <div className="flex flex-wrap gap-2 mb-5">
          {broker.regulation.slice(0, 3).map((reg) => (
            <Badge key={reg} variant="outline" className="flex items-center gap-1 border-primary/20 text-primary">
              <Shield size={12} />
              {reg}
            </Badge>
          ))}
          {broker.regulation.length > 3 && (
            <Badge variant="outline" className="text-muted-foreground">
              +{broker.regulation.length - 3}
            </Badge>
          )}
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">الحد الأدنى</p>
            <p className="font-bold text-sm text-foreground">
              {broker.minDeposit === 0 ? "مجاني" : 
               broker.minDeposit < 100 ? `$${broker.minDeposit}` : 
               `$${broker.minDeposit.toLocaleString()}`}
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">الفروقات</p>
            <p className="font-bold text-sm text-foreground">{broker.spreads}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2 mb-6">
          {broker.pros.slice(0, 2).map((pro, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{pro}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
          {broker.descriptionAr}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
            size="sm"
          >
            <TrendUp size={16} className="ml-2" />
            عرض التفاصيل
            <ArrowUpRight size={14} className="mr-1 opacity-70" />
          </Button>
          {onCompare && (
            <Button 
              variant={isComparing ? "default" : "outline"}
              size="sm"
              onClick={() => onCompare(broker)}
              className={`transition-all duration-200 ${
                isComparing 
                  ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-md" 
                  : "hover:bg-muted border-muted-foreground/20"
              }`}
            >
              {isComparing ? "إزالة" : "مقارنة"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}