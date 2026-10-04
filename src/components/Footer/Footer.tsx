import './Footer.scss';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img className="site-footer__logo" src="/images/star-wars-logo.png" alt="Star Wars" width="4096" height="1770" />
          <p className="site-footer__tagline">Explore a galaxy far, far away.</p>
        </div>
        <div className="site-footer__info">
          <p className="site-footer__note">An unofficial fan project.</p>
          <a className="site-footer__link" href="https://swapi.info/api/" target="_blank" rel="noopener noreferrer">Data from SWAPI ↗</a>
        </div>
      </div>
    </footer>
  );
}
