export interface Broker {
  id: string;
  name: string;
  nameAr: string;
  rating: number;
  reviewCount: number;
  regulation: string[];
  minDeposit: number;
  spreads: string;
  platforms: string[];
  accountTypes: string[];
  website: string;
  phone: string;
  email: string;
  description: string;
  descriptionAr: string;
  pros: string[];
  cons: string[];
  fees: {
    commission: string;
    withdrawal: string;
    inactivity: string;
  };
}

export interface Review {
  id: string;
  brokerId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

export const brokers: Broker[] = [
  {
    id: "exness",
    name: "Exness",
    nameAr: "إكسنيس",
    rating: 4.7,
    reviewCount: 2847,
    regulation: ["FCA", "CySEC", "FSA"],
    minDeposit: 10,
    spreads: "من 0.0 نقطة",
    platforms: ["MetaTrader 4", "MetaTrader 5", "Exness Terminal"],
    accountTypes: ["حساب قياسي", "حساب خام", "حساب احترافي", "حساب إسلامي"],
    website: "https://www.exness.com",
    phone: "+357-25-030-500",
    email: "support@exness.com",
    description: "Global forex leader with unlimited leverage and instant withdrawals",
    descriptionAr: "رائد عالمي في تداول العملات مع رافعة مالية غير محدودة وسحب فوري",
    pros: ["رافعة مالية عالية", "سحب فوري", "فروقات منخفضة جداً", "دعم 24/7"],
    cons: ["قد يكون معقد للمبتدئين", "تقلبات عالية في الأسواق"],
    fees: {
      commission: "0%",
      withdrawal: "مجاني",
      inactivity: "غير متاح"
    }
  },
  {
    id: "avatrade",
    name: "AvaTrade",
    nameAr: "أفاتريد",
    rating: 4.4,
    reviewCount: 1923,
    regulation: ["FSA", "ASIC", "FSCA", "ADGM"],
    minDeposit: 100,
    spreads: "من 0.9 نقطة",
    platforms: ["MetaTrader 4", "MetaTrader 5", "AvaTradeGO", "WebTrader"],
    accountTypes: ["حساب قياسي", "حساب محترف", "حساب إسلامي", "حساب تجريبي"],
    website: "https://www.avatrade.com",
    phone: "+353-1-533-7270",
    email: "support@avatrade.com",
    description: "Award-winning broker with comprehensive trading education",
    descriptionAr: "وسيط حائز على جوائز مع تعليم تداول شامل وأدوات متقدمة",
    pros: ["تعليم شامل", "تنظيم قوي", "أدوات تحليل متقدمة", "دعم متعدد اللغات"],
    cons: ["رسوم السحب", "فروقات أوسع في بعض الأزواج"],
    fees: {
      commission: "0%",
      withdrawal: "15 دولار",
      inactivity: "50 دولار ربع سنوي"
    }
  },
  {
    id: "xm",
    name: "XM",
    nameAr: "إكس إم",
    rating: 4.3,
    reviewCount: 1564,
    regulation: ["FCA", "CySEC", "ASIC"],
    minDeposit: 5,
    spreads: "من 1.0 نقطة",
    platforms: ["MetaTrader 4", "MetaTrader 5", "XM WebTrader"],
    accountTypes: ["حساب صغير", "حساب قياسي", "حساب XM Zero", "حساب إسلامي"],
    website: "https://www.xm.com",
    phone: "+357-25-029-530",
    email: "support@xm.com",
    description: "Trusted global broker with excellent customer support",
    descriptionAr: "وسيط عالمي موثوق مع دعم عملاء ممتاز وبونص ترحيبي",
    pros: ["حد أدنى منخفض جداً", "بونص ترحيبي", "دعم ممتاز", "ندوات تعليمية"],
    cons: ["فروقات أوسع", "خيارات محدودة للحسابات المتقدمة"],
    fees: {
      commission: "0%",
      withdrawal: "مجاني",
      inactivity: "5 دولار شهرياً"
    }
  },
  {
    id: "pepperstone",
    name: "Pepperstone",
    nameAr: "بيبرستون",
    rating: 4.6,
    reviewCount: 1287,
    regulation: ["FCA", "ASIC", "BaFin", "DFSA"],
    minDeposit: 200,
    spreads: "من 0.0 نقطة",
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
    accountTypes: ["حساب قياسي", "حساب Razor", "حساب إسلامي"],
    website: "https://www.pepperstone.com",
    phone: "+61-3-9020-0155",
    email: "support@pepperstone.com",
    description: "Ultra-fast execution with cutting-edge technology",
    descriptionAr: "تنفيذ فائق السرعة مع تكنولوجيا متطورة وفروقات تنافسية",
    pros: ["تنفيذ سريع جداً", "فروقات منخفضة", "تكنولوجيا متقدمة", "دعم cTrader"],
    cons: ["رسوم العمولة", "واجهة متقدمة قد تكون معقدة"],
    fees: {
      commission: "3.50 دولار لكل لوت",
      withdrawal: "مجاني",
      inactivity: "غير متاح"
    }
  },
  {
    id: "ic-markets",
    name: "IC Markets",
    nameAr: "آي سي ماركتس",
    rating: 4.5,
    reviewCount: 743,
    regulation: ["ASIC", "FSA"],
    minDeposit: 200,
    spreads: "من 0.0 نقطة",
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader"],
    accountTypes: ["حساب قياسي", "حساب Raw Spread", "حساب إسلامي"],
    website: "https://www.icmarkets.com",
    phone: "+61-2-8014-4280",
    email: "support@icmarkets.com",
    description: "True ECN broker with institutional-grade execution",
    descriptionAr: "وسيط ECN حقيقي مع تنفيذ على مستوى المؤسسات",
    pros: ["تنفيذ ECN حقيقي", "فروقات تنافسية جداً", "سرعة تنفيذ عالية", "شفافية تامة"],
    cons: ["رسوم العمولة", "حد أدنى أعلى نسبياً"],
    fees: {
      commission: "3 دولار لكل لوت",
      withdrawal: "مجاني",
      inactivity: "غير متاح"
    }
  },
  {
    id: "etoro",
    name: "eToro",
    nameAr: "إي تورو",
    rating: 4.2,
    reviewCount: 1845,
    regulation: ["FCA", "CySEC", "ASIC"],
    minDeposit: 50,
    spreads: "متغيرة",
    platforms: ["eToro Platform", "eToro Mobile"],
    accountTypes: ["حساب قياسي", "حساب إسلامي", "حساب محترف"],
    website: "https://www.etoro.com",
    phone: "+357-25-029-900",
    email: "customerservice@etoro.com",
    description: "Social trading platform with copy trading features",
    descriptionAr: "منصة تداول اجتماعي مع خاصية نسخ التداول والاستثمار الآلي",
    pros: ["تداول اجتماعي", "نسخ المتداولين", "واجهة سهلة", "تنوع الأصول"],
    cons: ["رسوم السحب", "فروقات واسعة", "خيارات محدودة للمحترفين"],
    fees: {
      commission: "0% للأسهم",
      withdrawal: "5 دولار",
      inactivity: "10 دولار شهرياً"
    }
  }
];

export const reviews: Review[] = [
  {
    id: "review-1",
    brokerId: "saudi-investment-bank",
    userName: "أحمد السعودي",
    rating: 4,
    title: "خدمة جيدة ولكن الرسوم مرتفعة",
    content: "البنك السعودي للاستثمار يقدم خدمة جيدة ومنصات مستقرة، لكن الرسوم أعلى من المنافسين. الدعم الفني ممتاز باللغة العربية.",
    date: "2024-01-15",
    helpful: 23
  },
  {
    id: "review-2",
    brokerId: "al-rajhi-capital",
    userName: "فاطمة المحمد",
    rating: 5,
    title: "الأفضل للتداول الإسلامي",
    content: "شركة الراجحي المالية هي الخيار الأمثل للتداول المتوافق مع الشريعة. الخدمة ممتازة والموثوقية عالية جداً.",
    date: "2024-01-20",
    helpful: 45
  },
  {
    id: "review-3",
    brokerId: "samba-capital",
    userName: "محمد الأحمد",
    rating: 4,
    title: "أسعار تنافسية وخدمة مقبولة",
    content: "سامبا كابيتال تقدم أسعار جيدة وحد أدنى منخفض للإيداع. المنصة تحتاج لتحديث لكن التنفيذ سريع.",
    date: "2024-01-25",
    helpful: 18
  }
];