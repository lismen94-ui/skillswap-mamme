# SkillSwap Mamme 🌸

Web-app mobile-first per la gestione del baratto del tempo, banca delle ore e mutuo soccorso tra mamme dello stesso quartiere o plesso scolastico.

---

## 📁 Struttura del Progetto

Il progetto è organizzato in modo pulito e modulare:

```text
skillswap-mamme/
├── 📁 css/
│   └── 📄 style.css       # Design system, palette pastello, layout mobile-first e componenti
├── 📁 js/
│   └── 📄 script.js      # Logica applicativa, gestione modali, filtri bacheca e notifiche
├── 📄 index.html          # Schermata di benvenuto, 3 card illustrative e form di accesso
├── 📄 dashboard.html      # Bacheca quartiere, saldo tempo, azioni veloci (Offro/SOS) e bottom nav
└── 📄 README.md           # Documentazione e panoramica dell'applicazione
```

---

## ✨ Funzionalità Principali

1. **Accesso e Registrazione Plesso ([index.html](file:///c:/Users/LM/skillswap-mamme/skillswap-mamme/index.html))**:
   - Intestazione con logo SVG personalizzato ad abbraccio materno.
   - 3 schede illustrative (*Trova la tua scuola/quartiere*, *Scambia tempo*, *Supporto emergenze*).
   - Form di accesso con codice scuola/invito e modale per la richiesta di attivazione di nuovi plessi.
   - Feedback interattivo con reindirizzamento automatico alla dashboard.

2. **Dashboard di Quartiere ([dashboard.html](file:///c:/Users/LM/skillswap-mamme/skillswap-mamme/dashboard.html))**:
   - **Header Utente**: profilo di Mamma Lisa con avatar illustrato e box saldo tempo (`⏱️ 2.5 Ore`).
   - **Pulsanti d'Azione Rapida**: `➕ Offro Tempo` e `🚨 Cerco Aiuto / SOS`.
   - **Bacheca Annunci Feed**: annunci geolocalizzati (Scuola, Parco, Pedibus) con tempo stimato e pulsante `Rispondi`.
   - **Filtri Rapidi**: selezione istantanea per categoria (*Tutti*, *Scuola*, *Parco / Pomeriggio*).
   - **Risposta Rapida**: modale con suggerimenti veloci per accordarsi in un click.
   - **Bottom Navigation Bar**: navigazione fissa tra *Home*, *Chat*, *Miei Scambi* e *Profilo*.

---

## 🎨 Stile e Design System

- **Palette Cromatica**: Azzurro polvere (`#7CA1BF`, `#3282B8`), sfondi chiari luminosi, accenti pastello verde menta (`#10B981`) e corallo d'emergenza (`#F05454`).
- **Tipografia**: *Plus Jakarta Sans* via Google Fonts.
- **Esperienza Mobile-First**: ottimizzata per smartphone, con visualizzazione incorniciata elegante su desktop.

---

## 🚀 Come visualizzare l'app

Puoi aprire direttamente i file con qualsiasi browser web (Chrome, Edge, Safari, Firefox):
- Schermata di accesso: doppio click su `index.html`
- Bacheca operativa: doppio click su `dashboard.html`
