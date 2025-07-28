import { useState, useEffect } from "react";
import { useKV } from "@github/spark/hooks";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { brokers as staticBrokers } from "@/lib/data";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Building2,
  ExternalLink,
  Save,
  X,
  RefreshCw
} from "lucide-react";

interface AdminBroker {
  id: string;
  name: string;
  nameAr: string;
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
  website?: string;
  phone?: string;
  email?: string;
  platforms?: string[];
  accountTypes?: string[];
  pros?: string[];
  cons?: string[];
}

export function BrokersManager() {
  // Convert static brokers to admin format
  const convertToAdminBroker = (broker: any): AdminBroker => ({
    id: broker.id,
    name: broker.name,
    nameAr: broker.nameAr || broker.name,
    description: broker.descriptionAr || broker.description,
    rating: broker.rating,
    reviews: broker.reviewCount,
    minDeposit: `${broker.minDeposit} دولار`,
    license: broker.regulation?.join(', ') || '',
    isFeatured: true, // Default all to featured initially
    isScam: false,
    spreadFrom: broker.spreads || '',
    leverage: "متغيرة",
    instruments: "العملات، المعادن، السلع",
    website: broker.website,
    phone: broker.phone,
    email: broker.email,
    platforms: broker.platforms,
    accountTypes: broker.accountTypes,
    pros: broker.pros,
    cons: broker.cons
  });

  const initialBrokers = staticBrokers.map(convertToAdminBroker);

  const [brokers, setBrokers] = useKV("admin-brokers", initialBrokers);
  const [editingBroker, setEditingBroker] = useState<AdminBroker | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBroker, setNewBroker] = useState<Partial<AdminBroker>>({
    name: "",
    nameAr: "",
    description: "",
    rating: 0,
    reviews: 0,
    minDeposit: "",
    license: "",
    isFeatured: false,
    isScam: false,
    spreadFrom: "",
    leverage: "",
    instruments: "",
    website: "",
    phone: "",
    email: ""
  });

  // Sync with static brokers if admin brokers are empty or missing some
  useEffect(() => {
    const syncBrokers = () => {
      const existingIds = brokers.map((b: AdminBroker) => b.id);
      const missingBrokers = staticBrokers
        .filter(staticBroker => !existingIds.includes(staticBroker.id))
        .map(convertToAdminBroker);
      
      if (missingBrokers.length > 0) {
        setBrokers((prev: AdminBroker[]) => [...prev, ...missingBrokers]);
        toast.success(`تم إضافة ${missingBrokers.length} وسيط جديد من البيانات الثابتة`);
      }
    };

    if (brokers.length === 0) {
      setBrokers(initialBrokers);
    } else {
      syncBrokers();
    }
  }, []);

  const handleSyncWithStaticData = () => {
    const updatedBrokers = staticBrokers.map(staticBroker => {
      const existingBroker = brokers.find((b: AdminBroker) => b.id === staticBroker.id);
      if (existingBroker) {
        // Update existing broker while preserving admin settings
        return {
          ...convertToAdminBroker(staticBroker),
          isFeatured: existingBroker.isFeatured,
          isScam: existingBroker.isScam
        };
      }
      return convertToAdminBroker(staticBroker);
    });

    setBrokers(updatedBrokers);
    toast.success("تم تحديث البيانات من المصدر الثابت");
  };

  const handleAddBroker = () => {
    if (!newBroker.name || !newBroker.description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const broker: AdminBroker = {
      ...newBroker as AdminBroker,
      id: newBroker.name?.toLowerCase().replace(/\s+/g, '-') || `broker-${Date.now()}`,
      nameAr: newBroker.nameAr || newBroker.name || ''
    };

    setBrokers((prev: AdminBroker[]) => [...prev, broker]);
    setNewBroker({
      name: "",
      nameAr: "",
      description: "",
      rating: 0,
      reviews: 0,
      minDeposit: "",
      license: "",
      isFeatured: false,
      isScam: false,
      spreadFrom: "",
      leverage: "",
      instruments: "",
      website: "",
      phone: "",
      email: ""
    });
    setShowAddForm(false);
    toast.success("تم إضافة الوسيط بنجاح");
  };

  const handleUpdateBroker = () => {
    if (!editingBroker) return;

    setBrokers((prev: AdminBroker[]) => 
      prev.map(broker => 
        broker.id === editingBroker.id ? editingBroker : broker
      )
    );
    setEditingBroker(null);
    toast.success("تم تحديث الوسيط بنجاح");
  };

  const handleDeleteBroker = (brokerId: string) => {
    setBrokers((prev: AdminBroker[]) => prev.filter(broker => broker.id !== brokerId));
    toast.success("تم حذف الوسيط بنجاح");
  };

  const toggleFeatured = (brokerId: string) => {
    setBrokers((prev: AdminBroker[]) => 
      prev.map(broker => 
        broker.id === brokerId 
          ? { ...broker, isFeatured: !broker.isFeatured }
          : broker
      )
    );
  };

  const toggleScam = (brokerId: string) => {
    setBrokers((prev: AdminBroker[]) => 
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
          <p className="text-muted-foreground">إضافة وتعديل وحذف الوسطاء الماليين ({brokers.length} وسيط)</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSyncWithStaticData} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            مزامنة البيانات
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة وسيط جديد
          </Button>
        </div>
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
                <Label htmlFor="new-name">اسم الوسيط (بالإنجليزية) *</Label>
                <Input
                  id="new-name"
                  value={newBroker.name}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="مثال: Exness"
                />
              </div>
              <div>
                <Label htmlFor="new-nameAr">اسم الوسيط (بالعربية)</Label>
                <Input
                  id="new-nameAr"
                  value={newBroker.nameAr}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, nameAr: e.target.value }))}
                  placeholder="مثال: إكسنيس"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="new-license">الترخيص</Label>
                <Input
                  id="new-license"
                  value={newBroker.license}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, license: e.target.value }))}
                  placeholder="مثال: CySEC, FSA"
                />
              </div>
              <div>
                <Label htmlFor="new-website">الموقع الإلكتروني</Label>
                <Input
                  id="new-website"
                  value={newBroker.website}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://www.example.com"
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

            <div className="grid gap-4 md:grid-cols-4">
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
              <div>
                <Label htmlFor="new-spreadFrom">الفروقات من</Label>
                <Input
                  id="new-spreadFrom"
                  value={newBroker.spreadFrom}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, spreadFrom: e.target.value }))}
                  placeholder="مثال: 0.3 نقطة"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="new-phone">رقم الهاتف</Label>
                <Input
                  id="new-phone"
                  value={newBroker.phone}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1-234-567-890"
                />
              </div>
              <div>
                <Label htmlFor="new-email">البريد الإلكتروني</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newBroker.email}
                  onChange={(e) => setNewBroker(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="support@example.com"
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
                      <Label>اسم الوسيط (بالإنجليزية)</Label>
                      <Input
                        value={editingBroker.name}
                        onChange={(e) => setEditingBroker(prev => ({ 
                          ...prev!, 
                          name: e.target.value 
                        }))}
                      />
                    </div>
                    <div>
                      <Label>اسم الوسيط (بالعربية)</Label>
                      <Input
                        value={editingBroker.nameAr}
                        onChange={(e) => setEditingBroker(prev => ({ 
                          ...prev!, 
                          nameAr: e.target.value 
                        }))}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
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
                    <div>
                      <Label>الموقع الإلكتروني</Label>
                      <Input
                        value={editingBroker.website}
                        onChange={(e) => setEditingBroker(prev => ({ 
                          ...prev!, 
                          website: e.target.value 
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
                      <h3 className="text-lg font-semibold">{broker.nameAr || broker.name}</h3>
                      <span className="text-sm text-muted-foreground">({broker.name})</span>
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
                    <p className="text-muted-foreground mb-3 line-clamp-2">{broker.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>الترخيص: {broker.license}</span>
                      <span>الحد الأدنى: {broker.minDeposit}</span>
                      {broker.website && (
                        <span>الموقع: {broker.website}</span>
                      )}
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