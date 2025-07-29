/**
 * Contact Forms Testing Utility
 * This file contains test data and scenarios for all contact forms in the application
 */

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  type: "general" | "broker-inquiry" | "review" | "complaint" | "newsletter";
  status: "new" | "replied" | "resolved" | "archived";
  date: string;
}

// Test data for different form scenarios
export const testContactData = {
  // Test Case 1: General Contact Dialog (from FAQ section "هل لديك سؤال؟")
  generalContact: {
    firstName: "محمد",
    lastName: "الأحمد",
    email: "mohammed.ahmed@test.com",
    phone: "+966501234567",
    question: "أريد معرفة المزيد عن أفضل الوسطاء للمبتدئين في التداول. هل يمكنكم نصحي؟"
  },

  // Test Case 2: Contact Page Form (main contact page CTA)
  contactPageForm: {
    firstName: "سارة",
    lastName: "المطيري",
    email: "sara.almutairi@test.com",
    phone: "+966507654321",
    question: "لديّ تجربة سيئة مع أحد الوسطاء وأريد مشاركتها معكم لتحذير الآخرين"
  },

  // Test Case 3: Newsletter Subscription (from Footer)
  newsletterSubscription: {
    firstName: "أحمد",
    lastName: "العتيبي",
    email: "ahmed.otaibi@test.com",
    phone: "+966509876543",
    jobDescription: "محلل مالي - أعمل في بنك الراجحي"
  },

  // Test Case 4: Broker Review Comment Form (if exists)
  brokerReviewComment: {
    firstName: "خالد",
    lastName: "السعدي",
    email: "khalid.saadi@test.com",
    phone: "+966502345678",
    comment: "تجربتي مع Exness ممتازة، الدعم سريع والمنصة مستقرة"
  },

  // Test Case 5: Article Newsletter (from articles page)
  articleNewsletter: {
    firstName: "فاطمة",
    lastName: "الشهري",
    email: "fatima.shehri@test.com", 
    phone: "+966508765432",
    jobDescription: "متداولة مستقلة"
  }
};

// Expected results after form submission
export const expectedContactMessages: ContactMessage[] = [
  {
    id: expect.any(String),
    firstName: "محمد",
    lastName: "الأحمد", 
    email: "mohammed.ahmed@test.com",
    phone: "+966501234567",
    message: "أريد معرفة المزيد عن أفضل الوسطاء للمبتدئين في التداول. هل يمكنكم نصحي؟",
    type: "general",
    status: "new",
    date: expect.any(String)
  },
  {
    id: expect.any(String),
    firstName: "سارة",
    lastName: "المطيري",
    email: "sara.almutairi@test.com", 
    phone: "+966507654321",
    message: "لديّ تجربة سيئة مع أحد الوسطاء وأريد مشاركتها معكم لتحذير الآخرين",
    type: "general",
    status: "new",
    date: expect.any(String)
  },
  {
    id: expect.any(String),
    firstName: "أحمد",
    lastName: "العتيبي",
    email: "ahmed.otaibi@test.com",
    phone: "+966509876543", 
    message: "اشتراك في النشرة الإخبارية - الوصف الوظيفي: محلل مالي - أعمل في بنك الراجحي",
    type: "newsletter",
    status: "new",
    date: expect.any(String)
  },
  {
    id: expect.any(String),
    firstName: "فاطمة",
    lastName: "الشهري",
    email: "fatima.shehri@test.com",
    phone: "+966508765432",
    message: "اشتراك في النشرة الإخبارية - الوصف الوظيفي: متداولة مستقلة",
    type: "newsletter", 
    status: "new",
    date: expect.any(String)
  }
];

// Form validation test cases
export const formValidationTests = {
  missingRequiredFields: {
    firstName: "",
    lastName: "الأحمد",
    email: "test@test.com",
    phone: "",
    question: "سؤال تجريبي"
  },
  invalidEmail: {
    firstName: "محمد",
    lastName: "الأحمد", 
    email: "invalid-email",
    phone: "+966501234567",
    question: "سؤال تجريبي"
  },
  validData: {
    firstName: "محمد",
    lastName: "الأحمد",
    email: "test@test.com", 
    phone: "+966501234567",
    question: "سؤال تجريبي صحيح"
  }
};

// Test scenarios to cover
export const testScenarios = [
  {
    name: "General Contact Dialog from HomePage FAQ",
    formLocation: "HomePage - FAQ Section",
    triggerElement: "هل لديك سؤال؟ CTA Button",
    testData: testContactData.generalContact,
    expectedType: "general"
  },
  {
    name: "Contact Page Main Form", 
    formLocation: "Contact Page",
    triggerElement: "تواصل معنا الآن Button",
    testData: testContactData.contactPageForm,
    expectedType: "general"
  },
  {
    name: "Newsletter Subscription from Footer",
    formLocation: "Footer Component",
    triggerElement: "اشترك الآن Button", 
    testData: testContactData.newsletterSubscription,
    expectedType: "newsletter"
  },
  {
    name: "Article Newsletter Subscription",
    formLocation: "Articles Page",
    triggerElement: "اشترك في النشرة الإخبارية Button",
    testData: testContactData.articleNewsletter,
    expectedType: "newsletter"
  }
];

// Form fields mapping for each form type
export const formFields = {
  contactDialog: {
    firstName: "firstName",
    lastName: "lastName", 
    email: "email",
    phone: "phone",
    message: "question"
  },
  newsletterDialog: {
    firstName: "firstName",
    lastName: "lastName",
    email: "email", 
    phone: "phone",
    jobDescription: "jobDescription"
  }
};

// Success messages expected after form submission
export const successMessages = {
  general: "تم إرسال استفسارك بنجاح! سنتواصل معك قريباً",
  newsletter: "تم الاشتراك في النشرة الإخبارية بنجاح!",
  comment: "تم إضافة تعليقك بنجاح!"
};

// Error messages for validation
export const errorMessages = {
  requiredFields: "يرجى ملء جميع الحقول المطلوبة",
  invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
  submissionError: "حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى"
};

export default {
  testContactData,
  expectedContactMessages,
  formValidationTests,
  testScenarios,
  formFields,
  successMessages,
  errorMessages
};