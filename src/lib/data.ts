export interface Broker {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
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
    id: "saudi-investment-bank",
    name: "Saudi Investment Bank",
    nameAr: "البنك السعودي للاستثمار",
    logo: "🏦",
    rating: 4.2,
    reviewCount: 127,
    regulation: ["CMA", "SAMA"],
    minDeposit: 10000,
    spreads: "من 0.8 نقطة",
    platforms: ["MetaTrader 4", "MetaTrader 5", "منصة البنك"],
    accountTypes: ["حساب قياسي", "حساب إسلامي", "حساب VIP"],
    website: "https://www.saib.com.sa",
    phone: "+966-11-478-8888",
    email: "trading@saib.com.sa",
    description: "Leading Saudi bank offering comprehensive trading services",
    descriptionAr: "بنك سعودي رائد يقدم خدمات تداول شاملة مع أحدث المنصات والأدوات",
    pros: ["منظم محلياً", "دعم باللغة العربية", "حسابات إسلامية"],
    cons: ["حد أدنى مرتفع للإيداع", "عمولات أعلى من المتوسط"],
    fees: {
      commission: "0.25%",
      withdrawal: "25 ريال",
      inactivity: "50 ريال شهرياً"
    }
  },
  {
    id: "al-rajhi-capital",
    name: "Al Rajhi Capital",
    nameAr: "شركة الراجحي المالية",
    logo: "💰",
    rating: 4.5,
    reviewCount: 203,
    regulation: ["CMA"],
    minDeposit: 25000,
    spreads: "من 0.5 نقطة",
    platforms: ["منصة الراجحي للتداول", "التطبيق المحمول"],
    accountTypes: ["حساب إسلامي", "حساب مؤسسي"],
    website: "https://www.alrajhicapital.com",
    phone: "+966-11-211-8898",
    email: "info@alrajhicapital.com",
    description: "Sharia-compliant trading with Al Rajhi's trusted name",
    descriptionAr: "تداول متوافق مع الشريعة الإسلامية باسم الراجحي الموثوق",
    pros: ["متوافق مع الشريعة", "سمعة ممتازة", "خدمة عملاء متميزة"],
    cons: ["خيارات محدودة للأدوات", "رسوم عالية نسبياً"],
    fees: {
      commission: "0.15%",
      withdrawal: "مجاني",
      inactivity: "غير متاح"
    }
  },
  {
    id: "samba-capital",
    name: "Samba Capital",
    nameAr: "سامبا كابيتال",
    logo: "📈",
    rating: 4.1,
    reviewCount: 156,
    regulation: ["CMA", "SAMA"],
    minDeposit: 5000,
    spreads: "من 1.0 نقطة",
    platforms: ["MetaTrader 4", "منصة سامبا الذكية"],
    accountTypes: ["حساب قياسي", "حساب إسلامي", "حساب تجريبي"],
    website: "https://www.sambacapital.com.sa",
    phone: "+966-11-477-4770",
    email: "trading@sambacapital.com.sa",
    description: "Comprehensive trading solutions with competitive pricing",
    descriptionAr: "حلول تداول شاملة بأسعار تنافسية ومنصات متطورة",
    pros: ["أسعار تنافسية", "منصات متعددة", "حد أدنى منخفض"],
    cons: ["دعم العملاء محدود", "منصة قديمة أحياناً"],
    fees: {
      commission: "0.20%",
      withdrawal: "15 ريال",
      inactivity: "30 ريال شهرياً"
    }
  },
  {
    id: "riyad-capital",
    name: "Riyad Capital",
    nameAr: "الرياض المالية",
    logo: "🏛️",
    rating: 4.3,
    reviewCount: 189,
    regulation: ["CMA"],
    minDeposit: 20000,
    spreads: "من 0.6 نقطة",
    platforms: ["منصة الرياض المالية", "MetaTrader 5"],
    accountTypes: ["حساب قياسي", "حساب ذهبي", "حساب إسلامي"],
    website: "https://www.riyadcapital.com",
    phone: "+966-11-401-3030",
    email: "brokerage@riyadcapital.com",
    description: "Premium trading experience with advanced tools",
    descriptionAr: "تجربة تداول متميزة مع أدوات متقدمة وخدمة استثنائية",
    pros: ["أدوات تحليل متقدمة", "تنفيذ سريع", "بحوث ممتازة"],
    cons: ["رسوم مرتفعة", "واجهة معقدة للمبتدئين"],
    fees: {
      commission: "0.30%",
      withdrawal: "20 ريال",
      inactivity: "40 ريال شهرياً"
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