import './Header.scss';

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-header__logo" href="/" aria-label="Star Wars — home">
            <img className="site-header__logo-image" src="/images/star-wars-logo.png" alt="Star Wars" width="4096" height="1770" />
          </a>
        </div>
      </header>
    </>
  );
}


