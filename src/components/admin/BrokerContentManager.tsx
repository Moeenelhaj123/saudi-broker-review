import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, ArrowRight, Building2 } from "lucide-react";

interface BrokerContent {
  overview: string;
  tradingPlatforms: string;
  accountTypes: string;
  fees: string;
  regulation: string;
  pros: string[];
  cons: string[];
  conclusion: string;
}

export function BrokerContentManager() {
  const { brokerId } = useParams();
  const [brokers] = useKV("admin-brokers", []);
  const [brokerContent, setBrokerContent] = useKV(`broker-content-${brokerId}`, {
    overview: "",
    tradingPlatforms: "",
    accountTypes: "",
    fees: "",
    regulation: "",
    pros: [],
    cons: [],
    conclusion: ""
  });

  const [tempContent, setTempContent] = useState<BrokerContent>(brokerContent);
  const [newPro, setNewPro] = useState("");
  const [newCon, setNewCon] = useState("");

  const broker = brokers.find((b: any) => b.id === brokerId);

  const handleSave = () => {
    setBrokerContent(tempContent);
    toast.success("تم حفظ محتوى الوسيط بنجاح");
  };

  const addPro = () => {
    if (newPro.trim()) {
      setTempContent(prev => ({
        ...prev,
        pros: [...prev.pros, newPro.trim()]
      }));
      setNewPro("");
    }
  };

  const addCon = () => {
    if (newCon.trim()) {
      setTempContent(prev => ({
        ...prev,
        cons: [...prev.cons, newCon.trim()]
      }));
      setNewCon("");
    }
  };

  const removePro = (index: number) => {
    setTempContent(prev => ({
      ...prev,
      pros: prev.pros.filter((_, i) => i !== index)
    }));
  };

  const removeCon = (index: number) => {
    setTempContent(prev => ({
      ...prev,
      cons: prev.cons.filter((_, i) => i !== index)
    }));
  };

  if (!broker) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">الوسيط غير موجود</h3>
        <p className="text-muted-foreground">لم يتم العثور على الوسيط المطلوب</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">محتوى الوسيط: {broker.name}</h2>
          <p className="text-muted-foreground">إدارة المحتوى التفصيلي لصفحة الوسيط</p>
        </div>
        <Button onClick={handleSave} className="gap-2 mr-auto">
          <Save className="h-4 w-4" />
          حفظ جميع التغييرات
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="platforms">المنصات</TabsTrigger>
          <TabsTrigger value="accounts">أنواع الحسابات</TabsTrigger>
          <TabsTrigger value="fees">الرسوم</TabsTrigger>
          <TabsTrigger value="regulation">التنظيم</TabsTrigger>
          <TabsTrigger value="proscons">المزايا والعيوب</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>نظرة عامة على الوسيط</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="overview">المحتوى</Label>
                <Textarea
                  id="overview"
                  value={tempContent.overview}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    overview: e.target.value 
                  }))}
                  placeholder="اكتب نظرة عامة شاملة عن الوسيط..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms">
          <Card>
            <CardHeader>
              <CardTitle>منصات التداول</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platforms">المحتوى</Label>
                <Textarea
                  id="platforms"
                  value={tempContent.tradingPlatforms}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    tradingPlatforms: e.target.value 
                  }))}
                  placeholder="اكتب عن منصات التداول المتاحة..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>أنواع الحسابات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="accounts">المحتوى</Label>
                <Textarea
                  id="accounts"
                  value={tempContent.accountTypes}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    accountTypes: e.target.value 
                  }))}
                  placeholder="اكتب عن أنواع الحسابات المتاحة..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>الرسوم والعمولات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fees">المحتوى</Label>
                <Textarea
                  id="fees"
                  value={tempContent.fees}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    fees: e.target.value 
                  }))}
                  placeholder="اكتب عن الرسوم والعمولات..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulation">
          <Card>
            <CardHeader>
              <CardTitle>التنظيم والترخيص</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="regulation">المحتوى</Label>
                <Textarea
                  id="regulation"
                  value={tempContent.regulation}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    regulation: e.target.value 
                  }))}
                  placeholder="اكتب عن التنظيم والترخيص..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proscons">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Pros */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">المزايا</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newPro}
                    onChange={(e) => setNewPro(e.target.value)}
                    placeholder="أضف ميزة جديدة..."
                    onKeyPress={(e) => e.key === 'Enter' && addPro()}
                  />
                  <Button onClick={addPro} size="sm">
                    إضافة
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {tempContent.pros.map((pro, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm">{pro}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePro(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">العيوب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newCon}
                    onChange={(e) => setNewCon(e.target.value)}
                    placeholder="أضف عيب جديد..."
                    onKeyPress={(e) => e.key === 'Enter' && addCon()}
                  />
                  <Button onClick={addCon} size="sm">
                    إضافة
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {tempContent.cons.map((con, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm">{con}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCon(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conclusion */}
          <Card>
            <CardHeader>
              <CardTitle>الخلاصة والتوصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="conclusion">المحتوى</Label>
                <Textarea
                  id="conclusion"
                  value={tempContent.conclusion}
                  onChange={(e) => setTempContent(prev => ({ 
                    ...prev, 
                    conclusion: e.target.value 
                  }))}
                  placeholder="اكتب خلاصة وتوصية نهائية..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}