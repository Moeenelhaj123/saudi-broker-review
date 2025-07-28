import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, TrendUp } from "@phosphor-icons/react";
import { Broker } from "@/lib/data";

interface BrokerCardProps {
  broker: Broker;
  onCompare?: (broker: Broker) => void;
  isComparing?: boolean;
}

export function BrokerCard({ broker, onCompare, isComparing }: BrokerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-2xl">
              {broker.logo}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{broker.nameAr}</h3>
              <p className="text-sm text-muted-foreground">{broker.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star weight="fill" className="text-accent" size={16} />
            <span className="font-medium text-sm">{broker.rating}</span>
            <span className="text-xs text-muted-foreground">({broker.reviewCount})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {broker.regulation.map((reg) => (
            <Badge key={reg} variant="secondary" className="flex items-center gap-1">
              <Shield size={12} />
              {reg}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">الحد الأدنى للإيداع:</span>
            <span className="font-medium">{broker.minDeposit.toLocaleString('ar-SA')} ريال</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">الفروقات السعرية:</span>
            <span className="font-medium">{broker.spreads}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">المنصات:</span>
            <span className="font-medium text-left">{broker.platforms.length}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {broker.descriptionAr}
        </p>

        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            size="sm"
          >
            <TrendUp size={16} className="ml-1" />
            عرض التفاصيل
          </Button>
          {onCompare && (
            <Button 
              variant={isComparing ? "default" : "outline"}
              size="sm"
              onClick={() => onCompare(broker)}
              className={isComparing ? "bg-accent hover:bg-accent/90" : ""}
            >
              {isComparing ? "إزالة" : "مقارنة"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}