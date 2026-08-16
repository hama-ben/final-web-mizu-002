import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CircleDollarSign,
  Clock3,
  Droplets,
  Facebook,
  Gauge,
  Headphones,
  Heart,
  Languages,
  LocateFixed,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Play,
  Route as RouteIcon,
  Send,
  ShieldCheck,
  Star,
  Truck,
  UserRound,
  X,
  Zap,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import loginScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٨-٢٨-٣٥٠_com.mizu.app_1786818650485.jpg';
import registerScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٨-٥٠-٩٩٧_com.mizu.app_1786818654257.jpg';
import orderScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٩-٠٦-٢٠٨_com.mizu.app_1786818661708.jpg';
import ordersScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٩-٣٨-٥٤٧_com.mizu.app_1786818666483.jpg';
import supportScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٩-٤٨-٧٨٩_com.mizu.app_1786818671143.jpg';

const APK_DOWNLOAD_URL = 'https://github.com/hama-ben/final-web-mizu-002/releases/download/v1.0.0/app-debug.apk';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61590856328769';
const queryClient = new QueryClient();

type Lang = 'ar' | 'fr' | 'en';
type RoleFeature = { title: string; body: string };
type RoleContent = {
  kicker: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  placeholder: string;
  features: RoleFeature[];
};
type PolicyContent = {
  title: string;
  intro: string;
  missing: string;
  contact: string;
};
type ShowcaseCopy = {
  login: string;
  register: string;
  driverTitle: string;
  driverBody: string;
  ordersTitle: string;
  ordersBody: string;
  supportTitle: string;
  supportBody: string;
};
type TeamMember = {
  name: string;
  role: string;
};
type Copy = {
  nav: string[];
  heroKicker: string;
  heroTitle: string;
  heroBody: string;
  download: string;
  facebook: string;
  trusted: string;
  appPreview: string;
  featureKicker: string;
  featureTitle: string;
  featureBody: string;
  howKicker: string;
  howTitle: string;
  howBody: string;
  driverKicker: string;
  driverTitle: string;
  driverBody: string;
  driverButton: string;
  finalKicker: string;
  finalTitle: string;
  finalBody: string;
  appStore: string;
  footerBody: string;
  support: string;
  rights: string;
  map: string;
  ready: string;
  litres: string;
  placeOrder: string;
  placed: string;
  today: string;
  chooseSize: string;
  consumers: RoleContent;
  drivers: RoleContent;
  privacy: PolicyContent;
  security: PolicyContent;
  privacyLabel: string;
  securityLabel: string;
  backHome: string;
  teamTitle: string;
  teamMembers: TeamMember[];
  showcase: ShowcaseCopy;
};

const translations: Record<Lang, Copy> = {
  ar: {
    nav: ['الرئيسية', 'المميزات', 'كيف يعمل', 'فريق العمل', 'حمّل التطبيق', 'تواصل معنا'],
    heroKicker: 'الماء النقي، في وقته تماماً',
    heroTitle: 'مياهك تصل إليك. ببساطة.',
    heroBody: 'Mizu هو رفيقك المحلي لطلب مياه الشرب في الجزائر. اختر الكمية، تابع السائق، واستقبل الماء عند بابك دون مكالمات.',
    download: 'حمّل التطبيق الآن',
    facebook: 'تابعنا على فيسبوك',
    trusted: 'موثوق من عائلات جزائرية كل يوم',
    appPreview: 'تجربة الطلب',
    featureKicker: 'كل شيء تحت السيطرة',
    featureTitle: 'ماء نظيف،\nبلمسة واحدة.',
    featureBody: 'صممنا Mizu حول يومك الحقيقي: سريع عندما تكون مستعجلاً، واضح عندما تريد الاطمئنان، وقريب منك دائماً.',
    howKicker: 'أربع خطوات، ولا تعقيد',
    howTitle: 'من التطبيق إلى بابك.',
    howBody: 'لا قوائم طويلة ولا انتظار على الهاتف. كل ما تحتاجه في مكان واحد.',
    driverKicker: 'إلى سائقي الجزائر',
    driverTitle: 'طريق أكثر ذكاءً\nلكل سائق.',
    driverBody: 'انضم إلى شبكة Mizu، نظم طلباتك، واوصل الماء إلى من يحتاجه. نحن نبني معاً خدمة يثق بها الناس.',
    driverButton: 'اعرف المزيد',
    finalKicker: 'الماء في طريقه إليك',
    finalTitle: 'جاهز تبدأ معنا؟',
    finalBody: 'حمّل Mizu وخلي طلب الماء أسهل جزء في يومك.',
    appStore: 'قريباً على App Store',
    footerBody: 'توصيل مياه الشرب، بطريقة محلية وأذكى.',
    support: 'أرسل رسالة دعم',
    rights: '© Mizu 2026. صُنع في الجزائر.',
    map: 'تتبع حي على الخريطة',
    ready: 'جاهز',
    litres: 'لتر',
    placeOrder: 'تأكيد الطلب',
    placed: 'تم استلام طلبك',
    today: 'اليوم، خلال 45 دقيقة',
    chooseSize: 'اختر الكمية',
    consumers: {
      kicker: 'للمستهلكين',
      title: 'مياه شرب نقية تصلك أينما كنت',
      subtitle: 'اطلب بضغطة واحدة، وتتبع طلبك لحظة بلحظة حتى يصل إلى بابك',
      body: 'لا داعي للانتظار في الطوابير أو حمل القوارير الثقيلة بنفسك. مع Mizu، تطلب كمية المياه التي تحتاجها من هاتفك، وسائق موثوق وقريب منك يتكفل بالباقي — بسرعة وشفافية كاملة في كل خطوة.',
      cta: 'حمّل التطبيق الآن واطلب أول كمية مياهك خلال دقائق',
      placeholder: 'شاشة طلب المستهلك',
      features: [
        { title: 'طلب في ثوانٍ', body: 'اختر الكمية اللي تحتاجها (من 5 لتر إلى 1000 لتر) وأتمم طلبك بضغطة واحدة، بلا تعقيد.' },
        { title: 'تحديد الموقع تلقائياً', body: 'التطبيق يحدد موقعك بدقة، أو احفظ عدة عناوين (المنزل، العمل...) لطلب أسرع في كل مرة.' },
        { title: 'تتبع لحظي للسائق', body: 'شاهد سائقك يقترب منك على الخريطة في الوقت الفعلي، وتوقّع وقت الوصول بدقة.' },
        { title: 'سائقوك المفضّلون', body: 'أعجبك أسلوب سائق معيّن؟ أضفه لقائمة السائقون المفضلون واطلب منه مباشرة في المرات القادمة.' },
        { title: 'شفافية كاملة في السعر', body: 'تعرف السعر الإجمالي قبل تأكيد الطلب، بلا مفاجآت أو رسوم خفية.' },
        { title: 'دعم متواصل', body: 'أي استفسار أو مشكلة؟ فريق الدعم الفني حاضر عبر شات مباشر داخل التطبيق.' },
      ],
    },
    drivers: {
      kicker: 'للسائقين',
      title: 'انضم إلى عائلة سائقي Mizu',
      subtitle: 'حوّل وقتك إلى دخل حقيقي، وكن جزءاً من أول شبكة توصيل مياه في الجزائر',
      body: 'كن سائقاً مستقلاً مع Mizu وابدأ باستقبال طلبات التوصيل في منطقتك مباشرة على هاتفك. نظامنا صمّم ليمنحك الحرية الكاملة: تختار متى تعمل، وأين تعمل، وكم طلب تقبل في اليوم — بلا التزامات ثابتة وبلا ضغط.',
      cta: 'سجّل كسائق الآن وابدأ أول يوم عمل لك خلال دقائق',
      placeholder: 'لوحة تحكم السائق',
      features: [
        { title: 'دخل إضافي مرن', body: 'اقبل الطلبات في الأوقات التي تناسبك، وتابع أرباحك اليومية والشهرية لحظياً من لوحة التحكم الخاصة بك.' },
        { title: 'طلبات قريبة منك', body: 'يصلك إشعار فوري بكل طلب جديد في منطقتك، مع كل التفاصيل: الكمية، السعر، وموقع الزبون بدقة.' },
        { title: 'نظام اشتراك شفاف', body: 'اشتراك شهري بسيط يمنحك وصولاً كاملاً لكل الطلبات المتاحة، مع تتبع واضح للمدة المتبقية.' },
        { title: 'حالة تواجد بلمسة واحدة', body: 'بدّل بين حاضر، استراحة، أو مغلق حسب ظروفك، والنظام يتوقف عن إرسال طلبات لك تلقائياً عند عدم التواجد.' },
        { title: 'بناء سمعتك', body: 'كل عميل يقيّمك بعد التوصيل، وكلما ارتفع تقييمك زادت فرصك في أن يختارك الزبائن كسائق مفضّل.' },
        { title: 'دعم فني حاضر دائماً', body: 'فريق Mizu يرد على استفساراتك ومشاكلك عبر شات مباشر داخل التطبيق.' },
      ],
    },
    privacy: {
      title: 'سياسة الخصوصية',
      intro: 'آخر تحديث: أغسطس 2026',
      missing: `1. مقدمة وأساس قانوني
يلتزم تطبيق وموقع Mizu بحماية بياناتك الشخصية وفقاً لأحكام القانون رقم 18-07 المؤرخ في 10 يونيو 2018 المتعلق بحماية الأشخاص الطبيعيين في مجال معالجة المعطيات ذات الطابع الشخصي، المعدّل والمتمم بموجب القانون رقم 25-11 المؤرخ في 24 يوليو 2025، وتحت إشراف السلطة الوطنية لحماية المعطيات ذات الطابع الشخصي (ANPDP).

2. المعطيات التي نجمعها
وفقاً للمادة 03 من القانون 18-07 التي تُعرّف "المعطيات ذات الطابع الشخصي" بأنها كل معلومة تسمح بالتعرف على شخص طبيعي بطريقة مباشرة أو غير مباشرة، نجمع منك:

معلومات الحساب: الاسم الكامل، البريد الإلكتروني، رقم الهاتف، كلمة المرور (مشفّرة).
معلومات الموقع الجغرافي: عنوان التوصيل والولاية.
بيانات الطلبات: تاريخ الطلبات، الكميات، الأسعار، وتقييماتك.
بيانات خاصة بالسائقين: وثائق التحقق من الهوية (رخصة القيادة، بطاقة التعريف الوطنية)، بيانات الاشتراك.

3. موافقتك الصريحة (Consent)
طبقاً لمبدأ الموافقة الصريحة الذي يشترطه القانون 18-07، لا تتم معالجة بياناتك الشخصية إلا بعد موافقتك الواضحة عند التسجيل في التطبيق. يمكنك سحب موافقتك في أي وقت بحذف حسابك أو التواصل معنا.

4. الغاية من جمع البيانات
تُجمع بياناتك للأغراض التالية حصراً، ولا تُستخدم أو تُحوَّل لغاية أخرى:

تنفيذ ومتابعة طلبات التوصيل بينك وبين السائق.
التحقق من هويتك عبر رمز التحقق (OTP).
التواصل معك بخصوص طلباتك أو اشتراكك.
تحسين جودة الخدمة.

5. مسؤول المعالجة (Data Controller)
الجهة المسؤولة عن معالجة بياناتك هي فريق Mizu. لأي استفسار حول هذه المعالجة، يمكنك التواصل معنا عبر waterdrive213@gmail.com

6. مكان تخزين البيانات
نحرص على تخزين بياناتك وفق معايير أمان معتمدة، ونعمل على أن تبقى عمليات المعالجة الحساسة (كوثائق تحقق السائقين) ضمن أطر آمنة ومشفّرة.

7. حقوقك القانونية (وفقاً للقانون 18-07)
يضمن لك القانون 18-07 الحقوق التالية، ويمكنك ممارستها بالتواصل معنا عبر الدعم الفني داخل التطبيق:

الحق في الإعلام (المادة 32): معرفة تفاصيل معالجة بياناتك.
الحق في الولوج (المادة 34): طلب نسخة من بياناتك الشخصية المحفوظة لدينا.
الحق في التصحيح (المادة 35): طلب تصحيح أو استكمال بيانات غير دقيقة أو ناقصة.
الحق في الاعتراض (المادة 36): الاعتراض على معالجة بياناتك لسبب مشروع.
الحق في الحذف: طلب حذف حسابك وبياناتك بشكل نهائي.

8. مشاركة المعلومات
لا نبيع بياناتك لأي طرف ثالث. تتم مشاركة الحد الأدنى الضروري (الاسم، الهاتف، الموقع) بين الزبون والسائق فقط لإتمام التوصيل.

9. مدة الاحتفاظ بالبيانات
نحتفظ ببياناتك طوال فترة استخدامك النشط للحساب، ولمدة معقولة بعد الحذف للأغراض القانونية إن وجدت، ثم تُحذف بشكل آمن.

10. الاتصال بالسلطة الوطنية
إذا لم تجد حلاً مرضياً لاستفسارك معنا، يحق لك التواصل مباشرة مع السلطة الوطنية لحماية المعطيات ذات الطابع الشخصي (ANPDP) عبر: anpdp@anpdp.dz

11. تواصل معنا
لأي استفسار: waterdrive213@gmail.com أو عبر شات الدعم الفني داخل التطبيق.`,
      contact: '',
    },
    security: {
      title: 'سياسة الأمان',
      intro: 'آخر تحديث: أغسطس 2026',
      missing: `1. التزامنا القانوني والتقني بالأمان
تماشياً مع متطلبات القانون 18-07 الذي يُلزم كل مسؤول معالجة بيانات باتخاذ "تدابير تقنية وتنظيمية ملائمة" لحماية المعطيات الشخصية من الفقدان أو الولوج غير المرخّص أو المعالجة غير المشروعة، نطبّق في Mizu مجموعة من الإجراءات الصارمة.

2. إجراءات الحماية التقنية

التشفير: جميع الاتصالات بين التطبيق وخوادمنا تتم عبر بروتوكول HTTPS المشفّر بالكامل.
التحقق بخطوتين عبر OTP: تسجيل الدخول وإنشاء الحساب يتطلبان رمز تحقق يُرسل إلى بريدك الإلكتروني.
تشفير كلمات المرور: لا نخزّن كلمة المرور كنص عادي أبداً؛ تُشفّر باستخدام خوارزميات معتمدة في الصناعة.
التحقق من هوية السائقين: كل سائق يمرّ بعملية تحقق تشمل وثائق رسمية قبل الموافقة على نشاطه، حماية للزبائن وللسائقين معاً.
مراقبة مستمرة: نراقب الأنشطة غير الاعتيادية على الحسابات للحد من أي استخدام غير مصرّح به.
السرية المهنية: وفقاً لما ينص عليه القانون 18-07، يلتزم كل من له اطّلاع على معطياتك الشخصية ضمن فريقنا بالسر المهني حتى بعد انتهاء مهامه.

3. نصائح لحماية حسابك

لا تشارك كلمة مرورك أو رمز التحقق (OTP) مع أي شخص، حتى لو ادّعى أنه من فريق Mizu.
استخدم كلمة مرور قوية وفريدة لحسابك.
سجّل الخروج من حسابك عند استخدام جهاز مشترك.
بلّغنا فوراً عبر الدعم الفني إذا لاحظت أي نشاط مريب.

4. الإبلاغ عن مشاكل أمنية
إذا اكتشفت ثغرة أمنية، تواصل معنا فوراً عبر waterdrive213@gmail.com لمعالجتها بأسرع وقت.

5. حقك في اللجوء للسلطة الوطنية
في حال شعرت بأن أمان بياناتك تعرّض للخطر ولم نستجب بشكل مناسب، يحق لك تقديم شكوى للسلطة الوطنية لحماية المعطيات ذات الطابع الشخصي (ANPDP) عبر: anpdp@anpdp.dz`,
      contact: '',
    },
    privacyLabel: 'سياسة الخصوصية',
    securityLabel: 'سياسة الأمان',
    backHome: 'العودة إلى الرئيسية',
    teamTitle: 'فريق العمل',
    teamMembers: [
      { name: 'محمد زراري', role: 'مصمم ومساعد مسؤول الدعم' },
      { name: 'بن علاهم محمد', role: 'مطور ومسؤول الدعم' },
    ],
    showcase: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      driverTitle: 'لوحة السائق الذكية',
      driverBody: 'تعرض كل الطلبات المتاحة في منطقتك لحظياً، مع تفاصيل الكمية والسعر وموقع الزبون، لتختار وتقبل الطلب المناسب لك بضغطة واحدة.',
      ordersTitle: 'اطلب وتابع بكل بساطة',
      ordersBody: 'اختر كمية المياه التي تحتاجها من قائمة واسعة تبدأ من 5 لتر وحتى 1000 لتر، وتابع كل طلباتك السابقة والحالية من مكان واحد بكل وضوح.',
      supportTitle: 'دعم فوري حين تحتاجه',
      supportBody: 'تواصل مباشرة مع فريق Mizu عبر شات داخل التطبيق، وسنرد على استفسارك أو مشكلتك بأسرع وقت ممكن.',
    },
  },
  fr: {
    nav: ['Accueil', 'Avantages', 'Comment ça marche', 'Notre équipe', 'Télécharger', 'Contact'],
    heroKicker: 'L’eau pure, juste à temps',
    heroTitle: 'Votre eau arrive. Tout simplement.',
    heroBody: 'Mizu est votre compagnon local pour commander de l’eau potable en Algérie. Choisissez, suivez, recevez.',
    download: 'Télécharger l’app',
    facebook: 'Nous suivre sur Facebook',
    trusted: 'Adopté chaque jour par des familles algériennes',
    appPreview: 'L’expérience de commande',
    featureKicker: 'Tout sous contrôle',
    featureTitle: 'De l’eau fraîche,\nen un geste.',
    featureBody: 'Mizu s’adapte à votre vraie journée : rapide quand vous êtes pressé, clair quand vous voulez être rassuré.',
    howKicker: 'Quatre étapes, zéro complication',
    howTitle: 'De l’app à votre porte.',
    howBody: 'Pas de longues listes, pas d’attente au téléphone. Tout ce qu’il vous faut, au même endroit.',
    driverKicker: 'Aux chauffeurs d’Algérie',
    driverTitle: 'Une route plus simple\npour chaque chauffeur.',
    driverBody: 'Rejoignez le réseau Mizu, organisez vos livraisons et apportez l’eau là où elle compte.',
    driverButton: 'En savoir plus',
    finalKicker: 'L’eau est en route',
    finalTitle: 'On commence ?',
    finalBody: 'Téléchargez Mizu et faites de votre commande d’eau la partie la plus simple de votre journée.',
    appStore: 'Bientôt sur App Store',
    footerBody: 'La livraison d’eau potable, en mieux et près de chez vous.',
    support: 'Écrire au support',
    rights: '© Mizu 2026. Fait en Algérie.',
    map: 'Suivi en direct',
    ready: 'Disponible',
    litres: 'litres',
    placeOrder: 'Confirmer la commande',
    placed: 'Commande reçue',
    today: 'Aujourd’hui, sous 45 min',
    chooseSize: 'Choisissez le volume',
    consumers: {
      kicker: 'Pour les consommateurs',
      title: 'Une eau potable pure, où que vous soyez',
      subtitle: 'Commandez en un geste et suivez votre livraison jusqu’à votre porte',
      body: 'Fini les files d’attente et les bouteilles lourdes à transporter. Avec Mizu, commandez la quantité d’eau qu’il vous faut depuis votre téléphone et laissez un chauffeur fiable et proche s’occuper du reste — rapidement et en toute transparence.',
      cta: 'Téléchargez l’app et commandez votre première quantité d’eau en quelques minutes',
      placeholder: 'Écran de commande consommateur',
      features: [
        { title: 'Commander en quelques secondes', body: 'Choisissez la quantité souhaitée (de 5 à 1000 litres) et finalisez en un geste, sans complication.' },
        { title: 'Localisation automatique', body: 'L’application repère votre position avec précision ou enregistre vos adresses pour commander plus vite.' },
        { title: 'Suivi du chauffeur en direct', body: 'Visualisez votre chauffeur sur la carte en temps réel et prévoyez précisément son heure d’arrivée.' },
        { title: 'Vos chauffeurs préférés', body: 'Vous aimez un chauffeur ? Ajoutez-le à vos favoris et commandez directement auprès de lui.' },
        { title: 'Prix totalement transparent', body: 'Découvrez le montant total avant de confirmer, sans surprise ni frais cachés.' },
        { title: 'Un support toujours présent', body: 'Une question ou un problème ? Notre équipe vous répond par chat directement dans l’application.' },
      ],
    },
    drivers: {
      kicker: 'Pour les chauffeurs',
      title: 'Rejoignez la famille des chauffeurs Mizu',
      subtitle: 'Transformez votre temps en revenu réel et participez au premier réseau de livraison d’eau en Algérie',
      body: 'Devenez chauffeur indépendant avec Mizu et recevez des demandes de livraison dans votre zone directement sur votre téléphone. Notre système vous offre une liberté totale : choisissez quand travailler, où travailler et combien de commandes accepter — sans engagement fixe ni pression.',
      cta: 'Inscrivez-vous comme chauffeur et commencez votre première journée en quelques minutes',
      placeholder: 'Tableau de bord chauffeur',
      features: [
        { title: 'Un revenu supplémentaire flexible', body: 'Acceptez les demandes quand cela vous convient et suivez vos revenus quotidiens et mensuels en direct.' },
        { title: 'Des demandes près de chez vous', body: 'Recevez une alerte pour chaque nouvelle demande dans votre zone, avec quantité, prix et adresse précise.' },
        { title: 'Un abonnement transparent', body: 'Un abonnement mensuel simple vous donne accès aux commandes disponibles, avec une durée restante claire.' },
        { title: 'Votre disponibilité en un geste', body: 'Passez de disponible à pause ou fermé selon vos besoins : le système arrête automatiquement les demandes.' },
        { title: 'Construisez votre réputation', body: 'Chaque client vous évalue après la livraison ; une meilleure note augmente vos chances d’être choisi.' },
        { title: 'Un support technique toujours présent', body: 'L’équipe Mizu répond à vos questions et vous accompagne via un chat dans l’application.' },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité',
      intro: 'Dernière mise à jour : août 2026',
      missing: `1. Introduction et base juridique
L’application et le site Mizu s’engagent à protéger vos données personnelles conformément aux dispositions de la loi n° 18-07 du 10 juin 2018 relative à la protection des personnes physiques dans le domaine du traitement des données à caractère personnel, modifiée et complétée par la loi n° 25-11 du 24 juillet 2025, sous la supervision de l’Autorité nationale de protection des données à caractère personnel (ANPDP).

2. Données que nous collectons
Conformément à l’article 03 de la loi 18-07, qui définit les « données à caractère personnel » comme toute information permettant d’identifier directement ou indirectement une personne physique, nous collectons :

Informations du compte : nom complet, adresse e-mail, numéro de téléphone, mot de passe (chiffré).
Données de localisation : adresse de livraison et wilaya.
Données des commandes : dates des commandes, quantités, prix et évaluations.
Données propres aux chauffeurs : documents de vérification d’identité (permis de conduire, carte nationale d’identité) et données d’abonnement.

3. Votre consentement explicite (Consent)
Conformément au principe du consentement explicite exigé par la loi 18-07, vos données personnelles ne sont traitées qu’après votre consentement clair lors de votre inscription à l’application. Vous pouvez retirer votre consentement à tout moment en supprimant votre compte ou en nous contactant.

4. Finalité de la collecte des données
Vos données sont collectées exclusivement pour les finalités suivantes et ne sont pas utilisées ou transférées à d’autres fins :

Exécuter et suivre les commandes de livraison entre vous et le chauffeur.
Vérifier votre identité au moyen d’un code de vérification (OTP).
Vous contacter au sujet de vos commandes ou de votre abonnement.
Améliorer la qualité du service.

5. Responsable du traitement (Data Controller)
L’équipe Mizu est responsable du traitement de vos données. Pour toute question concernant ce traitement, vous pouvez nous contacter à l’adresse waterdrive213@gmail.com

6. Lieu de stockage des données
Nous veillons à stocker vos données selon des normes de sécurité reconnues et nous nous efforçons de maintenir les opérations de traitement sensibles, notamment les documents de vérification des chauffeurs, dans des environnements sécurisés et chiffrés.

7. Vos droits légaux (conformément à la loi 18-07)
La loi 18-07 vous garantit les droits suivants, que vous pouvez exercer en nous contactant via le support technique intégré à l’application :

Droit à l’information (article 32) : connaître les détails du traitement de vos données.
Droit d’accès (article 34) : demander une copie de vos données personnelles conservées par nos soins.
Droit de rectification (article 35) : demander la correction ou le complément de données inexactes ou incomplètes.
Droit d’opposition (article 36) : vous opposer au traitement de vos données pour un motif légitime.
Droit à l’effacement : demander la suppression définitive de votre compte et de vos données.

8. Partage des informations
Nous ne vendons vos données à aucun tiers. Le minimum nécessaire (nom, téléphone et localisation) est partagé entre le client et le chauffeur uniquement pour effectuer la livraison.

9. Durée de conservation des données
Nous conservons vos données pendant toute la durée d’utilisation active de votre compte et pendant une durée raisonnable après sa suppression à des fins légales, le cas échéant, puis elles sont supprimées de manière sécurisée.

10. Contacter l’Autorité nationale
Si vous ne trouvez pas de solution satisfaisante à votre demande auprès de nous, vous pouvez contacter directement l’Autorité nationale de protection des données à caractère personnel (ANPDP) à l’adresse suivante : anpdp@anpdp.dz

11. Nous contacter
Pour toute question : waterdrive213@gmail.com ou via le chat du support technique intégré à l’application.`,
      contact: '',
    },
    security: {
      title: 'Politique de sécurité',
      intro: 'Dernière mise à jour : août 2026',
      missing: `1. Notre engagement juridique et technique en matière de sécurité
Conformément aux exigences de la loi 18-07, qui impose à tout responsable du traitement des données de prendre des « mesures techniques et organisationnelles appropriées » pour protéger les données personnelles contre la perte, l’accès non autorisé ou le traitement illicite, Mizu applique un ensemble de mesures strictes.

2. Mesures de protection technique

Chiffrement : toutes les communications entre l’application et nos serveurs sont entièrement protégées par le protocole HTTPS chiffré.
Vérification en deux étapes par OTP : la connexion et la création d’un compte nécessitent un code de vérification envoyé à votre adresse e-mail.
Chiffrement des mots de passe : nous ne stockons jamais votre mot de passe en clair ; il est chiffré à l’aide d’algorithmes reconnus par l’industrie.
Vérification de l’identité des chauffeurs : chaque chauffeur fait l’objet d’une vérification comprenant des documents officiels avant l’autorisation de son activité, afin de protéger à la fois les clients et les chauffeurs.
Surveillance continue : nous surveillons les activités inhabituelles sur les comptes afin de limiter toute utilisation non autorisée.
Confidentialité professionnelle : conformément à la loi 18-07, toute personne de notre équipe ayant accès à vos données personnelles est tenue au secret professionnel, même après la fin de ses fonctions.

3. Conseils pour protéger votre compte

Ne partagez votre mot de passe ou votre code de vérification (OTP) avec personne, même si cette personne prétend faire partie de l’équipe Mizu.
Utilisez un mot de passe fort et unique pour votre compte.
Déconnectez-vous lorsque vous utilisez un appareil partagé.
Informez-nous immédiatement via le support technique si vous remarquez une activité suspecte.

4. Signaler les problèmes de sécurité
Si vous découvrez une faille de sécurité, contactez-nous immédiatement à l’adresse waterdrive213@gmail.com afin que nous la traitions dans les meilleurs délais.

5. Votre droit de saisir l’Autorité nationale
Si vous estimez que la sécurité de vos données a été compromise et que notre réponse n’est pas appropriée, vous pouvez déposer une plainte auprès de l’Autorité nationale de protection des données à caractère personnel (ANPDP) à l’adresse suivante : anpdp@anpdp.dz`,
      contact: '',
    },
    privacyLabel: 'Politique de confidentialité',
    securityLabel: 'Politique de sécurité',
    backHome: 'Retour à l’accueil',
    teamTitle: 'Notre équipe',
    teamMembers: [
      { name: 'محمد زراري', role: 'Designer et assistant du support' },
      { name: 'بن علاهم محمد', role: 'Développeur et responsable du support' },
    ],
    showcase: {
      login: 'Connexion',
      register: 'Créer un compte',
      driverTitle: 'Tableau de bord chauffeur',
      driverBody: 'Affiche en temps réel toutes les commandes disponibles dans votre région, avec la quantité, le prix et la position du client, afin de choisir et d’accepter la commande qui vous convient en un seul geste.',
      ordersTitle: 'Commandez et suivez en toute simplicité',
      ordersBody: 'Choisissez la quantité d’eau dont vous avez besoin dans une large sélection allant de 5 à 1000 litres, et suivez toutes vos commandes passées et en cours depuis un seul endroit, en toute clarté.',
      supportTitle: 'Une assistance immédiate quand vous en avez besoin',
      supportBody: 'Contactez directement l’équipe Mizu via le chat intégré à l’application ; nous répondrons à votre question ou à votre problème dans les meilleurs délais.',
    },
  },
  en: {
    nav: ['Home', 'Features', 'How it works', 'Our Team', 'Download', 'Contact'],
    heroKicker: 'Pure water, right on time',
    heroTitle: 'Your water arrives. Simple as that.',
    heroBody: 'Mizu is your local companion for ordering drinking water in Algeria. Pick a size, follow your driver, and open the door.',
    download: 'Download the app',
    facebook: 'Follow us on Facebook',
    trusted: 'Trusted by Algerian families, every day',
    appPreview: 'The ordering experience',
    featureKicker: 'Everything under control',
    featureTitle: 'Fresh water,\nin one tap.',
    featureBody: 'Mizu is built around your real day: fast when you’re in a hurry, clear when you want reassurance, always close by.',
    howKicker: 'Four steps, zero hassle',
    howTitle: 'From app to doorstep.',
    howBody: 'No long lists, no waiting on the phone. Everything you need, in one place.',
    driverKicker: 'For Algeria’s drivers',
    driverTitle: 'A smarter route\nfor every driver.',
    driverBody: 'Join the Mizu network, organise your orders, and deliver water where it matters.',
    driverButton: 'Learn more',
    finalKicker: 'Water is on its way',
    finalTitle: 'Ready to start?',
    finalBody: 'Download Mizu and make ordering water the easiest part of your day.',
    appStore: 'Coming soon to App Store',
    footerBody: 'Drinking water delivery, made local and smarter.',
    support: 'Message support',
    rights: '© Mizu 2026. Made in Algeria.',
    map: 'Live map tracking',
    ready: 'Available',
    litres: 'litres',
    placeOrder: 'Place the order',
    placed: 'Order received',
    today: 'Today, within 45 min',
    chooseSize: 'Choose your volume',
    consumers: {
      kicker: 'For consumers',
      title: 'Pure drinking water, wherever you are',
      subtitle: 'Order in one tap and follow your delivery moment by moment to your door',
      body: 'No more waiting in lines or carrying heavy bottles yourself. With Mizu, order the amount of water you need from your phone, and a trusted driver nearby takes care of the rest — quickly and with full transparency at every step.',
      cta: 'Download the app and order your first water delivery in minutes',
      placeholder: 'Consumer order screen',
      features: [
        { title: 'Order in seconds', body: 'Choose the amount you need (from 5 to 1000 litres) and complete your order in one tap, without the hassle.' },
        { title: 'Automatic location', body: 'The app pinpoints your location or saves several addresses, such as home and work, for faster ordering.' },
        { title: 'Live driver tracking', body: 'Watch your driver approach on the map in real time and see exactly when they will arrive.' },
        { title: 'Favourite drivers', body: 'Like a particular driver? Add them to your favourites and order from them directly next time.' },
        { title: 'Fully transparent pricing', body: 'Know the total price before confirming your order, with no surprises or hidden fees.' },
        { title: 'Ongoing support', body: 'Have a question or a problem? Our support team is available through in-app live chat.' },
      ],
    },
    drivers: {
      kicker: 'For drivers',
      title: 'Join the Mizu driver family',
      subtitle: 'Turn your time into real income and become part of Algeria’s first water delivery network',
      body: 'Become an independent Mizu driver and start receiving delivery requests in your area directly on your phone. Our system gives you complete freedom: choose when you work, where you work, and how many orders you accept each day — with no fixed commitments and no pressure.',
      cta: 'Register as a driver and start your first workday in minutes',
      placeholder: 'Driver dashboard screen',
      features: [
        { title: 'Flexible extra income', body: 'Accept orders when it suits you and track your daily and monthly earnings live from your dashboard.' },
        { title: 'Orders close to you', body: 'Get an instant alert for every new order in your area, with the quantity, price, and exact customer location.' },
        { title: 'A transparent subscription', body: 'A simple monthly subscription gives you full access to available orders, with a clear view of the remaining time.' },
        { title: 'One-tap availability', body: 'Switch between available, on break, or closed; the system stops sending requests automatically when you are away.' },
        { title: 'Build your reputation', body: 'Every customer rates you after delivery, and higher ratings mean more chances to be chosen as a favourite driver.' },
        { title: 'Support that is always there', body: 'The Mizu team answers your questions and helps solve issues through in-app live chat.' },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'Last updated: August 2026',
      missing: `1. Introduction and legal basis
The Mizu application and website are committed to protecting your personal data in accordance with the provisions of Law No. 18-07 dated 10 June 2018 relating to the protection of natural persons in the processing of personal data, amended and supplemented by Law No. 25-11 dated 24 July 2025, under the supervision of the National Authority for the Protection of Personal Data (ANPDP).

2. Data we collect
In accordance with Article 03 of Law 18-07, which defines “personal data” as any information that allows a natural person to be identified directly or indirectly, we collect:

Account information: full name, email address, phone number, and password (encrypted).
Location information: delivery address and wilaya.
Order data: order dates, quantities, prices, and ratings.
Driver-specific data: identity verification documents (driving licence, national identity card), and subscription data.

3. Your explicit consent (Consent)
In accordance with the principle of explicit consent required by Law 18-07, your personal data is only processed after your clear consent when registering in the application. You may withdraw your consent at any time by deleting your account or contacting us.

4. Purpose of data collection
Your data is collected exclusively for the following purposes and is not used or transferred for any other purpose:

Executing and tracking delivery orders between you and the driver.
Verifying your identity through a verification code (OTP).
Contacting you regarding your orders or subscription.
Improving the quality of the service.

5. Data Controller
The team at Mizu is responsible for processing your data. For any questions about this processing, you can contact us at waterdrive213@gmail.com

6. Where data is stored
We take care to store your data according to recognised security standards and work to keep sensitive processing operations, such as driver verification documents, within secure and encrypted environments.

7. Your legal rights (under Law 18-07)
Law 18-07 guarantees you the following rights, which you may exercise by contacting us through the in-app technical support:

Right to information (Article 32): knowing the details of how your data is processed.
Right of access (Article 34): requesting a copy of the personal data we hold about you.
Right to rectification (Article 35): requesting the correction or completion of inaccurate or incomplete data.
Right to object (Article 36): objecting to the processing of your data for a legitimate reason.
Right to erasure: requesting the permanent deletion of your account and data.

8. Sharing information
We do not sell your data to any third party. Only the minimum necessary information (name, phone number, and location) is shared between the customer and the driver to complete the delivery.

9. Data retention period
We retain your data throughout the period of active use of your account and for a reasonable period after deletion for legal purposes, if applicable, after which it is securely deleted.

10. Contacting the National Authority
If you do not find a satisfactory solution to your enquiry with us, you have the right to contact the National Authority for the Protection of Personal Data (ANPDP) directly at: anpdp@anpdp.dz

11. Contact us
For any questions: waterdrive213@gmail.com or through the in-app technical support chat.`,
      contact: '',
    },
    security: {
      title: 'Security Policy',
      intro: 'Last updated: August 2026',
      missing: `1. Our legal and technical security commitment
In line with the requirements of Law 18-07, which requires every data controller to take “appropriate technical and organisational measures” to protect personal data from loss, unauthorised access, or unlawful processing, Mizu applies a set of strict measures.

2. Technical protection measures

Encryption: all communications between the application and our servers take place over the fully encrypted HTTPS protocol.
Two-step verification through OTP: signing in and creating an account requires a verification code sent to your email address.
Password encryption: we never store your password in plain text; it is encrypted using industry-recognised algorithms.
Driver identity verification: every driver undergoes a verification process that includes official documents before their activity is approved, protecting both customers and drivers.
Continuous monitoring: we monitor unusual account activity to limit any unauthorised use.
Professional confidentiality: in accordance with Law 18-07, everyone on our team who has access to your personal data is bound by professional confidentiality even after their duties end.

3. Tips for protecting your account

Do not share your password or verification code (OTP) with anyone, even if they claim to be part of the Mizu team.
Use a strong and unique password for your account.
Sign out of your account when using a shared device.
Report it immediately through technical support if you notice any suspicious activity.

4. Reporting security issues
If you discover a security vulnerability, contact us immediately at waterdrive213@gmail.com so that we can address it as quickly as possible.

5. Your right to contact the National Authority
If you believe that the security of your data has been compromised and we have not responded appropriately, you have the right to submit a complaint to the National Authority for the Protection of Personal Data (ANPDP) at: anpdp@anpdp.dz`,
      contact: '',
    },
    privacyLabel: 'Privacy Policy',
    securityLabel: 'Security Policy',
    backHome: 'Back to home',
    teamTitle: 'Our Team',
    teamMembers: [
      { name: 'محمد زراري', role: 'Designer and support assistant' },
      { name: 'بن علاهم محمد', role: 'Developer and support lead' },
    ],
    showcase: {
      login: 'Sign in',
      register: 'Create account',
      driverTitle: 'Smart driver dashboard',
      driverBody: 'See every order available in your area in real time, with the quantity, price, and customer location, so you can choose and accept the right order in one tap.',
      ordersTitle: 'Order and track with ease',
      ordersBody: 'Choose the amount of water you need from a wide range starting at 5 litres and reaching 1000 litres, then follow all your past and current orders clearly from one place.',
      supportTitle: 'Instant support when you need it',
      supportBody: 'Reach the Mizu team directly through in-app chat, and we will answer your question or help with your issue as quickly as possible.',
    },
  },
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-mizu">
      <div className={`${compact ? 'h-9 w-9 rounded-xl' : 'h-11 w-11 rounded-[15px]'} relative grid place-items-center border border-white/10 bg-[#07111d] shadow-[0_0_24px_rgba(36,184,232,.12)]`}>
        <svg viewBox="0 0 44 44" className="h-7 w-7 text-cyan-100" fill="none" aria-label="Mizu water drop mark">
          <path d="M22 5.5S10.5 17.2 10.5 24.8a11.5 11.5 0 0 0 23 0C33.5 17.2 22 5.5 22 5.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
          <path d="M16 27.5c1.4 3.1 3.4 4.7 6 4.7" stroke="#62d5ef" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="leading-none">
        <div className="font-display text-[21px] font-bold tracking-[-.04em] text-white">Mizu</div>
        {!compact && <div className="mt-1 text-[9px] font-semibold uppercase tracking-[.2em] text-[#62d5ef]">water delivery</div>}
      </div>
    </div>
  );
}

function ShowcasePhone({ image, label, dataImage, compact = false }: { image?: string; label: string; dataImage: string; compact?: boolean }) {
  return (
    <div className="flex flex-col items-center" data-image={dataImage} data-testid={`showcase-phone-${dataImage}`}>
      <div className={`phone-shell ${compact ? 'w-[150px] sm:w-[175px]' : 'w-[205px] sm:w-[245px]'} p-1.5`}>
        <div className="phone-screen aspect-[.49] overflow-hidden">
          {image ? (
            <img src={image} alt={`Mizu ${label}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-[linear-gradient(160deg,#0c2135,#07111d)] p-5 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-[22px] border border-cyan-300/25 bg-cyan-300/10 text-cyan-200"><Droplets size={28} /></div>
              <span className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-500">Image placeholder</span>
              <code dir="ltr" className="rounded-lg border border-dashed border-cyan-300/35 bg-cyan-300/[.06] px-2.5 py-1.5 text-[8px] text-cyan-200">data-image="{dataImage}"</code>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 text-center text-sm font-semibold text-slate-200">{label}</div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .65, delay, ease: [0.22, 1, .36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TeamMemberCard({ member, dataImage, delay }: { member: TeamMember; dataImage: string; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <article className="group flex flex-col items-center text-center" data-testid={`team-member-${dataImage}`}>
        <div
          data-image={dataImage}
          className="grid h-[120px] w-[120px] place-items-center rounded-full border border-cyan-300/35 bg-[#07111d] text-cyan-200 shadow-[0_0_30px_rgba(41,171,226,.16)] transition duration-300 group-hover:scale-105 group-hover:border-cyan-200/70 group-hover:shadow-[0_0_42px_rgba(41,171,226,.3)]"
          aria-label={`Image placeholder for ${member.name}`}
        >
          <UserRound size={42} strokeWidth={1.35} />
        </div>
        <h3 className="mt-6 text-lg font-bold tracking-[-.02em] text-white">{member.name}</h3>
        <p className="mt-2 max-w-[230px] text-sm leading-6 text-slate-400">{member.role}</p>
      </article>
    </FadeIn>
  );
}

function TeamSection({ copy }: { copy: Copy }) {
  return (
    <section id="team" className="scroll-mt-24 relative overflow-hidden border-y border-white/[.06] bg-[#0a1423] py-24 sm:py-32">
      <div className="pointer-events-none absolute -start-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-400/[.07] blur-[100px]" />
      <div className="pointer-events-none absolute -end-32 bottom-[-100px] h-80 w-80 rounded-full bg-[#00e0a0]/[.05] blur-[100px]" />
      <div className="section-shell relative">
        <FadeIn className="text-center">
          <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(41,171,226,.55)]" />
          <h2 className="text-4xl font-bold tracking-[-.05em] text-white sm:text-6xl">{copy.teamTitle}</h2>
        </FadeIn>
        <div className="mx-auto mt-14 grid max-w-[620px] grid-cols-2 gap-5 sm:gap-16" dir="rtl">
          <TeamMemberCard member={copy.teamMembers[0]} dataImage="team-member-1" delay={.08} />
          <TeamMemberCard member={copy.teamMembers[1]} dataImage="team-member-2" delay={.2} />
        </div>
      </div>
    </section>
  );
}

function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const labels: Record<Lang, string> = { ar: 'العربية', fr: 'Français', en: 'English' };
  return (
    <div className="relative" data-testid="language-switcher">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/[.08]" data-testid="button-language">
        <Languages size={15} className="text-cyan-300" />
        <span>{labels[lang]}</span>
        <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="glass absolute end-0 top-[calc(100%+8px)] z-40 min-w-[128px] overflow-hidden rounded-2xl p-1.5 shadow-2xl">
          {(Object.keys(labels) as Lang[]).map((key) => (
            <button key={key} onClick={() => { setLang(key); setOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition hover:bg-cyan-400/10 ${lang === key ? 'text-cyan-300' : 'text-slate-300'}`} data-testid={`button-language-${key}`}>
              {labels[key]} {lang === key && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PhonePreview({ copy }: { copy: Copy }) {
  const [selected, setSelected] = useState(20);
  const [placed, setPlaced] = useState(false);
  const prices: Record<number, number> = { 5: 180, 10: 300, 20: 480, 50: 950 };
  return (
    <div className="phone-shell w-[280px] sm:w-[315px]" data-testid="phone-preview">
      <div className="phone-screen min-h-[575px]">
        <div className="flex items-center justify-between px-5 pb-3 pt-5 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#182941]"><Menu size={15} /></div>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#062c3b]"><Truck size={15} className="text-cyan-300" /></div>
            <span className="font-display text-sm font-bold text-cyan-300">Mizu</span>
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#182941]"><Bell size={15} /></div>
        </div>
        <div className="border-y border-white/[.07] px-5 py-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Good morning,</span>
            <span className="text-[10px] text-slate-500">09:41</span>
          </div>
          <div className="font-arabic text-lg font-bold text-white">جاهز لطلب مياهك؟</div>
        </div>
        <div className="px-4 pb-5 pt-4">
          <div className="mb-3 flex items-center gap-2 rounded-2xl border border-cyan-300/25 bg-cyan-400/[.08] p-3">
            <LocateFixed size={17} className="text-cyan-300" />
            <div className="flex-1">
              <div className="text-[9px] uppercase tracking-wider text-slate-500">Deliver to</div>
              <div className="font-arabic text-xs text-white">الجزائر العاصمة</div>
            </div>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span className="font-arabic text-sm font-bold text-white">{copy.chooseSize}</span>
            <span className="text-[10px] text-[#00e0a0]">{copy.today}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 20, 50].map((size) => (
              <button key={size} onClick={() => { setSelected(size); setPlaced(false); }} className={`rounded-xl border py-2.5 text-xs transition ${selected === size ? 'border-cyan-300 bg-cyan-400 text-[#07101d] font-bold cyan-glow' : 'border-white/10 bg-white/[.04] text-slate-300 hover:border-cyan-300/40'}`} data-testid={`button-size-${size}`}>
                {size}L
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-[#121e32] p-3.5">
            <div className="flex items-end justify-between">
              <span className="text-[10px] text-slate-500">Total estimate</span>
              <span className="font-display text-xl font-bold text-white">{prices[selected]} <small className="text-[10px] font-medium text-slate-400">DZD</small></span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400"><Clock3 size={11} className="text-cyan-300" /> 30–45 min delivery</div>
          </div>
          <button onClick={() => setPlaced(true)} className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition ${placed ? 'bg-[#00c98f] text-[#051b18]' : 'bg-[#19aee3] text-[#06111e] cyan-glow hover:-translate-y-0.5'}`} data-testid="button-preview-order">
            {placed ? <Check size={16} /> : <Package size={16} />}
            {placed ? copy.placed : copy.placeOrder}
          </button>
          {placed && <div className="mt-3 text-center text-[10px] text-[#5fe7bb]" data-testid="status-order-placed">Driver Samir is getting your order ready.</div>}
        </div>
        <div className="mx-4 rounded-2xl border border-white/[.08] bg-white/[.025] p-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#ff4d6d]/15"><RouteIcon size={14} className="text-[#ff6b86]" /></div>
            <div className="flex-1"><div className="text-[10px] font-semibold text-white">{copy.map}</div><div className="mt-0.5 text-[9px] text-slate-500">Your driver is 2.4 km away</div></div>
            <ArrowUpRight size={14} className="text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPhone({ role, label, isArabic }: { role: 'consumer' | 'driver'; label: string; isArabic: boolean }) {
  const imageName = role === 'consumer' ? 'consumer-order-screen' : 'driver-dashboard-screen';
  return (
    <div className="phone-shell w-[230px] sm:w-[270px]" data-testid={`placeholder-phone-${role}`}>
      <div className="phone-screen min-h-[500px] overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/[.08] px-4 py-4">
          <div className="h-7 w-7 rounded-full bg-white/[.08]" />
          <BrandMark compact />
          <div className="h-7 w-7 rounded-full bg-white/[.08]" />
        </div>
        <div className="flex min-h-[430px] flex-col items-center justify-center p-7 text-center">
          <div className={`grid h-20 w-20 place-items-center rounded-[26px] ${role === 'consumer' ? 'bg-cyan-300/15 text-cyan-300' : 'bg-[#00e0a0]/15 text-[#00e0a0]'} shadow-[0_0_45px_rgba(33,190,232,.14)]`}>
            {role === 'consumer' ? <Package size={34} /> : <Gauge size={34} />}
          </div>
          <div className="mt-7 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">{isArabic ? 'صورة مؤقتة' : 'Image placeholder'}</div>
          <div className="mt-2 text-base font-bold text-white">{label}</div>
          <code dir="ltr" className="mt-4 rounded-xl border border-dashed border-cyan-300/35 bg-cyan-300/[.06] px-3 py-2 text-[9px] text-cyan-200">
            data-image="{imageName}"
          </code>
          <p className="mt-5 max-w-[175px] text-[10px] leading-5 text-slate-500">
            {isArabic ? 'استبدل هذا الإطار بلقطة الشاشة الحقيقية لاحقاً.' : 'Replace this frame with the final product screenshot later.'}
          </p>
        </div>
      </div>
    </div>
  );
}

function RoleFeatureSection({ id, role, content, isArabic }: { id: string; role: 'consumer' | 'driver'; content: RoleContent; isArabic: boolean }) {
  const icons = role === 'consumer'
    ? [Package, LocateFixed, RouteIcon, Heart, ShieldCheck, Headphones]
    : [CircleDollarSign, MapPin, ShieldCheck, Zap, Star, Headphones];
  const accent = role === 'consumer' ? 'cyan' : 'teal';
  return (
    <section id={id} className={`relative overflow-hidden border-y border-white/[.06] py-28 sm:py-36 ${role === 'consumer' ? 'bg-[linear-gradient(135deg,#0a1220_0%,#0d1d31_52%,#07151e_100%)]' : 'bg-[linear-gradient(135deg,#09151b_0%,#0c282b_52%,#0a1422_100%)]'}`}>
      <div className={`pointer-events-none absolute ${role === 'consumer' ? '-start-40 top-12 bg-cyan-300/[.08]' : '-end-40 bottom-10 bg-[#00e0a0]/[.08]'} h-[420px] w-[420px] rounded-full blur-[110px]`} />
      <div className="section-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <FadeIn className="flex justify-center lg:justify-start">
            <PlaceholderPhone role={role} label={content.placeholder} isArabic={isArabic} />
          </FadeIn>
          <FadeIn delay={.08}>
            <div className={`mb-4 text-[11px] font-bold uppercase tracking-[.24em] ${accent === 'teal' ? 'text-[#00e0a0]' : 'text-cyan-300'}`}>{content.kicker}</div>
            <h2 className="max-w-[720px] text-4xl font-bold leading-[1.08] tracking-[-.05em] text-white sm:text-6xl">{content.title}</h2>
            <p className={`mt-5 max-w-[650px] text-lg font-semibold leading-8 ${accent === 'teal' ? 'text-[#8cf5d2]' : 'text-cyan-100/90'}`}>{content.subtitle}</p>
            <p className="mt-5 max-w-[670px] text-sm leading-7 text-slate-300/70">{content.body}</p>
            <a href={APK_DOWNLOAD_URL} download="Mizu.apk" className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition hover:-translate-y-1 ${accent === 'teal' ? 'border border-[#00e0a0]/30 bg-[#00e0a0]/10 text-[#5ff2c3]' : 'bg-[#24b8e8] text-[#06111e] cyan-glow'}`} data-testid={`link-${role}-cta`}>
              <Play size={15} fill="currentColor" />{content.cta}<ArrowUpRight size={15} />
            </a>
          </FadeIn>
        </div>
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.features.map(({ title, body }, index) => {
            const Icon = icons[index];
            return (
              <FadeIn key={title} delay={index * .04}>
                <div className="group relative min-h-[205px] overflow-hidden rounded-3xl border border-white/[.09] bg-[#07101d]/65 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30" data-testid={`card-${role}-feature-${index}`}>
                  <div className={`mb-10 grid h-11 w-11 place-items-center rounded-2xl ${accent === 'teal' ? 'bg-[#00e0a0]/15 text-[#00e0a0]' : 'bg-cyan-400/15 text-cyan-300'} transition group-hover:scale-110`}><Icon size={20} /></div>
                  <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                  <p className="max-w-[300px] text-sm leading-6 text-slate-400/80">{body}</p>
                  <div className={`absolute -bottom-10 -end-10 h-28 w-28 rounded-full border ${accent === 'teal' ? 'border-[#00e0a0]/10' : 'border-cyan-300/10'} transition group-hover:scale-125`} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PolicyPage({ kind }: { kind: 'privacy' | 'security' }) {
  const [lang, setLang] = useState<Lang>('ar');
  const copy = translations[lang];
  const content = copy[kind];
  const isArabic = lang === 'ar';
  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [isArabic, lang]);

  return (
    <div className={`min-h-screen bg-[#080e1b] text-slate-200 ${isArabic ? 'font-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="border-b border-white/[.06] bg-[#080e1b]/90">
        <div className="section-shell flex min-h-[74px] items-center justify-between gap-4">
          <a href="/" data-testid="link-policy-home"><BrandMark /></a>
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
      </header>
      <main className="px-5 py-20 sm:py-28">
        <article className="mx-auto max-w-[800px]">
          <a href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200" data-testid="link-policy-back">
            <ChevronLeft size={16} />{copy.backHome}
          </a>
          <div className={`mb-4 text-[11px] font-bold uppercase tracking-[.24em] ${kind === 'security' ? 'text-[#00e0a0]' : 'text-cyan-300'}`}>{kind === 'security' ? copy.securityLabel : copy.privacyLabel}</div>
          <h1 className="text-4xl font-bold tracking-[-.05em] text-white sm:text-6xl">{content.title}</h1>
          <p className="mt-7 text-base leading-8 text-slate-300/80">{content.intro}</p>
          <div className="mt-10 rounded-3xl border border-white/[.1] bg-white/[.03] p-6 sm:p-9">
            <h2 className="text-lg font-bold text-white">{isArabic ? 'النص الكامل للسياسة' : lang === 'fr' ? 'Texte complet de la politique' : 'Full policy text'}</h2>
            <p className="mt-5 whitespace-pre-wrap text-sm leading-8 text-slate-400">{content.missing}</p>
          </div>
           {content.contact && <p className="mt-7 border-s-2 border-cyan-300/50 ps-4 text-sm leading-7 text-slate-400">{content.contact}</p>}
        </article>
      </main>
      <footer className="border-t border-white/[.06] py-6">
        <div className="section-shell flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600">
          <span>{copy.rights}</span>
          <a href="/" className="text-cyan-300 hover:text-cyan-200">{copy.backHome}</a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [mobileMenu, setMobileMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, .3], [0, 90]);
  const copy = translations[lang];
  const isArabic = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [isArabic, lang]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const steps = isArabic
    ? [{ number: '01', title: 'أنشئ حسابك', body: 'دقائق قليلة، ومعلومات بسيطة للبدء.' }, { number: '02', title: 'اختر كمية الماء', body: '5L، 10L، 20L أو أكثر — أنت تختار.' }, { number: '03', title: 'تابع السائق', body: 'خريطة حية ووقت وصول واضح.' }, { number: '04', title: 'قيّم تجربتك', body: 'رأيك يجعل Mizu أفضل للجميع.' }]
    : lang === 'fr'
      ? [{ number: '01', title: 'Créez votre compte', body: 'Quelques minutes et l’essentiel pour commencer.' }, { number: '02', title: 'Choisissez le volume', body: '5L, 10L, 20L ou plus — c’est vous qui décidez.' }, { number: '03', title: 'Suivez le chauffeur', body: 'Une carte en direct et une arrivée claire.' }, { number: '04', title: 'Notez l’expérience', body: 'Votre avis rend Mizu meilleur pour tous.' }]
      : [{ number: '01', title: 'Create your account', body: 'A few minutes and only what we need to begin.' }, { number: '02', title: 'Choose your volume', body: '5L, 10L, 20L or more — you decide.' }, { number: '03', title: 'Follow your driver', body: 'A live map and a clear arrival time.' }, { number: '04', title: 'Rate the experience', body: 'Your feedback makes Mizu better for everyone.' }];

  return (
    <div className={isArabic ? 'font-arabic' : ''} dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-[#080e1b]/80 backdrop-blur-xl">
        <div className="section-shell flex h-[74px] items-center justify-between gap-4">
          <button onClick={() => scrollTo('home')} aria-label="Mizu home" data-testid="button-logo-home"><BrandMark /></button>
          <nav className="hidden items-center gap-7 lg:flex">
            {['home', 'features', 'how-it-works', 'team', 'download', 'contact'].map((id, index) => <button key={id} onClick={() => scrollTo(id)} className="nav-link text-xs font-semibold text-slate-400" data-testid={`link-nav-${id}`}>{copy.nav[index]}</button>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><LanguageSwitcher lang={lang} setLang={setLang} /></div>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label={copy.facebook} title={copy.facebook} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[.04] text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-200" data-testid="link-header-facebook"><Facebook size={15} /></a>
            <a href={APK_DOWNLOAD_URL} download="Mizu.apk" className="hidden rounded-full bg-[#20b5e6] px-4 py-2.5 text-xs font-bold text-[#06111d] cyan-glow transition hover:-translate-y-0.5 sm:inline-flex" data-testid="link-header-download">{copy.download}</a>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] text-slate-200 lg:hidden" aria-label="Open menu" data-testid="button-mobile-menu">{mobileMenu ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {mobileMenu && <div className="border-t border-white/[.06] bg-[#0b1424] px-5 pb-5 pt-3 lg:hidden"><div className="mb-3"><LanguageSwitcher lang={lang} setLang={setLang} /></div>{['home', 'features', 'how-it-works', 'team', 'download', 'contact'].map((id, index) => <button key={id} onClick={() => scrollTo(id)} className="block w-full border-b border-white/[.05] py-3 text-start text-sm text-slate-300" data-testid={`link-mobile-${id}`}>{copy.nav[index]}</button>)}</div>}
      </header>

      <main>
        <section id="home" className="relative min-h-[740px] overflow-hidden pt-[74px]">
          <div className="hero-halo pointer-events-none absolute -right-[18%] top-0 h-[720px] w-[900px]" />
          <div className="pointer-events-none absolute left-[7%] top-[22%] h-72 w-72 rounded-full bg-cyan-400/[.08] blur-[100px]" />
          <div className="water-drop left-[17%] top-[28%]" /><div className="water-drop left-[44%] top-[15%] [animation-delay:1.3s]" /><div className="water-drop right-[18%] top-[24%] [animation-delay:2.4s]" /><div className="water-drop right-[40%] top-[67%] [animation-delay:3s]" />
          <motion.div style={{ y: heroY }} className="section-shell relative grid min-h-[665px] items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-8 lg:pt-6">
            <FadeIn className="max-w-[630px]">
              <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.23em] text-cyan-300"><span className="reveal-line" />{copy.heroKicker}</div>
              <h1 className="max-w-[700px] text-[clamp(3.1rem,8vw,6.5rem)] font-extrabold leading-[.98] tracking-[-.065em] text-white">{isArabic ? <>مياهك تصل إليك.<br /><span className="text-cyan-gradient">ببساطة.</span></> : <>{copy.heroTitle.split('. ')[0]}.<br /><span className="text-cyan-gradient">{copy.heroTitle.split('. ')[1]}</span></>}</h1>
              <p className="mt-7 max-w-[540px] text-base leading-8 text-slate-400 sm:text-lg">{copy.heroBody}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href={APK_DOWNLOAD_URL} download="Mizu.apk" className="group inline-flex items-center gap-2.5 rounded-full bg-[#24b8e8] px-5 py-3.5 text-sm font-bold text-[#071321] cyan-glow transition hover:-translate-y-1" data-testid="link-hero-download"><Play size={16} fill="currentColor" />{copy.download}<ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[.04] px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/[.08]" data-testid="link-hero-facebook"><Facebook size={16} />{copy.facebook}</a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-xs text-slate-500"><div className="flex -space-x-2 rtl:space-x-reverse">{['N', 'S', 'A'].map((letter, i) => <div key={letter} className={`grid h-7 w-7 place-items-center rounded-full border-2 border-[#080e1b] text-[10px] font-bold text-[#06111c] ${i === 1 ? 'bg-[#00e0a0]' : i === 2 ? 'bg-[#ff8b9d]' : 'bg-[#49c9ee]'}`}>{letter}</div>)}</div><span>{copy.trusted}</span><Star size={13} className="fill-[#ffc45a] text-[#ffc45a]" /></div>
            </FadeIn>
            <FadeIn delay={.15} className="relative flex justify-center lg:justify-end">
              <div className="absolute top-[8%] h-[430px] w-[430px] rounded-full border border-cyan-300/10 bg-cyan-400/[.025] shadow-[0_0_100px_rgba(23,172,223,.13)]" />
              <div className="absolute top-[20%] h-[335px] w-[335px] rounded-full border border-teal-300/[.08]" />
              <PhonePreview copy={copy} />
              <div className="glass absolute -bottom-1 start-0 hidden w-[195px] rounded-2xl p-3.5 shadow-2xl sm:block lg:start-[-20px]" data-testid="card-hero-status">
                <div className="mb-2 flex items-center justify-between"><span className="text-[10px] text-slate-400">{copy.ready}</span><span className="h-2 w-2 rounded-full bg-[#00e0a0] shadow-[0_0_10px_#00e0a0]" /></div>
                <div className="text-sm font-bold text-white">{isArabic ? 'طلبك في الطريق' : lang === 'fr' ? 'Votre commande arrive' : 'Your order is moving'}</div>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-cyan-300"><Truck size={12} /> Samir · 2.4 km</div>
              </div>
            </FadeIn>
          </motion.div>
        </section>

        <section className="border-y border-white/[.06] bg-[#0c1526]/70 py-5">
          <div className="section-shell flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#00e0a0]" /> {isArabic ? 'جودة يمكنك الوثوق بها' : lang === 'fr' ? 'Une qualité de confiance' : 'Quality you can trust'}</span>
            <span className="flex items-center gap-2"><Zap size={15} className="text-cyan-300" /> {isArabic ? 'توصيل سريع' : lang === 'fr' ? 'Livraison rapide' : 'Fast delivery'}</span>
            <span className="flex items-center gap-2"><MapPin size={15} className="text-cyan-300" /> {isArabic ? 'محلي 100٪' : lang === 'fr' ? '100% local' : '100% local'}</span>
            <span className="hidden items-center gap-2 sm:flex"><MessageCircle size={15} className="text-[#ff8093]" /> {isArabic ? 'دعم حقيقي' : lang === 'fr' ? 'Support humain' : 'Human support'}</span>
          </div>
        </section>

        <TeamSection copy={copy} />

         <RoleFeatureSection id="features" role="consumer" content={copy.consumers} isArabic={isArabic} />

         <RoleFeatureSection id="drivers" role="driver" content={copy.drivers} isArabic={isArabic} />

        <section id="how-it-works" className="relative overflow-hidden border-y border-white/[.06] bg-[#0a1323] py-28 sm:py-36">
          <div className="pointer-events-none absolute end-[-160px] top-[-180px] h-[520px] w-[520px] rounded-full bg-[#00e0a0]/[.06] blur-[100px]" />
          <div className="section-shell">
            <FadeIn><div className="mb-4 text-[11px] font-bold uppercase tracking-[.24em] text-[#00e0a0]">{copy.howKicker}</div><h2 className="max-w-[620px] text-4xl font-bold leading-[1.05] tracking-[-.05em] text-white sm:text-6xl">{copy.howTitle}</h2><p className="mt-5 max-w-[450px] text-sm leading-7 text-slate-400">{copy.howBody}</p></FadeIn>
            <div className="relative mt-16 grid gap-3 md:grid-cols-4">
              <div className="absolute start-[8%] end-[8%] top-7 hidden h-px bg-gradient-to-r from-cyan-400/50 via-teal-300/30 to-transparent md:block" />
              {steps.map((step, index) => <FadeIn key={step.number} delay={index * .1}><div className="relative z-10 border-t border-white/[.1] pt-5 md:border-0 md:pt-0" data-testid={`step-how-${index}`}><div className={`mb-7 grid h-14 w-14 place-items-center rounded-2xl border ${index === 3 ? 'border-[#00e0a0]/50 bg-[#00e0a0]/15 text-[#00e0a0]' : 'border-cyan-300/30 bg-[#0d2638] text-cyan-300'} font-display text-sm font-bold`}>{step.number}</div><h3 className="mb-2 text-base font-bold text-white">{step.title}</h3><p className="max-w-[210px] text-sm leading-6 text-slate-500">{step.body}</p></div></FadeIn>)}
            </div>
          </div>
        </section>

         <section id="showcase" className="overflow-hidden border-y border-white/[.06] bg-[#091321] py-28 sm:py-36">
           <div className="section-shell">
             <FadeIn className="mb-14">
               <div className="mb-4 text-[11px] font-bold uppercase tracking-[.24em] text-cyan-300">{copy.appPreview}</div>
               <h2 className="text-3xl font-bold tracking-[-.04em] text-white sm:text-5xl">{isArabic ? 'كل طلب، واضح أمامك.' : lang === 'fr' ? 'Chaque commande, sous vos yeux.' : 'Every order, right in front of you.'}</h2>
             </FadeIn>
             <div className="mx-auto grid max-w-[700px] gap-10 sm:grid-cols-2">
               <FadeIn><ShowcasePhone image={loginScreen} label={copy.showcase.login} dataImage="login-screen" /></FadeIn>
               <FadeIn delay={.08}><ShowcasePhone image={registerScreen} label={copy.showcase.register} dataImage="register-screen" /></FadeIn>
             </div>
             <div className="my-16 h-px bg-white/10" />
             <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_.9fr]" dir={isArabic ? 'rtl' : 'ltr'}>
               <FadeIn className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                 <ShowcasePhone label={copy.showcase.driverTitle} dataImage="driver-orders-screen" />
                 <div className="max-w-[430px] pt-2 text-center sm:text-start">
                   <h3 className="text-2xl font-bold tracking-[-.03em] text-white sm:text-3xl">{copy.showcase.driverTitle}</h3>
                   <p className="mt-4 text-sm leading-7 text-slate-400">{copy.showcase.driverBody}</p>
                 </div>
               </FadeIn>
               <FadeIn delay={.1} className="flex flex-col items-center">
                 <div className="grid w-full max-w-[440px] grid-cols-2 items-end gap-4">
                   <ShowcasePhone image={orderScreen} label="" dataImage="order-screen" compact />
                   <ShowcasePhone image={ordersScreen} label="" dataImage="orders-tracking-screen" compact />
                 </div>
                 <div className="mt-7 max-w-[440px] text-center sm:text-start">
                   <h3 className="text-2xl font-bold tracking-[-.03em] text-white sm:text-3xl">{copy.showcase.ordersTitle}</h3>
                   <p className="mt-4 text-sm leading-7 text-slate-400">{copy.showcase.ordersBody}</p>
                 </div>
               </FadeIn>
             </div>
             <div className="my-16 h-px bg-white/10" />
             <FadeIn className="mx-auto flex max-w-[520px] flex-col items-center text-center">
               <ShowcasePhone image={supportScreen} label="" dataImage="support-screen" />
               <h3 className="mt-7 text-2xl font-bold tracking-[-.03em] text-white sm:text-3xl">{copy.showcase.supportTitle}</h3>
               <p className="mt-4 text-sm leading-7 text-slate-400">{copy.showcase.supportBody}</p>
             </FadeIn>
           </div>
        </section>

        <section id="download" className="relative overflow-hidden border-y border-white/[.06] py-28 sm:py-36">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(25,171,221,.16),transparent_65%)]" />
          <FadeIn className="section-shell relative text-center"><div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-300"><Droplets size={25} /></div><div className="mb-4 text-[11px] font-bold uppercase tracking-[.24em] text-cyan-300">{copy.finalKicker}</div><h2 className="text-5xl font-bold tracking-[-.06em] text-white sm:text-7xl">{copy.finalTitle}</h2><p className="mx-auto mt-6 max-w-[480px] text-sm leading-7 text-slate-400">{copy.finalBody}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href={APK_DOWNLOAD_URL} download="Mizu.apk" className="inline-flex items-center gap-3 rounded-full bg-[#24b8e8] px-6 py-3.5 text-sm font-bold text-[#06111e] cyan-glow transition hover:-translate-y-1" data-testid="link-final-download"><Play size={16} fill="currentColor" /><span><small className="block text-[9px] font-medium opacity-70">GET IT ON</small>{copy.download}</span></a><button disabled className="inline-flex cursor-not-allowed items-center gap-3 rounded-full border border-white/10 bg-white/[.04] px-6 py-3 text-start text-sm font-semibold text-slate-500" data-testid="button-app-store"><span className="text-xl"></span><span><small className="block text-[9px] font-medium">AVAILABLE</small>{copy.appStore}</span></button></div></FadeIn>
        </section>
      </main>

      <footer id="contact" className="bg-[#060b15] pt-16">
        <div className="section-shell grid gap-12 pb-14 md:grid-cols-[1.4fr_.7fr_.7fr]">
          <div><BrandMark compact /><p className="mt-5 max-w-[260px] text-sm leading-6 text-slate-500">{copy.footerBody}</p><a href="mailto:hello@mizu.dz" className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200" data-testid="link-email"><Send size={14} /> hello@mizu.dz</a></div>
           <div><div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-slate-500">{isArabic ? 'روابط سريعة' : lang === 'fr' ? 'Liens rapides' : 'Explore'}</div><div className="flex flex-col items-start gap-3 text-sm text-slate-400"><button onClick={() => scrollTo('features')} data-testid="link-footer-features">{copy.nav[1]}</button><button onClick={() => scrollTo('drivers')} data-testid="link-footer-drivers">{copy.drivers.kicker}</button><button onClick={() => scrollTo('how-it-works')} data-testid="link-footer-how">{copy.nav[2]}</button><button onClick={() => scrollTo('team')} data-testid="link-footer-team">{copy.nav[3]}</button><button onClick={() => scrollTo('download')} data-testid="link-footer-download">{copy.nav[4]}</button></div></div>
           <div><div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-slate-500">{isArabic ? 'ابقَ قريباً' : lang === 'fr' ? 'Restons proches' : 'Stay close'}</div><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300" data-testid="link-footer-facebook"><Facebook size={16} /> Facebook <ArrowUpRight size={13} /></a><a href="mailto:support@mizu.dz" className="mt-4 flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300" data-testid="link-footer-support"><CircleHelp size={16} /> {copy.support}</a><div className="mt-5 flex flex-col items-start gap-3 text-sm text-slate-400"><a href="/privacy-policy" className="transition hover:text-cyan-300" data-testid="link-footer-privacy">{copy.privacyLabel}</a><a href="/security-policy" className="transition hover:text-cyan-300" data-testid="link-footer-security">{copy.securityLabel}</a></div></div>
        </div>
        <div className="border-t border-white/[.06]"><div className="section-shell flex flex-wrap items-center justify-between gap-3 py-5 text-[11px] text-slate-600"><span>{copy.rights}</span><span className="flex items-center gap-1.5"><MapPin size={12} />Algeria</span></div></div>
      </footer>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={App} /><Route path="/privacy-policy"><PolicyPage kind="privacy" /></Route><Route path="/security-policy"><PolicyPage kind="security" /></Route><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Root() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default Root;