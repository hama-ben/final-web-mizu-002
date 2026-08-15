import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Droplets,
  Facebook,
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
import homeScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٩-٠٣-٥٧٢_com.mizu.app_1786818657497.jpg';
import orderScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٩-٠٦-٢٠٨_com.mizu.app_1786818661708.jpg';
import ordersScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٩-٣٨-٥٤٧_com.mizu.app_1786818666483.jpg';
import supportScreen from '@assets/Screenshot_٢٠٢٦-٠٨-١٥-١٩-١٩-٤٨-٧٨٩_com.mizu.app_1786818671143.jpg';

const PLAY_STORE_URL = '#';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61590856328769';
const queryClient = new QueryClient();

type Lang = 'ar' | 'fr' | 'en';
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
};

const translations: Record<Lang, Copy> = {
  ar: {
    nav: ['الرئيسية', 'المميزات', 'كيف يعمل', 'حمّل التطبيق', 'تواصل معنا'],
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
  },
  fr: {
    nav: ['Accueil', 'Avantages', 'Comment ça marche', 'Télécharger', 'Contact'],
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
  },
  en: {
    nav: ['Home', 'Features', 'How it works', 'Download', 'Contact'],
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
  },
};

const screenshotData = [
  { image: homeScreen, label: 'Dashboard', tone: 'cyan' },
  { image: orderScreen, label: 'New order', tone: 'teal' },
  { image: ordersScreen, label: 'Your orders', tone: 'pink' },
  { image: loginScreen, label: 'Sign in', tone: 'cyan' },
  { image: registerScreen, label: 'Create account', tone: 'teal' },
  { image: supportScreen, label: 'Support', tone: 'pink' },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-mizu">
      <div className={`${compact ? 'h-9 w-9 rounded-xl' : 'h-11 w-11 rounded-[15px]'} relative grid place-items-center bg-[linear-gradient(145deg,#36d5ef,#0879c8)] cyan-glow`}>
        <svg viewBox="0 0 44 44" className="h-7 w-7 text-white" fill="none" aria-label="Mizu tanker mark">
          <path d="M7 25.5h26.7a3.3 3.3 0 0 1 3.3 3.3V31H7v-5.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
          <path d="M11 25.3v-7.7a2 2 0 0 1 2-2h12.6a2 2 0 0 1 1.8 1.1l3.4 8.6M7 31v2.3M36.8 31v2.3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="13" cy="33.2" r="2.5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="31.2" cy="33.2" r="2.5" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 21h18M16 16v9" stroke="currentColor" strokeWidth="1.7" opacity=".7"/>
        </svg>
      </div>
      <div className="leading-none">
        <div className="font-display text-[21px] font-bold tracking-[-.04em] text-white">Mizu</div>
        {!compact && <div className="mt-1 text-[9px] font-semibold uppercase tracking-[.2em] text-[#62d5ef]">water delivery</div>}
      </div>
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

function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
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

  const features = useMemo(() => [
    { icon: RouteIcon, title: isArabic ? 'تتبع حي على الخريطة' : lang === 'fr' ? 'Suivi en direct' : 'Live map tracking', body: isArabic ? 'شاهد طريق السائق لحظة بلحظة حتى يصل إلى بابك.' : lang === 'fr' ? 'Suivez votre chauffeur à chaque instant, jusqu’à votre porte.' : 'Watch your driver move in real time, all the way to your door.', accent: 'cyan' },
    { icon: Bell, title: isArabic ? 'تنبيهات في وقتها' : lang === 'fr' ? 'Alertes au bon moment' : 'Timely updates', body: isArabic ? 'نعلمك عندما يقترب السائق أو يتغير وضع طلبك.' : lang === 'fr' ? 'Recevez une notification quand votre chauffeur approche.' : 'Know when your driver is close and when your order changes.', accent: 'teal' },
    { icon: MapPin, title: isArabic ? 'عناوينك محفوظة' : lang === 'fr' ? 'Vos adresses gardées' : 'Saved addresses', body: isArabic ? 'المنزل، العمل، أو أي مكان آخر. اطلب من دون إعادة الكتابة.' : lang === 'fr' ? 'Maison, travail, ou autre. Commandez sans tout retaper.' : 'Home, work, or anywhere else. Order without typing it again.', accent: 'cyan' },
    { icon: Heart, title: isArabic ? 'سائقون تفضلهم' : lang === 'fr' ? 'Vos chauffeurs préférés' : 'Favourite drivers', body: isArabic ? 'قيّم تجربتك واحتفظ بالسائقين الذين تثق بهم.' : lang === 'fr' ? 'Notez votre expérience et retrouvez les chauffeurs de confiance.' : 'Rate your experience and keep the drivers you trust close.', accent: 'pink' },
    { icon: Headphones, title: isArabic ? 'دعم قريب منك' : lang === 'fr' ? 'Un support à portée de main' : 'Human support', body: isArabic ? 'فريق Mizu جاهز للمساعدة من داخل التطبيق.' : lang === 'fr' ? 'L’équipe Mizu est là pour vous aider, directement dans l’app.' : 'The Mizu team is ready to help, right inside the app.', accent: 'teal' },
    { icon: ShieldCheck, title: isArabic ? 'خدمة عبر الجزائر' : lang === 'fr' ? 'Partout en Algérie' : 'Across Algeria', body: isArabic ? 'نبني شبكة توصيل تصل إلى المزيد من الولايات كل يوم.' : lang === 'fr' ? 'Notre réseau grandit dans toujours plus de wilayas.' : 'Our delivery network reaches more wilayas every day.', accent: 'cyan' },
  ], [isArabic, lang]);

  const steps = isArabic
    ? [{ number: '01', title: 'أنشئ حسابك', body: 'دقائق قليلة، ومعلومات بسيطة للبدء.' }, { number: '02', title: 'اختر كمية الماء', body: '5L، 10L، 20L أو أكثر — أنت تختار.' }, { number: '03', title: 'تابع السائق', body: 'خريطة حية ووقت وصول واضح.' }, { number: '04', title: 'قيّم تجربتك', body: 'رأيك يجعل Mizu أفضل للجميع.' }]
    : lang === 'fr'
      ? [{ number: '01', title: 'Créez votre compte', body: 'Quelques minutes et l’essentiel pour commencer.' }, { number: '02', title: 'Choisissez le volume', body: '5L, 10L, 20L ou plus — c’est vous qui décidez.' }, { number: '03', title: 'Suivez le chauffeur', body: 'Une carte en direct et une arrivée claire.' }, { number: '04', title: 'Notez l’expérience', body: 'Votre avis rend Mizu meilleur pour tous.' }]
      : [{ number: '01', title: 'Create your account', body: 'A few minutes and only what we need to begin.' }, { number: '02', title: 'Choose your volume', body: '5L, 10L, 20L or more — you decide.' }, { number: '03', title: 'Follow your driver', body: 'A live map and a clear arrival time.' }, { number: '04', title: 'Rate the experience', body: 'Your feedback makes Mizu better for everyone.' }];

  const moveCarousel = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(screenshotData.length - 1, activeSlide + direction));
    setActiveSlide(next);
    track.scrollTo({ left: next * (track.clientWidth < 650 ? 216 : 285), behavior: 'smooth' });
  };

  return (
    <div className={isArabic ? 'font-arabic' : ''} dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-[#080e1b]/80 backdrop-blur-xl">
        <div className="section-shell flex h-[74px] items-center justify-between gap-4">
          <button onClick={() => scrollTo('home')} aria-label="Mizu home" data-testid="button-logo-home"><BrandMark /></button>
          <nav className="hidden items-center gap-7 lg:flex">
            {['home', 'features', 'how-it-works', 'download', 'contact'].map((id, index) => <button key={id} onClick={() => scrollTo(id)} className="nav-link text-xs font-semibold text-slate-400" data-testid={`link-nav-${id}`}>{copy.nav[index]}</button>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><LanguageSwitcher lang={lang} setLang={setLang} /></div>
            <a href={PLAY_STORE_URL} className="hidden rounded-full bg-[#20b5e6] px-4 py-2.5 text-xs font-bold text-[#06111d] cyan-glow transition hover:-translate-y-0.5 sm:inline-flex" data-testid="link-header-download">{copy.download}</a>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] text-slate-200 lg:hidden" aria-label="Open menu" data-testid="button-mobile-menu">{mobileMenu ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {mobileMenu && <div className="border-t border-white/[.06] bg-[#0b1424] px-5 pb-5 pt-3 lg:hidden"><div className="mb-3"><LanguageSwitcher lang={lang} setLang={setLang} /></div>{['home', 'features', 'how-it-works', 'download', 'contact'].map((id, index) => <button key={id} onClick={() => scrollTo(id)} className="block w-full border-b border-white/[.05] py-3 text-start text-sm text-slate-300" data-testid={`link-mobile-${id}`}>{copy.nav[index]}</button>)}</div>}
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
                <a href={PLAY_STORE_URL} className="group inline-flex items-center gap-2.5 rounded-full bg-[#24b8e8] px-5 py-3.5 text-sm font-bold text-[#071321] cyan-glow transition hover:-translate-y-1" data-testid="link-hero-download"><Play size={16} fill="currentColor" />{copy.download}<ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
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

        <section id="features" className="relative py-28 sm:py-36">
          <div className="section-shell">
            <FadeIn><div className="mb-4 text-[11px] font-bold uppercase tracking-[.24em] text-cyan-300">{copy.featureKicker}</div><div className="grid items-end gap-6 lg:grid-cols-[.75fr_1fr]"><h2 className="whitespace-pre-line text-4xl font-bold leading-[1.05] tracking-[-.05em] text-white sm:text-6xl">{copy.featureTitle}</h2><p className="max-w-[440px] text-sm leading-7 text-slate-400">{copy.featureBody}</p></div></FadeIn>
            <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, body, accent }, index) => <FadeIn key={title} delay={index * .05}><div className="group relative min-h-[220px] overflow-hidden rounded-3xl border border-white/[.09] bg-[#0c1628]/75 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30" data-testid={`card-feature-${index}`}><div className={`mb-12 grid h-11 w-11 place-items-center rounded-2xl ${accent === 'pink' ? 'bg-[#ff4d6d]/15 text-[#ff7890]' : accent === 'teal' ? 'bg-[#00e0a0]/15 text-[#00e0a0]' : 'bg-cyan-400/15 text-cyan-300'} transition group-hover:scale-110`}><Icon size={20} /></div><h3 className="mb-2 text-base font-bold text-white">{title}</h3><p className="max-w-[270px] text-sm leading-6 text-slate-500">{body}</p><div className="absolute -bottom-8 -end-8 h-28 w-28 rounded-full border border-white/[.04] transition group-hover:scale-125" /></div></FadeIn>)}
            </div>
          </div>
        </section>

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

        <section id="showcase" className="overflow-hidden py-28 sm:py-36">
          <div className="section-shell mb-12 flex items-end justify-between gap-5"><FadeIn><div className="mb-4 text-[11px] font-bold uppercase tracking-[.24em] text-cyan-300">{copy.appPreview}</div><h2 className="text-3xl font-bold tracking-[-.04em] text-white sm:text-5xl">{isArabic ? 'كل طلب، واضح أمامك.' : lang === 'fr' ? 'Chaque commande, sous vos yeux.' : 'Every order, right in front of you.'}</h2></FadeIn><div className="hidden gap-2 sm:flex"><button onClick={() => moveCarousel(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.04] text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-300" data-testid="button-carousel-prev"><ChevronLeft size={18} /></button><button onClick={() => moveCarousel(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.04] text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-300" data-testid="button-carousel-next"><ChevronRight size={18} /></button></div></div>
          <div ref={trackRef} className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(20px,calc((100vw-1180px)/2))] pb-8" data-testid="screenshot-carousel">
            {screenshotData.map((item, index) => <motion.div key={item.label} whileHover={{ y: -8 }} className="w-[195px] shrink-0 snap-start sm:w-[264px]" data-testid={`carousel-card-${index}`}><div className="phone-shell p-1.5"><div className="phone-screen aspect-[.49]"><img src={item.image} alt={`Mizu ${item.label} app screen`} className="h-full w-full object-cover" /></div></div><div className="mt-4 flex items-center justify-between px-1"><span className="text-sm font-semibold text-slate-200">{item.label}</span><span className={`h-2 w-2 rounded-full ${item.tone === 'pink' ? 'bg-[#ff4d6d]' : item.tone === 'teal' ? 'bg-[#00e0a0]' : 'bg-cyan-300'}`} /></div></motion.div>)}
          </div>
          <div className="section-shell mt-2 flex items-center justify-between sm:hidden"><span className="text-xs text-slate-500">{activeSlide + 1} / {screenshotData.length}</span><div className="flex gap-2"><button onClick={() => moveCarousel(-1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10" data-testid="button-carousel-prev-mobile"><ChevronLeft size={15} /></button><button onClick={() => moveCarousel(1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10" data-testid="button-carousel-next-mobile"><ChevronRight size={15} /></button></div></div>
        </section>

        <section className="relative px-5 pb-28 sm:pb-36">
          <div className="section-shell overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[linear-gradient(115deg,#10253b_0%,#0d2831_53%,#112035_100%)] p-7 sm:p-12 lg:p-16">
            <div className="absolute h-56 w-56 rounded-full bg-cyan-300/10 blur-[75px]" />
            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_.85fr]">
              <FadeIn><div className="mb-4 text-[11px] font-bold uppercase tracking-[.24em] text-[#00e0a0]">{copy.driverKicker}</div><h2 className="whitespace-pre-line text-4xl font-bold leading-[1.02] tracking-[-.05em] text-white sm:text-6xl">{copy.driverTitle}</h2><p className="mt-6 max-w-[450px] text-sm leading-7 text-slate-300/70">{copy.driverBody}</p><a href={PLAY_STORE_URL} className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#00e0a0]/30 bg-[#00e0a0]/10 px-5 py-3 text-sm font-bold text-[#5ff2c3] transition hover:bg-[#00e0a0]/20" data-testid="link-driver-download">{copy.driverButton}<ArrowUpRight size={15} /></a></FadeIn>
              <FadeIn delay={.1} className="relative mx-auto w-full max-w-[380px]"><div className="glass rounded-3xl p-5 shadow-2xl"><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-300"><Truck size={20} /></div><div><div className="text-sm font-bold text-white">Mizu Driver</div><div className="text-[10px] text-slate-500">Algiers · Zone 03</div></div></div><div className="h-2 w-2 rounded-full bg-[#00e0a0]" /></div><div className="rounded-2xl bg-[#081422] p-4"><div className="mb-3 flex items-center justify-between text-xs"><span className="text-slate-500">Today’s route</span><span className="text-[#00e0a0]">+ 4,800 DZD</span></div><div className="flex items-end gap-1.5">{[40, 62, 48, 80, 68, 92, 74].map((height, i) => <div key={i} className="flex-1 rounded-full bg-cyan-300/20" style={{ height: `${height}px` }}><div className="h-1/2 rounded-full bg-cyan-300/70" /></div>)}</div></div><div className="mt-3 flex items-center justify-between rounded-2xl bg-[#00e0a0]/10 p-3 text-xs"><span className="flex items-center gap-2 text-slate-300"><Package size={14} className="text-[#00e0a0]" /> 12 deliveries</span><span className="text-[#00e0a0]">On track</span></div></div></FadeIn>
            </div>
          </div>
        </section>

        <section id="download" className="relative overflow-hidden border-y border-white/[.06] py-28 sm:py-36">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(25,171,221,.16),transparent_65%)]" />
          <FadeIn className="section-shell relative text-center"><div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-300"><Droplets size={25} /></div><div className="mb-4 text-[11px] font-bold uppercase tracking-[.24em] text-cyan-300">{copy.finalKicker}</div><h2 className="text-5xl font-bold tracking-[-.06em] text-white sm:text-7xl">{copy.finalTitle}</h2><p className="mx-auto mt-6 max-w-[480px] text-sm leading-7 text-slate-400">{copy.finalBody}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href={PLAY_STORE_URL} className="inline-flex items-center gap-3 rounded-full bg-[#24b8e8] px-6 py-3.5 text-sm font-bold text-[#06111e] cyan-glow transition hover:-translate-y-1" data-testid="link-final-download"><Play size={16} fill="currentColor" /><span><small className="block text-[9px] font-medium opacity-70">GET IT ON</small>{copy.download}</span></a><button disabled className="inline-flex cursor-not-allowed items-center gap-3 rounded-full border border-white/10 bg-white/[.04] px-6 py-3 text-start text-sm font-semibold text-slate-500" data-testid="button-app-store"><span className="text-xl"></span><span><small className="block text-[9px] font-medium">AVAILABLE</small>{copy.appStore}</span></button></div></FadeIn>
        </section>
      </main>

      <footer id="contact" className="bg-[#060b15] pt-16">
        <div className="section-shell grid gap-12 pb-14 md:grid-cols-[1.4fr_.7fr_.7fr]">
          <div><BrandMark compact /><p className="mt-5 max-w-[260px] text-sm leading-6 text-slate-500">{copy.footerBody}</p><a href="mailto:hello@mizu.dz" className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200" data-testid="link-email"><Send size={14} /> hello@mizu.dz</a></div>
          <div><div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-slate-500">{isArabic ? 'روابط سريعة' : lang === 'fr' ? 'Liens rapides' : 'Explore'}</div><div className="flex flex-col items-start gap-3 text-sm text-slate-400"><button onClick={() => scrollTo('features')} data-testid="link-footer-features">{copy.nav[1]}</button><button onClick={() => scrollTo('how-it-works')} data-testid="link-footer-how">{copy.nav[2]}</button><button onClick={() => scrollTo('download')} data-testid="link-footer-download">{copy.nav[3]}</button></div></div>
          <div><div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-slate-500">{isArabic ? 'ابقَ قريباً' : lang === 'fr' ? 'Restons proches' : 'Stay close'}</div><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300" data-testid="link-footer-facebook"><Facebook size={16} /> Facebook <ArrowUpRight size={13} /></a><a href="mailto:support@mizu.dz" className="mt-4 flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300" data-testid="link-footer-support"><CircleHelp size={16} /> {copy.support}</a></div>
        </div>
        <div className="border-t border-white/[.06]"><div className="section-shell flex flex-wrap items-center justify-between gap-3 py-5 text-[11px] text-slate-600"><span>{copy.rights}</span><span className="flex items-center gap-1.5"><MapPin size={12} />Algeria</span></div></div>
      </footer>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={App} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Root() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default Root;