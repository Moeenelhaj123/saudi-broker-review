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
  // Exness Reviews
  {
    id: "review-exness-1",
    brokerId: "exness",
    userName: "عبدالله الريس",
    rating: 5,
    title: "أفضل وسيط للتداول",
    content: "إكسنيس رائع جداً، السحب الفوري والرافعة المالية العالية تجعل التداول سهل وسريع. أنصح به بشدة للمتداولين المحترفين.",
    date: "2024-01-20",
    helpful: 42
  },
  {
    id: "review-exness-2",
    brokerId: "exness",
    userName: "نورا السعد",
    rating: 4,
    title: "خدمة ممتازة مع فروقات منخفضة",
    content: "فروقات ممتازة وتنفيذ سريع، الدعم الفني يرد بسرعة. الوحيد السلبي أن المنصة قد تكون معقدة للمبتدئين.",
    date: "2024-01-15",
    helpful: 28
  },
  {
    id: "review-exness-3",
    brokerId: "exness",
    userName: "خالد العتيبي",
    rating: 5,
    title: "سحب فوري حقيقي",
    content: "السحب الفوري فعلاً فوري! لم أواجه أي مشاكل في السحب أو الإيداع. منصة موثوقة ومضمونة.",
    date: "2024-01-10",
    helpful: 35
  },

  // AvaTrade Reviews
  {
    id: "review-avatrade-1",
    brokerId: "avatrade",
    userName: "سارة المطيري",
    rating: 4,
    title: "ممتاز للتعليم والتدريب",
    content: "أفاتريد يوفر مواد تعليمية ممتازة ودعم رائع للمبتدئين. الندوات والتحليلات مفيدة جداً لتطوير مهارات التداول.",
    date: "2024-01-18",
    helpful: 31
  },
  {
    id: "review-avatrade-2",
    brokerId: "avatrade",
    userName: "أحمد البلوي",
    rating: 4,
    title: "منصة شاملة مع تنظيم قوي",
    content: "شركة منظمة ومرخصة بقوة، أدوات التحليل متقدمة والحساب الإسلامي متوفر. رسوم السحب مرتفعة قليلاً لكن الخدمة تستحق.",
    date: "2024-01-12",
    helpful: 24
  },

  // XM Reviews
  {
    id: "review-xm-1",
    brokerId: "xm",
    userName: "فيصل الشمري",
    rating: 4,
    title: "مناسب للمبتدئين",
    content: "بونص ترحيبي جيد وحد أدنى منخفض جداً. الدعم ممتاز ويجيب بالعربية. مناسب جداً لمن يبدأ في التداول.",
    date: "2024-01-22",
    helpful: 26
  },
  {
    id: "review-xm-2",
    brokerId: "xm",
    userName: "ريم القحطاني",
    rating: 4,
    title: "دعم فني ممتاز",
    content: "الدعم الفني سريع جداً ومفيد، الندوات التعليمية مجانية ومفيدة. الفروقات أوسع من المنافسين لكن الخدمة تعوض.",
    date: "2024-01-08",
    helpful: 19
  },

  // Pepperstone Reviews
  {
    id: "review-pepperstone-1",
    brokerId: "pepperstone",
    userName: "محمد الدوسري",
    rating: 5,
    title: "سرعة تنفيذ لا مثيل لها",
    content: "بيبرستون أسرع وسيط في التنفيذ، الفروقات منخفضة جداً والتكنولوجيا متطورة. مناسب للمتداولين السريعين والسكالبرز.",
    date: "2024-01-25",
    helpful: 38
  },
  {
    id: "review-pepperstone-2",
    brokerId: "pepperstone",
    userName: "عايشة النعيمي",
    rating: 4,
    title: "منصة متقدمة للمحترفين",
    content: "منصة cTrader ممتازة وتقنيات متقدمة، لكن قد تكون معقدة للمبتدئين. الأسعار تنافسية والتنفيذ سريع.",
    date: "2024-01-14",
    helpful: 22
  },

  // IC Markets Reviews
  {
    id: "review-ic-markets-1",
    brokerId: "ic-markets",
    userName: "عبدالرحمن المالكي",
    rating: 5,
    title: "ECN حقيقي بشفافية تامة",
    content: "آي سي ماركتس يوفر ECN حقيقي مع شفافية كاملة في الأسعار. التنفيذ سريع والفروقات منخفضة جداً.",
    date: "2024-01-19",
    helpful: 33
  },
  {
    id: "review-ic-markets-2",
    brokerId: "ic-markets",
    userName: "لمياء الخالدي",
    rating: 4,
    title: "جودة تنفيذ عالية",
    content: "جودة التنفيذ ممتازة والأسعار تنافسية، لكن الحد الأدنى للإيداع أعلى من المنافسين. مناسب للمحترفين.",
    date: "2024-01-11",
    helpful: 27
  },

  // eToro Reviews
  {
    id: "review-etoro-1",
    brokerId: "etoro",
    userName: "طلال الغامدي",
    rating: 4,
    title: "التداول الاجتماعي مميز",
    content: "إي تورو رائد في التداول الاجتماعي، نسخ المتداولين الناجحين سهل ومربح. الواجهة بسيطة ومناسبة للمبتدئين.",
    date: "2024-01-16",
    helpful: 29
  },
  {
    id: "review-etoro-2",
    brokerId: "etoro",
    userName: "هند الزهراني",
    rating: 3,
    title: "جيد للمبتدئين لكن الرسوم مرتفعة",
    content: "منصة سهلة ومناسبة للمبتدئين، لكن رسوم السحب والفروقات أعلى من المتوقع. التداول الاجتماعي مفيد.",
    date: "2024-01-05",
    helpful: 18
  }
];