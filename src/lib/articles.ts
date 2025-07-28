import { articleImages } from "./article-images";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  slug: string;
}

export const articles: Article[] = [
  {
    id: "forex-trading-basics",
    title: "أساسيات تداول العملات الأجنبية للمبتدئين",
    excerpt: "دليل شامل لفهم أساسيات تداول العملات الأجنبية، من اختيار الوسيط المناسب إلى استراتيجيات التداول الأساسية للمتداولين المبتدئين.",
    date: "10 يناير 2025",
    readTime: "5 دقائق قراءة",
    image: articleImages["forex-trading-basics"],
    category: "تعليم",
    slug: "forex-trading-basics"
  },
  {
    id: "risk-management-guide",
    title: "إدارة المخاطر في التداول للمبتدئين",
    excerpt: "تعلم أساسيات إدارة المخاطر في التداول وكيفية حماية رأس مالك. استراتيجيات مجربة لتقليل الخسائر وزيادة فرص النجاح في الأسواق المالية.",
    date: "9 يناير 2025",
    readTime: "4 دقائق قراءة",
    image: articleImages["risk-management-guide"],
    category: "استراتيجيات",
    slug: "risk-management-guide"
  },
  {
    id: "halal-trading-guide",
    title: "التداول الحلال وفقاً للشريعة الإسلامية",
    excerpt: "فهم ضوابط التداول الحلال في الأسواق المالية. دليل مفصل حول الحسابات الإسلامية وكيفية التداول وفقاً لأحكام الشريعة الإسلامية.",
    date: "8 يناير 2025",
    readTime: "6 دقائق قراءة",
    image: articleImages["halal-trading-guide"],
    category: "الشريعة",
    slug: "halal-trading-guide"
  }
];