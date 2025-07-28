import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Building2,
  ExternalLink,
  Save,
  X
} from "lucide-react";

interface Broker {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  minDeposit: string;
  license: string;
  isFeatured: boolean;
  isScam: boolean;
  spreadFrom: string;
  leverage: string;
  instruments: string;
}

export function BrokersManager() {
  const [brokers, setBrokers] = useKV("admin-brokers", [
    {
      id: "exness",
      name: "Exness",
      description: "وسيط عالمي موثوق يوفر تداول العملات والمعادن مع سبريد منخفض",
      rating: 4.5,
      reviews: 1250,
      minDeposit: "1 دولار",
      license: "CySEC, FSA",
      isFeatured: true,
      isScam: false,
      spreadFrom: "0.3",
      leverage: "1:2000",
      instruments: "العملات، المعادن، السلع"
    },
    {
      id: "avatrade",
      name: "AvaTrade",
      description: "منصة تداول شاملة مع أدوات تحليل متقدمة وحساب إسلامي",
      rating: 4.2,
      reviews: 980,
      minDeposit: "100 دولار",
      license: "ASIC, CBI",
      isFeatured: true,
      isScam: false,
      spreadFrom: "0.9",
      leverage: "1:400",
      instruments: "العملات، الأسهم، السلع"
    }
  ]);

  const [editingBroker, setEditingBroker] = useState<Broker | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBroker, setNewBroker] = useState<Partial<Broker>>({
    name: "",
    description: "",
    rating: 0,
    reviews: 0,
    minDeposit: "",
    license: "",
    isFeatured: false,
    isScam: false,
    spreadFrom: "",
    leverage: "",
    instruments: ""
  });

  const handleAddBroker = () => {
    if (!newBroker.name || !newBroker.description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const broker: Broker = {
      ...newBroker as Broker,
      id: newBroker.name?.toLowerCase().replace(/\s+/g, '-') || `broker-${Date.now()}`
    };

    setBrokers(prev => [...prev, broker]);
    setNewBroker({
      name: "",
      description: "",
      rating: 0,
      reviews: 0,
      minDeposit: "",
      license: "",
      isFeatured: false,
      isScam: false,
      spreadFrom: "",
      leverage: "",
      instruments: ""
    });
    setShowAddForm(false);
    toast.success("تم إضافة الوسيط بنجاح");
  };

  const handleUpdateBroker = () => {
    if (!editingBroker) return;

    setBrokers(prev => 
      prev.map(broker => 
        broker.id === editingBroker.id ? editingBroker : broker
      )
    );
    setEditingBroker(null);
    toast.success("تم تحديث الوسيط بنجاح");
  };

  const handleDeleteBroker = (brokerId: string) => {
    setBrokers(prev => prev.filter(broker => broker.id !== brokerId));
    toast.success("تم حذف الوسيط بنجاح");
  };

  const toggleFeatured = (brokerId: string) => {
    setBrokers(prev => 
      prev.map(broker => 
        broker.id === brokerId 
          ? { ...broker, isFeatured: !broker.isFeatured }
          : broker
      )
    );
  };

  const toggleScam = (brokerId: string) => {
    setBrokers(prev => 
      prev.map(broker => 
        broker.id === brokerId 
          ? { ...broker, isScam: !broker.isScam }
          : broker
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة الوسطاء</h2>
          <p className="text-muted-foreground">إضافة وتعديل وحذف الوسطاء الماليين</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة وسيط جديد
        </Button>
      </div>

      {/* Add Broker Form */}
      {showAddForm && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              إضافة وسيط جديد
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="new-name">اسم الوسيط *</Label>
                <Input
                  id="new-name"
                  value={newBroker.name}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="مثال: Exness"
                />
              </div>
              <div>
                <Label htmlFor="new-license">الترخيص</Label>
                <Input
                  id="new-license"
                  value={newBroker.license}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, license: e.target.value }))}
                  placeholder="مثال: CySEC, FSA"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="new-description">الوصف *</Label>
              <Textarea
                id="new-description"
                value={newBroker.description}
                onChange={(e) => setNewBroker(prev => ({ ...prev, description: e.target.value }))}
                placeholder="وصف مختصر للوسيط"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="new-rating">التقييم</Label>
                <Input
                  id="new-rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={newBroker.rating}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="new-reviews">عدد التقييمات</Label>
                <Input
                  id="new-reviews"
                  type="number"
                  value={newBroker.reviews}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="new-minDeposit">الحد الأدنى للإيداع</Label>
                <Input
                  id="new-minDeposit"
                  value={newBroker.minDeposit}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, minDeposit: e.target.value }))}
                  placeholder="مثال: 100 دولار"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddBroker} className="gap-2">
                <Save className="h-4 w-4" />
                حفظ الوسيط
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Brokers List */}
      <div className="grid gap-4">
        {brokers.map((broker) => (
          <Card key={broker.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {editingBroker?.id === broker.id ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>اسم الوسيط</Label>
                      <Input
                        value={editingBroker.name}
                        onChange={(e) => setEditingBroker(prev => ({ 
                          ...prev!, 
                          name: e.target.value 
                        }))}
                      />
                    </div>
                    <div>
                      <Label>الترخيص</Label>
                      <Input
                        value={editingBroker.license}
                        onChange={(e) => setEditingBroker(prev => ({ 
                          ...prev!, 
                          license: e.target.value 
                        }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>الوصف</Label>
                    <Textarea
                      value={editingBroker.description}
                      onChange={(e) => setEditingBroker(prev => ({ 
                        ...prev!, 
                        description: e.target.value 
                      }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleUpdateBroker} size="sm" className="gap-2">
                      <Save className="h-4 w-4" />
                      حفظ
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingBroker(null)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{broker.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{broker.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({broker.reviews} تقييم)
                        </span>
                      </div>
                      {broker.isFeatured && (
                        <Badge className="bg-green-100 text-green-800">مميز</Badge>
                      )}
                      {broker.isScam && (
                        <Badge variant="destructive">محتال</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{broker.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>الترخيص: {broker.license}</span>
                      <span>الحد الأدنى: {broker.minDeposit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={broker.isFeatured ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeatured(broker.id)}
                    >
                      {broker.isFeatured ? "إلغاء التمييز" : "تمييز"}
                    </Button>
                    
                    <Button
                      variant={broker.isScam ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => toggleScam(broker.id)}
                    >
                      {broker.isScam ? "إلغاء التحذير" : "تحذير"}
                    </Button>

                    <Link to={`/cadmin/brokers/${broker.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Building2 className="h-4 w-4" />
                        المحتوى
                      </Button>
                    </Link>

                    <Link to={`/broker/${broker.id}`} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        معاينة
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingBroker(broker)}
                      className="gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBroker(broker.id)}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {brokers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد وسطاء</h3>
            <p className="text-muted-foreground mb-4">ابدأ بإضافة أول وسيط للموقع</p>
            <Button onClick={() => setShowAddForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة وسيط جديد
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}