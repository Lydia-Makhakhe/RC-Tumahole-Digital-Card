
import { useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Link2,
  Mail,
  Phone,
  Share2,
  UserRoundPlus,
} from 'lucide-react';

import { catherine, businesses } from '../data/businessData';

import './DigitalCard.css';

function escapeVCard(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function DigitalCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleFlip = () => {
    setIsFlipped((current) => !current);
    setFeedback('');
  };

  const handleSaveContact = () => {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${escapeVCard(catherine.name)}`,
      `TITLE:${escapeVCard(catherine.role)}`,
      'ORG:Hair Happens / Kate Collections',
      `TEL;TYPE=CELL:${catherine.contact.phone}`,
      `EMAIL:${catherine.contact.email}`,
      'END:VCARD',
    ];

    const blob = new Blob([lines.join('\r\n')], {
      type: 'text/vcard;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'Catherine-Tumahole.vcf';

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setFeedback('Contact saved to your downloads');
  };

  const handleShare = async () => {
    const shareData = {
      title: catherine.name,
      text: 'Connect with Catherine and discover her businesses.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setFeedback('Card shared');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        setFeedback('Card link copied');
      } else {
        setFeedback('Sharing is unavailable in this browser');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setFeedback('Unable to share right now');
      }
    }
  };

  return (
    <main className="digital-card-page">
      <div className="card-atmosphere atmosphere-one" />
      <div className="card-atmosphere atmosphere-two" />

      <div className={`card-stage ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-inner">

          {/* FRONT */}
          <section className="card-face card-front">
            <header className="front-header">
              <div className="front-identity">
                <img
                  src={catherine.portrait}
                  alt={catherine.name}
                  className="front-portrait"
                />

                <div>
                  <h1>{catherine.name}</h1>
                  <p>{catherine.role}</p>
                </div>
              </div>

              <span className="front-location">
                {catherine.location}
              </span>
            </header>

            <div className="front-businesses">
              {businesses.map((business, index) => (
                <article
                  className="front-business"
                  key={business.id}
                  style={{ '--image-order': index }}
                >
                  <img
                    src={business.image}
                    alt={`${business.name} photography`}
                    className="front-business-image"
                  />

                  <div className="front-business-shade" />

                  <div className="front-business-content">
                    <span>{business.category}</span>
                    <h2>{business.name}</h2>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="explore-button"
              onClick={handleFlip}
              aria-label="Explore the businesses on the back of the card"
            >
              <span>Explore the businesses</span>
              <span className="explore-arrow">
                <ArrowRight size={18} />
              </span>
            </button>

            <div className="front-bottom">
              <span>Hair Happens</span>
              <span className="bottom-dot" />
              <span>Kate Collections</span>
            </div>
          </section>

          {/* BACK */}
          <section className="card-face card-back">
            <header className="back-header">
              <button
                type="button"
                className="back-button"
                onClick={handleFlip}
              >
                <ArrowLeft size={16} />
                Back to front
              </button>

              <h2>Discover her businesses.</h2>
            </header>

            <div className="back-businesses">
              {businesses.map((business) => (
                <article
                  className="back-business"
                  key={business.id}
                >
                  <div className="back-business-image-wrap">
                    <img
                      src={business.image}
                      alt={business.name}
                      className="back-business-image"
                    />
                  </div>

                  <div className="back-business-info">
                    <span className="back-category">
                      {business.category}
                    </span>

                    <h3>{business.name}</h3>

                    <p>{business.description}</p>

                    {business.socialNote && (
                      <p className="social-note">
                        {business.socialNote}
                      </p>
                    )}

                    <div className="business-links">
                      {business.links.map((link) => (
                        <a
                          key={`${business.id}-${link.label}`}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Link2 size={14} />
                          {link.label}
                          <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <section className="contact-panel">
              <div className="contact-panel-heading">
                <h3>Get in touch</h3>
                <span>Contact Catherine directly</span>
              </div>

              <div className="contact-details">
                <a href={`tel:${catherine.contact.phone}`}>
                  <Phone size={16} />
                  <span>{catherine.contact.phone}</span>
                  <ArrowUpRight size={13} />
                </a>

                <a href={`mailto:${catherine.contact.email}`}>
                  <Mail size={16} />
                  <span>{catherine.contact.email}</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </section>

            <div className="back-actions">
              <button
                type="button"
                className="save-contact-button"
                onClick={handleSaveContact}
              >
                <UserRoundPlus size={16} />
                Save Contact
              </button>

              <button
                type="button"
                className="share-card-button"
                onClick={handleShare}
              >
                <Share2 size={16} />
                Share Card
              </button>
            </div>

            <button
              type="button"
              className="back-return"
              onClick={handleFlip}
            >
              <ArrowLeft size={14} />
              Return to front
            </button>
          </section>
        </div>
      </div>

      {feedback && (
        <p className="card-feedback" role="status">
          <Check size={14} />
          {feedback}
        </p>
      )}
    </main>
  );
}

export default DigitalCard;
