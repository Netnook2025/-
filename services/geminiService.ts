import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateProjectDescription = async (title: string, keywords: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "خدمة الذكاء الاصطناعي غير متاحة. يرجى تعيين متغير البيئة API_KEY.";
  }
  
  const prompt = `
    أنت كاتب إعلانات خبير لمنظمة مساعدات إنسانية.
    مهمتك هي كتابة وصف مشروع قوي ومؤثر وعاجل باللغة العربية لجمع التبرعات لأهالي الفاشر والسودان.
    
    عنوان المشروع هو: "${title}".
    العناصر الرئيسية التي يجب تضمينها هي: "${keywords}".

    يجب أن يتكون الوصف من 3-4 جمل. يجب أن يكون له صدى عاطفي، ويسلط الضوء على الحاجة الماسة، ويلهم الأمل والعمل الفوري.
    لا تستخدم تنسيق ماركداون. أخرج نصًا عربيًا عاديًا فقط.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "فشل في إنشاء الوصف بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى أو كتابة وصف يدويًا.";
  }
};