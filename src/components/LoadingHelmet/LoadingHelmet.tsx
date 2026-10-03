import './LoadingHelmet.scss';

export function LoadingHelmet() {
  return (
    <div className="loading-helmet" role="status">
      <div className="loading-helmet__art" aria-hidden="true">
        <div className="loading-helmet__mask">
          <div className="loading-helmet__water">
            <svg className="loading-helmet__wave" viewBox="0 0 1200 40" preserveAspectRatio="none">
              <path d="M0 20 Q75 0 150 20 T300 20 T450 20 T600 20 T750 20 T900 20 T1050 20 T1200 20 V40 H0 Z" fill="white" />
            </svg>
          </div>
        </div>
        <img className="loading-helmet__outline" src="/images/stormtrooper-helmet-outline.svg" alt="" />
      </div>
      <p className="loading-helmet__text">Loading characters…</p>
    </div>
  );
}
