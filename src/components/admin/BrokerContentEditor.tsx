import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/butt
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

  id: string;
  overview: string;
import { toast } from "sonner";
import { ArrowRight, Save } from "lucide-react";

interface BrokerContent {
  id: string;
  name: string;
  overview: string;
  advantages: string[];
  
  tradingPlatforms: string;
    overview: "",
  spreadsCommissions: string;
  depositWithdrawal: string;
  customerSupport: string;
    regulation: "",
  contactInfo: string;
  conclusion: string;
}

export function BrokerContentEditor() {
  const { brokerId } = useParams();
  const navigate = useNavigate();
  const [brokers] = useKV("admin-brokers", []);
  const [brokerContent, setBrokerContent] = useKV(`broker-content-${brokerId}`, null);
  
  const [content, setContent] = useState<BrokerContent>({
          "منصات تداول 
    name: "",
        disadvant
    advantages: [],
        tradingPlatfor
    tradingPlatforms: "",
        customerSuppo
    spreadsCommissions: "",
      };
    customerSupport: "",

    contactInfo: "",
  };
  });

  const [advantageInput, setAdvantageInput] = useState("");
  const [disadvantageInput, setDisadvantageInput] = useState("");

  useEffect(() => {
    const broker = brokers.find((b: any) => b.id === brokerId);
    }));
      setContent(prev => ({ ...prev, name: broker.name }));
    i

      }));
      setContent(brokerContent);

      // Initialize with default content
      disadvantages: prev.disa
        id: brokerId || "",
        name: broker?.name || "",
        overview: `يعتبر ${broker?.name || "هذا الوسيط"} من الوسطاء الماليين المتميزين في السوق السعودي، حيث يوفر خدمات تداول متقدمة وموثوقة للمتداولين من جميع المستويات.`,
          variant="ou
          "رسوم تداول منخفضة وتنافسية",
          "منصات تداول متقدمة وسهلة الاستخدام",
          "دعم عملاء متاح على مدار الساعة",
          "تراخيص موثوقة من جهات تنظيمية معترف بها"
        ],
        disadvantages: [
          "قد تكون الخيارات معقدة للمبتدئين",
          "بعض الأدوات المتقدمة تتطلب رسوم إضافية"
        ],
        tradingPlatforms: `يوفر ${broker?.name || "الوسيط"} مجموعة متنوعة من منصات التداول المتقدمة التي تلبي احتياجات جميع أنواع المتداولين، من المبتدئين إلى المحترفين.`,
        accountTypes: `يقدم ${broker?.name || "الوسيط"} عدة أنواع من الحسابات لتناسب مختلف احتياجات المتداولين ومستويات خبرتهم في السوق المالي.`,
        spreadsCommissions: `يتميز ${broker?.name || "الوسيط"} بهيكل رسوم تنافسي وشفاف، حيث يوفر سبريد منخفض وعمولات معقولة على جميع الصفقات.`,
        depositWithdrawal: `يوفر ${broker?.name || "الوسيط"} خيارات متنوعة للإيداع والسحب تناسب العملاء السعوديين، مع ضمان الأمان والسرعة في المعاملات.`,
        customerSupport: `يتميز فريق دعم العملاء في ${broker?.name || "الوسيط"} بالخبرة العالية والاستجابة السريعة، مع توفر الدعم باللغة العربية على مدار الساعة.`,
        regulation: `${broker?.name || "الوسيط"} مرخص ومنظم من قبل هيئات تنظيمية موثوقة، مما يضمن الأمان والحماية لأموال العملاء.`,
        contactInfo: `يمكن التواصل مع ${broker?.name || "الوسيط"} من خلال قنوات متعددة تشمل الهاتف والبريد الإلكتروني والدردشة المباشرة.`,
        conclusion: `بشكل عام، يعتبر ${broker?.name || "هذا الوسيط"} خياراً ممتازاً للمتداولين السعوديين الذين يبحثون عن وسيط موثوق ومتقدم يوفر خدمات تداول عالية الجودة.`
        
      setContent(defaultContent);
     
  }, [brokerId, brokers, brokerContent]);

  const handleSave = () => {
    setBrokerContent(content);
    toast.success("تم حفظ محتوى الوسيط بنجاح");
    

  const addAdvantage = () => {
    if (advantageInput.trim()) {
      setContent(prev => ({
        ...prev,
        advantages: [...prev.advantages, advantageInput.trim()]
      }));
              <Input
    }
  };

  const removeAdvantage = (index: number) => {
    setContent(prev => ({
              
      advantages: prev.advantages.filter((_, i) => i !== index)
        
  };

  const addDisadvantage = () => {
    if (disadvantageInput.trim()) {
      setContent(prev => ({
        ...prev,
        disadvantages: [...prev.disadvantages, disadvantageInput.trim()]
          
      setDisadvantageInput("");
     
  };

  const removeDisadvantage = (index: number) => {
                  ...prev
      ...prev,
      disadvantages: prev.disadvantages.filter((_, i) => i !== index)
    }));
    

        <B
          حفظ جميع التغييرات
      </div>
  );






























































































































          حفظ جميع التغييرات

      </div>

  );
