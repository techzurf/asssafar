import React from 'react';
import { 
  Star, 
  ExternalLink, 
  Edit3, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Quote
} from 'lucide-react';
import { 
  GOOGLE_RATING_SUMMARY, 
  OFFICIAL_GOOGLE_REVIEW_CARDS,
  OFFICIAL_GOOGLE_MAPS_URL 
} from '../data/googleReviewsData';
import { useLanguage } from '../context/LanguageContext';

const GoogleLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" aria-label="Google logo">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const GoogleReviewsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="reviews"
      aria-label="Google Reviews"
      className="py-16 sm:py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/ddeivqykl/image/upload/v1791978374/PR_Consultancy_Website_Website_in_Blue_Purple_White_Professional_Gradients_Style_bgnc6l.png)'
      }}
    >
      {/* Subtle translucent white overlay for optimal readability */}
      <div className="absolute inset-0 bg-white/88 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE8E2] text-[#0B5D4B] border border-[#DCDAD2] text-xs font-bold tracking-wider uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>{t('reviews.badge')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2942] tracking-tight">
            {t('reviews.heading')}
          </h2>

          <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed">
            {t('reviews.sub')}
          </p>
        </div>

        {/* Google Reviews Rating & Profile Banner */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <a
            href={OFFICIAL_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="View As-Safar Hajj & Umrah Service on Google Maps"
            className="group flex flex-col sm:flex-row items-center justify-between gap-5 bg-white hover:bg-[#FAFAF8] rounded-2xl border border-[#E5E5E0] hover:border-[#0B5D4B]/40 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 text-center sm:text-left cursor-pointer"
          >
            {/* Left: Google Icon & Business Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E5E0] p-2.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <GoogleLogo />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-semibold text-base sm:text-lg text-[#0F2942] group-hover:text-[#0B5D4B] transition-colors">
                    {GOOGLE_RATING_SUMMARY.businessName}
                  </h3>
                  <span title="Verified Business">
                    <CheckCircle2 className="w-4 h-4 text-[#0B5D4B] shrink-0" />
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#666666]">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24D]" />
                  <span>Cantonment, Tiruchirappalli (Trichy)</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-medium text-[#0B5D4B]">Verified Google Profile</span>
                </div>
              </div>
            </div>

            {/* Right: Score and Stars */}
            <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E5E0] w-full sm:w-auto justify-center">
              <div className="text-right">
                <div className="flex items-center gap-1 text-[#FFCE1B] justify-center sm:justify-end">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFCE1B] text-[#FFCE1B]" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#555555] mt-0.5">
                  <strong className="text-[#0F2942]">{GOOGLE_RATING_SUMMARY.totalReviews}</strong> Google Reviews
                </p>
              </div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2942] tracking-tight bg-white px-3 py-1.5 rounded-xl border border-[#E5E5E0]">
                {GOOGLE_RATING_SUMMARY.rating.toFixed(1)}
              </span>
            </div>
          </a>
        </div>

        {/* Four Genuine Google Review Cards — Responsive 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {OFFICIAL_GOOGLE_REVIEW_CARDS.map((review) => (
            <div
              key={review.id}
              className="group flex flex-col justify-between bg-white rounded-2xl border border-[#E5E5E0] hover:border-[#0B5D4B]/40 hover:shadow-lg transition-all duration-300 p-6 relative overflow-hidden text-left"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B5D4B] via-[#C9A24D] to-[#0B5D4B] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Review Card Header & Body */}
              <div className="space-y-4">
                {/* Reviewer Header: Initials Avatar + Name + Date */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Neutral Initials Avatar with mini Google badge */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-[#0F2942] text-[#F3F4F6] flex items-center justify-center font-bold text-xs tracking-wider border border-[#E5E5E0] shadow-2xs group-hover:bg-[#0B5D4B] transition-colors">
                        {review.initials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full p-0.5 shadow-2xs border border-[#E5E5E0] flex items-center justify-center">
                        <GoogleLogo />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-[#0F2942] truncate leading-tight">
                        {review.reviewerName}
                      </h3>
                      <p className="text-xs text-[#718096] mt-0.5">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0B5D4B] bg-[#EAF3EF] px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Google</span>
                  </span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-[#FFCE1B]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFCE1B] text-[#FFCE1B]" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-[#0F2942]">5.0</span>
                </div>

                {/* Review Text Body */}
                <div className="relative pt-1">
                  <Quote className="w-4 h-4 text-[#C9A24D]/40 mb-1" />
                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed whitespace-pre-line font-normal">
                    “{review.reviewText}”
                  </p>
                </div>
              </div>

              {/* Card Action Link: "Read Full Review on Google" */}
              <div className="pt-4 mt-6 border-t border-[#F0F0EC]">
                <a
                  href={review.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] hover:bg-[#0B5D4B] text-[#0F2942] hover:text-white border border-[#E5E5E0] hover:border-[#0B5D4B] text-xs font-semibold transition-all group/btn shadow-2xs"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-3.5 h-3.5 shrink-0"><GoogleLogo /></span>
                    <span className="truncate">Read Full Review on Google</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C9A24D] group-hover/btn:text-[#FFCE1B] shrink-0 ml-1.5 transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons: “Read All Google Reviews” & “Write a Review” */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full pt-2">
          <a
            href={OFFICIAL_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0B5D4B] hover:bg-[#084537] text-white text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer group"
          >
            <span>{t('reviews.readall')}</span>
            <ExternalLink className="w-4 h-4 text-[#FFCE1B] group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href={OFFICIAL_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F8F7F3] text-[#0F2942] hover:text-[#0B5D4B] border border-[#E5E5E0] hover:border-[#0B5D4B]/40 text-sm font-bold tracking-wide transition-all shadow-2xs cursor-pointer group"
          >
            <Edit3 className="w-4 h-4 text-[#C9A24D] group-hover:scale-110 transition-transform" />
            <span>{t('reviews.write')}</span>
          </a>
        </div>

        {/* Bottom Attribution Notice */}
        <div className="text-center mt-8 text-[11px] text-[#718096] max-w-xl mx-auto space-y-1">
          <div className="flex items-center justify-center gap-2 font-medium text-[#4A5568]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D4B]" />
            <span>Official Google Business Profile • 4.9 Star Rating (91 Reviews)</span>
          </div>
          <p>
            Google and the Google Maps logo are trademarks of Google LLC.
          </p>
          <p>
            All 4 review cards connect directly to authentic pilgrim submissions on Google Maps.
          </p>
        </div>

      </div>
    </section>
  );
};
