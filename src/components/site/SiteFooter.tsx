import { Link } from "react-router-dom";
import { SiInstagram, SiSpotify, SiTiktok, SiYoutube } from "react-icons/si";

const SOCIALS = [
  { Icon: SiYoutube, href: "https://youtube.com/@BigDaddysBigTips", label: "YouTube" },
  { Icon: SiInstagram, href: "https://instagram.com/BigDaddysBigTips", label: "Instagram" },
  { Icon: SiTiktok, href: "https://tiktok.com/@BigDaddysBigTips", label: "TikTok" },
  { Icon: SiSpotify, href: "https://open.spotify.com/show/7AryqWOzeVCOC7WQ9wcBlk", label: "Spotify" },
];

const LINKS = [
  { name: "Home", to: "/" },
  { name: "Coaching", to: "/coaching" },
  { name: "Daily Wins Test", to: "/test" },
  { name: "About", to: "/about" },
  { name: "Podcast", to: "/podcast" },
  { name: "Tips", to: "/tips" },
];

const SiteFooter = () => (
  <footer className="border-t border-primary/15 bg-black">
    <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3 items-start">
      <div>
        <p className="italic font-bold text-primary text-xl">Daily Wins</p>
        <p className="text-sm text-white/60 mt-2 max-w-xs">Helping you play the long game. One Daily Win at a time.</p>
      </div>
      <nav className="grid grid-cols-2 gap-2 text-sm">
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to} className="text-white/70 hover:text-primary transition-colors">{l.name}</Link>
        ))}
      </nav>
      <div className="md:justify-self-end">
        <p className="text-sm text-white/60 mb-3">Follow @bigdaddysbigtips</p>
        <div className="flex gap-3">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-11 h-11 rounded-full border border-primary/40 flex items-center justify-center hover:border-primary hover:-translate-y-0.5 transition-all">
              <Icon className="w-5 h-5 text-[#E8CE8A]" />
            </a>
          ))}
        </div>
      </div>
    </div>
    <p className="text-center text-xs text-white/35 pb-8">© {new Date().getFullYear()} Big Daddy's Big Tips · Daily Wins</p>
  </footer>
);

export default SiteFooter;
