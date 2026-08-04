import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to dynamically replace relative image URLs in HTML with absolute URLs for social media crawlers (WhatsApp, Telegram, FB, X)
function processHtmlForCrawlers(req: express.Request, rawHtml: string): string {
  const protocol = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
  const host = req.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;
  const absoluteImageUrl = `${baseUrl}/app-icon.jpg`;

  return rawHtml
    .replace(/content="\/app-icon\.jpg"/g, `content="${absoluteImageUrl}"`)
    .replace(/href="\/app-icon\.jpg"/g, `href="${absoluteImageUrl}"`);
}

// Smart local rule-based backup response generator for AI Coach to guarantee 100% uptime when API is overloaded (503) or offline
function getLocalCoachBackupResponse(message: string, stats: any): string {
  const msg = (message || "").toLowerCase();
  const coachGender = stats?.voiceGender || "female";
  const coachName = coachGender === "male" ? "كابتن ماجد" : "كابتن ليلى";
  const goalStr = stats?.goal === 'loss' ? 'تخسيس دهون البطن ونحت الخصر' : stats?.goal === 'gain' ? 'زيادة الوزن وتضخيم العضلات' : 'المحافظة على لياقتك البدنية';

  // Diet / Food / Recipe / Nutrition
  if (msg.includes("أكل") || msg.includes("وجب") || msg.includes("عشا") || msg.includes("بروتين") || msg.includes("سعرات") || msg.includes("تغذي") || msg.includes("وصف") || msg.includes("جوع") || msg.includes("دايت") || msg.includes("فطور") || msg.includes("غدا") || msg.includes("اكل") || msg.includes("وجبة") || msg.includes("عشاء") || msg.includes("غداء")) {
    return `أهلاً بك يا بطل! سؤالك عن التغذية والوجبات هو الأساس في رحلتنا لـ 30 يوماً. 🍏✨

إليك نصائح ذهبية لنمط تغذيتك بناءً على هدفك في **${goalStr}**:
1. **البروتين هو الملك**: احرص على تناول مصادر بروتين نظيفة في كل وجبة (مثل: صدور دجاج مشوية، بياض بيض، تونة بالماء، أو جبن قريش). هذا يحافظ على كتلتك العضلية ويزيد من معدل حرق الدهون.
2. **الكربوهيدرات المعقدة**: استبدل الخبز الأبيض بالخبز الأسمر أو الشوفان أو الأرز البني؛ فهي تمدك بالطاقة المستمرة وتمنع الشعور المفاجئ بالجوع.
3. **وصفة عشاء خفيفة ومثالية**:
   - كوب زبادي طبيعي أو يوناني (خالي الدسم)
   - نصف ملعقة صغيرة من بذور الشيا (غنية بالألياف والأوميغا 3)
   - حفنة صغيرة من التوت أو نصف تفاحة مقطعة
   - رشة قرفة بسيطة (لتنظيم مستويات السكر في الدم وتحفيز الأيض)

تذكر دائماً: "البطن والخصر الرياضي يصنعان في المطبخ أولاً!"؛ التزم بوجباتك وسأكون معك خطوة بخطوة. 💪`;
  }

  // Core / Belly fat / Abs
  if (msg.includes("بطن") || msg.includes("كرش") || msg.includes("خصر") || msg.includes("دهون") || msg.includes("ترهل") || msg.includes("عضلات") || msg.includes("معد") || msg.includes("abs") || msg.includes("belly")) {
    return `أهلاً بك يا بطل! التخلص من دهون البطن ونحت الخصر هو تخصصنا هنا في "رشاقة 30 يوم". 🔥🏋️‍♀️

لكي نتغلب على هذه الدهون العنيدة ونبرز عضلات البطن، سنطبق استراتيجية ثلاثية الأبعاد:
1. **عجز السعرات الحرارية**: دهون البطن لا تزول بالتمارين فقط، بل يجب أن نأكل سعرات أقل قليلاً مما يحتاجه جسمنا ليضطر لحرق الدهون المخزنة كطاقة.
2. **التمارين المركبة والكارديو**: ركز على تمارين الكارديو عالي الشدة (HIIT) لمدة 15-20 دقيقة بعد تمرين المقاومة، إلى جانب تمارين البطن والبلانك لتقوية العضلات العميقة للمعدة.
3. **محاربة التوتر والنوم السليم**: ارتفاع هرمون "الكورتيزول" الناتج عن قلة النوم والتوتر يتسبب مباشرة في تخزين الدهون بمنطقة البطن. احرص على النوم 7-8 ساعات ليلاً.

كن صبوراً ومستمراً، فالنتائج الرائعة تحتاج إلى التزام يومي صلب! أنا فخور جداً بحماسك.`;
  }

  // Water
  if (msg.includes("ماء") || msg.includes("شرب") || msg.includes("سوائل") || msg.includes("عطش") || msg.includes("المياه")) {
    return `شرب الماء هو السر الخفي لتسريع نتائجك يا بطل! 💧✨

الماء ليس فقط لترطيب الجسم، بل يلعب دوراً محورياً في الحرق وبناء العضلات:
- **كمية الماء المثالية**: تحتاج إلى شرب ما لا يقل عن **2.7 إلى 3 لترات** يومياً (حوالي 8-12 كوباً)، وتزيد هذه الكمية في أيام التمرين لتعويض السوائل المفقودة.
- **تأثيره على حرق الدهون**: شرب كوب من الماء البارد قبل الوجبات بـ 30 دقيقة يساعد على كبح الشهية وتنشيط عملية التمثيل الغذائي (الأيض).
- **مؤشر الترطيب**: إذا كان لون البول فاتحاً أو شفافاً، فأنت في أمان وترطيب ممتاز!

اجعل معك زجاجة ماء دائماً واشرب على فترات متقطعة طوال اليوم. دعنا نحافظ على نشاط خلاياك! 🚀`;
  }

  // Muscle pain / Soreness / Rest
  if (msg.includes("تعب") || msg.includes("ألم") || msg.includes("وجع") || msg.includes("شد") || msg.includes("عضل") || msg.includes("راحه") || msg.includes("استراحه") || msg.includes("نوم") || msg.includes("تعبت")) {
    return `سلامتك يا بطل! الشعور ببعض الشد العضلي أو التعب هو أمر طبيعي جداً، خاصة في بداية الالتزام بالتمارين، ويُعرف بـ (DOMS). تفهم إشارات جسمك هو قمة الوعي الرياضي. 💆‍♂️🛌

إليك كيف تتعامل مع هذا التعب بذكاء لتستمر بقوة:
1. **الاستشفاء العضلي (Recovery)**: العضلات تنمو وتتخلص من الدهون أثناء فترة الراحة والنوم، وليس أثناء التمرين نفسه! تأكد من النوم العميق لمدة 7-8 ساعات.
2. **التغذية والترطيب**: تناول كمية كافية من البروتين والمغنيسيوم (الموجود في الموز، السبانخ، والمكسرات) لتقليل التقلصات العضلية وتسريع الاستشفاء.
3. **الاستراحة الإيجابية**: إذا كان الألم شديداً، يمكنك أخذ يوم راحة كامل، أو ممارسة نشاط خفيف جداً مثل المشي أو تمارين الإطالة (Stretchings) لتنشيط الدورة الدموية ومساعدة العضلات على التعافي.

أنت بطل، والراحة جزء أساسي من خطة النجاح وليست استسلاماً! ارتح اليوم لنبدأ غداً بطاقة مضاعفة. 😉🔥`;
  }

  // Workouts / Exercise
  if (msg.includes("تمرين") || msg.includes("تمارين") || msg.includes("كارديو") || msg.includes("مقاوم") || msg.includes("حديد") || msg.includes("نادي") || msg.includes("بيت") || msg.includes("جدول") || msg.includes("رياضة")) {
    return `رائع جداً! التمارين هي المحرك الأساسي لنحت وتشكيل جسمك الرياضي الجديد. 🏃‍♂️⚡

لتحقيق أقصى استفادة من تمارين "رشاقة 30 يوم":
1. **الالتزام بالجدول**: تتبع الأيام في قسم التمارين، وقم بتأدية الجلسات بتركيز كامل مع إعطاء كل تمرين حقه من المدى الحركي الكامل.
2. **التنفس الصحيح**: لا تحبس أنفاسك أثناء التمرين؛ خذ شهيقاً في مرحلة الاسترخاء (الانبساط) وزفيراً مع المجهود (الانقباض).
3. **التدرج**: ابدأ بالإحماء الجيد دائماً لمنع الإصابات، وإذا كنت تتمرن في المنزل، فاستخدم وزن جسمك بفعالية أو استعن بأدوات بسيطة مثل أحبال المقاومة.

كل دقيقة تمرين تقربك خطوة إضافية من شكل الجسم الذي تحلم به. استمر في الضغط والتقدم يا بطل! 💥`;
  }

  // General greetings & welcome
  return `مرحباً بك يا بطل! أنا **${coachName}** معك دائماً ومستعد لإرشادك. 🌟💪

سؤالك رائع ومهم جداً. كمدربك الشخصي، أريد أن أذكرك بأن التزامك اليومي هو الذي سيصنع الفارق الحقيقي في نهاية الـ 30 يوماً. 

سواء كنت تبحث عن:
- نصيحة لتنسيق وجباتك اليومية وحساب السعرات.
- طرق للتغلب على دهون البطن ونحت الخصر.
- استفسار عن تمرين معين أو كيفية أدائه بشكل صحيح.

اكتب لي ما يدور في ذهنك بالتفصيل، وسأعطيك الإجابة العلمية والعملية الأسهل لتطبيقها فوراً في يومك! نحن نتحدى أنفسنا لنكون الأفضل دائماً. 🔥`;
}

// API route for the AI Coach
app.post("/api/coach", async (req, res) => {
  const { message, stats, history } = req.body;
  
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Gemini API Key missing, falling back to smart local coach responses.");
      const reply = getLocalCoachBackupResponse(message, stats);
      return res.json({ reply });
    }

    // Lazy initialization of GoogleGenAI
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const genderStr = stats?.gender || "أنثى";
    const weightStr = stats?.weight ? `${stats.weight} كجم` : "غير محدد";
    const heightStr = stats?.height ? `${stats.height} سم` : "غير محدد";
    const ageStr = stats?.age ? `${stats.age} سنة` : "غير محدد";
    const activityStr = stats?.activityLevel ? `${stats.activityLevel}` : "غير محدد";
    const goalStr = stats?.goal === 'loss' ? 'تخسيس دهون البطن ونحت الخصر' : stats?.goal === 'gain' ? 'زيادة الوزن وتضخيم العضلات' : 'المحافظة على الوزن اللياقة';
    const coachGender = stats?.voiceGender || "female";
    const coachName = coachGender === "male" ? "كابتن ماجد" : "كابتن ليلى";

    const systemInstruction = `أنت كوتش رياضي ومستشار تغذية محترف اسمك "${coachName}". تطبيقك هو "رشاقة 30 يوم" المخصص لتخسيس البطن ونحت الخصر وبناء الجسم الرياضي.
المستخدم لديه البيانات الشخصية التالية:
- الجنس: ${genderStr}
- الوزن: ${weightStr}
- الطول: ${heightStr}
- العمر: ${ageStr}
- الهدف: ${goalStr}
- مستوى النشاط: ${activityStr}

تعليمات الردود:
1. أجب دائماً باللغة العربية الفصحى المبسطة وبطريقة مشجعة وحماسية للغاية ومحبة للمساعدة.
2. قدم نصائح علمية وعملية دقيقة عن التمارين والتغذية المناسبة لحالة المستخدم وأهدافه.
3. ركز على تقديم وصفات صحية عربية سهلة التحضير، ومقدار شرب الماء، والالتزام بالنوم السليم.
4. تجنب الردود الطويلة جداً؛ اجعلها مقسمة إلى نقاط واضحة ومنسقة باستخدام التعداد النقطي وخطوط عريضة (Markdown) مريحة للقراءة.
5. ادعمه بعبارات حماسية تناسب تقدمه، وعامله كصديق وبطل حقيقي يتحدى نفسه لـ 30 يوماً!`;

    const contents = [];
    
    // Add history if present
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role,
          parts: [{ text: h.text }]
        });
      }
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Try multiple models in a fallback chain to guarantee high availability and handle high demand (503) errors gracefully
    const modelsToTry = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let response = null;
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model: model,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          }
        });
        if (response && response.text) {
          break; // Success!
        }
      } catch (err: any) {
        console.warn(`Failed to generate content with ${model}, trying next... Error:`, err.message || err);
        lastError = err;
      }
    }

    if (!response || !response.text) {
      console.warn("All Gemini models failed or hit limit. Falling back to smart local coach responses.", lastError?.message || lastError);
      const reply = getLocalCoachBackupResponse(message, stats);
      return res.json({ reply });
    }

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Unexpected Error in coach endpoint, using smart local backup:", error);
    const reply = getLocalCoachBackupResponse(message, stats);
    res.json({ reply });
  }
});




async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1y',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, must-revalidate');
        } else if (/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      try {
        if (fs.existsSync(indexPath)) {
          const rawHtml = fs.readFileSync(indexPath, 'utf-8');
          const processedHtml = processHtmlForCrawlers(req, rawHtml);
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.setHeader('Cache-Control', 'no-cache, must-revalidate');
          return res.send(processedHtml);
        }
      } catch (e) {
        console.error("Error serving index.html:", e);
      }
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
