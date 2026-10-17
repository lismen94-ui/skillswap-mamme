/**
 * SkillSwap Mamme - Script Applicativo Modulare
 * Gestione interazioni, modali, filtri bacheca, notifiche toast e autenticazione
 */

document.addEventListener('DOMContentLoaded', () => {
  initToasts();
  initLoginPage();
  initDashboardPage();
});

/* ==========================================================================
   1. Sistema Globale Notifiche Toast
   ========================================================================== */

let toastTimeout = null;

function initToasts() {
  window.showToast = function(msg, icon = '🌸') {
    const toastEl = document.getElementById('toast') || document.getElementById('toastBox');
    if (!toastEl) return;

    const toastIcon = document.getElementById('toastIcon');
    const toastMsg = document.getElementById('toastMessage') || document.getElementById('toastMsg');

    if (toastIcon) toastIcon.textContent = icon;
    if (toastMsg) toastMsg.textContent = msg;

    toastEl.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  };
}

/* ==========================================================================
   2. Logica Pagina di Accesso (index.html)
   ========================================================================== */

function initLoginPage() {
  const loginForm = document.getElementById('loginForm');
  const schoolModal = document.getElementById('schoolModal');
  const openRegisterModalBtn = document.getElementById('openRegisterModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const codeHelpLink = document.getElementById('codeHelpLink');

  if (!loginForm && !schoolModal) return;

  // Apertura e Chiusura Modale Registrazione Plesso
  if (openRegisterModalBtn && schoolModal) {
    openRegisterModalBtn.addEventListener('click', () => {
      schoolModal.classList.add('active');
      schoolModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeModal = () => {
    if (!schoolModal) return;
    schoolModal.classList.remove('active');
    schoolModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (schoolModal) {
    schoolModal.addEventListener('click', (e) => {
      if (e.target === schoolModal) closeModal();
    });
  }

  // Link Aiuto per il Codice
  if (codeHelpLink) {
    codeHelpLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast('Richiedi il codice al rappresentante di classe o al comitato genitori.', 'ℹ️');
    });
  }

  // Invio Form di Login con Reindirizzamento alla Dashboard
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const contactInput = document.getElementById('contactInput');
      const schoolCodeInput = document.getElementById('schoolCodeInput');
      const submitBtn = document.getElementById('submitBtn');

      const contactVal = contactInput ? contactInput.value.trim() : '';
      const codeVal = schoolCodeInput ? schoolCodeInput.value.trim() : '';

      if (!contactVal) {
        window.showToast('Inserisci la tua email o numero di telefono.', '⚠️');
        if (contactInput) contactInput.focus();
        return;
      }

      if (!codeVal) {
        window.showToast('Inserisci il codice scuola o invito.', '⚠️');
        if (schoolCodeInput) schoolCodeInput.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Verifica credenziali in corso...</span>`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          window.showToast('Benvenuta in SkillSwap Mamme! Accesso in corso...', '🎉');
          
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 800);
        }, 1000);
      }
    });
  }

  // Gestione Invio Modale Nuova Scuola
  window.handleNewSchoolSubmit = function() {
    closeModal();
    window.showToast('Richiesta inviata! Il nostro team contatterà la scuola per attivare il codice gratuito.', '📬');
  };
}

/* ==========================================================================
   3. Logica Pagina Dashboard (dashboard.html)
   ========================================================================== */

function initDashboardPage() {
  const feedList = document.getElementById('feedList');
  if (!feedList) return;

  // Filtri Rapidi: Tutti, Scuola, Parco
  const filterPills = document.querySelectorAll('.filter-pill');
  const feedCards = document.querySelectorAll('.feed-card');
  const cardCounter = document.getElementById('cardCounter');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');
      let visibleCount = 0;

      feedCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (cardCounter) {
        cardCounter.textContent = `${visibleCount} annunc${visibleCount === 1 ? 'io' : 'i'}`;
      }
    });
  });

  // Modale Risposta Rapida
  const replyModal = document.getElementById('replyModal');
  const replyModalTitle = document.getElementById('replyModalTitle');
  const replyModalDesc = document.getElementById('replyModalDesc');
  const replyText = document.getElementById('replyText');
  let currentTargetMom = '';

  window.openReplyModal = function(momName, topic, timeEstimate) {
    if (!replyModal) return;
    currentTargetMom = momName;
    if (replyModalTitle) replyModalTitle.textContent = `Rispondi a ${momName}`;
    if (replyModalDesc) replyModalDesc.textContent = `Annuncio: "${topic}" • Tempo stimato: ${timeEstimate}`;
    if (replyText) {
      replyText.value = `Ciao ${momName.split(' ')[1] || momName}! Ti do una mano volentieri io per ${topic}.`;
    }
    replyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeReplyModal = function() {
    if (!replyModal) return;
    replyModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.setQuickReply = function(text) {
    if (replyText) {
      replyText.value = text;
      replyText.focus();
    }
  };

  window.sendReply = function() {
    const message = replyText ? replyText.value.trim() : '';
    if (!message) {
      window.showToast('Inserisci un messaggio prima di inviare.', '⚠️');
      return;
    }
    window.closeReplyModal();
    window.showToast(`Messaggio inviato a ${currentTargetMom}! Chat aperta.`, '💬');
  };

  if (replyModal) {
    replyModal.addEventListener('click', (e) => {
      if (e.target === replyModal) window.closeReplyModal();
    });
  }

  // Modale Creazione Annuncio (Offro / SOS)
  const createModal = document.getElementById('createModal');
  const createModalTitle = document.getElementById('createModalTitle');
  const newAnnounceCategory = document.getElementById('newAnnounceCategory');
  const newAnnounceText = document.getElementById('newAnnounceText');

  window.openCreateModal = function(type) {
    if (!createModal) return;
    if (type === 'sos') {
      if (createModalTitle) createModalTitle.textContent = '🚨 Richiedi Aiuto Rapido (SOS)';
      if (newAnnounceCategory) newAnnounceCategory.value = 'emergenza';
      if (newAnnounceText) newAnnounceText.placeholder = 'es. Sono bloccata al lavoro per 30 minuti, chi può ritirare mio figlio Tommaso?';
    } else {
      if (createModalTitle) createModalTitle.textContent = '➕ Offri Tempo e Disponibilità';
      if (newAnnounceCategory) newAnnounceCategory.value = 'parco';
      if (newAnnounceText) newAnnounceText.placeholder = 'es. Oggi sono al parco giochi dalle 16:30, posso guardare anche altri bimbi!';
    }
    createModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCreateModal = function() {
    if (!createModal) return;
    createModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (createModal) {
    createModal.addEventListener('click', (e) => {
      if (e.target === createModal) window.closeCreateModal();
    });
  }

  window.publishNewAnnouncement = function() {
    const text = newAnnounceText ? newAnnounceText.value.trim() : '';
    if (!text) {
      window.showToast('Inserisci una breve descrizione del tuo annuncio.', '⚠️');
      return;
    }
    window.closeCreateModal();
    if (newAnnounceText) newAnnounceText.value = '';
    window.showToast('Annuncio pubblicato con successo nella bacheca di quartiere!', '🎉');
  };

  // Navigazione Bottom Tab
  window.switchTab = function(btn, title) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.showToast(`Sezione: ${title}`, '📌');
  };
}
